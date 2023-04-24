import { Link } from "react-router-dom";
import { useUserProvider } from "../../providers/user/user-provider";

export function Home() {
  const userProvider = useUserProvider();

  return (
    <div>
      Home
      {userProvider.currentUser ? (
        <button>Logout</button>
      ) : (
        <div>
          <Link to={"/register"}>Login</Link>
          <br />
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </div>
  );
}
