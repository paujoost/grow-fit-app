import React, {useState, useRef} from 'react';
import { getData } from '../../../Connections/graphcsm';
import { useUser } from '../../../Contexts//UserContext';
import { updateUserImgQuery } from '../../../Queries/User/updateUserQuery';
import Button from '../../PageComponents/Buttons/Button';
import LogoutButton from '../../PageComponents/Buttons/LogoutButton';
import BetterSelect from '../../PageComponents/FormElements/BetterSelect';
import Upload from '../../PageComponents/FormElements/Upload';
import Container from '../../Wrappers/Container';
import { nicknames } from '../../../Data/nicknames';
import './styles/ProfilePage.scss';

 function ProfilePage(){
  const { currentUser, userEdit, setCurrentUser } = useUser();
  const [editstate, seteditstate] = useState(false);
  const [nicknameValue, setnicknameValue] = useState(currentUser.nicknames)

  const editUserFirstName = useRef();
  const editUserlastName = useRef();
  const editUserUserName = useRef();

  const selectNicknames = nicknames.map((nickName, index)=>{
    return {
      name: nickName,
      id: index
    }
  })


  function chooseNickname(selection){
    setnicknameValue(selection);
  }

  function saveUser(e){
    const id = e.target.getAttribute('data-id')
    const firstName = editUserFirstName.current.value;
    const lastName = editUserlastName.current.value;
    const userName = editUserUserName.current.value;
    const nickName = nicknameValue.name
    userEdit(id, firstName, lastName, userName, nickName);
    seteditstate(false);
  }

  function setUserProfile(data){
    const userid= currentUser.id;
    getData(updateUserImgQuery(userid, data.publishAsset.id)).then(
      data=>{
       setCurrentUser( data.updateApp_User);
       localStorage.setItem('currentUser', JSON.stringify(data.updateApp_User));
      }
    )
  }

  return(
    <Container>
      <section className="text-center py-4">
           <h1 className="text-4xl font-semibold">Hello {currentUser.userName}</h1>
      </section>
      <section className="profile__user__account">
        <div className="profile__user__account_img">
         <Upload editMode={true} uploadSumbit={setUserProfile} userId={currentUser.id}>
         <img src={ currentUser?.userprofileimg?.url 
          ? currentUser?.userprofileimg?.url
          : 'https://via.placeholder.com/150'
        } alt={'profile picture '+currentUser.username} />
        </Upload>
        </div>
        <div className="profile__user__account_info">
          <h2 className="section--label">
            <span className="font-semibold">
              Profile info
            </span>
          </h2>
          <div className={`profile__user__account_info__wrapper ${editstate ? "active-edit":""}`}>
            <div className="profile__user__account_info__inner">
              <div className="form-item">
                <p>First name: <span>{currentUser.firstName}</span> </p>
                <input type="text" ref={editUserFirstName} className="edit__user__input" defaultValue={currentUser.firstName}/>
              </div>
              <div className="form-item">
                <p>Last name: <span>{currentUser.lastName}</span></p>
                <input type="text" ref={editUserlastName} className="edit__user__input" defaultValue={currentUser.lastName}/>
              </div>
              <div className="form-item">
                <p>Username: <span>{currentUser.userName}</span></p>
                <input type="text" ref={editUserUserName} className="edit__user__input" defaultValue={currentUser.userName}/>
              </div>
            </div>
            <div className="profile__user__account_info__inner">
            <p className="no-edit">E-mail: <span>{currentUser.email}</span></p>
            <p className="no-edit">User role: <span>{currentUser.userRoles}</span></p>
              <div className="form-item">
              <p>Nickname: <span>{currentUser.nicknames}</span></p>
                <BetterSelect 
                  selectionData={selectNicknames} 
                  onSelect={chooseNickname}
                  placeHolder="Choose a nickname"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="profile__user__account_actions">
          {editstate 
            ?  <Button dataId={currentUser.id} onClick={saveUser} variant="btn--save">Save profile</Button>
            :  <Button onClick={()=>(seteditstate(true))} variant="btn--edit">Edit profile info</Button>
          }
          
          <LogoutButton/>
        </div>

      </section>
    </Container>
  )
}
export default ProfilePage
