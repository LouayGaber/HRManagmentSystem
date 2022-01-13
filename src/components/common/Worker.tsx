import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit, Save } from "@material-ui/icons";
import { ButtonBase } from "@material-ui/core";
import { Delete, UpdateWorker } from "../../actions/loginAction";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Worker = ({ worker, color }: any) => {
  const dispatch = useDispatch();
  const { joineddate, content, name, id, userid } = worker;
  const [userContent, setContent] = useState(content);
  const [userJoinedDate, setJoinedDate] = useState(joineddate);
  const [userName, setName] = useState(name);
  const [newUserName, setnewUserName] = useState(name);
  const [newuserJoinedDate, setnewJoinedDate] = useState(joineddate);
  const [newuserContent, setnewuserContent] = useState(content);

  const handleDelete = () => {
    dispatch(Delete(id, userid));
  };
  const handleEditContent = (e: any) => {
    setContent(e.currentTarget.textContent);
  };
  const handleEditName = (e: any) => {
    setName(e.currentTarget.textContent);
  };
  const handleEditDate = (e: any) => {
    setJoinedDate(e.currentTarget.textContent);
  };
  const [contentEditable, setContentEditable] = useState(false);
  const handleEdit = () => {
    if (contentEditable) {
      setContentEditable(!contentEditable);
      setnewuserContent(userContent);
      setnewJoinedDate(userJoinedDate);
      setnewUserName(userName);
      const data = {
        name: userName,
        content: userContent,
        joineddate: userJoinedDate,
      };
      dispatch(UpdateWorker(id, data));
    } else {
      setContentEditable(!contentEditable);
    }
  };
  useEffect(() => {
    if (joineddate && content && name) {
      setnewuserContent(content);
      setnewJoinedDate(joineddate);
      setnewUserName(name);
    }
  }, [worker]);
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "10px",
        textAlign: "left",
        width: "200px",
        maxHeight: "200px",
        display: "inline-block",
        backgroundColor: color,
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "bolder" }}
          onInput={handleEditName}
          contentEditable={contentEditable}
          suppressContentEditableWarning={true}
        >
          {newUserName}
        </Typography>
        <Typography style={{ color: "gray", display: "flex" }}>
          Joined in
          <Typography
            contentEditable={contentEditable}
            onInput={handleEditDate}
            suppressContentEditableWarning={true}
          >
            {"  "}
            {newuserJoinedDate}
          </Typography>
        </Typography>
        <Typography
          style={{ marginTop: "5px", paddingBottom: "5px" }}
          contentEditable={contentEditable}
          suppressContentEditableWarning={true}
          onInput={handleEditContent}
        >
          {newuserContent}
        </Typography>
        <Divider></Divider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            paddingTop: "5px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <ButtonBase onClick={handleDelete}>
              <DeleteIcon></DeleteIcon>
              <Typography>remove</Typography>
            </ButtonBase>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <ButtonBase onClick={handleEdit}>
              {contentEditable ? (
                <>
                  <Save></Save>
                  <Typography>save</Typography>
                </>
              ) : (
                <>
                  <Edit fontSize="small"></Edit>
                  <Typography>edit</Typography>
                </>
              )}
            </ButtonBase>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default Worker;
