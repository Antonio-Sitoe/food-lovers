import React from "react";
import EmailCreate from "./EmailCreate";
import EmailLogin from "./EmailLogin";

const EmailWrapper = ({ setOpen }) => {
  const [havaAccount, setHaveAccount] = React.useState(false);

  function handleHaveAccount(e) {
    e.preventDefault();
    setHaveAccount(!havaAccount);
  }

  if (havaAccount) {
    return (
      <EmailLogin handleHaveAccount={handleHaveAccount} setOpen={setOpen} />
    );
  }
  return (
    <EmailCreate setOpen={setOpen} handleHaveAccount={handleHaveAccount} />
  );
};

export default EmailWrapper;
