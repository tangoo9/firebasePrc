
import { authService } from '../fbase';
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import AuthFoam from '../components/AuthFoam';


const Auth = () => {

	const onSocialClick = async (e) =>{
		console.log(e.target.name);
		const {target : {name}} = e
		let provider;
		try{
			if(name === 'google'){
				provider = new GoogleAuthProvider();
			}else if(name === 'github'){
				provider = new GithubAuthProvider();
			}
			const data = await signInWithPopup(authService, provider);
			console.log(data)
		}catch(error){
			console.log('에러 : ', error)	
		}

	}

	return (
		<>
			<div>Auth</div>
			<AuthFoam/>
			<button onClick={onSocialClick} name="google"> continue with google</button>
			<button onClick={onSocialClick} name="github"> continue with github</button>
		</>
	)
}

export default Auth