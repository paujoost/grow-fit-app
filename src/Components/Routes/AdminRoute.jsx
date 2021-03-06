import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { useUser } from '@/Contexts/UserContext';

export default function AdminRoute({ component: Component, ...rest }) {
  const { currentUser } = useUser();
  // console.log(currentUser);
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser?.userRoles === 'admin'
          ? <Component {...props} />
          : <Redirect to="/forbiddden" />
      }}
    />
  )
}
