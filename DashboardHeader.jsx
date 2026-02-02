const DashboardHeader = () => {
     return (<>
     
          <header className="flex items-center justify-between border-b border-gray-200 py-4 px-5">
               <h1 className="text-2xl font-bold">Dashboard</h1>

               {/* Create a red loguot buttno */}
               <button className="bg-red-500 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-red-600 transition">
                    Logout
               </button>
               
          </header>
          
     </>);
}

export default DashboardHeader;