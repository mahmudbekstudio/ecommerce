import {
    createRouter,
    createWebHistory,
    NavigationGuardNext,
    RouteLocationNormalized,
    RouteLocationNormalizedLoaded
} from 'vue-router';
import routes from '../module/route';

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {
    console.log('router.beforeEach', to.name, from.name);
    next();
});

export default router