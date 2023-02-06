import { useEffect, useState } from "react";
import AppRouter from "./Router";
import {authService} from '../fbase';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
	// const authtest = authService.currentUser
	// console.log(authtest)

	const [init, setInit] = useState(false);
	
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(()=>{
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if(user){
				setIsLoggedIn(true);
			}else{
				setIsLoggedIn(false);
			}
			setInit(true);
			console.log("유저 : ", user)
		});
	},[])

	
	return ( 
		< >
			{init ? <AppRouter isLoggedIn={isLoggedIn}/> : "로딩중.."}
			<footer>&copy; Nwitter {new Date().getFullYear()}</footer> 
		</> 
	);
}


export default App;
