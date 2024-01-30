import { Outlet } from "@tanstack/react-router";
import { SideBar } from "./SideBar";
import { useAuth } from "../contexts/AuthContext";
import { SignIn } from "./SignIn";

export const EntryPoint: React.FunctionComponent = () => {
  const auth = useAuth();
  if (auth.authInitializing) {
    return null;
  }
  if (!auth.myProfile) {
    return <SignIn />;
  }
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
