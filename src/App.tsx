import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'sweetalert2/src/sweetalert2.scss'
import './app.scss';
import ErrorPage from "./Component/Error-page/Error-page";
import { Outlet, Routes } from "react-router-dom";
import Home from './Component/Home/Home';
import Login from './Component/Login/Login/Login';
import Register from './Component/Login/Register/Register';
import FilmDetail from './Component/FilmDetail/FilmDetail';
import SystemCinema from './Component/SystemCinema/SystemCinema';
import InfoSysCinema from './Component/SystemCinema/InfoSysCinema';
import BookingTicket from './Component/Booking-Ticket/BookingTicket';
import SeatPlan from './Component/SeatPlan/SeatPlan';
import Payment from './Component/Payment/Payment';
import FoodAndTick from './Component/FoodAndTick/FoodAndTick';
import PayBankCard from './Component/PayBankCard/PayBankCard';
import Footer from './Component/Footer/Footer'
import Router from "./router";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Header from './Component/Header/Header';
import Cinema from './Component/Cinema/Cinema';
import ChangePassword from "./Component/Login/ChangePassword/ChangePassword"
import MyTicket from './Component/MyTicket/MyTicket';


function App() {
  return (
    <Fragment>
      <Header />
      <div className='container-fluid'>
        <Routes>
          <Route>
            <Route path='' element={<Home />} />
            <Route path='/film' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/cinema" element={<Cinema />} />
            <Route path='/film/:id' element={<FilmDetail />} />
            <Route path='/changepassword' element={<ChangePassword />} />
            <Route path='/myticket' element={<MyTicket />} />


            <Route path='/SystemCinema' element={<SystemCinema />} />
            <Route path='/SystemCinema/:slug/' element={<InfoSysCinema />} />
            {/* <Route path='/bookingandticket' element={<BookingTicket />} /> */}
            <Route path='/bookingandticket/:id' element={<BookingTicket />} />
            <Route path='/seatPlan' element={<SeatPlan />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/foodandtick' element={<FoodAndTick />} />
            <Route path='/PayBankCard' element={<PayBankCard />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </Fragment>
  )
}

export default App;