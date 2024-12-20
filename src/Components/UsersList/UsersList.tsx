
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import PreLoader from "../PreLoader/PreLoader";
// import PreLoader from "./PreLoader/PreLoade";


export default function UsersList() {
  const navigate = useNavigate();

  const navigateToAddNewUser = () => {
    navigate("/dashboard/user-data");
  };

  // Modal state
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<any>({});

  const handleClose = () => setShow(false);
  const handleShow = (user: any) => {
    setShow(true);
    setUserId(user.id);
    setUserData(user);
  };

  // Users list state
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users");
      setUsers(response?.data?.users);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }

  };

  const deleteUser = async () => {
    try {
      await axios.delete(`https://dummyjson.com/users/${userId}`);
      toast.success("Deleted successfully!");
      handleClose();
      // Refresh the user list
      getUsers();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
   {loading? <PreLoader/>:
        <div>
          <div className="d-flex justify-content-between m-3">
            <h3>Users List</h3>
            <button onClick={navigateToAddNewUser} className="btn btn-warning text-white">
              Add New User
            </button>
          </div>
          <hr />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"></th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">BirthDate</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th scope="col">{user.id}</th>
                  <td>
                    <img src={user.image} className="w-25" alt="User" />
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.birthDate}</td>
                  <td>
                    <FaEdit className="text-warning mx-2" size={25} />
                    <MdDelete onClick={() => handleShow(user)} className="text-warning" size={25} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete {userData.firstName} {userData.lastName}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
              <Button variant="danger" onClick={deleteUser}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      }
    </>
  );
}


