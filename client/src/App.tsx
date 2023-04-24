import React from "react";
import "./App.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { UserProvider } from "./providers/user/user-provider";
import { Register } from "./pages/register/register";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
