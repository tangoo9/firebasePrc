
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { authService, dbService } from '../fbase'

const Profile = ({userObj}) => {
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	const history = useHistory();
	const onLogOut = () =>{
		authService.signOut();
		history.push("/")
	}

	const getMyNweets = async () => {
			const q = query(
			collection(dbService, "nweets"),
			where("creatorId", "==", userObj.uid),
			// orderBy("createAt","desc")
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
			console.log(doc.id, " => ", doc.data()); 
			});
		};

	useEffect(()=>{
		getMyNweets();
	},[])

	const onSubmit = async(e) =>{
		e.preventDefault();
		if(userObj.displayName !== newDisplayName){
			// console.log(updateProfile)
			await updateProfile(userObj, {displayName : newDisplayName})
		}
	}
	const onChange = (e)=>{
		const {target:{value}} = e;
		setNewDisplayName(value)
	}

	return (
		<>
		<form onSubmit={onSubmit}>
			<input 
				type="text" 
				placeholder='Display name'
				onChange={onChange}
				value={newDisplayName}
				></input>
			<input type="submit" value="Update Profile"></input>
		</form>
			<button onClick={onLogOut}>Log out</button>
		</>
	)
}

export default Profile