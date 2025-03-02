import { useMemo } from 'react';
import * as THREE from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';

import LandFragmentShader from './shader/land/fragment.glsl';
import LandVertexShader from './shader/land/vertex.glsl';
import getYPosition from './utils/GetYPosition.js';

const Land = () => {

    const width = 200; // Width of the land

    const groundGeo = useMemo(() => {
        const geo = new THREE.PlaneGeometry(width, width, 32, 32);
        geo.rotateX(-Math.PI / 2);

        const position = geo.attributes.position.array;
        for (let i=0; i< position.length; i+=3) {
            const x = position[i];
            const z = position[i+2];
            position[i + 1] =  getYPosition(x, z);
        }

        geo.computeVertexNormals();
        geo.attributes.position.needsUpdate = true;

        return geo;
        
    }, [width]);

    return (
        <>
            <mesh position={[0, -10, 0]} geometry={groundGeo}>
                <CustomShaderMaterial
                    baseMaterial={THREE.MeshBasicMaterial}
                    fragmentShader={LandFragmentShader}
                    vertexShader={LandVertexShader}
                    uniforms={{}}
                    color={'#00591c'}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </>
    );
};

export default Land;
