import { combineReducers } from 'redux';
import MovieReducer from './MovieReducer'
import SystemCinemas from './SystemCinema'
import BookingAndTicket from './BookingAndTicket'


const reducers = combineReducers({
    films : MovieReducer,
    cinema :  SystemCinemas,
    bookingticket :BookingAndTicket,
   
})

export default reducers;