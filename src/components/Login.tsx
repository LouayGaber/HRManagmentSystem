import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../actions/loginAction";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const theme = createTheme();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn, userDetails } = useSelector((state: any) => state?.user);
  const { message } = useSelector((state: any) => state?.user);

  const dispatch = useDispatch();

  const onChangeUsername = (e: any) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e: any) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username,
      password,
    };
    if (username && password) dispatch(LoginUser(data));
  };

  return (
    <ThemeProvider theme={theme}>
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
          <>
            <Typography component="h1" variant="h5">
              {isLoggedIn && userDetails?.username
                ? `${userDetails?.username} היי `
                : "כניסה"}
            </Typography>
            {!isLoggedIn ? (
              <Box
                component="form"
                onSubmit={handleLogin}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="UserName"
                  name="username"
                  autoComplete="email"
                  autoFocus
                  onChange={onChangeUsername}
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
                  onChange={onChangePassword}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography>לכניסה לפורטל העובדים</Typography>
                <Link to="/Home" property={userDetails}>
                  כניסה
                </Link>
              </Box>
            )}
          </>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Login;
