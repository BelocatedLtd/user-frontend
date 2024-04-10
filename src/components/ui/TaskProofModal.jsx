import React from 'react'
//import close from "../assets/close.svg";
import close from "../../assets/close.svg"
import ReactDOM from "react-dom";
import Carousel from '../Carousel';
import { useState } from 'react';
import { useEffect } from 'react';

const TaskProofModal = ({toggleTaskProof, task}) => {
    const [slides, setSlides] = useState([])

    useEffect(() => {
        setSlides(task?.proofOfWorkMediaURL)
    }, [])
   
    return ReactDOM.createPortal(
        <div className="wrapper">
          <div className="relative modal w-[90%] h-[80vh] md:w-fit md:h-[95vh] bg-primary">
          <img
          src={close}
          alt="close"
          onClick={toggleTaskProof}
          size={40}
          className="absolute top-[-1rem] right-[-1rem] text-tertiary"
        />

        {task?.proofOfWorkMediaURL?.length == 1 && (
        <img src={task?.proofOfWorkMediaURL[0].secure_url} alt="task proof" className='w-full h-full object-cover'/>
        )}

        {task?.proofOfWorkMediaURL?.length > 1 && (
            <Carousel autoSlide={true} >
            {slides?.map((s, index) => (
                <img key={index} src={s?.secure_url} className='w-full h-full object-cover'/>
            ))}
            </Carousel>
          )}
           </div>
        </div>,
        document.getElementById("backdrop")
      );
    };
    
    export default TaskProofModal;