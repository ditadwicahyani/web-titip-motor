// import
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import Motorbike from "views/Dashboard/Motorbike";
import Customer from "views/Dashboard/Customer";
import AddCustomer from "views/Dashboard/Customer/addCustomer";
import Transaction from "views/Dashboard/Transaction";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";
import EditCustomer from "views/Dashboard/Customer/editCustomer";
import AddMotorbike from "views/Dashboard/Motorbike/addMotorbike";
import EditMotorbike from "views/Dashboard/Motorbike/editMotorbike";
import AddTransaction from "views/Dashboard/Transaction/addTransaction";
import EditTransaction from "views/Dashboard/Transaction/editTransaction";
import DetailTransaction from "views/Dashboard/Transaction/detailTransaction";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
    isFeature: false
  },
  {
    path: "/motor",
    name: "Kategori Motor",
    icon: <StatsIcon color="inherit" />,
    component: Motorbike,
    layout: "/admin",
    isFeature: false
  },
  {
    path: "/addmotor",
    name: "Kategori Motor",
    component: AddMotorbike,
    layout: "/admin",
    isFeature: true
  },
  {
    path: "/editmotor",
    name: "Kategori Motor",
    component: EditMotorbike,
    layout: "/admin",
    isFeature: true
  },
  {
    path: "/customer",
    name: "Customer",
    icon: <PersonIcon color="inherit" />,
    component: Customer,
    layout: "/admin",
    isFeature: false
  },
  {
    path: "/addcustomer",
    name: "Customer",
    component: AddCustomer,
    layout: "/admin",
    isFeature: true
  },
  {
    path: "/editcustomer",
    name: "Customer",
    component: EditCustomer,
    layout: "/admin",
    isFeature: true
  },
  {
    path: "/transactions",
    name: "Transaksi",
    icon: <CreditIcon color="inherit" />,
    component: Transaction,
    layout: "/admin",
    isFeature: false
  },
  {
    path: "/addtransaction",
    name: "Transaksi",
    component: AddTransaction,
    layout: "/admin",
    isFeature: true
  },
  {
    path: "/edittransaction",
    name: "Transaksi",
    component: EditTransaction,
    layout: "/admin",
    isFeature: true
  },
  {
    path: "/detailtransaction",
    name: "Transaksi",
    component: DetailTransaction,
    layout: "/admin",
    isFeature: true
  },
  // {
  //   path: "/signin",
  //   name: "Sign In",
  //   icon: <DocumentIcon color="inherit" />,
  //   component: SignIn,
  //   layout: "/auth",
  //   isFeature: false
  // },
];
export default dashRoutes;
