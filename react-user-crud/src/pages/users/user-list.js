import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import axios from 'axios';

function UserList() {

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    loadUserList();
  }, [])

  const loadUserList = () => {
    axios.get('http://localhost:3001/api/users')
      .then(res => res.data)
      .then(data => {
        if (data.users) {
          setUserList(data.users);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const onDelete = (userId) => {
    console.log("onDelete", userId);
    axios.delete(`http://localhost:3001/api/users/${userId}`)
      .then(res => res.data)
      .then(data => {
        if(data.success == true) {
          loadUserList();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="p-4">
      <div>User list</div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userList.map((item, index) => <tr key={`key_${index}`}>
            <th scope="row" className="align-middle">{index + 1}</th>
            <td className="align-middle">{item.username}</td>
            <td className="align-middle">{item.email}</td>
            <td className="d-flex align-items-center justify-content-end">
              <Link className="btn btn-success" to={`/edit/${item._id}`}>Edit</Link>
              <Button color="danger" className="ms-2" onClick={() => onDelete(item._id)}>Delete</Button>
            </td>
          </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList;