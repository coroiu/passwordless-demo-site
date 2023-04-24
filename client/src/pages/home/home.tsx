import { useUserProvider } from "../../providers/user/user-provider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export function Home() {
  const userProvider = useUserProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (userProvider.currentUser === undefined) {
      navigate("/login");
    }
  }, [userProvider, navigate]);

  return (
    <div>
      <Typography variant="h3" component="h1">
        Welcome {userProvider.currentUser?.name}!
      </Typography>
      <Button variant="contained" onClick={() => userProvider.logout()}>
        Log out
      </Button>
    </div>
  );
}
