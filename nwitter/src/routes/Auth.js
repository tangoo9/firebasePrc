import React, { useState } from 'react'

const Auth = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')


	const onChange = (e) =>{
		const {target : {name, value}} = e;
		if(name === 'email'){
			setEmail(value)
		}else if(name === 'password'){
			setPassword(value)
		}
	}

	const onSubmit = (e) =>{
		e.preventDefault();
		console.log(email, password)
	}
	return (
		<>
			<div>Auth</div>
			<form onSubmit={onSubmit}>
				<input name='email' type="text" placeholder='email' onChange={onChange} required></input>
				<input name='password' type="password" placeholder='password' onChange={onChange} required></input>
				<input type="submit" value='login'></input>
			</form>
			<button> continue with google</button>
			<button> continue with github</button>
		</>
	)
}

export default Auth