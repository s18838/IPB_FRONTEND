// import { authenticationService } from '../../_services/authentication.service';

export function appendAuthorizationHeader(headers: Headers) {
    // const currentUser = authenticationService.currentUserValue;
    // if (currentUser && currentUser.token) {
    //     headers.append('Authorization',`Bearer ${currentUser.token}`);
    // }
}

export function appendContentTypeHeader(headers: Headers) {
    headers.append('Content-Type','application/json');
}
