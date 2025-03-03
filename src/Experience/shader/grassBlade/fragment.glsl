precision mediump float;
varying vec2 vUv;

uniform vec3 uTipColor;
uniform vec3 uBaseColor;

void main() {

    vec3 color1 = uTipColor; 
    vec3 color2 = uBaseColor;

    // Compute the interpolation factor with an easing function
    float blendFactor = smoothstep(-0.2, 0.8,vUv.y);

    // Blend the colors
    vec3 blendedColor = mix(color1, color2, blendFactor);

    // Assign the final color
    csm_DiffuseColor = vec4(blendedColor, 1.0);
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
