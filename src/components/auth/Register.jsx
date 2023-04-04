import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { topleftalert } from "../../utils/alert";
import { useState } from "react";
const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleRegisterUser(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const data = { name, email, password };

    const res = await fetch(`${BASE_API_URL}/user/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    if (res.ok) {
      setLoading(false);
      navigate("/signin");
    } else {
      topleftalert({ message: response.err, icon: "error" });
      setLoading(false);
    }
  }

  return (
    <Container component={"main"} maxWidth="xs">
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
        <Typography component={"h1"} variant="h5">
          Sign Up
        </Typography>
        <Box component={"form"} sx={{ mt: 3 }} onSubmit={handleRegisterUser}>
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <TextField
                name="name"
                id="name"
                autoFocus
                label="Your Name"
                fullWidth
                required
                autoComplete="given-name"
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="email"
                type="email"
                id="email"
                label="Email"
                fullWidth
                required
                autoComplete="email"
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="password"
                id="password"
                label="password"
                fullWidth
                required
                type="password"
                autoComplete="new-password "
              ></TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "loading..." : "Register"}
          </Button>

          <Grid container justifyContent="center">
            <Grid item sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/signin")}
              >
                Already have an account? Sign In
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
