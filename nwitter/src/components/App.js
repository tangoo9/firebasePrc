import { useEffect, useState } from "react";
import AppRouter from "./Router";
import {authService} from '../fbase';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
	// const authtest = authService.currentUser
	// console.log(authtest)

	const [init, setInit] = useState(false);
	
	const [userObj, setUserObj] = useState(null);


	useEffect(()=>{
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if(user){
				setUserObj(user)
			}else{
				alert("로그인 에러!!")
			}
			setInit(true);
			// console.log("유저 : ", user)
		});
	},[])

	
	return ( 
		< >
			{init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "로딩중.."}
			<footer>&copy; Nwitter {new Date().getFullYear()}</footer> 
		</> 
	);
}


export default App;
