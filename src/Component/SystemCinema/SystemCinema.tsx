import React from 'react'
import {useEffect} from 'react'
import {useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { FilmDetail } from '../../model';
import "./SystemCinema.scss"



export default function SystemCinema() {
  const AllSystemCinema = useSelector((state: any) => {
      return state.cinema
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
        type: 'GET_CINEMA'
    })
  }, []);

  const total = (slug:string) => {
    navigate(`/SystemCinema/${slug}`)
  }

  return (
    <div className='SysCinema container' >
      <h1>System Galaxy Cinema</h1>
      <div className='boxAllSystemCinema'>
      { AllSystemCinema.sys.length > 0?  AllSystemCinema.sys.map((n: FilmDetail) =>
              <div className='AllSystemCinema' key={n.id} onClick={()=>total(`${n.slug}`)} > 
                <img src={n.imageUrls[0]}/>
                <h3>{n.name}</h3>
              </div>
          ):""}
      </div>
      
      </div>
        
    
  )
}
