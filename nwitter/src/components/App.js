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
				// user가 방대해서 사용하는것만 가져오게끔 처리
				setUserObj({
					displayName : user.displayName,
					uid:user.uid,
					// firebase v8에서 사용할 수 있는 부분, v9는 updateProfile이라는 method가 존재하지 않음
					// updateProfile:() =>user.updateProfile(user, {displayName:user.displayName}),
				})
			}else{
				setUserObj(null);
			}
			setInit(true);
			// console.log("유저 : ", user)
		});
	},[])
	
	// 닉네임 변경시 Navigation쪽은 firebase랑 따로 연결 안되있어서 userObj를 전달해주는 식으로 처리
	const refreshUser = () =>{
		const user = authService.currentUser;
		setUserObj({
			displayName : user.displayName,
			uid:user.uid,
			// updateProfile:() =>user.updateProfile(user, {displayName:user.displayName}),
		})
	}

	
	return ( 
		< >
			{init 
			? 
			<AppRouter 
				isLoggedIn={Boolean(userObj)}
				userObj={userObj}
				refreshUser={refreshUser}
				/> 
			: 
			"로딩중.."}
			<footer className="footer">&copy; Nwitter {new Date().getFullYear()}</footer> 
		</> 
	);
}


export default App;
