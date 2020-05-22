
export default class IconRegistry {

    constructor(icons = {}) {
        this.icons = icons;
    }

    validate(value) {
        if(typeof value === 'object') {
            return value;
        }

        throw new Error(
            `Invalid icon type \`${typeof value}\`. Should be type \`object\`.`
        );
    }

    get(name) {
        if(this.icons[name]) {
            return this.icons[name];
        }

        throw new Error(`The icon with the name "${name}" has not been registered yet!`);
    }

    register(name, value) {
        if(typeof name === 'object') {
            Object.entries(name).forEach(([name, module]) => {
                this.register(name, module);
            });

            return this;
        }

        this.icons[name] = this.validate(value);

        return this;
    }

    remove(name) {
        delete this.icons[name];

        return this;
    }

    reset() {
        this.icons = {};
    }

}