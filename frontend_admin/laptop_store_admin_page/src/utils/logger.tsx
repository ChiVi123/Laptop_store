export default function logger(...args: any[]) {
    console.log('%c>>>', 'color: #26bfa5;', ...args);
}
