import React, { useEffect, useState } from 'react'

import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { dbService } from '../fbase';
import Nweet from '../components/Nweet';

const Home = ({userObj}) => {
	
	const [nweet, setNweet ] = useState('');
	const [nweets, setNweets] = useState([]);

	useEffect(()=>{
		const q = query(
			collection(dbService, "nweets"),
			orderBy("createdAt", "desc")
			);
			onSnapshot(q, (snapshot) => {
			const nweetArray = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
			}));
			setNweets(nweetArray);
			});
	},[])


	const onSubmit = async (e) =>{
		e.preventDefault();
		try{
			const docRef = await addDoc(collection(dbService, "nweets"), {
				text:nweet,
				createdAt: Date.now(),
				creatorId: userObj.uid,
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
			<div>
				{nweets.map(nweet => (
					<Nweet 
						key={nweet.id} 
						nweetObj={nweet} 
						isOwner={nweet.creatorId ===userObj.uid }/>
				))} 
			</div>
		</>
	)
}

export default Home