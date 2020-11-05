import IconRegistry from './IconRegistry';

const registry = new IconRegistry();

const get = registry.get;
const register = registry.register;
const remove = registry.remove;
const reset = registry.reset;

export {
    get,
    register,
    registry,
    remove,
    reset
};