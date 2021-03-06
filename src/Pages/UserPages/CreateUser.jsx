import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Button from '@PageComponent/Buttons/Button';
import Form from '@PageComponent/FormElements/Form';
import IntroSection from '@PageSection/IntroSection';
import Container from '@Wrapper/Container';
import { useError } from '@/Contexts/ErrorContext';
import { useUser } from '@/Contexts/UserContext';
import useStaticContent from '@/Hooks/useStaticContent';


function CreateUser() {
  const sc = useStaticContent('UserPages.RegisterPage');

  const history = useHistory();
  const { userRegister } = useUser();
  const [loading, setLoading] = useState(false)
  const { setErrorMessage, setSuccesMessage } = useError();

  const registerEmailRef = useRef();
  const registerPasswordRef = useRef();
  const registerConfPasswordRef = useRef();
  const registeruserNameRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const email = registerEmailRef.current.value;
    const password = registerPasswordRef.current.value;
    const passwordConfirm = registerConfPasswordRef.current.value;
    const username = registeruserNameRef.current.value;

    if (password !== passwordConfirm) {
      return setErrorMessage('Passwords do not match')
    }
    if (username.length <= 0) {
      return setErrorMessage('username is not defined yet')
    }

    if (password.length <= 6 || passwordConfirm.length <= 6) {
      return setErrorMessage('password should be longer then 6 characters')
    }
    try {
      setLoading(true);
      await userRegister(
        email,
        password,
        username
      );
    } catch (err) {
      if (err.message) {
        return setErrorMessage(err.message);
      } else {
        return setErrorMessage('failed to sign in')
      }
    }
    setLoading(false);
    history.push('/profile');
    setSuccesMessage('you have created a new user');

  }
  return (
    <div className="page--login">
      <Container>
        <IntroSection line={sc.introLine} title={sc.title} />
        <section className="form--register--wrapper">
          <Form onSubmit={handleSubmit} className="form--register form--small">
            <div className="form-group" id="registeremail">
              <label>E-mail</label>
              <input type="email" ref={registerEmailRef} required />
            </div>
            <div className="form-group" id="registerusername">
              <label>Username</label>
              <input type="text" ref={registeruserNameRef} required />
            </div>
            <div className="form-group" id="registerpassword">
              <label>Password</label>
              <input type="password" ref={registerPasswordRef} required />
            </div>
            <div className="form-group" id="registerconfpassword">
              <label>Confirm password</label>
              <input type="password" ref={registerConfPasswordRef} required />
            </div>
            <input type="submit" disabled={loading} name="registerform" id="submitregister" className="btn btn-prim" />
          </Form>
        </section>
        <div className="description text-center">
          <p>{sc.formFooterText} <Button variant={'btn-sm btn-prim'} to="/login">Log in</Button><br />
          </p>
        </div>
      </Container>
    </div>
  )
}

export default CreateUser
