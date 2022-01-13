import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addWorker } from "../actions/loginAction";

export const WorkerForm = ({ userid }: any) => {
  const dispatch = useDispatch();
  const [nameError, setNameError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const handleAddUser = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const date = data.get("joineddate");
    const content = data.get("content");
    const name = data.get("name");
    setDateError(false);
    setContentError(false);
    setNameError(false);
    if (!date) setDateError(true);
    if (!content) setContentError(true);
    if (!name) setNameError(true);
    if (!content || !name || !date) {
      return;
    } else {
      const userData = {
        content,
        joineddate: date,
        name,
        userid,
      };
      dispatch(addWorker(userid, userData));
    }
  };
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
        <>
          <Box
            component="form"
            onSubmit={handleAddUser}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              focused
              error={nameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="joineddate"
              label="Joined Date"
              type="date"
              id="joineddate"
              focused
              error={dateError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="content"
              label="Content"
              id="content"
              focused
              error={contentError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add User
            </Button>
          </Box>
        </>
      </Box>
    </Container>
  );
};
