import routeItemType from '../types/routeItemType';
import MainController from './controllers/MainController';

const routes: routeItemType[] = [
    {
        url: '',
        method: 'get',
        name: 'main',
        controller: new MainController
    },
];

export default routes;