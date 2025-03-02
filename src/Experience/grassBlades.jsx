/* eslint-disable no-unused-vars */
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';

import grassBladeFragmentShader from './shader/grassBlade/fragment.glsl';
import grassBladeVertexShader from './shader/grassBlade/vertex.glsl';
import getAttributeData from './utils/GetAttributeData.js';

const GrassBlades = () => {
    const grassBlades = useGLTF('/grassBlade3.glb'); // Load grass blades model
    const matRef = useRef();
    const landMatRef = useRef();

    const controls = useControls({
        tipColor: {
            value: '#40b800',
            label: 'Tip Color',
            onChange: (color) => {
                matRef.current.uniforms.uTipColor.value = new THREE.Color(
                    color
                ).convertLinearToSRGB();
            }
        },
        baseColor: {
            value: '#001701',
            label: 'Base color',
            onChange: (color) => {
                matRef.current.uniforms.uBaseColor.value = new THREE.Color(
                    color
                ).convertLinearToSRGB();
            }
        },
        density: { value: 1, min: 0, max: 4, step: 0.001 }
    });

    const count = 60000 * controls.density; // Number of grass blades

    const width = 200; // Width of the land

    useFrame(({ clock }) => {
        if (matRef.current) {
            matRef.current.uniforms.uTime.value = clock.elapsedTime;
        }
    });
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uTipColor: {
                value: new THREE.Color(controls.tipColor).convertLinearToSRGB()
            },
            uBaseColor: {
                value: new THREE.Color(controls.baseColor).convertLinearToSRGB()
            }
        }),
        [controls.tipColor, controls.baseColor]
    );

    const attributeData = useMemo(
        () => getAttributeData(count, width),
        [count]
    );

    return (
        <group position={[0, -10, 0]}>
            <mesh frustumCulled={false}>
                <instancedBufferGeometry
                    index={grassBlades.nodes.grassBlade.geometry.index}
                    attributes={
                        grassBlades.nodes.grassBlade.geometry.attributes
                    }
                >
                    <instancedBufferAttribute
                        attach={'attributes-offset'}
                        args={[new Float32Array(attributeData.offesets), 3]}
                    />
                    <instancedBufferAttribute
                        attach={'attributes-orientation'}
                        args={[new Float32Array(attributeData.orientations), 4]}
                    />
                    <instancedBufferAttribute
                        attach={'attributes-stretch'}
                        args={[new Float32Array(attributeData.streches), 1]}
                    />
                    <instancedBufferAttribute
                        attach={'attributes-halfRootAngleSin'}
                        args={[
                            new Float32Array(attributeData.halfRootAngleSin),
                            1
                        ]}
                    />
                    <instancedBufferAttribute
                        attach={'attributes-halfRootAngleCos'}
                        args={[
                            new Float32Array(attributeData.halfRootAngleCos),
                            1
                        ]}
                    />
                </instancedBufferGeometry>
                <CustomShaderMaterial
                    ref={matRef}
                    baseMaterial={THREE.MeshBasicMaterial}
                    fragmentShader={grassBladeFragmentShader}
                    vertexShader={grassBladeVertexShader}
                    uniforms={uniforms}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

export default GrassBlades;
