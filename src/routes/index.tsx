import { FileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";
import { SideBar } from "../components/SideBar";
import { useEffect } from "react";

const Home: React.FunctionComponent = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.authInitializing && !auth.token) {
      navigate({ to: "/auth/sign-in" });
    }
  }, [auth, navigate]);
  return (
    <div className="w-full pl-52">
      <div className="fixed top-0 left-0 right-0 w-52 bottom-0 bg-gray-900">
        <SideBar />
      </div>
      <div className="bg-gray-200 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export const Route = new FileRoute("/").createRoute({
  component: Home,
});
