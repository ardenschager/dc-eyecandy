// Custom script for New Art City (NAC) DC Project

// ============================================================================
// === DC PROJECT CONFIGURATION - CHANGE THESE VALUES ===
// ============================================================================

// === Debug logging - set to false for production ===
const debugLog = true; // CHANGE ME: set to false to disable debug logging

// === NAC Room Parameters ===
room.canFly = true;
room.spawnPointX = 0; // can potentially randomize the spawn point
room.spawnPointY = 100;
room.spawnPointZ = 0;
room.cameraFar = 1500;

// === Diurnal System Parameters ===
const durationInMinutes = 1; // day/night cycle duration in real minutes
const minNightIntensity = 0.05; // darkest lighting level
const maxDayIntensity = 1.2; // brightest lighting level
const diurnalUniformOffset = 0.15; // minimum brightness floor
const diurnalCycleResolutionMs = 50; // update frequency in milliseconds

// === Diurnal Color Palette (midnight > dawn > noon > dusk > midnight) ===
const diurnalColorScale = createColorScale([
    '#0d1b2a', // midnight
    '#61a1e0', // dawn
    '#f4c38b', // sunrise
    '#fff3cc', // noon
    '#f1a69b', // sunset
    '#53156b', // dusk
    '#0d1b2a'  // midnight again, ensure it ends as it begins
], [0, 0.15, 0.25, 0.5, 0.75, 0.85, 1]); // Edit this if you want to change the color distribution

// === Objects to EXCLUDE from diurnal lighting ===
// By default, all objects get diurnal lighting. Add Object IDs here to exclude them.
const excludeFromDiurnalShader = [
    339632  // CHANGE HERE: add Object IDs to exclude from diurnal lighting (Curve002 example)
];

// ============================================================================
// === ANIMATION CONFIGURATION - ADD YOUR OBJECTS HERE ===
// ============================================================================

// To find object IDs: On project page, go to Artworks and Objects section > Click object > 
// Scroll to bottom of modal to find the unique Object ID number

// CHANGE HERE: Configure your diurnal animations using Object IDs
const diurnalAnimationConfig = [
    // First fox (ID 389855): run at night, survey during day with speed variations
    {
        objectId: 389855,
        start: 0.0,
        end: 0.4,
        startAnimation: 'Run',
        startAnimationTimeScale: 1.5,
        endAnimation: 'Survey',
        endAnimationTimeScale: 0.8,
        fadeDuration: 1.0  // 1 second smooth crossfade between animations
    },
    
    // Cube (same object), 5 phases throughout the day with smooth transitions
    // Example to chain animations with different time scales
    { 
        objectId: 391965, 
        start: 0.0, 
        end: 0.2, 
        startAnimation: 'CubeAction.002', 
        startAnimationTimeScale: 0.6, 
        fadeDuration: 0.1 
    },
    { 
        objectId: 391965, 
        start: 0.2, 
        end: 0.4, 
        startAnimation: 'CubeAction.003', 
        startAnimationTimeScale: 1.3, 
        fadeDuration: 0.1
    },
    { 
        objectId: 391965, 
        start: 0.4, 
        end: 0.6, 
        startAnimation: 'CubeAction.002', 
        startAnimationTimeScale: 1.0, 
        fadeDuration: 0.1 
    },
    { 
        objectId: 391965, 
        start: 0.6, 
        end: 0.8, 
        startAnimation: 'CubeAction.003', 
        startAnimationTimeScale: 1.8, 
        fadeDuration: 0.1 
    },
    { 
        objectId: 391965, 
        start: 0.8, 
        end: 1.0, 
        startAnimation: 'CubeAction.002', 
        startAnimationTimeScale: 0.7, 
        fadeDuration: 0.1 
    }
];

// CHANGE HERE: Configure your proximity animations using Object IDs
const proximityAnimationConfig = [
    // Test proximity animation for fox (ID 395576) - NOTE: This is a DIFFERENT fox from the diurnal one
    {
        objectId: 395576,                    // DIFFERENT fox from diurnal (which uses 389855)
        enterDistance: 75,                   // starts when player moves x units near  
        exitDistance: 100,                   // stops when player moves x units away  
        enterAnimation: 'Walk',              // plays Walk animation when you approach
        exitAnimation: 'Survey',             // plays Survey animation when you leave
        defaultAnimation: 'Survey',          // returns to Survey when far away
        enterAnimationTimeScale: 1.5,        // faster walk when triggered
        exitAnimationTimeScale: 0.8,         // slow survey when leaving
        defaultAnimationTimeScale: 1.0,      // normal survey by default
        fadeDuration: 1.5                    // 1.5 second smooth crossfade for proximity triggers
    }
];

// ============================================================================
// === SYSTEM CODE - DO NOT EDIT BELOW THIS LINE ===
// ============================================================================

// === Custom LAB Color Interpolation Functions (replaces chroma.js for smaller script size) ===
// === Convert hex color to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// === Convert RGB to LAB color space
function rgbToLab(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    let x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
    let y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
    let z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;
    x /= 0.95047;
    y /= 1.00000;
    z /= 1.08883;
    x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x + 16 / 116);
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y + 16 / 116);
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z + 16 / 116);
    const L = (116 * y) - 16;
    const a = 500 * (x - y);
    const b_lab = 200 * (y - z);
    return { L, a, b: b_lab };
}

// === Convert LAB to RGB
function labToRgb(L, a, b) {
    let y = (L + 16) / 116;
    let x = a / 500 + y;
    let z = y - b / 200;
    const y3 = Math.pow(y, 3);
    const x3 = Math.pow(x, 3);
    const z3 = Math.pow(z, 3);
    y = y3 > 0.008856 ? y3 : (y - 16 / 116) / 7.787;
    x = x3 > 0.008856 ? x3 : (x - 16 / 116) / 7.787;
    z = z3 > 0.008856 ? z3 : (z - 16 / 116) / 7.787;
    x *= 0.95047;
    y *= 1.00000;
    z *= 1.08883;
    let r = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
    let g = x * -0.9692660 + y * 1.8760108 + z * 0.0415560;
    let b_rgb = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;
    r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
    g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
    b_rgb = b_rgb > 0.0031308 ? 1.055 * Math.pow(b_rgb, 1 / 2.4) - 0.055 : 12.92 * b_rgb;
    r = Math.max(0, Math.min(1, r)) * 255;
    g = Math.max(0, Math.min(1, g)) * 255;
    b_rgb = Math.max(0, Math.min(1, b_rgb)) * 255;
    return { r: Math.round(r), g: Math.round(g), b: Math.round(b_rgb) };
}

// === Interpolate between two LAB colors
function interpolateLabColors(lab1, lab2, t) {
    return {
        L: lab1.L + (lab2.L - lab1.L) * t,
        a: lab1.a + (lab2.a - lab1.a) * t,
        b: lab1.b + (lab2.b - lab1.b) * t
    };
}

// === Convert RGB to hex
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// === Custom color scale function (replaces chroma.scale)
function createColorScale(hexColors, domain = null) {
    const labColors = hexColors.map(hex => {
        const rgb = hexToRgb(hex);
        return rgbToLab(rgb.r, rgb.g, rgb.b);
    });
    const domainPoints = domain || hexColors.map((_, i) => i / (hexColors.length - 1));
    return {
        call: function (t) {
            t = Math.max(0, Math.min(1, t));
            let segmentIndex = 0;
            for (let i = 0; i < domainPoints.length - 1; i++) {
                if (t <= domainPoints[i + 1]) {
                    segmentIndex = i;
                    break;
                }
            }
            if (segmentIndex >= labColors.length - 1) {
                segmentIndex = labColors.length - 2;
            }
            const segmentStart = domainPoints[segmentIndex];
            const segmentEnd = domainPoints[segmentIndex + 1];
            const localT = (t - segmentStart) / (segmentEnd - segmentStart);
            const interpolatedLab = interpolateLabColors(
                labColors[segmentIndex],
                labColors[segmentIndex + 1],
                localT
            );
            const rgb = labToRgb(interpolatedLab.L, interpolatedLab.a, interpolatedLab.b);
            return {
                hex: () => rgbToHex(rgb.r, rgb.g, rgb.b)
            };
        }
    };
}

// === Helper function for debug logging ===
const consoleLogDebug = (...args) => debugLog && console.log(...args);

// === Three.js Objects ===
const clock = new THREE.Clock(); // for animation

// === System constants (don't edit) ===
let ambientLightSource;
const diurnalUniform = { value: 1.0 }; // For the shader

// === Proximity Animation System (internal, don't edit) ===
const proximityAnimatedObjects = [];
let playerObject = null;

// === Diurnal Event System ===
const diurnalEvents = [];

// TODO
// === Platform objects, for being able to walk on them on approach, and fly otherwise ===

// Register time-based animations
function registerDiurnalGLBAnimation({
    objectId,
    start,
    end,
    startAnimation = null,
    endAnimation = null,
    startAnimationTimeScale = 1.0,
    endAnimationTimeScale = 1.0,
    fadeDuration = 0.5,  // NEW: crossfade duration in seconds
    onStart = () => { },
    onEnd = () => { }
}) {
    consoleLogDebug(`=== Registering DIURNAL animation for object ID: ${objectId} ===`);
    
    // Get or create the controller for this object ID
    const controller = createAnimationController(objectId);

    if (!controller) {
        console.warn(`Failed to create animation controller for object ID ${objectId}`);
        return;
    }

    consoleLogDebug(`DIURNAL controller for ${objectId} - model name: ${controller.model.name}`);

    diurnalEvents.push({
        start,
        end,
        objectId,
        startAnimation,
        endAnimation,
        startAnimationTimeScale,
        endAnimationTimeScale,
        fadeDuration,  
        onStart: () => {
            consoleLogDebug(`DIURNAL onStart for object ID ${objectId} - playing: ${startAnimation} with ${fadeDuration}s fade`);
            if (startAnimation) {
                controller.play(startAnimation, { timeScale: startAnimationTimeScale, fadeDuration });
            }
            onStart();
        },
        onEnd: () => {
            consoleLogDebug(`DIURNAL onEnd for object ID ${objectId} - playing: ${endAnimation} with ${fadeDuration}s fade`);
            if (endAnimation) {
                controller.play(endAnimation, { timeScale: endAnimationTimeScale, fadeDuration });
            }
            onEnd();
        },
        active: false
    });

    consoleLogDebug(`✓ Diurnal animation registered for object ID ${objectId}`);
}

// Register proximity-based animations (overrides diurnal animations when triggered)
function registerProximityGLBAnimation({
    objectId,
    enterDistance = 5,
    exitDistance = null,
    enterAnimation = null,
    exitAnimation = null,
    defaultAnimation = null,
    enterAnimationTimeScale = 1.0,
    exitAnimationTimeScale = 1.0,
    defaultAnimationTimeScale = 1.0,
    fadeDuration = 0.5,  
    onEnter = () => { },
    onExit = () => { }
}) {
    consoleLogDebug(`=== Registering PROXIMITY animation for object ID: ${objectId} ===`);
    
    // Get or create the controller for this object ID
    const controller = createAnimationController(objectId);

    if (!controller) {
        console.warn(`Failed to create animation controller for object ID ${objectId}`);
        return;
    }

    consoleLogDebug(`PROXIMITY controller for ${objectId} - model name: ${controller.model.name}`);

    // Find the actual 3D object for distance calculations
    let targetObject = null;
    
    // First, find the root group for this object ID
    let rootGroup = null;
    scene.traverse(obj => {
        if ((obj.name === objectId.toString() || obj.name === objectId) && obj.type === 'Group') {
            rootGroup = obj;
        }
    });
    
    if (!rootGroup) {
        console.warn(`No root group found for proximity object ID ${objectId}`);
        return;
    }
    
    // Find the first SkinnedMesh (the actual model) within the root group
    rootGroup.traverse(child => {
        if (child.isSkinnedMesh && !targetObject) {
            targetObject = child;
        }
    });
    
    // If no SkinnedMesh found, try any Mesh
    if (!targetObject) {
        rootGroup.traverse(child => {
            if (child.isMesh && !targetObject) {
                targetObject = child;
            }
        });
    }

    if (!targetObject) {
        console.warn(`No 3D object found for ID ${objectId}`);
        return;
    }

    proximityAnimatedObjects.push({
        objectId,
        targetObject,
        enterDistance,
        exitDistance: exitDistance || enterDistance + 2, // prevent flickering
        enterAnimation,
        exitAnimation,
        defaultAnimation,
        enterAnimationTimeScale,
        exitAnimationTimeScale,
        defaultAnimationTimeScale,
        fadeDuration,  // Store fade duration for smooth transitions
        onEnter,
        onExit,
        controller,
        isNear: false
    });

    // Start with the default animation if specified
    if (defaultAnimation) {
        consoleLogDebug(`Starting default animation "${defaultAnimation}" for PROXIMITY object ID ${objectId} with ${fadeDuration}s fade`);
        controller.play(defaultAnimation, { timeScale: defaultAnimationTimeScale, fadeDuration });
        consoleLogDebug(`Started default animation "${defaultAnimation}" for object ID ${objectId}`);
    }

    consoleLogDebug(`✓ Proximity animation registered for object ID ${objectId}`);
}

// === Helper Functions (Internal) ===
function initializeAnimationsForCurrentTime() {
    const currentDiurnalTime = 0.0;

    consoleLogDebug(`initializing animations for time: ${currentDiurnalTime}`);

    glbControllers.forEach(controller => {
        controller.stopAll();
    });

    diurnalEvents.forEach((event, index) => {
        const isInRange = currentDiurnalTime >= event.start && currentDiurnalTime <= event.end;

        if (isInRange) {
            event.onStart && event.onStart();
            event._active = true;
        } else {
            event.onEnd && event.onEnd();
            event._active = false;
        }
    });

    // Restart default animations for proximity objects that aren't controlled by diurnal events
    proximityAnimatedObjects.forEach(obj => {
        if (obj.defaultAnimation && obj.controller) {
            // Check if this object has any active diurnal events
            const hasActiveDiurnalEvent = diurnalEvents.some(event => 
                event.objectId.toString() === obj.objectId.toString() && event._active
            );
            
            // Only restart default animation if no diurnal event is controlling this object
            if (!hasActiveDiurnalEvent) {
                consoleLogDebug(`Restarting default animation "${obj.defaultAnimation}" for proximity object ID ${obj.objectId} with ${obj.fadeDuration}s fade`);
                obj.controller.play(obj.defaultAnimation, { 
                    timeScale: obj.defaultAnimationTimeScale, 
                    fadeDuration: obj.fadeDuration 
                });
            }
        }
    });

    consoleLogDebug("animation setup complete");
}

function findPlayerObject() {
    // Try common player object names in New Art City
    const playerNames = ['player', 'Player', 'camera', 'Camera'];

    for (const name of playerNames) {
        const found = scene.getObjectByName(name);
        if (found) {
            consoleLogDebug(`Found player object: ${name}`);
            return found;
        }
    }

    // If no named player found, try to find camera object
    let foundCamera = null;
    scene.traverse((child) => {
        if (child.isCamera && !foundCamera) {
            foundCamera = child;
            consoleLogDebug('Using camera as player reference:', child.name || 'unnamed camera');
        }
    });

    if (foundCamera) {
        return foundCamera;
    }

    // DEBUG: Let's see ALL objects to help find the player
    consoleLogDebug("=== SEARCHING FOR PLAYER OBJECT ===");
    consoleLogDebug("All scene objects:");
    scene.traverse((obj) => {
        if (obj.name) {
            consoleLogDebug(`  ${obj.name} (${obj.type})`);
        }
    });
    
    // Try to find any object with "player" or "camera" in the name (case insensitive)
    scene.traverse((child) => {
        if (child.name && typeof child.name === 'string') {
            const lowerName = child.name.toLowerCase();
            if ((lowerName.includes('player') || lowerName.includes('camera')) && !foundCamera) {
                foundCamera = child;
                consoleLogDebug(`Found potential player object: ${child.name} (${child.type})`);
            }
        }
    });
    
    consoleLogDebug("=== END PLAYER SEARCH ===");
    return foundCamera;
}

function updateProximityAnimations() {
    if (!playerObject || proximityAnimatedObjects.length === 0) return;

    proximityAnimatedObjects.forEach(obj => {
        if (!obj.targetObject) return;

        // Use world position for accurate distance calculation
        const targetWorldPos = new THREE.Vector3();
        obj.targetObject.getWorldPosition(targetWorldPos);
        
        const playerWorldPos = new THREE.Vector3();
        playerObject.getWorldPosition(playerWorldPos);
        
        const distance = playerWorldPos.distanceTo(targetWorldPos);

        if (distance <= obj.enterDistance && !obj.isNear) {
            obj.isNear = true;
            consoleLogDebug(`PROXIMITY TRIGGER: Object ${obj.objectId} - distance ${distance.toFixed(1)}`);
            if (obj.controller && obj.enterAnimation) {
                setTimeout(() => {
                    obj.controller.play(obj.enterAnimation, { 
                        timeScale: obj.enterAnimationTimeScale, 
                        fadeDuration: obj.fadeDuration 
                    });
                }, 50);
            }
            obj.onEnter && obj.onEnter();
        } else if (distance >= obj.exitDistance && obj.isNear) {
            obj.isNear = false;
            consoleLogDebug(`PROXIMITY EXIT: Object ${obj.objectId} - distance ${distance.toFixed(1)}`);
            if (obj.controller) {
                setTimeout(() => {
                    if (obj.exitAnimation) {
                        obj.controller.play(obj.exitAnimation, { 
                            timeScale: obj.exitAnimationTimeScale, 
                            fadeDuration: obj.fadeDuration 
                        });
                    } else if (obj.defaultAnimation) {
                        obj.controller.play(obj.defaultAnimation, { 
                            timeScale: obj.defaultAnimationTimeScale, 
                            fadeDuration: obj.fadeDuration 
                        });
                    }
                }, 50);
            }
            obj.onExit && obj.onExit();
        }
    });
}

const glbControllers = [];
const animationControllerMap = new Map(); // ID -> Controller mapping

// Create and cache animation controller for an object ID
function createAnimationController(objectId) {
    // Check if we already have a controller for this ID
    if (animationControllerMap.has(objectId.toString())) {
        return animationControllerMap.get(objectId.toString());
    }

    // Check if mixer exists for this ID
    const mixerEntry = animations.mixers?.[objectId.toString()];
    if (!mixerEntry) {
        console.warn(`No mixer found for object ID ${objectId}`);
        return null;
    }

    // Find the root group by ID
    let rootGroup = null;
    scene.traverse(obj => {
        if ((obj.name === objectId.toString() || obj.name === objectId) && obj.type === 'Group') {
            rootGroup = obj;
            return;
        }
    });

    if (!rootGroup) {
        console.warn(`No root group found for object ID ${objectId}`);
        return null;
    }

    const controller = new GLBAnimationController(rootGroup);
    
    if (controller.loaded) {
        consoleLogDebug(`✓ Controller created for object ID ${objectId}:`, Object.keys(controller.clips));
        glbControllers.push(controller);
        animationControllerMap.set(objectId.toString(), controller);
        return controller;
    } else {
        console.warn(`✗ Failed to create controller for object ID ${objectId}`);
        return null;
    }
}

function getLightsInScene(scene) {
    return scene.children.filter(o => o.isLight);
}

function easeInOutCubic(t) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Helper function to check if a mesh should be excluded from diurnal shader
function shouldExcludeFromDiurnalShader(meshObject) {
    // Walk up the object hierarchy to find the root group with an Object ID
    let currentObj = meshObject;
    while (currentObj) {
        // Check if this object has a name that matches an excluded Object ID
        if (currentObj.name && excludeFromDiurnalShader.includes(parseInt(currentObj.name))) {
            consoleLogDebug(`Excluding mesh from diurnal shader - found Object ID ${currentObj.name} in exclude list`);
            return true;
        }
        currentObj = currentObj.parent;
    }
    return false;
}

function convertToDiurnalShader(mesh, isAnimated = false) {
    mesh.traverse(child => {
        if (!child.isMesh) return;

        const oldMat = child.material;
        const newMat = oldMat.clone();

        newMat.skinning = child.isSkinnedMesh;

        newMat.onBeforeCompile = (shader) => {
            shader.uniforms.uBrightness = diurnalUniform;

            shader.fragmentShader = shader.fragmentShader.replace(
                `void main() {`,
                `uniform float uBrightness;\nvoid main() {`
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <dithering_fragment>`,
                `
                    #include <dithering_fragment>
                    gl_FragColor.rgb *= clamp(uBrightness, 0.0, 1.0);
                `
            );
        };

        child.material = newMat;
        child.material.needsUpdate = true;
    });
}

function initDiurnalLighting() {
    const sceneLights = getLightsInScene(scene);
    ambientLightSource = sceneLights.find(l => l.isHemisphereLight);

    if (!ambientLightSource) {
        console.warn("No HemisphereLight found.");
        return;
    }

    const totalDurationMs = durationInMinutes * 60 * 1000;
    const cycleSpeed = (Math.PI * 2) / (totalDurationMs / diurnalCycleResolutionMs);
    let timeOfDay = 0;

    // Diurnal system loop
    setInterval(() => {
        timeOfDay = (timeOfDay + cycleSpeed) % (Math.PI * 2);

        const angleT = timeOfDay / (Math.PI * 2);
        const rawT = 1 - (Math.cos(timeOfDay) * 0.5 + 0.5);
        const easedT = rawT;

        ambientLightSource.intensity = minNightIntensity + (maxDayIntensity - minNightIntensity) * easedT;

        const hexColor = diurnalColorScale.call(angleT % 1).hex();
        const diurnalThreeColor = new THREE.Color(hexColor);
        ambientLightSource.color.copy(diurnalThreeColor);
        scene.background = diurnalThreeColor.clone();

        diurnalUniform.value = easedT + diurnalUniformOffset;

        diurnalEvents.forEach(event => {
            const isInRange = easedT >= event.start && easedT <= event.end;
            if (isInRange && !event._active) {
                event._active = true;
                event.onStart && event.onStart();
            } else if (!isInRange && event._active) {
                event._active = false;
                event.onEnd && event.onEnd();
            }
        });
    }, diurnalCycleResolutionMs);
}

class GLBAnimationController {
    constructor(rootGroup) {
        this.model = rootGroup;
        
        const mixerEntry = animations.mixers?.[rootGroup.name];
        if (!mixerEntry) {
            console.warn(`No mixer found for root group ${rootGroup.name}`);
            this.loaded = false;
            return;
        }

        this.mixer = mixerEntry.mixer;
        this.loaded = true;
        this.clips = {};
        this.actions = {};
        this.activeAction = null;

        for (const action of this.mixer._actions) {
            const clip = action._clip;
            this.clips[clip.name] = clip;
            this.actions[clip.name] = action;
        }
    }

    play(name, { loopOnce = false, fadeDuration = 0.5, timeScale = 1.0 } = {}) {
        if (!this.loaded || !this.actions[name]) {
            consoleLogDebug(`Warning: Cannot play animation "${name}" - not loaded or not found`);
            return;
        }
        
        const action = this.actions[name];
        
        if (!action || !action._mixer) {
            consoleLogDebug(`Warning: Action "${name}" or its mixer is not properly initialized`);
            return;
        }
        
        try {
            action.reset();
            action.setLoop(loopOnce ? THREE.LoopOnce : THREE.LoopRepeat);
            action.clampWhenFinished = loopOnce;
            action.timeScale = timeScale;

            if (this.activeAction && this.activeAction !== action) {
                this.activeAction.fadeOut(fadeDuration);
            }

            action.fadeIn(fadeDuration).play();
            this.activeAction = action;
            consoleLogDebug(`Playing animation: ${name} (speed: ${timeScale}x, fade: ${fadeDuration}s)`);
        } catch (error) {
            console.warn(`Error playing animation "${name}":`, error);
        }
    }

    setSpeed(speed) {
        if (this.activeAction) {
            this.activeAction.timeScale = speed;
            consoleLogDebug(`Changed animation speed to: ${speed}x`);
        }
    }

    stop(name) {
        if (this.actions[name]) {
            this.actions[name].stop();
            if (this.activeAction === this.actions[name]) this.activeAction = null;
            consoleLogDebug(`Stopped animation: ${name}`);
        }
    }

    stopAll() {
        Object.keys(this.actions).forEach(name => {
            this.actions[name].stop();
        });
        this.activeAction = null;
        consoleLogDebug(`Stopped all animations for ${this.model.name}`);
    }

    update(deltaTime) {
        if (this.loaded && this.mixer) {
            this.mixer.update(deltaTime);
        }
    }

    listAnimations() {
        consoleLogDebug(Object.keys(this.clips));
    }
}

room.afterInit = function () {
    // === UPDATED DEBUG: Show all available object IDs and their animations ===
    consoleLogDebug("=== AVAILABLE OBJECT IDs AND ANIMATIONS ===");

    if (animations && animations.mixers) {
        Object.keys(animations.mixers).forEach(mixerName => {
            const mixerEntry = animations.mixers[mixerName];
            if (mixerEntry.mixer && mixerEntry.mixer._actions) {
                const animationNames = mixerEntry.mixer._actions.map(action => action._clip.name);
                consoleLogDebug(`Object ID ${mixerName} has animations:`, animationNames);
            }
        });
    }
    consoleLogDebug("=== END OBJECT IDs ===\n");

    // Apply diurnal shaders to all objects EXCEPT those in excludeFromDiurnalShader
    consoleLogDebug("=== APPLYING DIURNAL SHADERS ===");
    scene.traverse(obj => {
        if (obj.isMesh && !shouldExcludeFromDiurnalShader(obj)) {
            convertToDiurnalShader(obj);
            consoleLogDebug(`Applied diurnal shader to mesh: ${obj.name || 'unnamed'}`);
        } else if (obj.isMesh && shouldExcludeFromDiurnalShader(obj)) {
            consoleLogDebug(`Excluded mesh from diurnal shader: ${obj.name || 'unnamed'}`);
        }
    });
    consoleLogDebug("=== END DIURNAL SHADER APPLICATION ===\n");

    initDiurnalLighting();

    // Initialize player object for proximity system
    playerObject = findPlayerObject();
    if (!playerObject) {
        console.warn("No player object found - proximity animations will not work");
    } else {
        consoleLogDebug(`Player object found: ${playerObject.name || 'unnamed'} (${playerObject.type})`);
    }

    // Register all diurnal animations from configuration
    diurnalAnimationConfig.forEach(config => registerDiurnalGLBAnimation(config));

    // Register all proximity animations from configuration  
    proximityAnimationConfig.forEach(config => registerProximityGLBAnimation(config));

    setTimeout(initializeAnimationsForCurrentTime, 200);

    // Start proximity update loop
    if (playerObject && proximityAnimatedObjects.length > 0) {
        setInterval(() => {
            updateProximityAnimations();
        }, 100); // check every 100ms
        consoleLogDebug("Proximity animation system started");
    }
};
