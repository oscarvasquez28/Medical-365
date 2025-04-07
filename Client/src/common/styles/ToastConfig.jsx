import React from 'react'
import { Toaster } from 'react-hot-toast';

const ToastConfig = () => {
  return (
    <Toaster
    position="bottom-left" // Toast position
    reverseOrder={false}
    toastOptions={{
      style: {
        background: "#333",
        color: "#fff",
        borderRadius: "8px",
        padding: "16px",
      },
      success: {
        style: {
          background: "#4caf50", // Green for success
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#4caf50",
        },
      },
      error: {
        style: {
          background: "#f44336", // red for error
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#f44336",
        },
      },
    }}
  />
  )
}

export default ToastConfig