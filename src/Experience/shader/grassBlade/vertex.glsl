precision mediump float;

uniform float uTime;

varying vec2 vUv;

#include ../includes/simplexNoise3d.glsl
#include ../includes/perlin3d.glsl
#include ../includes/simplexNoise2d.glsl

void main() {

    // Grass bending effect
    vec3 transform = position;
    // Apply a sine wave to bend the grass, with more curve at the top
    float curveStrength = simplexNoise2d(vec2( sin(uTime *2.0)*0.05, cos(uTime * 1.0) * 0.05)) ; // Control the maximum bending
    float heightFactor = position.y * 0.075; // Scales the bending effect (stronger at top, weaker at bottom)
    transform.x += (position.y * 0.25) * curveStrength * heightFactor ;
    // Output the transformed position
    csm_Position = transform;

    vUv = uv;
}
