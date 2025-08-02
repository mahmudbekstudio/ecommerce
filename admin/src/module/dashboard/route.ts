import Main from "./main/Main.vue";
export default {
    path: 'dashboard',
    name: 'dashboard',
    children: [
        {
            path: 'main',
            name: 'main',
            component: Main,
        }
    ]
};