import React, { useState } from 'react'
import { dbService, storageService } from '../fbase'
import { doc, deleteDoc, updateDoc} from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage';
import moment from 'moment'

moment.locale('ko')

const Nweet = ({nweetObj, isOwner}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newNweet, setNewNweet] =useState(nweetObj.text);

    const nweetDocRef = doc(dbService, "nweets", `${nweetObj.id}`)
    const AttachmentRef = ref(storageService, nweetObj.AttachmentUrl);

    const onDeleteClick = async() =>{
        // alert랑 같네 confirm

        const ok = window.confirm("정말로 게시물을 삭제하시겠습니까?")
        if(ok){
            try{
                await deleteDoc(nweetDocRef)
                if(nweetObj.AttachmentUrl !==""){
                    await deleteObject(AttachmentRef);
                }
            }catch(error){
                console.log(error)
            }
        }
    }
    
    const toggleEditing = () =>{setIsEditing((prev) => !prev)};

    const onSubmit = async(e)=>{
        e.preventDefault();
        console.log(nweetObj, newNweet)

        await updateDoc(nweetDocRef,{text :newNweet})
        setIsEditing(false)
    }

    const onChange = (e)=>{
        const {target : {value}} = e;
        setNewNweet(value)
    }
    return (
        <>
        {isEditing 
            ? (<>
                {isOwner && (
                <><form onSubmit={onSubmit}>
                    <input type="text" 
                            placeholder='"Edit this'
                            value={newNweet} 
                            onChange={onChange}
                            required/>      
                    <input type="submit" value="수정하기"/>
                </form>
                <button onClick={toggleEditing}>Cancel</button>
                </>)}
            </>
            )
            : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.AttachmentUrl && (
                        <img src={nweetObj.AttachmentUrl} alt="" width="50px" height="50px"/>
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>  
                    )}
                </>
            )
        }
        </>
    )
}

export default Nweet