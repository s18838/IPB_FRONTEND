import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { Role } from '../../_lib/types';

import { authenticationService } from '../../_services/authentication.service'

interface PrivateRouteProp extends RouteProps {
    roles?: Role[]
}

export const PrivateRoute = ({ component, roles, ...rest }: PrivateRouteProp) => {
    const currentUser = authenticationService.currentUserValue;

    if (!currentUser) {
        return <Redirect to={{ pathname: '/authorize', state: { from: rest.location } }} />;
    }

    if (roles && roles.indexOf(currentUser.role) === -1) {
        return <Redirect to={{ pathname: '/'}} />;
    }

    return <Route {...rest} component={component}/>;
}
