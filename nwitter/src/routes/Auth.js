
import { authService } from '../fbase';
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';


const Auth = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError]= useState('');

	const onChange = (e) =>{
		const {target : {name, value}} = e;
		if(name === 'email'){
			setEmail(value)
		}else if(name === 'password'){
			setPassword(value)
		}
	}

	const onSubmit = async (e) =>{
		e.preventDefault();
		try{
			let data;
			if(newAccount){
				//공식문서, createUserWithEmailAndPassword : https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0
				data = await createUserWithEmailAndPassword(authService, email, password);
			}else{
				data = await signInWithEmailAndPassword(authService, email, password);
			}
			console.log(data)
		}catch(error){
			console.log(error)
			alert(error.message)
			setError(error.message)
		}
		// console.log(email, password)
	}

	const toggleAccount = () =>{
		setNewAccount((prev) =>(!prev))
	}
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
			<form onSubmit={onSubmit}>
				<input name='email' type="email" placeholder='email' onChange={onChange} required></input>
				<input name='password' type="password" placeholder='password' onChange={onChange} required></input>
				<input type="submit" value={newAccount ? "Create Account" : "Log In"}></input>
				{error}
			</form>
			<button onClick={toggleAccount}>{newAccount ? "Log In" : "Create Account"}</button>
			<button onClick={onSocialClick} name="google"> continue with google</button>
			<button onClick={onSocialClick} name="github"> continue with github</button>
		</>
	)
}

export default Auth