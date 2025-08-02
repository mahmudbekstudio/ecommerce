import { reactive } from 'vue';

class App {
    private variables = reactive({});

    setVariable(name: string, value: any) {
        //
    }

    getVariable(name: string) {
        //
    }

    get layout() {
        return this.variables.layout;
    }

    set layout(value: string) {
        this.variables.layout = value;
    }
}

const app = new App();

export default app;