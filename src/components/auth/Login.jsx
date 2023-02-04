import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useDispatch } from "react-redux";
import { getUser } from "../../redux/features/userSlice";
import { topleftalert } from "../../utils/alert";
import { useState } from "react";
const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  function goToRegister() {
    navigate("/register");
  }

  async function handleRegisterSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const { email, password } = e.target;

    const formData = { email: email.value, password: password.value };

    if (!email.value.length || !password.value.length) {
      topleftalert({ message: "All fields are required", icon: "error" });
      setLoading(false);
      return;
    }

    const res = await fetch(`${BASE_API_URL}/user/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      Cookies.set("token", data.bearerToken);
      console.log(data.bearerToken);
      dispatch(getUser(data));
      setLoading(false);
      topleftalert({ message: data.message, icon: "success" });
      navigate("/");
    } else {
      setLoading(false);
      topleftalert({ message: data.err, icon: "error" });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          onSubmit={handleRegisterSubmit}
          component="form"
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Signing in...." : "Sign in"}
          </Button>
          <Grid container sx={{ placeContent: "center" }}>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} onClick={goToRegister}>
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
