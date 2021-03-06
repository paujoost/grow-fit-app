import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@/Contexts/UserContext';

export default function UserMenu({ closeMenu }) {
  const { currentUser } = useUser();
  return (
    <div className="menu--user">
      <div className="menu-profile-picture">
        <img src={currentUser?.userprofileimg?.url
          ? currentUser?.userprofileimg?.url
          : 'https://via.placeholder.com/150'
        } alt={'profile picture ' + currentUser.username} />
      </div>
      <p className="text-center menu-username">Hi {currentUser?.userName
        ? currentUser.userName
        : 'Please set a username'
      }
      </p>
      <ul>
        <li>
          <Link to="/profile" onClick={closeMenu}>Profile</Link>
        </li>
      </ul>
    </div>
  )
}

