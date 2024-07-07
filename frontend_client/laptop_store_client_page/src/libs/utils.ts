import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
// [min; max] value
// value < min => min
// value >= min => value
// value > max => max
// value <= max => value
export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}
export function range(start: number, end: number, step: number = 1) {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index * step);
}
