import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
export function range(start: number, end: number, step: number = 1): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index * step);
}
export function isClient(): boolean {
    return typeof window !== 'undefined';
}
export function isServer(): boolean {
    return typeof window === 'undefined';
}
