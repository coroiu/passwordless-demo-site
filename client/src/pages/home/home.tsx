import { useUserProvider } from "../../providers/user/user-provider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Dialog } from "@mui/material";
import { CredentialList } from "../../components/credential-list";

import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";

export function Home() {
  const [loading, setLoading] = useState(false);
  const userProvider = useUserProvider();
  const navigate = useNavigate();
  const [credentialDialogOpen, setCredentialDialogOpen] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  useEffect(() => {
    if (userProvider.currentUser === undefined) {
      navigate("/login");
    }
  }, [userProvider, navigate]);

  if (userProvider.currentUser === undefined) {
    return null;
  }

  function closeDialog() {
    if (loading) return;
    setCredentialDialogOpen(false);
  }

  async function createCredential() {
    setLoading(true);

    try {
      await userProvider.createCredential(newNickname);
    } catch {
      setLoading(false);
      return;
    }

    setLoading(false);
    closeDialog();
  }

  return (
    <React.Fragment>
      <div>
        <Typography variant="h3" component="h1">
          Welcome {userProvider.currentUser.name}!
        </Typography>
        <Box sx={{ mt: 3, mb: 3 }}>
          <CredentialList
            userId={userProvider.currentUser.userId}
          ></CredentialList>
        </Box>
        <Button
          variant="contained"
          onClick={() => setCredentialDialogOpen(true)}
        >
          Add credential
        </Button>
        <Button
          variant="contained"
          onClick={() => userProvider.logout()}
          color="inherit"
          sx={{ ml: 3 }}
        >
          Log out
        </Button>
      </div>

      <Dialog open={credentialDialogOpen} onClose={closeDialog}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createCredential();
          }}
        >
          <DialogTitle>Create credential</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new credential with which you can log in.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nickname"
              label="Nickname"
              type="text"
              fullWidth
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={loading} onClick={closeDialog}>
              Cancel
            </Button>
            <LoadingButton loading={loading} type="submit">
              Create
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
