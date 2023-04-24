import { useUserProvider } from "../../providers/user/user-provider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { CredentialList } from "../../components/credential-list";

export function Home() {
  const userProvider = useUserProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (userProvider.currentUser === undefined) {
      navigate("/login");
    }
  }, [userProvider, navigate]);

  if (userProvider.currentUser === undefined) {
    return null;
  }

  return (
    <div>
      <Typography variant="h3" component="h1">
        Welcome {userProvider.currentUser?.name}!
      </Typography>
      <Box sx={{ mt: 3, mb: 3 }}>
        <CredentialList
          userId={userProvider.currentUser.userId}
        ></CredentialList>
      </Box>
      <Button variant="contained" onClick={() => userProvider.logout()}>
        Log out
      </Button>
    </div>
  );
}
