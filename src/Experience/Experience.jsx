import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';

import GrassBlades from './grassBlades.jsx';


const Experience = () => {
    return (
        <>
            <Canvas camera={{ position: [0, 1, 35] }}>
                <Perf position={'top-left'} />
                <CameraControls />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 0]} intensity={0.5} />
                <GrassBlades />
            </Canvas>
        </>
    );
};

export default Experience;
