import React from 'react'
import { BrowserRouter } from "react-router-dom";
import Customber from "./Customber";
import Owner from "./Owner";
import Login from './Login';
import AllCustomers from './AllCustomers';
import PageNotFount from './PageNotFount';
import RegisterSuccess from './RegisterSuccess';
import { Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux'

export default
  function App() {
  const userVerify = useSelector((state) => state.service.userVerify)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route key={'o'} path="/" element={<Login />} ></Route>
          <Route key={'oo'} path="/AllCustomers" element={<AllCustomers />} ></Route>
          <Route key={'ooo'} path="/owner" element={<Owner />}></Route>
          <Route key={'oooo'} path="/cus" element={<Customber />}></Route>
          <Route key={'ooooo'} path="/registersuccess" element={<RegisterSuccess />}></Route>
          <Route key={'oooooo'} path="*" element={<PageNotFount />}></Route>
          {userVerify.length === 0 ? "" : userVerify.map((val, index) => {
            return <Route key={index} path={`/${val}`} element={<Customber id={val} />}></Route>
          })}
        </Routes>
      </BrowserRouter>

    </div >
  )
}

