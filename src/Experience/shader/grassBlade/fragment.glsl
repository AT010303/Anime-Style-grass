precision mediump float;
varying vec2 vUv;

void main() {
    
    csm_DiffuseColor = vec4(0.0, 
                            smoothstep(-0.5, 2.0, 1.0 -vUv.y), 
                            0.0, 1.0
                            );
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
