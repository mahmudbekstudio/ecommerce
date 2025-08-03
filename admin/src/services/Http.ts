import axios from "axios";

class Http {
    private routeObj: {
        url: string,
        method: string,
        data?: any
    };
    private dataObj: any;
    route(route: Object) {
        console.log('route');
        this.routeObj = route;

        return this;
    }

    data(...obj: any[]) {
        console.log('data');
        this.dataObj = this.routeObj.data(...obj);

        return this;
    }

    async send() {
        console.log('send', {
            method: this.routeObj.method,
            url: this.routeObj.url,
            data: this.dataObj
        });
        const result = await axios({
            method: this.routeObj.method,
            url: this.routeObj.url,
            data: this.dataObj
        });

        return result;
    }
}

const http = new Http();

export default http