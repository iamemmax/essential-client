import React, { useState } from 'react'
import Link from "next/link"
import { Typography, Box, TextField, Grid, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { LoginUser } from "../../feature/slice/userSlice"
import router from "next/router"

function Register() {
    const [input, setInput] = useState({ email: "", password: "" })
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const { email, password } = input

    const handleSubmit = async (e) => {
        dispatch(LoginUser(input))


    }
    const {user, isSuccess} = useSelector(state => state.auth)
    if(isSuccess){
        router.push("/")
    }
    return (
        <div style={style.container}>
            <Typography variant="h6" component="h2">Signup now</Typography>

            {/* <form onSubmit={handleSubmit} method="post"> */}
            <TextField onChange={handleChange} id="outlined-basic" size="small" name="email" label="email" value={email} variant="outlined" />

            <br />
            <TextField onChange={handleChange} value={password} id="outlined-basic" size="small" name="password" label={"password"} variant="outlined" />

            <br />
            <Button fullWidth onClick={handleSubmit} color="success" variant="contained">login</Button>

            {/* </form>            */}
        </div>
    )
}
const style = {
    container: {
        width: "450px",
        margin: "0px auto",
        padding: "10px",
        marginTop: "2rem"
    }
}

export default Register

