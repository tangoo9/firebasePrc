
import React, { useState } from 'react'
import { authService } from '../fbase';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
			<div className="authContainer">
				<FontAwesomeIcon
					icon={faTwitter}
					color={"#04AAFF"}
					size="3x"
					style={{ marginBottom: 30 }}
				/>
				<AuthFoam/>
				<div className="authBtns">
					<button onClick={onSocialClick} name="google" className="authBtn">
						Continue with Google <FontAwesomeIcon icon={faGoogle} />
					</button>
					<button onClick={onSocialClick} name="github" className="authBtn">
						Continue with Github <FontAwesomeIcon icon={faGithub} />
					</button>
				</div>
			</div>
		</>
	)
}

export default Auth