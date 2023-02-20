
export const fetchAllMovies = async ()=>{
    let res = await fetch('https://teachingserver.onrender.com/cinema/nowAndSoon')
    let data = await res.json();
    return data 
}
export const fetchAllCinema = async ()=>{
    let res = await fetch('https://teachingserver.onrender.com/cinema/cinemas')
    let data = await res.json();
    return data 
}

export const fetchBookingTicket = async ()=>{
    let res = await fetch('https://teachingserver.onrender.com/cinema/booking/detail')
    let data = await res.json();
    return data 
}
export const fetchShowtime = async (id:string) => {
    let res = await fetch(`https://teachingserver.onrender.com/cinema/movie/${id}`)
    let data = await res.json();
    return data 
}

