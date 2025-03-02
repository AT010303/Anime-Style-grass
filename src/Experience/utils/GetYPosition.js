import alea from 'alea';
import { createNoise2D } from 'simplex-noise';

const prng = alea(8);

const noise2D = createNoise2D(prng);

const getYPosition = (x, z) => {
    let y = 2 * noise2D(x / 50, z / 50);
    y += 4 * noise2D(x / 100, z / 100);
    y += 0.2 * noise2D(x / 10, z / 10);

    return y;
};

export default getYPosition;
