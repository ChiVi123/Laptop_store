// https://dev.to/igorovic/simplest-way-to-persist-redux-state-to-localstorage-e67

import logger from '../logger';

const KEY = 'redux-persist';
export function loadState() {
    try {
        const serializedState = localStorage.getItem(KEY);
        if (!serializedState) {
            return undefined;
        }
        logger.info('loadState');

        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
}
export function saveState<State extends object>(state: State, blacklist: (keyof State)[]) {
    const newState = { ...state };
    try {
        blacklist.forEach((item) => {
            delete newState[item];
        });
        const serializedState = JSON.stringify(newState);
        localStorage.setItem(KEY, serializedState);
    } catch (error) {}
}
