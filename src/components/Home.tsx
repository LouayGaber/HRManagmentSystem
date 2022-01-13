import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { rootState } from "../store";
import { WorkerForm } from "./WorkerForm";
import { WorkerList } from "./WorkerList";

export const Home = () => {
  const { userDetails, isLoggedIn } = useSelector(
    (state: rootState) => state.user
  );
  if (isLoggedIn && userDetails) {
    const { workers } = userDetails;
    if (workers && workers.length > 0) {
      return (
        <Grid
          container
          sx={{
            justifyContent: "center",
            overflowY: "auto",
            overflowWrap: "break-word",
          }}
        >
          <Grid
            sx={{
              width: "60%",
              paddingLeft: "20px",
              border: "2px 2px solid gray",
              boxShadow: "5px 5px gray",
            }}
          >
            <Box>
              <WorkerList workers={workers} />
            </Box>
          </Grid>
          <WorkerForm userid={workers[0]?.userid}></WorkerForm>
        </Grid>
      );
    }
  }

  return <div>please sign in</div>;
};
