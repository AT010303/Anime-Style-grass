import { shaderMaterial } from '@react-three/drei';

import fragmentShader from '../shader/grassBlade/fragment.glsl';
import vertexShader from '../shader/grassBlade/vertex.glsl';

const GrassBladeMat = shaderMaterial(
    {
        cameraPosition: [0, 0, 0] // Uniform for billboard effect
    },
    vertexShader,
    fragmentShader
);

export default GrassBladeMat;
