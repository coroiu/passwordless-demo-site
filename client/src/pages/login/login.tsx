import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { useUserProvider } from "../../providers/user/user-provider";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const userProvider = useUserProvider();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userProvider.currentUser !== undefined) {
      navigate("/");
    }
  }, [userProvider, navigate]);

  async function submit() {
    if (loading) return;
    setLoading(true);

    const result = await userProvider.login(email);

    if (!result) {
      return setLoading(false);
    }

    navigate("/");
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        submit();
        return false;
      }}
    >
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>

      <LoadingButton type="submit" variant="contained" loading={loading}>
        Login
      </LoadingButton>
      <Button
        type="submit"
        variant="contained"
        color="inherit"
        component={Link}
        disabled={loading}
        sx={{ ml: 2 }}
        to="/register"
      >
        Register
      </Button>
    </form>
  );
}
