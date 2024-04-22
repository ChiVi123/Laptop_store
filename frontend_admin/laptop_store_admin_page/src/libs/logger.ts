const logger = {
    info: console.log.bind(null, '\x1b[36m%s\x1b[0m', ' ✓'),
    error: console.log.bind(null, '\x1b[31m%s\x1b[0m', ' x'),
    coffee: console.log.bind(null, '\u{2615}'),
    anger: console.log.bind(null, '\u{1f4a2}'),
};

export default logger;
