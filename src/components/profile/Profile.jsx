import { Container } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

function profile() {
  const user = useSelector((state) => state.user);
  return (
    <Container sx={{ mt: 10 }}>
      <h1>User name : {user.user.name || user.user.user.name} </h1>
    </Container>
  );
}

export default profile;
