import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { CHANGE_EMAIL } from "../../graphQL/mutations";
import Form from "../Elements/Form";
import Email from "../Elements/Email";
import PasswordInput from "../Elements/Password";
import { SubButton, InputButton } from "../Elements/Buttons";
import { userId } from "../Login";

function ChangeEmail() {
  const history = useHistory();

  if (!userId) {
    history.push("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changeEmail, { loading, error, data }] = useMutation(CHANGE_EMAIL, {
    variables: { _id: userId, email: email, password: password },
  });

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    changeEmail()
      .then(({ data }) => {
        // history.push("/Benutzerbereich");
        history.push("/Hauptbereich")
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleQuitButton(event) {
    event.preventDefault();
    // history.push("/Benutzerbereich");
    history.push("/Hauptbereich")
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <h2>Email-ändern</h2>
      {loading && <p></p>}
      {error && <p>Email oder Passwort inkorrekt.</p>}
      <Email value={email} onChange={(e) => handleChangeEmail(e)}>
        Neue Email:
      </Email>
      <PasswordInput
        name="password"
        value={password}
        onChange={(e) => handleChangePassword(e)}
      >
        {" "}
        Passwort:
      </PasswordInput>
      <InputButton onClick={(e) => handleQuitButton(e)} />
      <SubButton />
    </Form>
  );
}

export default ChangeEmail;
