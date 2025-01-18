precision mediump float;
varying vec2 vUv;

void main() {

    vec3 color1 = vec3(0.36, 0.71, 0.0); // Top color (e.g., red)
    vec3 color2 = vec3(0.08, 0.23, 0.0); // Bottom color (e.g., blue)

    // Compute the interpolation factor with an easing function
    float blendFactor = smoothstep(0.0, 1.0, vUv.y);

    // Blend the colors
    vec3 blendedColor = mix(color1, color2, blendFactor);

    // Assign the final color
    csm_DiffuseColor = vec4(blendedColor, 1.0);
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
