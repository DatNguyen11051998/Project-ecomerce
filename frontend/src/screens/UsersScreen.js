import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';

function UsersScreen(props) {
  const userList = useSelector(state => state.userList);
  console.log('userList', userList)
  const { loading, users, error } = userList;

  const userDelete = useSelector(state => state.userDelete);
  console.log('delete', userDelete)
  const { success: successDelete, error: errorDelete } = userDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (user) => {
    dispatch(deleteUser(user._id));
  }
  return loading ? <div>loading...</div> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>Users</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(a => a.isAdmin === false).map(user => (<tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <div style={{cursor:"pointer"}} onClick={() => deleteHandler(user)} ><i class="far fa-trash-alt"></i></div>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default UsersScreen;