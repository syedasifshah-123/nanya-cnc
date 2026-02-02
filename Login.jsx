import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import { loginUser } from "../../api/authApi";
import { useAuthContext } from "../../context/AuthContext";

const Login = () => {


     const navigate = useNavigate();
     const { user, setUser } = useAuthContext();

     // Form Data State
     const [formData, setFormData] = useState({
          email: "",
          password: ""
     });


     // handle change input
     const handleChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value
          });
     }



     // handle form submit
     const handleSubmit = async (e) => {
          e.preventDefault();


          try {


               const data = await loginUser(formData);
               const { success, message } = data;

               if (success) {

                    setUser(data.user);

                    toast.success(message);

                    setFormData({
                         email: "",
                         password: ""
                    });

                    if (data.user.role === "Admin") {
                         navigate("/dashboard");
                    } else if (data.user.role === "Exhibitor") {
                         navigate("/dashboard/register-company");
                    } else if (data.user.role === "Attendee") {
                         navigate("/dashboard/all-expo");
                    }

               } else {
                    toast.error(message);
               }


          } catch (err) {

               const serverMessage = err?.response?.data?.message;
               const msg = serverMessage || err.message || "Request failed";

               toast.error(msg);

          }

     }


     return (<>

          <div className="bg-gray-50">
               <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                    <div className="max-w-[520px] w-full">

                         <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                              <h1 className="text-slate-900 text-center text-3xl font-semibold tracking-tight">Sign in</h1>
                              <form className="mt-12 space-y-6" onSubmit={handleSubmit}>

                                   <input
                                        type="text"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border-2 text-[18px] border-gray-200 outline-none px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition"
                                   />

                                   <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full border-2 text-[18px] border-gray-200 outline-none px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition"
                                   />

                                   <div className="mb-2 text-right underline"><Link to="/forgot-password" className="text-indigo-600">Forgot Password?</Link></div>

                                   <Button btnText={"Login"} onClick={handleSubmit} />

                              </form>

                              <p className="mt-5">Don't have an account? <Link to="/signup" className="text-indigo-600 underline">Create Account</Link></p>

                         </div>
                    </div>
               </div>
          </div>

     </>);
}

export default Login;