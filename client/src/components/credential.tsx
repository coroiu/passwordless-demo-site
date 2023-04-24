import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import KeyIcon from "@mui/icons-material/Key";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

export interface CredentialModel {
  aaGuid: string;
  country: string;
  createdAt: string;
  credType: string;
  descriptor: {
    id: string;
    type: string;
  };
  device: string;
  lastUsedAt: string;
  origin: string;
  publicKey: string;
  rpid: string;
  signatureCounter: number;
  userHandle: string;
  userId: string;
  nickname: string;
}

export function Credential({
  credential,
  onDelete = () => {},
}: {
  credential: CredentialModel;
  onDelete?: (credentialId: string) => void;
}) {
  return (
    <Card sx={{ display: "flex", backgroundColor: "whitesmoke" }}>
      <CardMedia>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            ml: 3,
            mr: 2,
          }}
        >
          <KeyIcon fontSize="large" />
        </Box>
      </CardMedia>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {credential.nickname}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {credential.createdAt}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton
            color="error"
            onClick={() => onDelete(credential.descriptor.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
