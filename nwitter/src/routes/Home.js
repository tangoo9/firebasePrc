import React, { useEffect, useState } from 'react'

import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { dbService } from '../fbase';

const Home = () => {
	const [nweet, setNweet ] = useState('');
	const [nweets, setNweets] = useState([]);

	const getNweets = async () => {
		const q = query(collection(dbService, "nweets"));
		const querySnapshot = await getDocs(q);

		// console.log('firestoreData', querySnapshot)
		// querySnapshot.forEach((doc) => console.log(doc.data()))

		querySnapshot.forEach((doc) => {
		const nweetObj = {
			...doc.data(),
			id: doc.id,
			}
			// set함수에 함수를 전달할수도 있음, 함수를 전달하면 리액트에서는 이전값에 접근가능, (prev)로 쓰는건데 괄호 지움
			setNweets(prev => [nweetObj, ...prev]);
		});
	};

	useEffect(()=>{
		getNweets()
	},[])



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
			<div>
				{nweets.map(nweet => (
					<div key = {nweet.id}>
						<h4>{nweet.nweet}</h4>
					</div>
				))}
			</div>
		</>
	)
}

export default Home