import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { authenticationService } from '../../_services/authentication.service';
import { Role } from '../../_lib/types';

export default function Header() {

    const user = authenticationService.currentUserValue;

    const logout = () => {
        authenticationService.logout()
    }

    return (
        <header id="header">
            <div className="container header-container">
                <div></div>
                <nav id="navigation">
                    <ul>
                        {
                            user ? (
                                <>
                                    {
                                        user.role === Role.User ? (
                                            <>
                                                <Link to='/menu'>
                                                    <li>MENU</li>
                                                </Link>
                                                <Link to='/orders'>
                                                    <li>ORDERS</li>
                                                </Link>
                                            </>
                                        ) : 
                                            user.role === Role.Cook ? (
                                                <Link to='/worker/orders'>
                                                    <li>ORDERS</li>
                                                </Link>
                                            ) : null
                                    }
                                    <Link to='#' onClick={logout}>
                                        <li>LOGOUT - {user.name} {user.surname}</li>
                                    </Link>
                                </>
                            ) : (
                                <Link to="/authorize">
                                    <li>ACCOUNT</li>
                                </Link>
                            )
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}
