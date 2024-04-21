export const logInfo = console.log.bind(null, '\x1b[36m%s\x1b[0m', ' ✓');
export const logError = console.log.bind(null, '\x1b[31m%s\x1b[0m', ' x');
export const logCoffee = console.log.bind(null, '\u{2615}');
export const logAnger = console.log.bind(null, '\u{1f4a2}');
