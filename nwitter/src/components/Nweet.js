import React, { useState } from 'react'
import { dbService } from '../fbase'
import { doc, deleteDoc, updateDoc} from 'firebase/firestore'


const Nweet = ({nweetObj, isOwner}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newNweet, setNewNweet] =useState(nweetObj.text);

    const nweetDocRef = doc(dbService, "nweets", `${nweetObj.id}`)

    const onDeleteClick = async() =>{
        // alert랑 같네 confirm

        const ok = window.confirm("정말로 게시물을 삭제하시겠습니까?")
        if(ok){
            await deleteDoc(nweetDocRef)
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
                <form onSubmit={onSubmit}>
                    <input type="text" 
                            placeholder='"Edit this'
                            value={newNweet} 
                            onChange={onChange}
                            required/>      
                    <input type="submit" value="수정하기"/>
                </form>
                <button onClick={toggleEditing}>Cancel</button> 
            </>
            )
            : (
                <>
                    <h4>{nweetObj.text}</h4>
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