/// <reference path="openlayers.raw.d.ts" />

declare module ol {
    interface AnimationOptions {
        center?: ol.Coordinate;
        zoom?: number;
        resolution?: number;
        rotation?: number;
        anchor?: ol.Coordinate;
        duration?: number;
        easing?: (t: number) => number;
    }

    interface View {
        animate(...args: any[]): void;
    }
}