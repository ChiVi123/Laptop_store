import { formatFullUrl, formatPath } from './format.path';

export default class PathHandler {
    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    public getPath(first: any, ...paths: any[]) {
        const firstVariable = typeof first === 'string' ? formatPath(first) : first;
        const pathJoined = [firstVariable, ...paths].join('/');
        return formatFullUrl(this.prefix, pathJoined);
    }
}
