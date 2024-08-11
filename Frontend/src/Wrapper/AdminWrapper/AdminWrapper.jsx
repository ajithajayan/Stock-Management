import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import AdminPrivateRoute from "../../components/Private/AdminPrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { set_Authentication } from "../../Redux/authentication/authenticationSlice";
import { set_user_basic_details } from "../../Redux/userBasicDetails/userBasicDetailsSlice";
import axios from "axios";
import isAuthAdmin from "../../utils/isAuthAdmin";

import AdminSignin from "../../pages/admin/AdminSignin";
import { baseUrl } from "../../utils/constants/Constants";
import { Outlet, useRoutes } from "react-router-dom";
import Page404 from "../../components/404/Page404";
import ThemeProvider from "../../components/admin/elements/theme";
import "../../assets/Styles/main.scss";
import Doctor from "../../pages/admin/Doctor";
import Patient from "../../pages/admin/Patient";
import DashboardLayout from "../../pages/admin/DashboardLayout";
import Dashboard from "../../pages/admin/Dashboard";
import AdminLogRoute from "../../components/Private/AdminLogRoute";
import VarificationDoc from "../../pages/admin/VarificationDoc";
import Order from "../../pages/admin/Order";
import PendingOrder from "../../pages/admin/PendingOrder";
import BranchList from "../../components/Branch/BranchList";
import BrandList from "../../components/Brand/BrandList";
import CategoryList from "../../components/Categories/CategoryList";
import SupplierList from "../../components/Supplier/SupplierList";
import ProductList from "../../components/Products/ProductList";

function AdminWrapper() {
  const routes = useRoutes([
    {
      path: "/login",
      element: (
    
          <AdminSignin />
       
      ),
    },
    {
      element: (
    
          <ThemeProvider>
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          </ThemeProvider>
     
      ),
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/Brands", element: <BrandList/> },
        { path: "/Categories", element: <CategoryList/> },
        { path: "/Branches", element: <BranchList/> },
        { path: "/Suppliers", element: <SupplierList /> },
        { path: "/Products", element: <ProductList /> },
      ],
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return routes;
}

export default AdminWrapper;
