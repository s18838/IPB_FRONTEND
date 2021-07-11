import Config from '../../config.json';
import { handleResponse } from '../../_lib/_utils/handle-response';

export function get<T>(url: string): Promise<T> {
    return fetch(`${Config.HOST}/api/${url}`)
        .then(handleResponse)
        .then(response => response.text().then(text => JSON.parse(text) as T));
}

export function post<T>(url: string, options: RequestInit): Promise<T> {
    return fetch(`${Config.HOST}/api/${url}`, options)
        .then(handleResponse)
        .then(response => response.text().then(text => JSON.parse(text) as T));
}
