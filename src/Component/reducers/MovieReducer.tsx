import Film from "../FilmDetail/FilmDetail";

interface allAction {
    payload: any,
    type: string,
    error: string
}

const intialState = {
    showingMovies: [],
    comingMovies: [],
    filmDetails: {}
}

const MovieReducer = (state = intialState, { payload, type, error }: allAction) => {
    switch (type) {
        case 'GET_MOVIES':
            return {
                ...state,
                showingMovies: payload.movieShowing,
                comingMovies: payload.movieCommingSoon,
            };
        case 'SAVE_MOVIE_DETAIL':
            return {
                ...state,
                filmDetails: payload,
            }
        default:
            return state;
    }
}

export default MovieReducer