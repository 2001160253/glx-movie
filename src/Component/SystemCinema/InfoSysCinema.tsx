import React from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DayPicker } from 'react-day-picker';
import Select from 'react-select'
import 'react-day-picker/dist/style.css';
import Info from "../../model";
import Film from "../../model";
import "./InfoSysCinema.scss"

import Slide from '../SlideImage';

export default function InfoSysCinema() {

    const { slug, id } = useParams();
    let [cinemas, setCinema] = useState<Info>();
    let [moives, setMovies] = useState<Film>();
    const [selectedDate, setSelectedDate] = useState<Date>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const AllSystemCinema = useSelector((state: any) => state.cinema);

    const AllSystemMovies = useSelector((state: any) => state.films);


    useEffect(() => {
        dispatch({ type: 'GET_ALL', payload: null })
    }, []);

    useEffect(() => {
        let resultInfoMoive = AllSystemMovies
        setMovies(resultInfoMoive);
    }, [id, AllSystemCinema])


    useEffect(() => {
        dispatch({ type: 'GET_CINEMA' })

    }, []);

    useEffect(() => {
        let resultInfo = AllSystemCinema.sys.find((k: Info) => k.slug === slug)
        setCinema(resultInfo);
    }, [slug, AllSystemCinema])

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const total = (event: any) => {
        navigate(`/SystemCinema/${event.target.value}`)
    }

    const Name = (event: any) => {
        navigate(`/cinema/`)
    }


    return (
        <div className='sysCinema container'>
            <div className='w-100'>
                {cinemas ? <Slide listImages={cinemas.imageUrls}></Slide> : ""}
            </div>
            <div className='mt-4'>
                {
                    cinemas && (
                        <div>
                            <div className="system-filter ">
                                <select onChange={total}>
                                    {
                                        AllSystemCinema.sys.length > 0 ? AllSystemCinema.sys.map((d: Info) => {
                                            return (
                                                <option value={d.slug} key={d.id} className="Changsys">{d.slug.toUpperCase()}</option>
                                            )
                                        }
                                        ) : ""}
                                </select>
                            </div>
                            <div className="cinema-name" onClick={Name}>
                                <h2>{cinemas.name}</h2>
                            </div>
                            <div className="cinema-info">
                                <div className="fare-info">
                                    <h3>Fare</h3>
                                    <img alt='fare' src={cinemas.ticket[0].url} className='fare-image' />
                                </div>
                                <div className="more-info">
                                    <h3>More Infomations</h3>
                                    <div>
                                        <div dangerouslySetInnerHTML={{ __html: cinemas.description }} />
                                        <p className="address-info"> <span>Địa chỉ: </span> {cinemas.address}</p>
                                        <p className="address-info"> <span>Phone number: </span>{cinemas.phone}</p>
                                    </div>
                                    <iframe className="map-embed" src={cinemas.mapEmbeb} title='address' />
                                </div>
                            </div>

                            <div className="showing-movies">

                                <div className="dataAndSelect">
                                    <div className="date-filter">
                                        <div className=" ">
                                            <div className="">
                                                <DayPicker
                                                    mode="single"
                                                    selected={selectedDate}
                                                    onSelect={setSelectedDate}
                                                />
                                            </div>
                                            <div className=" ">
                                                <h5>Tỉnh thành</h5>
                                                <Select options={options} />
                                            </div>
                                            <div className="">
                                                <h5>Tên rạp</h5>
                                                <Select options={options} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <h3>Showing Movies</h3>
                        </div>

                    )}


            </div>


        </div>
    )
}
