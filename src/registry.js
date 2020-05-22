import IconRegistry from './IconRegistry';

const registry = new IconRegistry();

function get(...args) {
    return registry.get(...args);
}

function register(...args) {
    return registry.register(...args);
}

function remove(...args) {
    return registry.remove(...args);
}

function reset(...args) {
    return registry.reset(...args);
}

export {
    get,
    register,
    remove,
    reset
};

export default registry;