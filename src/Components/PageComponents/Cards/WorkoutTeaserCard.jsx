import React from 'react'
import { Link } from 'react-router-dom'
import './styles/WorkoutTeaser.scss';
import {Image} from 'cloudinary-react';
import { Fade } from "react-awesome-reveal";

export default function WorkoutTeaserCard(props) {
    return (
        <div className="workoutteasercard__wrapper my-2 px-2 w-full overflow-hidden md:w-1/2 lg:w-1/3 xl:w-1/3">
            <Link to={props.info.path}>
            <Fade>
            <article className="workoutteasercard">
                <div className="workoutteasercard__top">
                    <Image publicId={props.info.workoutImg} width="100%"/>
                </div>
                <div className="workoutteasercard__body">
                    <div className="workoutteasercard__top">
                        <h1 className="workoutteasercard__title">{props.info.title}</h1>
                        <div className="wrappr">
                             <p className="workoutteasercard__tag">{props.info.sport}</p>
                        </div>
                    </div>
                    <p>Read more</p>
                </div>
            </article>
            </Fade>
            </Link>
        </div>
    )
}
