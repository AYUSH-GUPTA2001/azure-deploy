import {BrowserRouter , Routes, Router , Route} from "react-router-dom"
import { createHashHistory } from '@remix-run/router';


import Home from "../components/home/Home"

import DashboardClient from "../components/investor/Dashboard"
import DashboardAdvisor from "../components/advisor/Dashboard"
import Advisor from "../components/advisor/Advisor"
import Investor from "../components/investor/Investor"
import LandingPage from "../components/LandingPage/LandingPage"


function MyRouter(){
    const history = createHashHistory();
    return (
        <div>
           <BrowserRouter history={history}>
           <Routes>
              <Route exact element={<LandingPage />} path="/" />
              
              <Route exact element={<Advisor/>} path="/advisor"/>
              <Route exact element={<Investor/>} path="/investor"/>
              <Route exact element={<DashboardAdvisor/>} path="advisor/dashboard/:advisorId"/>
              
              <Route exact element={<DashboardClient/>} path="investor/dashboard/:clientId"/>
              
              
           </Routes>
           </BrowserRouter>
        </div>
    )
}

export default MyRouter
