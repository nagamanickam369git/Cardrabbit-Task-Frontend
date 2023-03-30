import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import axios from 'axios';
import { serviceHistory } from './Features/Redux/CreateSclices'


export default function AllCustomers() {
    const CustomerList = useSelector((state) => state.service.userVerify)
    const dispatch = useDispatch()
    const showdetails = (e) => {

        let id = e.target.innerText
        axios.post('http://localhost:5000/BikeService/entered/', { data: id }).then(async (res) => {
            let data = await res.data
            dispatch(serviceHistory(data))
        })
    }
    return (
        <>
            <div className="container">
                <h4 className='mt-4'> Customers List</h4>
                {CustomerList.length === 0 ? '' : CustomerList.map((val, index) => {
                    return (
                        <div className="mt-2 mx-5" key={index}> {index + 1}.  <Link to={`/${val}`} onClick={showdetails} > {val}</Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
