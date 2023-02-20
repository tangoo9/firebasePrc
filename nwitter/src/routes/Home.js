import React, { useEffect, useState } from 'react'

import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { dbService, storageService } from '../fbase';
import Nweet from '../components/Nweet';
import NweetFactory from '../components/NweetFactory';


const Home = ({userObj}) => {
	
	const [nweets, setNweets] = useState([]);

	useEffect(()=>{
		const q = query(
			collection(dbService, "nweets"),
			orderBy("createdAt", "asc")
			);
			onSnapshot(q, (snapshot) => {
			const nweetArray = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
			}));
			setNweets(nweetArray);
			});
	},[])

	return (
		<>
			<div>
				<NweetFactory userObj={userObj}/>
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