import { Capacitor } from '@capacitor/core';

// iOS store builds use manufacturer names only; Android and web retain brand artwork.
export const showManufacturerLogos = Capacitor.getPlatform() !== 'ios';
