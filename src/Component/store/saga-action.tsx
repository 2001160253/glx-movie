import { takeEvery, put, call } from 'redux-saga/effects';
import {
    fetchAllMovies,
    fetchAllCinema,
    fetchBookingTicket,
   
} from './api-client';


function* getData():any {
    let data = yield call(fetchAllMovies);
    try {
        yield put({ type: "GET_MOVIES", payload: data });
    } catch (error) {
        yield put({ type: "GET_MOVIES_FAIL", payload:error });
    }}

function *SystemCinema():any {
    let data = yield call(fetchAllCinema);
    try{
        yield put ({type: 'GET_CINEMAS',payload: data})
    }catch(error){
        yield put({ type: "GET_CINEMAS_FAIL", payload:error });
    }}

function* getBookingTicker():any {
    let data = yield call(fetchBookingTicket);    
    try {
        yield put({ type: "GET_TICKETS", payload: data });
        yield put({ type: "GET_CONSESSION", payload: data });
        yield put({ type: "GET_SEATPLAN", payload: data });
        yield put({ type: 'SET_INFOS', payload: data })
    } catch (error) {
        yield put({ type: "GET_BOOKING_TICKETS", payload: error });
    }
}





function* rootSaga() {
    yield takeEvery("GET_ALL", getData);
    yield takeEvery("GET_CINEMA", SystemCinema);
    yield takeEvery("GET_BOOKING_TICKET", getBookingTicker);
   

}

export default rootSaga;

