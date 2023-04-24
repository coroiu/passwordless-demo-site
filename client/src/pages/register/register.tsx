import { useState } from "react";
import Button from "@mui/lab/LoadingButton";
import { useUserProvider } from "../../providers/user/user-provider";
import TextField from "@mui/material/TextField";

export function Register() {
  const userProvider = useUserProvider();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  async function submit() {
    if (loading) return;
    setLoading(true);

    await userProvider.register(email, name);
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
