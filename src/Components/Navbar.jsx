import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../ContextProvider/AuthContextProvider";

export default function Navbar() {
  const { logout, isAuth } = useContext(authContext);

  return (
    <>
      <header className="bg-indigo-500 text-white shadow-xl absolute w-full">
        <div className="container mx-auto px-2">
          <div className="flex justify-between">
            <div className="logo">
              <Link className="m-4 font-bold">TODO</Link>
            </div>
            <nav>
              <ul className="flex items-center">
                <li>
                  <Link to={"/"} className="m-4">ADD</Link>
                </li>
                <li>
                  <Link to={"/tasklist"} className="m-4">
                    TASKLIST
                  </Link>
                </li>
                <li>
                  <Link className="m-4">SERVICE</Link>
                </li>
                <li>
                  <Link className="m-4">BLOG</Link>
                </li>

                <li>
                  <Link
                    onClick={logout}
                    className="m-1 bg-indigo-800 px-2 py-1 text-sm ml-2"
                  >
                    LOGOUT
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
