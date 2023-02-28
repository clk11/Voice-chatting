import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
// import AppContext from './contexts/AppContext';
import setAuthToken from './server/utils/setAuthToken'
import Chat from './pages/Chat';
const App = () => {
	// const [func,setFunc] = useState(null);
	setAuthToken(localStorage.token);
	return (
		// <AppContext.Provider value={{func,setFunc}}>
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
