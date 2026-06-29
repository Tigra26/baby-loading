"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastProvider.css";

export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      closeOnClick
      pauseOnHover
      theme="light"
      toastClassName="customToast"
      progressClassName="customToastProgress"
    />
  );
}
