import { Grid } from "@mui/material";

import Worker from "./common/Worker";

export const WorkerList = ({ workers }: any) => {
  const colors = ["#2C363F", "#E75A7C", "#F2F5EA", "#D6DBD2", "#BBC7A4"];

  return (
    workers &&
    workers.length > 0 &&
    workers.map((worker: any) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return (
        <Grid
          container
          spacing={1}
          sx={{ display: "inline-block", width: "30%", m: 0 }}
        >
          <Worker worker={worker} color={color} />
        </Grid>
      );
    })
  );
};
