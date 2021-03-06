import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router';
import BetterSelect from '@PageComponent/FormElements/BetterSelect';
import Form from '@PageComponent/FormElements/Form';
import UploadCload from '@PageComponent/FormElements/UploadCload';
import IntroSection from '@PageSection/IntroSection';
import Container from '@Wrapper/Container';
import { getData } from '@/Connections/graphcsm';
import { uploadingImg } from '@/Connections/uploadcloud';
import { useError } from '@/Contexts/ErrorContext';
import { useUser } from '@/Contexts/UserContext';
import useStaticCmsData from '@/Hooks/useStaticCmsData';
import useStaticContent from '@/Hooks/useStaticContent';
import { createEntryQuery, publishEntryQuery } from '@/Queries/entry/createEntryQuery';
import { getWorkoutsSelectQuery } from '@/Queries/Workout/getWorkoutsQuery';
import './styles/CreateEntry.scss'

export default function CreateEntry() {
  const history = useHistory();
  const sc = useStaticContent('WorkoutPages.CreateEntry');
  const { setErrorMessage } = useError();
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [entryImg, setentryImg] = useState('');

  const { data: workouts } = useStaticCmsData({}, getWorkoutsSelectQuery);
  const { currentUser } = useUser();
  const entryInfo = useRef();
  const entryScore = useRef();


  function selectWorkout(workout) {
    setSelectedWorkout(workout);
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      uploadingImg(entryImg, 'entry_preset').then(
        response =>
          getData(createEntryQuery(
            currentUser.id,
            selectedWorkout.id,
            entryScore.current.value,
            entryInfo.current.value,
            response.data.public_id
          )).then(
            data => {
              getData(publishEntryQuery(data.createEntry.id));
              entryScore.current.value = "";
              entryInfo.current.value = "";
              setSelectedWorkout('');
              setentryImg('');
              history.push('/succes')
            }
          )
      );
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }

  }

  return (
    <Container>
      <div className="page--new-entry">
        <header>
          <IntroSection line={sc.introLine} title={sc.title} />
        </header>


        <Form onSubmit={handleSubmit}>
          <div className="form-left">
            <UploadCload tryUpload={setentryImg} tempImage={entryImg} placeholder="Upload a Picture or didn't happen" />
            <div className="form-element custom-select">
              <label htmlFor="entry-workout">Select your work-out</label>
              <BetterSelect
                selectionData={workouts?.workouts}
                onSelect={selectWorkout}
                placeHolder="Type to filter"
                required={true}
              />
            </div>
            <div className="form-element custom-class">
              <label htmlFor="entry-extra-info">How was it ?</label>
              <p className=" "><input type="number" min={0} max={10} step={1} ref={entryScore} required />/ 10</p>
            </div>

          </div>
          <div className="form-right">
            <div className="form-element">
              <label htmlFor="entry-extra-info">Extra info</label>
              <textarea name="entry-extra-info" id="" ref={entryInfo} required></textarea>
            </div>

          </div>

          <div className="form-element ">
            <div className='form-submit'>
              <input type="submit" name="entrysubmit" id="submitlogin" className="btn btn-prim" />
            </div>
          </div>
        </Form>
      </div>
    </Container>
  )
}
