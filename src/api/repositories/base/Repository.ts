import { DbContext } from './DbContext';

export function Repository(model) {
    return (target, propertyKey: string): void => {
        target[propertyKey] = new DbContext(model, target.transaction || null);
    };
}