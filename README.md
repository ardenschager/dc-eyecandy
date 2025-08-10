# diurnal animation system for new art city

quick setup for DC

## what it does

- day/night cycle with automatic lighting and colors
- time-based animations (diurnal system) 
- player proximity animations with smooth crossfading
- colors change smoothly throughout the cycle
- control animation speed, timing, and transition smoothness

## setup

1. copy script into your NAC room
2. check console (F12) to see what object IDs and animations were found
3. edit the configuration sections at the top to add your objects

## finding your object IDs

**IMPORTANT:** This system uses NAC's internal Object IDs, not object names from Blender.

### why object IDs?
If you have multiple objects of the same type (like several foxes), NAC needs a way to tell them apart. Object names (from Blender for example) can be the same, but Object IDs are always unique.

### how to find object IDs:
1. In NAC project page: Find the **Artworks and Objects** 
2. Click on your object
3. Scroll to the **bottom of the modal**
4. Look for little grey **ID** followed by a number (e.g. `ID 395576`)
5. Use this number in your script configuration to animate the objects

**example:**
```javascript
// Use the Object ID number, not the object name
const diurnalAnimationConfig = [
    {
        objectId: 389855,  // ← This number from NAC modal
        start: 0.0,
        end: 0.4,
        startAnimation: 'Run',
        // ... rest of config
    }
];
```

## animation systems

### diurnal animations (time-based)
Edit the `diurnalAnimationConfig` array at the top of the script:

```javascript
const diurnalAnimationConfig = [
    {
        objectId: 389855,                     // Object ID from NAC (see above)
        start: 0.2,                          // time when event starts (0.0-1.0)
        end: 0.8,                            // time when event ends
        startAnimation: 'WakeUp',            // animation to play at start time
        startAnimationTimeScale: 1.2,        // speed of start animation
        endAnimation: 'Sleep',               // animation to play at end time
        endAnimationTimeScale: 0.8,          // speed of end animation
        fadeDuration: 1.0                    // crossfade time in seconds (NEW!)
    }
];
```

**time values:**
- 0.0 = midnight
- 0.25 = dawn  
- 0.5 = noon
- 0.75 = dusk
- 1.0 = midnight again

### proximity animations (player-based)
Edit the `proximityAnimationConfig` array at the top of the script:

```javascript
const proximityAnimationConfig = [
    {
        objectId: 395576,                    // Object ID from NAC
        enterDistance: 5,                    // distance when animation starts
        exitDistance: 8,                     // distance when animation stops 
        enterAnimation: 'Bloom',             // animation when player approaches
        exitAnimation: 'Close',              // animation when player leaves
        defaultAnimation: 'Idle',            // animation to return to (optional)
        enterAnimationTimeScale: 1.0,        // speed of enter animation
        exitAnimationTimeScale: 1.0,         // speed of exit animation
        defaultAnimationTimeScale: 1.0,      // speed of default animation
        fadeDuration: 1.5                    // crossfade time in seconds (NEW!)
    }
];
```

**note:** proximity animations override diurnal animations when triggered.

### smooth transitions (NEW!)
The `fadeDuration` parameter controls how smoothly animations blend together:
- `0.1` = very quick snap
- `0.5` = default smooth transition  
- `2.0` = very slow, dreamy crossfade

## colors & lighting

automatic color changes throughout the day. edit the `diurnalColorScale` at the top:

```javascript
const diurnalColorScale = createColorScale([
    '#0d1b2a', // midnight - deep navy
    '#61a1e0', // dawn - steel blue  
    '#f4c38b', // sunrise - warm orange
    '#fff3cc', // noon - cream white
    '#f49f5e', // sunset - orange
    '#3c16af', // dusk - purple
    '#0d1b2a'  // midnight again
], [0, 0.15, 0.25, 0.5, 0.75, 0.85, 1]);
```

### shader system
**by default, all objects respond to diurnal lighting.** to exclude objects, edit:

```javascript
const excludeFromDiurnalShader = [
    339632,     // Object ID from NAC (Curve002 example)
    395577      // add more Object IDs as needed
];
```

**note:** this uses Object IDs (same as animations) for consistency. Find Object IDs the same way: Edit Scene > Artworks and Objects > Click object > Object ID at bottom of modal.

## configuration options

edit these at the top of the script:

```javascript
const debugLog = true;                    // set to false for production
const durationInMinutes = 1;              // cycle length in real minutes
const minNightIntensity = 0.05;           // darkest lighting level
const maxDayIntensity = 1.2;              // brightest lighting level
```

## troubleshooting

- check browser developer console for errors
- **object IDs must be exact numbers from NAC modal**
- animation names come from blender NLA tracks
- if animations conflict, proximity overrides diurnal
- proximity system needs player object (script finds it automatically)

**console tells you everything:**
- object discovery: "Object ID 389855 has animations: ['Run', 'Survey']"
- phase changes: "DIURNAL onStart for object ID 389855"
- proximity: "PROXIMITY TRIGGER: Object 395576 - distance 4.2"

## current examples

**fox (389855):** runs fast at night (1.5x), surveys slow during day (0.8x), 1.0s crossfade

**cube (391965):** 5 phases throughout the day with different animations and 0.8s crossfades

**proximity fox (395576):** walks when you approach within 75 units, surveys when you leave, 1.5s crossfade

that's it. check console logs if something breaks.
