import React, { useState } from 'react'
import { dbService, storageService } from '../fbase'
import { doc, deleteDoc, updateDoc} from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
        {isEditing 
            ? (<>
                {isOwner && (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input 
                                className="formInput"
                                type="text" 
                                placeholder='"Edit this'
                                value={newNweet} 
                                onChange={onChange}
                                required
                                autoFocus/>      
                        <input type="submit" value="수정하기" className="formBtn"/>
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                </>)}
            </>
            )
            : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.AttachmentUrl && <img src={nweetObj.AttachmentUrl} alt="" />}
                    {isOwner && (
                        <div class="nweet__actions">
                            <button onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></button>
                            <button onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt} /></button>
                        </div>  
                    )}
                </>
            )
        }
        </div>
    )
}

export default Nweet