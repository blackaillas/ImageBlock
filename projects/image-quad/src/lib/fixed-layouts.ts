import { Layout } from "./image-quad.component";

const layoutOne: Layout = {
    q1: true,
    q2: { q1: true, q2: false, q3: true, q4: true },
    q3: { q1: false, q2: true, q3: false, q4: false },
    q4: { q1: true, q2: false, q3: true, q4: false }
};

const layoutTwo: Layout = {
    q1: true,
    q2: { q1: true, q2: false, q3: true, q4: true },
    q3: { q1: false, q2: false, q3: false, q4: false },
    q4: { q1: true, q2: true, q3: false, q4: true }
};

const layoutThree: Layout = {
    q1: { q1: true, q2: true, q3: false, q4: true },
    q2: true,
    q3: { q1: false, q2: true, q3: false, q4: true },
    q4: { q1: true, q2: false, q3: false, q4: true }
};

export const fixedLayouts = {
    fixedOne: layoutOne,
    fixedTwo: layoutTwo,
    fixedThree: layoutThree
};
