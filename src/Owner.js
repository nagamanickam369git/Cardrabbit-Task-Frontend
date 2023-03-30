import React from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { currentService } from './Features/Redux/CreateSclices'
export default function Owner() {
    const newServices = useSelector((state) => state.service.currentService)
    const ready = useSelector((state) => state.service.readyToDelivery)
    // const complete = useSelector((state) => state.service.serviceComplete)
    const dispatch = useDispatch()

    const serviceStatus = (e) => {
        let Status = e.target.value
        if (Status === "complete" || Status === "ready") {
            let element = e.target.parentElement
            let lable = element.getElementsByTagName('label')[0]
            let email = lable.innerText
            console.log('status', Status, email);

            axios.post('http://localhost:5000/BikeService/updateStatus/', { Status, email }).then(async (res) => {
                let data = await res.data
                console.log('status', data);
                dispatch(currentService(data))

            })
        }


    }



    return (
        <>


            <div className="container">
                <div className="row ">
                    <div>

                        <button className='btn btn-info float-end me-5 mt-3 mb-3'><Link to="/"  >Logout</Link></button>
                        <button className='btn btn-info float-end me-5 mt-3 mb-3'><Link to="/AllCustomers"  >All Customers</Link></button>
                    </div>


                    <div className="col-5 card p-2">
                        <h4>New Services</h4>
                        {newServices.length === 0 ? <h4>Not Yet Book</h4> : newServices.map((val, index) => {

                            return (
                                <>
                                    <div key={index} className="card mt-2 border-info p-4 " >
                                        <h6>Customer  Name :</h6>
                                        <label id={val._id}>{val.email}</label>
                                        <h6 className='mt-2'>Services Booked on {val.data.date}</h6>
                                        <h6>Services :</h6>
                                        <span className='mx-3'>{val.data.general}</span>
                                        <span className='mx-3'>{val.data.oil}</span>
                                        <span className='mx-3'>{val.data.water}</span>
                                        <h6 className='mt-2'>Status :</h6>
                                        <select className='d-flex float-end w-100 ' onChange={serviceStatus} >
                                            <option value="Booked">Booked</option>
                                            <option value="ready">Ready</option>
                                        </select>

                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <div className="col-5 mx-3 card p-2">
                        <h4>Ready to Delivery</h4>
                        {ready.length === 0 ? '' : ready.map((val, index) => {
                            return (
                                <>
                                    <div key={index} className="card mt-2 border-info p-4 " >
                                        <h6>Customer  Name :</h6>
                                        <label id={val._id}>{val.email}</label>
                                        <h6 className='mt-2'>Services Booked on {val.data.date}</h6>
                                        <h6>Services :</h6>
                                        <span className='mx-3'>{val.data.general}</span>
                                        <span className='mx-3'>{val.data.oil}</span>
                                        <span className='mx-3'>{val.data.water}</span>
                                        <h6 className='mt-2'>Status :</h6>
                                        <select className='d-flex float-end w-100 ' onChange={serviceStatus} >
                                            <option value="ready">Ready</option>
                                            <option value="complete">complete</option>
                                        </select>

                                    </div>
                                </>
                            )
                        })}


                    </div>





                </div>
            </div>

        </>
    )
}
