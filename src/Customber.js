import { React, useState } from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { serviceHistory } from './Features/Redux/CreateSclices'
import axios from 'axios';
export default function Customber(props) {
   
    const lastService = useSelector((state) => state.service.serviceHistory)
    const dispatch = useDispatch()
    const [general, setgeneral] = useState('')
    const [oil, setoil] = useState('')
    const [water, setwater] = useState('')
    const [date, setdate] = useState('')
    let id = props.id
    const BookService = () => {
        const obj = {
            general: general,
            oil: oil,
            water: water,
            date: date
        }
       
        if ((general || oil || water) && date) {
            axios.post('http://localhost:5000/BikeService/previesbooking', { data: obj, id: id })
                .then(res => dispatch(serviceHistory(res.data)))
                .catch(err => console.log('error', err))
        }
        else alert('Please Select Your Services and Services Date')
    }
    const logout = () => dispatch(serviceHistory(''))
    return (
        <>
            <div className="container border p-3 bg-info ">
                <center id={id}>
                    <button className='btn btn-light d-flex float-end '><Link to="/" onClick={logout} >Logout</Link></button>
                    <div > welcome to  <h4> {id} </h4>  </div>
                    <br /><br />
                    <h5> Book Services </h5>
                    <br /><br />
                    <label htmlFor="">General Services check-up : </label>
                    <input type="checkbox" value="General Service" onChange={e => general === '' ? setgeneral(e.target.value) : setgeneral('')} />
                    <label htmlFor="" className="mx-2">Oil change : </label>
                    <input type="checkbox" className="mx-2" value="Oil Service" onChange={e => oil === '' ? setoil(e.target.value) : setoil('')} />
                    <label htmlFor="">Water service : </label>
                    <input type="checkbox" className="mx-2" value="Water Service" onChange={e => water === '' ? setwater(e.target.value) : setwater('')} />
                    <br /><br />
                    <label htmlFor="">Service booking Date:</label>
                    <input type="date" name="" id="" onChange={e => setdate(e.target.value)} /><br /><br />
                    <button className='btn btn-primary' onClick={BookService} >Book now</button>
                </center>
            </div>

            <div id='dumy' className="container p-3  ">
                <div className="row">
                    {lastService.length === 0 ? <h4>No Services</h4> : lastService.map((val, index) => {
                        return (
                            <>
                                <div key={index} className="card mt-2 w-25 bg-warning p-4 mx-4 my-2 " >
                                    <h6>Services Booked on {val.date}</h6>
                                    <span className='mx-3'>{val.general}</span>
                                    <span className='mx-3'>{val.oil}</span>
                                    <span className='mx-3'>{val.water}</span>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
