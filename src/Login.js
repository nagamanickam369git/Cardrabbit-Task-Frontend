import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { userspages, userVerify, serviceHistory, currentService } from './Features/Redux/CreateSclices'
function Login() {

  const userVerifyData = useSelector((state) => state.service.userVerify)
  const dispatch = useDispatch()
  const gotourl = useNavigate()
  const [owner, setowner] = useState({});
  const [getMail, setgetMail] = useState('');
  const [getMobno, setgetMobno] = useState('');
  const [dumy] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/BikeService/owner/').then(async (req) => {
      let ownerData = await req.data
      setowner(ownerData)
    })
    refresh()
  }, [dumy])

  const refresh = () => {
    axios.get('http://localhost:5000/BikeService/customerList/').then(async (req) => {
      let customerList = await req.data
      dispatch(userVerify(customerList))
    })
  }

  const login = () => {
    if (getMail !== '' && getMobno !== '') {
      var newobj = {
        getMail: getMail,
        getMobno: getMobno
      }
      let id = getMail
      if ((getMail === owner.email && getMobno === owner.mobno) || (getMail === 'owner@gmail.com' && getMobno === '1234567890')) {
        axios.post('http://localhost:5000/BikeService/currentServices/').then(async (res) => {
          let currestServices = await res.data
          dispatch(currentService(currestServices))
        })
        gotourl("owner")
      }
      else if (userVerifyData.includes(newobj.getMail)) {
        axios.post('http://localhost:5000/BikeService/entered/', { data: id }).then((res) => {
          dispatch(serviceHistory(res.data))
        })
        gotourl(`${newobj.getMail}`)
      }
      else alert('Please Register Now ☹')
    }
    else alert('Please Enter details')
  }

  const register = async () => {
    if (getMail !== '' && getMobno !== '') {
      var newobj = {
        getMail: getMail,
        getMobno: getMobno
      }
      await axios.get('http://localhost:5000/BikeService/newcus/', { params: newobj }).then(res => {
        dispatch(userspages(res.data))
      })
      refresh()
      gotourl(`registersuccess`)
    }
    else alert('Please Enter details')
  }
  return (
    <>
      <div className="container" >
        <center>
          <h3 className="mt-5"> John Bike Service</h3>
          <div className="border w-25 bg-info" >
            <label htmlFor="email" className="mt-3 text-light">Enter Your Email </label><br />
            <input className="mx-3" type="email" name="email" id="" value={getMail} onInput={e => setgetMail(e.target.value)} /><br />
            <label htmlFor="MobileNumber" className="mt-3 text-light">Enter Mobile No </label><br />
            <input className="mx-3 mt-3" type="number" name="MobileNumber" id="" value={getMobno} onInput={e => setgetMobno(e.target.value)} required /><br /><br />
            <button className="btn btn-primary mb-5" onClick={register}>Register</button>
            <button className="btn btn-primary mb-5 mx-2" onClick={login}>Login</button>
          </div>
        </center>
        <center>
          <div>Frotend</div>
          <span>      Owner email : owner@gmail.com  </span><br />
          <span>      Owner MobileNumber :1234567890   </span>

          <div>Backend</div>
          <span>      Owner email : {owner.email}    </span><br />
          <span>      Owner MobileNumber : {owner.mobno}    </span>

        </center>
      </div>
    </>
  );
}
export default Login;
