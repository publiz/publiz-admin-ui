import { Link } from "@tanstack/react-router";
import { useAuth } from "../contexts/AuthContext";
import { routeTree } from "../routeTree.gen";

export const SideBar: React.FunctionComponent = () => {
  const auth = useAuth();
  const routePaths = (routeTree.children || [])
    .map((child) => child.fullPath)
    .filter((path) => path !== "/");
  return (
    <div className="px-2 py-2 flex flex-col h-full">
      <h3 className="text-white text-xl mb-3">Publiz</h3>
      <div className="flex-1 text-gray-300">
        <ul>
          {routePaths.map((path) => (
            <li key={path}>
              <Link to={path} className="py-2 flex">
                {path}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex space-x-2">
        <div className="bg-purple-800 w-10 h-10 rounded-full grid place-content-center text-lg text-white">
          AG
        </div>

        <button
          onClick={auth.signOut}
          className="bg-gray-800 w-full rounded-md  text-gray-200 flex-1"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};
