import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { ListAllusers, useSelector } from './../feature/slice/users';

function LeftBox() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ListAllusers())
    }, [])

    return (
        <div>

        </div>
    )

}

export default LeftBox