declare global {
    interface Number {
        toCurrency(locales?: string, options?: Intl.NumberFormatOptions): string;
    }
}

Number.prototype.toCurrency = function (locales: string = 'vi', options: Intl.NumberFormatOptions = {}) {
    const targetOptions = { style: 'currency', currency: 'VND' };
    Object.assign(targetOptions, options);
    return this.toLocaleString(locales, targetOptions);
};

export {};
