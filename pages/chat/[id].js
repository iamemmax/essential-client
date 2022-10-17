import React, { useEffect, useState } from 'react'
import Styles from "../../components/styles/layout.module.scss"
import { GrAttachment } from "react-icons/gr";
import { FiMic } from "react-icons/fi";
import { AiOutlineSend } from "react-icons/ai";
import Layouts from '../../components/Layouts';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { ListSinglchat } from '../../feature/slice/listchat';
import { createChat } from '../../feature/slice/chatSlice';
import axios from 'axios';


function SingleChat() {
    const router = useRouter()
    console.log(router.query.id)
    const dispatch = useDispatch()
    const id = router.query.id
   const [input, setInput] = useState({
    messages:"",
    receiverId:id
   })
// const [messages, setMessages] = useState("")
// const [receiverId, setReceiverId] = useState("")

    const {data} = useSelector(state => state?.auth?.user)
    const {userToken} = data

    useEffect(() => {
        dispatch(ListSinglchat(id))
    }, [id])
    
    const {isLoading, chat:{chat}} = useSelector(state => state.chat)

  const handleTyping = (e) =>{
    // setMessages(e.target.value)
    // setReceiverId(id)
    setInput({...input, [e.target.name]:e.target.value})
}
const   {
    messages,
    receiverId

} = input
console.log(receiverId)
const handleSubmit = async(e) =>{
    e.preventDefault()
   

 var data = JSON.stringify({
  "recieverId": receiverId,
  "messages": messages
});

let config = {
  method: 'post',
  url: 'essential-dating-api.herokuapp.com/api/chat/create-chat',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFkZHJlc3MiOnsiY291bnRyeSI6Ik5pZ2VyaWEiLCJzdGF0ZSI6IkxhZ29zIiwiY2l0eSI6ImlrZWphIn0sImF2YXRlciI6eyJpbWdfaWQiOiJlc3NlbnRpYWwiLCJmaWxlbmFtZSI6Imh0dHBzOi8vY2RuLWljb25zLXBuZy5mbGF0aWNvbi5jb20vMTI4LzE0OS8xNDkwNzEucG5nIiwiZmlsZXNpemUiOiIxMDIzIn0sIl9pZCI6IjYzNDY5MmRjZDY2OTRjNDJmMGQ0MGY1MiIsImZpcnN0bmFtZSI6ImVtbWF4IiwibGFzdG5hbWUiOiJwcmluY2UiLCJ1c2VybmFtZSI6ImVtbWFrbzA2NSIsImVtYWlsIjoiaWFtNGVtbWF4QGdtYWlsLmNvbSIsImdlbmRlciI6Im1hbGUiLCJwaG9uZSI6IjkwNjkwMDM0MjUiLCJwYXNzd29yZCI6IiQyYSQxMCQxTFl4SHVuRnIzZnRMdXlzNDY4bkd1cXhpemRFRDBmTk1uN1owZ0d1dkRBa0lja3FPRGJUVyIsInRva2VuIjoiIiwidmVyaWZpZWQiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjItMTAtMTJUMDk6NTQ6MjEuODUxWiIsImZvbGxvd2luZyI6W10sImZvbGxvdyI6W3sidXNlcklkIjoiNjM0MTllYThkMGE5MzQzNWFlMmYxYjkxIiwiX2lkIjoiNjM0NmI1NzE5NjY5MjFhZGM4MDI1MTVkIn1dLCJfX3YiOjB9LCJpYXQiOjE2NjYwMTg3MzAsImV4cCI6MTY2NjA2MTkzMH0.fpHWBrPND7oUZBpsLcdX1uB066P_RjljK7dJ4Y1HHQc', 
    'Content-Type': 'application/json'
  },
  data : data
};



axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

}
    // dispatch(createChat(input))

  
    return (

        <Layouts>
            <div className={Styles.chatWrapper}>
                <div className={Styles.chatBox}>
                  {isLoading ? <p>loading ...</p> : (
                    chat?.map(x =>(
                        <p key={x?._id}>{x?.messages}</p>
                    ))
                  )}
                </div>
                <div className={Styles.chatInput}>
                    <div>
                        <GrAttachment />
                    </div>
                    <form onSubmit={handleSubmit} method="post" >
                        <input type="text" name='messages' value={messages} onChange={handleTyping} placeholder='Start typing your messages' />
                        <input type="text" name="receiverId" onChange={handleTyping} value={receiverId}  />
                        <button type="submit"><AiOutlineSend className={Styles.sendIcon} /></button>
                    </form>

                    <div>
                        <FiMic />
                    </div>
                </div>

            </div>

        </Layouts>

    )
}

export default SingleChat