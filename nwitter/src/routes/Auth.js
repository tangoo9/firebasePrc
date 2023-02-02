
import { authService } from '../fbase';
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [newAccount, setNewAccount] = useState(true);

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
		}
		// console.log(email, password)
	}
	return (
		<>
			<div>Auth</div>
			<form onSubmit={onSubmit}>
				<input name='email' type="email" placeholder='email' onChange={onChange} required></input>
				<input name='password' type="password" placeholder='password' onChange={onChange} required></input>
				<input type="submit" value={newAccount ? "Create Account" : "Log In"}></input>
			</form>
			<button> continue with google</button>
			<button> continue with github</button>
		</>
	)
}

export default Auth