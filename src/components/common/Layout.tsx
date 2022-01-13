import { useState } from "react";

export const Layout = (children: any) => {
  const [companyName, setCompanyName] = useState("Colmobile");
  return (
    <header>
      <h1>ברוכים הבאים למערכת ניהול עובדים</h1>
      <h2>{companyName}</h2>
    </header>
  );
};
