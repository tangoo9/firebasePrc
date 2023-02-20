import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useState } from 'react'
import { v4 } from 'uuid';
import { dbService, storageService } from '../fbase';

const NweetFactory = ({userObj}) => {

    const [nweet, setNweet ] = useState('');
	const [attachment, setAttachment] = useState('');


    const onSubmit = async (e) =>{
		e.preventDefault();

		let AttachmentUrl ="";
		//첨부파일이 없을때
		if(attachment !== ""){
			// 파일경로참조 만들기 userObj.uid/${이부분은 파일명}
			const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
			//storage 참조경로로 파일 업로드
			const response = await uploadString(fileRef, attachment, "data_url");
			//storage의 파일 url로 다운로드
			AttachmentUrl = await getDownloadURL(response.ref)
			// console.log(AttachmentUrl);
		}
		const nweetPost = {
			text:nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			AttachmentUrl,
		}
		try{
			const docRef = await addDoc(collection(dbService, "nweets"),  nweetPost);
			console.log("Document written with ID: ", docRef.id);
		}catch(error){
			console.log(error)
		}
		
		setNweet("")
		// submiit 할때는 setAttachment 비워주기.
		setAttachment("")
	}

	const onChange = (e) =>{
		const {target : {value} } = e;
		setNweet(value); 
	}

	const onFileChange = (e) =>{
		// console.log(e.target.files)
		const {target: {files}} =e;
		const theFile = files[0];
		// console.log(theFile)
		const reader = new FileReader()
		reader.onloadend = (finishedEvent) =>{
			// console.log(finishedEvent)
			const {currentTarget :{result}} = finishedEvent;
			setAttachment(result)
		}
		reader.readAsDataURL(theFile);
	}
	
	const onRemoveImage =()=>{
		setAttachment("")
	}

    return (
        <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} placeholder="what's on your mind?" maxLength={120}></input>
        <input type="file" accept='image/*' onChange={onFileChange}></input>
        <input type="submit" value="Nweet"></input>
        {attachment &&   (
            <>
                <img src={attachment} alt="none" width="50px" height="50px"/>
                <button onClick={onRemoveImage}>선택 취소</button>
            </>
        )}
    </form>
    )
}

export default NweetFactory