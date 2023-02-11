import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Recorder from './pages/Recorder';
import { LoginContext } from './contexts/LoginContext';
const App = () => {
	const [username,setUsername] = useState('');
	const [isAuth, setIsAuth] = useState(false);
	return (
		<LoginContext.Provider value={{ isAuth }}>
			<Router>
				<Routes>
					{isAuth ? (
						<Route path='/' element={<Recorder />} />
					) : (
						<Route path='/' element={<Login />} />
					)}
				</Routes>
			</Router>
		</LoginContext.Provider>
	);
};

export default App;
