import {
     Users,
     Globe,
     ClipboardList,
     Boxes,
     Calendar,
     Building,
} from "lucide-react";

import {
     ResponsiveContainer,
     LineChart,
     Line,
     CartesianGrid,
     XAxis,
     Tooltip,
     Area,
     AreaChart,
} from "recharts";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/usersApi";
import { getExpos } from "../../api/expoApi";
import { getAllApplications } from "../../api/applicatioApi";
import { getAllCompanies } from "../../api/registerCompanyApi";
import { getAllBooths } from "../../api/boothApi";
import { getAllSessions } from "../../api/sessionApi";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {

     const { user } = useAuthContext();
     const navigate = useNavigate()

     useEffect(() => {
          if (user?.role === "Exhibitor") {
               navigate("/dashboard/register-company");
          }

          if (user?.role === "Attendee") {
               navigate("/dashboard/all-expo");
          }
     });

     // STATES 
     const [users, setUsers] = useState(0);
     const [expos, setExpos] = useState(0);
     const [applications, setApplications] = useState(0);
     const [booths, setBooths] = useState(0);
     const [sessions, setSessions] = useState(0);
     const [companies, setCompanies] = useState(0);

     const [chartData, setChartData] = useState([]);


     // FETCH ALL DATA IN PARALLEL 
     const fetchAllStats = async () => {
          try {
               const [
                    userRes,
                    expoRes,
                    applicationsRes,
                    companyRes,
                    boothRes,
                    sessionRes
               ] = await Promise.all([
                    getAllUsers(),
                    getExpos(),
                    getAllApplications(),
                    getAllCompanies(),
                    getAllBooths(),
                    getAllSessions()
               ]);

               setUsers(userRes?.users?.length || 0);
               setExpos(expoRes?.expos?.length || 0);
               setApplications(applicationsRes?.applications?.length || 0);
               setCompanies(companyRes?.companies?.length || 0);
               setBooths(boothRes?.booths?.length || 0);
               setSessions(sessionRes?.sessions?.length || 0);

               // ======= CREATE DYNAMIC CHART DATA =======
               setChartData([
                    {
                         month: "Jan",
                         users: userRes?.users?.length || 0,
                         expos: expoRes?.expos?.length || 0,
                         booths: boothRes?.booths?.length || 0,
                         companies: companyRes?.companies?.length || 0,
                         applications: applicationsRes?.applications?.length || 0,
                         sessions: sessionRes?.sessions?.length || 0,
                    }
               ]);

          } catch (err) {
               toast.error(err.message || "Failed to load dashboard data");
          }
     };


     useEffect(() => {
          fetchAllStats();
     }, []);


     // ======= STATS ARRAY (DYNAMIC) =======
     const stats = [
          { label: "Users", value: users, icon: Users, color: "bg-indigo-100 text-indigo-600" },
          { label: "Expos", value: expos, icon: Globe, color: "bg-pink-100 text-pink-600" },
          { label: "Applications", value: applications, icon: ClipboardList, color: "bg-emerald-100 text-emerald-600" },
          { label: "Booths", value: booths, icon: Boxes, color: "bg-orange-100 text-orange-600" },
          { label: "Sessions", value: sessions, icon: Calendar, color: "bg-teal-100 text-teal-600" },
          { label: "Companies", value: companies, icon: Building, color: "bg-purple-100 text-purple-600" },
     ];


     return (
          <div className="p-6">
               <h1 className="text-[24px] font-medium tracking-tight mb-6">Overview</h1>

               {/* Stats */}
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-10">
                    {stats.map((item, idx) => {
                         const Icon = item.icon;
                         return (
                              <div
                                   key={idx}
                                   className="relative border border-gray-300 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition"
                              >
                                   <p className="font-semibold text-[36px] leading-none mb-2">{item.value}</p>
                                   <p className="text-gray-600 text-[17px]">{item.label}</p>

                                   <div
                                        className={`absolute bottom-3 right-3 p-3 rounded-xl rotate-45 ${item.color}`}
                                   >
                                        <Icon className="-rotate-45 w-5 h-5" />
                                   </div>
                              </div>
                         );
                    })}
               </div>

               <div className="flex items-start gap-5 w-full">

                    {/* FIRST CHART */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm w-1/2">
                         <h2 className="text-[20px] font-semibold mb-4">Analytics Overview</h2>

                         <div className="h-[350px]">
                              <ResponsiveContainer width="100%" height="100%">
                                   <AreaChart data={chartData}>
                                        <defs>
                                             <linearGradient id="usersColor" x1="0" y1="0" x2="0" y2="1">
                                                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                                                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                             </linearGradient>
                                        </defs>

                                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                        <XAxis dataKey="month" />
                                        <Tooltip />

                                        <Area
                                             type="monotone"
                                             dataKey="users"
                                             stroke="#6366F1"
                                             fill="url(#usersColor)"
                                             strokeWidth={3}
                                        />
                                        <Line
                                             type="monotone"
                                             dataKey="expos"
                                             stroke="#EC4899"
                                             strokeWidth={3}
                                             dot={false}
                                        />
                                        <Line
                                             type="monotone"
                                             dataKey="booths"
                                             stroke="#10B981"
                                             strokeWidth={3}
                                             dot={false}
                                        />
                                   </AreaChart>
                              </ResponsiveContainer>


                         </div>
                    </div>

                    {/* SECOND CHART */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-300 shadow-sm w-1/2">
                         <h2 className="text-[20px] font-semibold mb-4">Companies, Applications & Sessions</h2>

                         <div className="h-[350px]">

                              <ResponsiveContainer width="100%" height="100%">
                                   <AreaChart data={chartData}>
                                        <defs>
                                             <linearGradient id="companyColor" x1="0" y1="0" x2="0" y2="1">
                                                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                                                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                             </linearGradient>

                                             <linearGradient id="appsColor" x1="0" y1="0" x2="0" y2="1">
                                                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                                                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                             </linearGradient>

                                             <linearGradient id="sessionColor" x1="0" y1="0" x2="0" y2="1">
                                                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                                                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                                             </linearGradient>
                                        </defs>

                                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                        <XAxis dataKey="month" />
                                        <Tooltip />

                                        <Area
                                             type="monotone"
                                             dataKey="companies"
                                             stroke="#8B5CF6"
                                             fill="url(#companyColor)"
                                             strokeWidth={3}
                                        />
                                        <Area
                                             type="monotone"
                                             dataKey="applications"
                                             stroke="#F59E0B"
                                             fill="url(#appsColor)"
                                             strokeWidth={3}
                                        />
                                        <Area
                                             type="monotone"
                                             dataKey="sessions"
                                             stroke="#06B6D4"
                                             fill="url(#sessionColor)"
                                             strokeWidth={3}
                                        />
                                   </AreaChart>
                              </ResponsiveContainer>


                         </div>
                    </div>

               </div>
          </div>
     );
};

export default DashboardHome;