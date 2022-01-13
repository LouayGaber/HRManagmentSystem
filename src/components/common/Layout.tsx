import { Button } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Logout } from "../../actions/loginAction";
import { rootState } from "../../store";

export const Layout = (children: any) => {
  const [companyName, setCompanyName] = useState("Colmobile");
  const isLoggedin = useSelector((state: rootState) => state.user?.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBtn = () => {
    if (isLoggedin) {
      dispatch(Logout());
    }
    navigate("/");
  };
  return (
    <header>
      <h1>ברוכים הבאים למערכת ניהול עובדים</h1>
      <div style={{ paddingBottom: "20px" }}>
        <h2>{companyName}</h2>
        {window.location.pathname == "/Home" && (
          <Button variant="contained" onClick={handleBtn}>
            {isLoggedin ? "logOut" : "logIn"}
          </Button>
        )}
      </div>
    </header>
  );
};
