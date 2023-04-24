import { useEffect, useState } from "react";
import Button from "@mui/lab/LoadingButton";
import { useUserProvider } from "../../providers/user/user-provider";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

export function Register() {
  const userProvider = useUserProvider();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (userProvider.currentUser !== undefined) {
      navigate("/");
    }
  }, [userProvider, navigate]);

  async function submit() {
    if (loading) return;
    setLoading(true);

    const result = await userProvider.register(email, name);

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
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 3 }}
      ></TextField>

      <Button type="submit" variant="contained" loading={loading}>
        Register
      </Button>
    </form>
  );
}
