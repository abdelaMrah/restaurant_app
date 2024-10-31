import { createBrowserRouter, Outlet } from "react-router-dom";
import SideBar from "./Layouts/SideBar";
import { Commandes } from "./pages/commandes/Commandes";
import NewOrder from "./pages/commandes/pages/nouvel_commande";
import CurrentOrders from "./pages/commandes/pages/CommandeList";
import Dashboard from "./pages/dashboard/Dasboard";
import OrderHistory from "./pages/commandes/pages/history";
import Login from "./pages/login/loginPage";
import MenuManagement from "./pages/menu/pages/MenuManagement";
import { Menu } from "./pages/menu/Menu";
 import InventoryManagement from "./pages/inventory/pages/InventoryManagement";
import { Inventory } from "./pages/inventory/Inventory";
import RestockOrderManagement from "./pages/inventory/pages/restock-reorder";
import LowStockAlerts from "./pages/inventory/lowStockAlert";
import { Users } from "./pages/users/Users";
import StaffManagement from "./pages/users/pages/staffManagement";
import { Settings } from "./pages/settings/profile-settings";
import UserProfileAndSettings from "./pages/settings/pages/profiles";
import { AuthContextProvider } from "./context/authContext";
import StaffScheduling from "./pages/users/pages/staff-sheduling";
import RolePermissionManagement from "./pages/users/pages/role-permission";
import { Analytics } from "./pages/analytics/Analytics";
import AnalyticsDashboard from "./pages/analytics/pages/analytics-dashboard";
import PeakHoursAnalysis from "./pages/analytics/pages/peak-hours";
import RestaurantSettings from "./pages/settings/restaurant-setting";
import OnlineOrders from "./pages/commandes/pages/online-order";
import { Table } from "./pages/tables/Tables";
import RestaurantTables from "./pages/tables/pages/RestaurantTables";
import SalaryManagement from "./pages/users/pages/salary.management";
import Sidebar from "./Layouts/SideBar2";
 
export const routers= createBrowserRouter([
   {
    path:'',
    element:<AuthContextProvider>
        <Outlet/>
    </AuthContextProvider>,
    children:[
        {
            path:'',
            element:<SideBar/>,
            children:[
                {
                    path:'',
                    element:<Dashboard/>
                },
                {
                    path:'commandes',
                    element:<Commandes/>,
                    children:[
                        {
                            path:'',
                            element:<CurrentOrders/>
                        },
                        {
                            path:'online',
                            element:<OnlineOrders/>
                        },
                        {
                            path:'new',
                            element:<NewOrder />
                        },
                        {
                            path:'history',
                            element:<OrderHistory/>
                        }
                    ],
                },
                {
                    path:'menu',
                    element:<Menu/>,
                    children:[
                        {
                            path:'',
                            element:<></>,
                        },
                        {
                            path:'management',
                            element:<MenuManagement/>
                        }
                    ]
                },
                {
                    path:'inventory',
                    element:<Inventory/>,
                    children:[
                        {
                            path:'',
                            element:<></>
                        },
                        {
                            path:'management',
                            element:<InventoryManagement/>
                        },
                        {
                            path:'reorder',
                            element:<RestockOrderManagement/>
                        },
                        {
                            path:'alert',
                            element:<LowStockAlerts/>
                        }
                    ]
                },
                {
                    path:'users',
                    element:<Users/>,
                    children:[
                        {
                            path:'',
                            element:<StaffManagement/>
                        },
                        {
                            path:'programme',
                            element:<StaffScheduling/>
                        },
                        {
                            path:'permissions',
                            element:<RolePermissionManagement/>
                        },
                        {
                            path:'salary',
                            element:<SalaryManagement/>
                        }
                    ]
                },
                {
                    path:'analyse',
                    element:<Analytics/>,
                    children:[
                        {
                            path:'',
                            element:<AnalyticsDashboard/>
                        },
                        {
                            path:'pointe',
                            element:<PeakHoursAnalysis/>
                        }

                    ]
                },
                {
                    path:'paramettres',
                    element:<Settings/>,
                    children:[
                        {
                            path:'',
                            element:<RestaurantSettings/>
                        },
                        {
                            path:'profile',
                            element:<UserProfileAndSettings/>
                        }
                    ]
                },
                {
                    path:'tables',
                    element:<Table/>,
                    children:[
                        {
                            path:'',
                            element:<RestaurantTables/>
                        }
                    ]
                }
            ]
        },
        {
            path:'login',
            element:<Login/>
        },
        {
            path:'sidebar',
            element:<Sidebar onClose={()=>{} } open={false}/>
        }
    ]
   }
])