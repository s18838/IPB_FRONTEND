import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import { PrivateRoute } from './containers/private-route/PrivateRoute';
import SignIn from './components/account/SignIn';
import { Role } from './_lib/types';
import Menu from './containers/menu/Menu';
import Header from './components/header/Header';
import WorkerOrders from './containers/orders/WorkerOrders';
import Orders from './containers/orders/Orders';
import Home from './containers/home/Home';

export default function App() {
	return (
		<Router>
			<Switch>
				<Header />
			</Switch>
			<Switch>
				<Route path="/authorize">
					<SignIn />
				</Route>
				<PrivateRoute path="/worker/orders" roles={[Role.Cook]} component={WorkerOrders} />
				<PrivateRoute path="/orders" roles={[Role.User]} component={Orders} />
				<PrivateRoute path="/menu" roles={[Role.User]} component={Menu} />
				<PrivateRoute path="/" roles={[Role.User, Role.Cook]} component={Home} />
			</Switch>
		</Router>
	);
}
