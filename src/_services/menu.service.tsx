import { Dish } from '../_lib/types';
import { get } from '../_lib/_utils/api';


export const menuService = {
    getDish
};

function getDish(): Promise<Dish[]> {
    return get<Dish[]>('menu')
};
