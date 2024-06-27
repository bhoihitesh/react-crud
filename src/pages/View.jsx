import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const View = () => {
  // Getting id from params
  const { id } = useParams();

  // Getting current location
  const {pathname} = useLocation();

  // Navigation
  const navigate = useNavigate();

  // State for handling pathname conditionally
  const [isDisabled,setIsDisabled] = useState(pathname.includes('view'));

  // State for handeling user data
  const [user, setUser] = useState([]);

  // State for handeling loading
  const [loading, setLoading] = useState(false);

  // State for handling user data
  const [editUser,setEdituser]=useState({
    name: '',
    email: '',
    mobile:'',
    role: '',
    country:'',
    state:''
  })

  // Destructure edit user objects
  const {name,email,mobile,role,country,state} = editUser;
  
  // Importing Api
  const Api = import.meta.env.VITE_API_URL;

  const getSingleuser = async () => {
    const res = await axios.get(`${Api}/${id}`);
    res.status == 200 ? setUser([res.data]) : "";
    res.status == 200 ? setEdituser(res.data) : "";
    res.status == 200 ? setLoading(false) : setLoading(true);
  };
  useEffect(() => {
    getSingleuser();
  }, []);

  // form submit
  const handleFormsubmit =async(e)=>{
    e.preventDefault();
    console.log(editUser)
    const res = await axios.put(`${Api}/${id}`,editUser)
    res.status == 200 ? navigate('/'):'';
  }

  // Onchange function for user inputs
  const handleInputdata =(e)=>{
    const {value,name} = e.target;
    setEdituser({ ...editUser, [name]: value });
  }
  return (
    <>
      <div className="view-user-container mt-10 flex w-full flex-col items-center justify-center gap-4 px-2">
        {loading ? (
          <p className="text-center text-2xl font-bold">Loading...</p>
        ) : (
              <form
                className="flex w-full flex-col justify-center gap-2"
                onSubmit={(e)=>handleFormsubmit(e)}
              >
                <div className="name-email-container flex w-full items-center justify-center gap-4">
                  <div className="name-container flex w-full flex-col justify-start gap-2 md:w-[40%]">
                    <label htmlFor="name" className="text-sm font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e)=>handleInputdata(e)}
                      className="w-full overflow-scroll rounded-md bg-slate-100 p-2 text-sm font-normal"
                      disabled={isDisabled}
                    />
                  </div>
                  <div className="email-container flex w-full flex-col justify-start gap-2 md:w-[40%]">
                    <label htmlFor="email" className="text-sm font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e)=>handleInputdata(e)}
                      className="w-full overflow-scroll rounded-md bg-slate-100 p-2 text-sm font-normal"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="mobile-role-container flex w-full items-center justify-center gap-4">
                  <div className="mobile-container flex w-full flex-col justify-start gap-2 md:w-[40%]">
                    <label htmlFor="mobile" className="text-sm font-semibold">
                      Mobile
                    </label>
                    <input
                      type="text"
                      id="mobile"
                      name="mobile"
                      value={mobile}
                      onChange={(e)=>handleInputdata(e)}
                      className="w-full overflow-scroll rounded-md bg-slate-100 p-2 text-sm font-normal"
                      disabled={isDisabled}
                    />
                  </div>
                  <div className="role-container flex w-full flex-col justify-start gap-2 md:w-[40%]">
                    <label htmlFor="role" className="text-sm font-semibold">
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e)=>handleInputdata(e)}
                      className="w-full overflow-scroll rounded-md bg-slate-100 p-2 text-sm font-normal"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                <div className="country-state-container flex w-full items-center justify-center gap-4">
                  <div className="country-container flex w-full flex-col justify-start gap-2 md:w-[40%]">
                    <label htmlFor="country" className="text-sm font-semibold">
                      Coutry
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={country}
                      onChange={(e)=>handleInputdata(e)}
                      className="w-full overflow-scroll rounded-md bg-slate-100 p-2 text-sm font-normal"
                      disabled={isDisabled}
                    />
                  </div>
                  <div className="state-container flex w-full flex-col justify-start gap-2 md:w-[40%]">
                    <label htmlFor="state" className="text-sm font-semibold">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={state}
                      onChange={(e)=>handleInputdata(e)}
                      className="w-full overflow-scroll rounded-md bg-slate-100 p-2 text-sm font-normal"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
                {!isDisabled && <div className="submit-btn py-2 text-center">
                  <button className="rounded-md bg-slate-200 p-2 text-sm font-semibold">
                    Submit
                  </button>
                </div>}
              </form>
        )}
      </div>
    </>
  );
};

export default View;
