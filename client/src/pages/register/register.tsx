import { useState } from "react";
import { useUserProvider } from "../../providers/user/user-provider";

export function Register() {
  const userProvider = useUserProvider();
  const [loading, setLoading] = useState(false);

  function submit() {
    if (loading) return;
    setLoading(true);

    userProvider.login();
  }

  return (
    <form>
      <div>
        <label>Email</label>
        <input type="text" name="email" />
      </div>

      <div>
        <label>Name</label>
        <input type="text" name="name" />
      </div>

      <div>
        <button type="submit" disabled={loading} onClick={submit}>
          Register
        </button>
      </div>
    </form>
  );
}
