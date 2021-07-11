import { authenticationService } from '../../_services/authentication.service';

export function handleResponse(response: Response): Promise<Response> {
    if (!response.ok) {
        if ([401, 403].indexOf(response.status) !== -1) {
            authenticationService.logout();
            window.location.reload();
        }
        const error = response.statusText;
        return Promise.reject(error);
    }
    return Promise.resolve(response);
}
