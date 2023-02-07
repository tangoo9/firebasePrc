import React, { useState } from 'react'

import { addDoc, collection } from 'firebase/firestore';
import { dbService } from '../fbase';

const Home = () => {
	const [nweet, setNweet ] = useState('');
	
	const onSubmit = async (e) =>{
		e.preventDefault();
		try{
			const docRef = await addDoc(collection(dbService, "nweets"), {
				nweet,
				createdAt: Date.now(),
				});
			console.log("Document written with ID: ", docRef.id);
		}catch(error){
			console.log(error)
		}
		setNweet("")
	}
	const onChange = (e) =>{
		const {target : {value} } = e;
		setNweet(value); 
	}
	return (
		<>
			<form onSubmit={onSubmit}>
				<input type="text" onChange={onChange} placeholder="what's on your mind?" maxLength={120}></input>
				<input type="submit" value="Nweet"></input>
			</form>
		</>
	)
}

export default Home