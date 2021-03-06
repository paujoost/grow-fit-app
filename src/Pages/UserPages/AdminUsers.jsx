import React, { useState, useEffect } from 'react'
import { FaTrash } from "react-icons/fa";
import IntroSection from '@PageSection/IntroSection';
import Container from '@Wrapper/Container'
import { getData } from '@/Connections/graphcsm';
import useStaticContent from '@/Hooks/useStaticContent';
import { deleteUserQuery } from '@/Queries/User/deleteUserQuery';
import { usersQuery } from '@/Queries/User/usersQuery';


export default function AdminUsers() {

  const sc = useStaticContent('UserPages.AdminUsers');
  const [userId, setUserId] = useState(null);
  const [cmsData, setCmsData] = useState(null);
  const [loadingCsmData, setLoadingCsmData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingCsmData(true);
      try {
        const response = await getData(usersQuery);
        setCmsData(response);
      } catch (err) {
        console.log(err)
      }
      setLoadingCsmData(false);
    }
    getData(deleteUserQuery(userId)).then(
      fetchData
    );
  }, [userId])

  function deleteUser(id) {
    setUserId(id);
  }
  return (
    <Container>
      <IntroSection line={sc.introLine} title={sc.title} />
      <table className="table-auto w-full">
        <thead className="text-left">
          <tr>
            <th >First name</th>
            <th>Last name</th>
            <th>E-mail</th>
            <th>Role</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            loadingCsmData ? (
              <tr><td>loading</td></tr>
            ) :
              cmsData && (
                cmsData.app_Users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.userRoles}</td>
                      <td>
                        <button onClick={() => (deleteUser(user.id))} >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
        </tbody>
      </table>
    </Container>
  )
}
