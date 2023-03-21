import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import setAuthToken from './server/utils/setAuthToken'
import Chat from './pages/Chat';
const App = () => {
	setAuthToken(localStorage.token);
	return (
		<Router>
			<Routes>
				{(localStorage.getItem('token') === null ? false : true) ? (
					<Route path='/' element={<Chat />} />
				) : (
					<Route path='/' element={<Login />} />
				)}
			</Routes>
		</Router>
	);
};

export default App;
