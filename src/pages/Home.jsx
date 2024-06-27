import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  //state for handling api data
  const [users, setUsers] = useState([]);

  //state for handling loading
  const [loading, setLoading] = useState(true);

  //state for handling delete popup
  const [deletePopup, setDeletePopup] = useState(false);

  //state for handling user id
  const [userId, setUserId] = useState("");

  //import api from .env file
  const api = import.meta.env.VITE_API_URL;

  // Api call
  const handleApi = async () => {
    const res = await axios.get(api);
    res.status == 200 ? setUsers(res.data) : "";
    res.status == 200 ? setLoading(false) : setLoading(true);
  };
  useEffect(() => {
    handleApi();
  }, []);

  // handle delete
  const handleDelete = (id) => {
    setUserId(id);
    setDeletePopup(true);
  };

  // handle delete user
  const handleDeleteUser = async () => {
    const res = await axios.delete(`${api}/${userId}`);
    res.status == 200 ? setDeletePopup(false) : "";

    const user = await axios.get(api);
    res.status == 200 ? setUsers(user.data):'';
    console.log(user)
    // user.status == 200 ? setUsers(user.data) : "";
  };
  return (
    <>
      <div className="users-container">
        {loading ? (
          <p className="text-center text-2xl font-bold">Loading...</p>
        ) : (
          <>
            {/* user table */}
            <div className="users-table m-auto overflow-x-auto p-4">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">No</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Mobile</th>
                    <th className="border px-4 py-2">Role</th>
                    <th className="border px-4 py-2">Modification</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, index) => {
                    return (
                      <tr className="hover:bg-gray-50" key={index}>
                        <td className="border px-4 py-2 text-center">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap border px-4 py-2 text-center font-semibold">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap border px-4 py-2 text-center font-semibold">
                          {item.email}
                        </td>
                        <td className="whitespace-nowrap border px-4 py-2 text-center font-semibold">
                          {item.mobile}
                        </td>
                        <td className="whitespace-nowrap border px-4 py-2 text-center font-semibold">
                          {item.role}
                        </td>
                        <td className="whitespace-nowrap border px-4 py-2 text-center font-semibold">
                          <Link to={`/view/${item.id}`}>
                            <button className="text-dark me-1 rounded-md border border-solid border-black bg-slate-100 p-1 text-sm shadow">
                              View
                            </button>
                          </Link>
                          <Link to={`/edit/${item.id}`}>
                            <button className="text-dark me-1 rounded-md border border-solid border-black bg-slate-100 p-1 text-sm shadow">
                              Edit
                            </button>
                          </Link>
                          {/* <Link to={`/delete/${item.id}`}> */}
                          <button
                            className="text-dark me-1 rounded-md border border-solid border-black bg-slate-100 p-1 text-sm shadow"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                          {/* </Link> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Delete popup */}
            <div
              className={`${!deletePopup ? "fixed left-[-100%]" : "delete-popup-container fixed inset-0 flex items-center justify-center transition-all duration-500 ease-in"}`}
            >
              <div className="delete-popup h-auto w-[50%] rounded-md bg-slate-200 p-10 text-center shadow-lg md:w-[35%]">
                <p className="whitespace-normal pb-3 text-base font-semibold text-red-500">
                  Do you really want to delete this user?
                </p>
                <div className="popup-btns flex justify-center gap-2">
                  <button
                    className="rounded-md bg-orange-500 px-4 py-1 text-sm font-semibold text-white shadow-lg"
                    onClick={() => handleDeleteUser()}
                  >
                    Ok
                  </button>
                  <button
                    className="rounded-md bg-orange-500 px-4 py-1 text-sm font-semibold text-white shadow-lg"
                    onClick={() => setDeletePopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
