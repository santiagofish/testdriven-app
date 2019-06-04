import React from 'react';


const UsersList = (props) => {
  // if (!props.isAuthenticated) {
  //   return(
  //     <p>You must be logged in to view this.
  //     Click <Link to="/login">here</Link> to log back in.</p>
  //   );
  // };
  return (
    <div>
      <h1 className="title is-1">All Users</h1>
      <hr/><br/>
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Active</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {
            props.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{String(user.active)}</td>
                  <td>{String(user.admin)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
};

export default UsersList;
