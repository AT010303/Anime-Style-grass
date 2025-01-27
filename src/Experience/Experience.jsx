import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

import GrassBlades from './grassBlades.jsx';

const Experience = () => {
    return (
        <>
            <Canvas camera={{ position: [0, 2, 35] }}>
                <Perf position={'top-left'} />
                <CameraControls />
                <GrassBlades />
            </Canvas>
        </>
    );
};

export default Experience;
