import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../ContextProvider/AuthContextProvider";

export default function SignIn() {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [Error, setError] = useState(null);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(authContext);

  useEffect(() => {
    axios.get("http://localhost:8000/users").then((res) => {
      setUser(res.data);
    });
  }, []);

  function handleSignUp(e) {
    e.preventDefault();
    // form validation
    const errorMessage = {};

    if (!email) {
      errorMessage.email = "Email required !";
    }
    if (!password) {
      errorMessage.password = "Password required !";
    }

    if (Object.keys(errorMessage).length !== 0) {
      setError(errorMessage);
      return false;
    }

    // if valid then verify
    const verifyUser = user.find(
      (v) => v.email === email && v.password === password
    );

    console.log(verifyUser)

    if (verifyUser) {
      console.log("login successfully..");//////////////////////////////
      // token generate reqrus api
      axios
        .post("https://reqres.in/api/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data.token);/////////////////////////////////////
          login(res.data.token);
          navigate("/");
        });
    } else {
      console.log("invalid details !!");
    }
  }

  return (
    <>
      <section className="section-sign-up h-screen bg-indigo-400 grid place-items-center">
        <div className="form-item bg-indigo-500 p-4 rounded">
          <div className="form-title text-center mb-2">
            <h2 className="text-xl font-bold text-indigo-900">SIGN IN</h2>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="input-group">
              <input
                value={email}
                type="text"
                onChange={(e) => SetEmail(e.target.value)}
                className="outline-none my-1 px-2"
                placeholder="Enter Email"
              />
              <p className="text-red-700 text-sm">
                {Error && Error.email ? Error.email : ""}
              </p>
            </div>
            <div className="input-group">
              <input
                value={password}
                type="text"
                onChange={(e) => SetPassword(e.target.value)}
                className="outline-none my-1 px-2"
                placeholder="Enter Password"
              />
              <p className="text-red-700 text-sm">
                {Error && Error.password ? Error.password : ""}
              </p>
            </div>
            <div className="submit-btn text-center mb-2">
              <button
                className="text-sm bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-1 px-2 mt-3 rounded"
                type="submit"
              >
                SIGN IN
              </button>
            </div>
            <div className="already-user flex justify-between ">
              <span className="text-sm">New user ?</span>
              <Link className="text-sm text-indigo-900" to={"/signup"}>
                sign up here
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
