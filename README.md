# diurnal animation system for new art city

quick setup for DC

## what it does

- day/night cycle with automatic lighting
- different animations based on time of day
- colors change throughout the cycle
- control animation speed and timing

## setup

1. copy script into your NAC room
2. check console (F12) to see what objects/animations were found
3. edit the "CHANGE HERE" sections to add your stuff

## adding your objects

### find object names
- check console logs when script runs
- look for "Found object: YourObjectName"
- names are case-sensitive

**blender hierarchy example:**
```
Scene Collection
└── Collection
    ├── Camera
    └── Cube                    ← object name = "Cube"
        └── Animation
            └── NLA Tracks
                ├── track2
                │   └── CubeAction.003  ← animation name
                └── track1
                    └── CubeAction.002  ← animation name
```

### add to script
find "CHANGE HERE: Add the names of your animated objects" and add:
```javascript
const myController = setupAnimatedObject('Cube');
```

### create diurnal events
find "CHANGE HERE: Configure when animations play" and add:
```javascript
registerDiurnalEvent(0.2, 0.8, {
    onStart: () => myController.play('CubeAction.002', { timeScale: 1.2 }),
    onEnd: () => myController.play('CubeAction.003', { timeScale: 0.8 })
});
```

**time values:**
- 0.0 = midnight
- 0.25 = dawn  
- 0.5 = noon
- 0.75 = dusk
- 1.0 = midnight again

## animation controls

- `play('animationName', { timeScale: speed })` - timeScale 1.0 = normal, 2.0 = double speed
- `stopAll()` - stops all animations 
- `setSpeed(speed)` - changes current animation speed

## colors

automatic color changes throughout the day:
- midnight: deep navy
- dawn: steel blue
- noon: creamy white
- dusk: steel blue

affects lighting, background, and object materials.

### custom colors
edit the `diurnalColorScale` section:
```javascript
const diurnalColorScale = chroma.scale([
    '#your-midnight-color',
    '#your-dawn-color', 
    '#your-noon-color',
    '#your-dusk-color',
    '#your-midnight-color'
]).mode('lab').domain([0, 0.25, 0.5, 0.75, 1]);
```

### make objects respond to colors
add to `responsiveObjectNames`:
```javascript
const responsiveObjectNames = {
    'Cube': false,  // your object here
    'fox': true
};
```

## current examples

**fox:** runs fast at night (1.5x), surveys slow during day (0.8x)

**cube:** 5 phases throughout the day with different animations and speeds

## troubleshooting

- check console for errors
- object names must match exactly (case-sensitive)
- animation names come from blender NLA tracks
- if animations conflict, use `stopAll()` first

**console tells you everything:**
- object discovery: "Found object: ObjectName"
- animations: "Available animations: [list]"
- phase changes: "🌙 Cube Phase 1: slow movement"

## config options

```javascript
const durationInMinutes = 1;        // cycle length
const minNightIntensity = 0.05;     // darkest
const maxDayIntensity = 1.2;        // brightest
```

that's it. check console logs if something breaks.
