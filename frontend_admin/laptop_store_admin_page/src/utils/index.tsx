export function logger(label: string, ...args: any[]) {
    const styleRed = 'color: red';
    const styleYellow = 'color: yellow';
    const separateBottom = '<<<---';

    if (args.length === 1) {
        console.log(`%c>>> ${label}`, styleRed, ...args);
        console.log(`%c${separateBottom}`, styleYellow);
    } else {
        console.group(`%c${label}`, styleRed);
        console.log(...args);
        console.groupEnd();
        console.log(`%c${separateBottom}`, styleYellow);
    }
}

export function toCurrency(
    value: number,
    locales: string = 'vi',
    options?: Intl.NumberFormatOptions,
): string {
    const targetOptions = { style: 'currency', currency: 'VND' };
    Object.assign(targetOptions, options);
    return value.toLocaleString(locales, targetOptions);
}

export function formatLocalDate(
    value: string | undefined,
    locales: string = 'vi',
    options?: Intl.DateTimeFormatOptions,
): string {
    if (!value) {
        return '';
    }

    const separate = ' ';
    const date = new Date(value);
    const targetOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    Object.assign(targetOptions, options);
    return date.toLocaleDateString(locales, targetOptions).split(separate).reverse().join(separate);
}
