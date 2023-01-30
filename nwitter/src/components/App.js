import { useState } from "react";
import AppRouter from "./Router";
import {authService} from '../fbase';
  

function App() {
	const authtest = authService.currentUser
	console.log(authtest)
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
	return ( 
		< >
			<AppRouter isLoggedIn={isLoggedIn}/>
			<footer>&copy; Nwitter {new Date().getFullYear()}</footer>
		</>
	);
}

export default App;
