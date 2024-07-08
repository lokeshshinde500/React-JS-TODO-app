import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/users").then((res) => {
      setUser(res.data);
    });
  }, []);

  function handleSignUp(e) {
    e.preventDefault();
    const errorMessage = {};

    // form validation
    if (!email) {
      errorMessage.email = "Email required !";
    }
    if (!password) {
      errorMessage.password = "Password required !";
    }

    const exitsEmail = user.find((v) => v.email === email);
    // already exits email
    if (exitsEmail) {
      SetEmail("");
      SetPassword("");
      alert("Email already registered !");
      return false;
    }

    // post user data in json file using axios
    if (Object.keys(errorMessage).length !== 0) {
      setError(errorMessage);
    } else {
      axios.post("http://localhost:8000/users", {
        email: email,
        password: password,
      });

      alert("Register successfully :)");
      SetEmail("");
      SetPassword("");
      setError(null);
      // navigate("/signin");
    }
  }

  return (
    <>
      <section className="section-sign-up h-screen bg-indigo-400 grid place-items-center">
        <div className="form-item bg-indigo-500 p-4 rounded">
          <div className="form-title text-center mb-2">
            <h2 className="text-xl font-bold text-indigo-900">SIGN UP</h2>
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
              <p className="text-red-700">
                {error && error.email ? error.email : ""}
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
              <p className="text-red-700">
                {error && error.password ? error.password : ""}
              </p>
            </div>
            <div className="submit-btn text-center mb-2">
              <button
                className="text-sm bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-1 px-2 mt-3 rounded"
                type="submit"
              >
                SIGN UP
              </button>
            </div>
            <div className="already-user flex justify-between ">
              <span className="text-sm">already registered ?</span>
              <Link className="text-sm text-indigo-900" to={"/signin"}>
                sign in here
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
