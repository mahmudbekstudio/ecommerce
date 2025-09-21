import mainConfig from '../configs/main.ts';

class Storage {
    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    get (key: string, defaultValue = null) {
        const result = localStorage.getItem(this.prefix + key);
        return result ? JSON.parse(result) : defaultValue;
    }

    set (key: string, value: any) {
        localStorage.setItem(this.prefix + key, JSON.stringify(value));
    }

    remove (key: string) {
        localStorage.removeItem(this.prefix + key);
    }
}

const storage = new Storage(mainConfig.storagePrefix)

export default storage