
import io from "socket.io-client";
import React, { useEffect, useState } from 'react'

import Layouts from "../components/Layouts";

export default function Home() {
  // const { user } = useSelector(state => state?.auth)
  // console.log(user?.data?.user?._id)

  const Endpoint = "http://localhost:3001"
  useEffect(() => {
    const socket = io(Endpoint)
    // socket.emit("setup", user?.data?.user?._id)
  }, [])


  return (
    <div className="chat-container">
      <Layouts />


    </div >
  )
}
