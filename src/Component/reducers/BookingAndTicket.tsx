import allAction from "../../model";

type eInfo = {
    movie: { img: string, name: string, subName: string, age: string },
    cinema: string,
    theater: string,
    showdate: string,
    showtime: string,
}

const intialState = {
    ticket: [],
    consession:[{
        concessionItems:[]
    }],
    seatPlan:[],
    info: {movie:{},} as eInfo

}

const BookingAndTicket = (state = intialState, {payload, type}:allAction) => {
    switch (type) {
        case 'GET_TICKETS':      
            return { ...state,
                ticket: payload.ticket, };
        case 'GET_CONSESSION':      
            return { ...state,
                consession: payload.consession,
              };
        case 'GET_SEATPLAN':      
            return { ...state,
                seatPlan: payload.seatPlan, };
        case 'SET_INFOS':      
                return { ...state,
                    info: payload.info, };
        default:
            return state;
    }
}

export default BookingAndTicket