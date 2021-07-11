import { BehaviorSubject } from 'rxjs';
import { User } from '../_lib/types';
import { post } from '../_lib/_utils/api';
import { appendAuthorizationHeader, appendContentTypeHeader } from '../_lib/_utils/append-header';

const currentUserSubject = new BehaviorSubject<User | null>(
    localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')!)
);

export const authenticationService = {
    register,
    authorize,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function register(name: string, surname: string, email: string, password: string): Promise<{}> {
    const headers: Headers  = new Headers();
    appendContentTypeHeader(headers);
    appendAuthorizationHeader(headers);
    const requestOptions: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify({ name, surname, email, password })
    };
    return post<{}>('accounts/create', requestOptions)
};

function authorize(email: string, password: string): Promise<User> {
    const headers: Headers  = new Headers();
    appendContentTypeHeader(headers);
    appendAuthorizationHeader(headers);
    const requestOptions: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password })
    };
    return post<User>('accounts/authorize', requestOptions)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user))
            currentUserSubject.next(user)
            return user
        });
};

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
};
