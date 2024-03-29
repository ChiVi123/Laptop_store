export {};

declare global {
    interface Number {
        toCurrency(locales?: string, options?: Intl.NumberFormatOptions): string;
    }

    interface String {
        formatLocalDate(locales?: string, options?: Intl.DateTimeFormatOptions): string;
    }
}

Number.prototype.toCurrency = function (locales: string = 'vi', options: Intl.NumberFormatOptions = {}) {
    const targetOptions = { style: 'currency', currency: 'VND' };
    Object.assign(targetOptions, options);
    return this.toLocaleString(locales, targetOptions);
};

String.prototype.formatLocalDate = function (locales: string = 'vi', options: Intl.DateTimeFormatOptions = {}): string {
    const separate = ' ';
    const date = new Date(this.toString());
    const targetOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    Object.assign(targetOptions, options);
    return date.toLocaleDateString(locales, targetOptions).split(separate).reverse().join(separate);
};
