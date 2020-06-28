export class MathFunctions {
    static lerp(a, b, w) {
        return a + w*(b-a);
    }

    static clampedLerp(a, b, w) {
        return MathFunctions.clamp(a, b, a + w*(b-a));
    }

    static clamp(min, max, v) {
        return v <= min ? min : v >= max ? max : v;
    }

    static randomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static randomRangeFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
}