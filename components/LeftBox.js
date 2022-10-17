import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ListAllusers,  } from './../feature/slice/users';
import { useRouter } from 'next/router'
import Styles from "./styles/layout.module.scss"

function LeftBox() {
    const dispatch = useDispatch()
    const navigate = useRouter()
    const {users, isLoading} = useSelector(state => state.users)
    const {data} = users
    useEffect(() => {
        dispatch(ListAllusers())
    }, [])

    return (
        <div>
            {isLoading ? <p>loading ....</p>
           
        : (
            data?.map(user =>(
               <div className={Styles.users} onClick={()=>navigate.push(`/chat/${user._id}`)}>
               <img src={user?.avater?.filename}/>
                 <li key={user._id}>{user?.username} </li>
               
               </div>
            ))
        )   
        }

        </div>
    )

}

export default LeftBox