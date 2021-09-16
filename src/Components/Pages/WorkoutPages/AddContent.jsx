import React from 'react'
import Container from '../../Wrappers/Container'
import AddContentCard from '../../PageComponents/Cards/AddContentCard'
import ReactHtmlParser from 'react-html-parser';
import { FaThumbsUp,FaCalendarAlt,FaTasks,FaPencilAlt } from "react-icons/fa";
import IntroSection from '../../PageSections/IntroSection'
import StaticContent from'../../../StaticContent/content-En.js'


export default function AddContent() {
  const sc =  StaticContent.WorkoutPages.AddContent;
  return (
    <>
    <Container>
    <IntroSection line={sc.introLine} title={sc.title}/>
      <div className="flex flex-wrap -mx-2 overflow-hidden grid-add-content pb-4">
        <div className="my-2 px-2 w-full overflow-hidden md:w-1/2 lg:w-1/3 xl:w-1/4 flex-auto">
          <AddContentCard
            to="/new-entry"
            icon={<FaThumbsUp/>}
            title={sc.cards[0].title}
            descr={ReactHtmlParser(sc.cards[0].descr)}
          />
        </div>
        <div className="my-2 px-2 w-full overflow-hidden md:w-1/2 lg:w-1/3 xl:w-1/4 flex-auto">   
        <AddContentCard
            to="/choose-workout"
            icon={<FaCalendarAlt/>}
            title={sc.cards[1].title}
            descr={ReactHtmlParser(sc.cards[1].descr)}
          />
        </div>
        <div className="my-2 px-2 w-full overflow-hidden md:w-1/2 lg:w-1/3 xl:w-1/4 flex-auto">
          <AddContentCard
            to="/create-workout"
            icon={<FaPencilAlt/>}
            title={sc.cards[2].title}
            descr={ReactHtmlParser(sc.cards[2].descr)}
          />
        </div>
        <div className="my-2 px-2 w-full overflow-hidden md:w-1/2 lg:w-1/3 xl:w-1/4 flex-auto">
          <AddContentCard
            to="/create-exercise"
            icon={<FaTasks/>}
            title={sc.cards[3].title}
            descr={ReactHtmlParser(sc.cards[3].descr)}
          />
        </div>

    </div>
    </Container>
    </>
  )
}