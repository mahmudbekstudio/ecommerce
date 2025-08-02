import NotFound from "./not-found/NotFound.vue";
export default {
    path: 'error',
    name: 'error',
    children: [
        {
            path: 'not-found',
            name: 'not-found',
            component: NotFound,
        }
    ]
};