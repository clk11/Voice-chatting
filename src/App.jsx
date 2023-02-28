import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
// import AppContext from './contexts/AppContext';
import setAuthToken from './server/utils/setAuthToken'
import Chat from './pages/Chat';
const App = () => {
	// const [username,setUsername] = useState('');
	// const [room,setRoom] = useState('');
	setAuthToken(localStorage.token);
	return (
		// <AppContext.Provider value={{user}}>
		<Router>
			<Routes>
				{(localStorage.getItem('token') === null ? false : true) ? (
					<Route path='/' element={<Chat />} />
				) : (
					<Route path='/' element={<Login />} />
				)}
			</Routes>
		</Router>
		// </AppContext.Provider>
	);
};

export default App;
