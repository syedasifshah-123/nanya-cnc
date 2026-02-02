import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../context/ModalContext";
import { getAllApplications, updateApplication } from "../../api/applicatioApi";
import { usePendingApplications } from "../../context/PendingApplicationsContext";
import ApplicationDetailModal from "../../components/modals/ApplicationDetailModal";

const AllApplications = () => {

    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { fetchCount } = usePendingApplications();

    const { user } = useAuthContext();
    const { openModal, closeModal } = useModalContext();

    // Fetch all applications
    const fetchApplications = async () => {
        try {

            if (!user?.role) return;
            console.log(user?.role);

            const res = await getAllApplications(user?.role);
            const { success, applications } = res;

            if (success) setApplications(applications);
        } catch (err) {
            const msg = err?.response?.data?.message || err.message || "Request failed";
            toast.error(msg);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [user?.role]);

    // Filter search
    const filteredApplications = applications.filter((app) =>
        app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.expoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle status update
    const handleStatusUpdate = async (appId, newStatus) => {
        try {
            const res = await updateApplication(appId, newStatus);

            if (res.success) {
                toast.success("Status updated!");

                setApplications(prev =>
                    prev.map(a =>
                        a._id === appId ? { ...a, status: newStatus } : a
                    )
                );

                fetchCount();

            } else {
                toast.error(res.message);
            }
        } catch (err) {
            const msg = err?.response?.data?.message || err.message;
            toast.error(msg);
        }
    };

    // Open modal
    const handleView = (app) => {
        openModal(<ApplicationDetailModal appData={app} onClose={closeModal} />);
    };

    return (
        <div className="p-6">

            <h1 className="text-[24px] font-medium tracking-tight mb-4">
                All Applications
            </h1>

            {/* Search */}
            <div className="flex my-5 gap-3 items-center">
                <input
                    type="text"
                    placeholder="Search applications"
                    className="w-full border-2 text-[18px] border-gray-200 outline-none px-4 py-3 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="relative overflow-x-auto bg-white rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 font-medium">ID</th>
                            <th className="px-6 py-3 font-medium">Company Name</th>
                            <th className="px-4 py-3 font-medium">Expo Name</th>
                            <th className="px-4 py-3 font-medium">Message</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredApplications.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500 font-medium">
                                    No applications found
                                </td>
                            </tr>
                        ) : (
                            filteredApplications.map((app, index) => (
                                <tr key={app._id} className="bg-white border-b border-gray-200">

                                    {/* ID */}
                                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                                        {index + 1}
                                    </td>

                                    {/* Company Name */}
                                    <td className="px-6 py-4 font-medium">
                                        {app.companyName}
                                    </td>

                                    {/* Expo Name */}
                                    <td className="px-4 py-4">
                                        {app.expoName}
                                    </td>

                                    {/* Message */}
                                    <td className="px-4 py-4">
                                        {app.message?.length > 40
                                            ? app.message.substring(0, 40) + "..."
                                            : app.message}
                                    </td>

                                    {/* STATUS FIELD */}
                                    <td className="px-4 py-4">
                                        {user?.role === "Admin" ? (
                                            <select
                                                className="border border-gray-300 px-2 py-1 rounded-lg"
                                                value={app.status}
                                                onChange={(e) =>
                                                    handleStatusUpdate(app._id, e.target.value)
                                                }
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        ) : (
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${app.status === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : app.status === "rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {app.status}
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 flex items-center justify-center">
                                        <Eye
                                            size={20}
                                            className="text-indigo-600 cursor-pointer hover:scale-110 transition"
                                            onClick={() => handleView(app)}
                                        />
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllApplications;