import allAction from "../../model";

const intialState = {
    sys: []
}

const SystemCinemas = (state = intialState, {payload, type}:allAction) => {
    switch (type) {
        case 'GET_CINEMAS':            
            return { sys: payload };
    
        default:
            return state;
    }
}

export default SystemCinemas