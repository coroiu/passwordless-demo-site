import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import { useQuery } from "react-query";
import { CredentialModel } from "./credential";
import { Credential } from "./credential";

export function CredentialList({
  userId,
  onDelete = () => {},
}: {
  userId: string;
  onDelete?: (credentialId: string) => void;
}) {
  const { isLoading, data } = useQuery("repoData", () =>
    fetch("/api/user/credentials", { headers: { "user-id": userId } }).then(
      (res) => res.json() as Promise<CredentialModel[]>
    )
  );

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <React.Fragment>
      {data?.map((c) => (
        <Credential credential={c} onDelete={onDelete}></Credential>
      ))}
    </React.Fragment>
  );
}
