import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

import GrassBlades from './grassBlades.jsx';
import GrassFeild from './grassFeild.jsx';

const Experience = () => {
    return (
        <>
            <Canvas camera={{ position: [0, 1, 8] }}>
                <Perf position={'top-left'} />
                <CameraControls />
                <GrassBlades />
                <GrassFeild />
            </Canvas>
        </>
    );
};

export default Experience;
