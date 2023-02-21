
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { authService, dbService } from '../fbase'

const Profile = ({userObj, refreshUser}) => {
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
			orderBy("createdAt","desc")
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
			console.log(doc.id, " => ", doc.data()); 
			});
		};

	useEffect(()=>{
		getMyNweets();
	})

	const onSubmit = async(e) =>{
		e.preventDefault();
		if(userObj.displayName !== newDisplayName){
			// console.log(updateProfile)
			await updateProfile(authService.currentUser, {displayName : newDisplayName})
		}
		refreshUser()
	}
	const onChange = (e)=>{
		const {target:{value}} = e;
		setNewDisplayName(value)
	}

	return (
		<div className="container" >
			<form onSubmit={onSubmit} className="profileForm">
				<input 
					type="text" 
					placeholder='Display name'
					onChange={onChange}
					value={newDisplayName}
					autoFocus
					></input>
				<input           
					type="submit"
					value="Update Profile"
					className="formBtn"
					style={{
						marginTop: 10,
					}}></input>
			</form>
			<button onClick={onLogOut} className="formBtn cancelBtn logOut">Log out</button>
		</div>
	)
}

export default Profile