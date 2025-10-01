import axios from "axios";
type RouteObject = {
    url: string,
    method: string,
    data?: any
};

class Http {
    private routeObj: RouteObject;
    private dataObj: any;
    route(route: RouteObject) {
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