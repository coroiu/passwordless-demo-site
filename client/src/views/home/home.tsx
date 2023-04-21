import { useUserProvider } from "../../providers/user/user-provider";

export function Home() {
  const userProvider = useUserProvider();

  console.log("current user", userProvider.currentUser);

  return (
    <div>
      Home
      {userProvider.currentUser ? (
        <button>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}
