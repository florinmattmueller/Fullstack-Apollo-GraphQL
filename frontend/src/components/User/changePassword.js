import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { USERFINDBYID } from "../../graphQL/queries";
import { CHANGE_PASSWORD } from "../../graphQL/mutations";
import Form from "../Elements/Form";
import PasswordInput from "../Elements/Password";
import { SubButton, InputButton } from "../Elements/Buttons";
import Footer from "../Elements/Footer";
import BlockingMessage from "../Blocking";
import { rHome, rUserData } from "../RoutesName";

function ChangePassword() {
  const history = useHistory();

  const userIdSession = sessionStorage.getItem("userId");
  const userIdToken = sessionStorage.getItem("token");

  const userfindById = useQuery(USERFINDBYID, {
    variables: { _id: userIdSession, token: userIdToken },
  });

  if (userfindById.error) {
    history.push(rHome);
  }

  let [isBlocking, setIsBlocking] = useState(false);
  const [passwordv, setPasswordv] = useState("");
  const [password, setPassword] = useState("");
  const [passwordb, setPasswordb] = useState("");
  const [ChangePassword, { loading, error, data }] = useMutation(
    CHANGE_PASSWORD,
    {
      variables: {
        _id: userIdSession,
        password: passwordv,
        newPassword: password,
      },
    }
  );

  function handleChangePasswordv(event) {
    setPasswordv(event.target.value);
    setIsBlocking(event.target.value.length > 0);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
    setIsBlocking(event.target.value.length > 0);
  }

  function handleChangePasswordb(event) {
    setPasswordb(event.target.value);
    setIsBlocking(event.target.value.length > 0);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsBlocking(false);
    if (password != passwordb) {
      return null;
    }
    ChangePassword()
      .then(({ data }) => {
        // history.push(rUserSpace);
        history.push(rUserData);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleQuitButton(event) {
    event.preventDefault();
    // history.push(rUserSpace);
    history.push(rUserData);
  }

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <BlockingMessage when={isBlocking} />
        <h2>Passwort ändern:</h2>
        {loading && <p></p>}
        {error && <p className="errorMessage">Passwort inkorrekt.</p>}
        <PasswordInput
          name="passwordv"
          value={passwordv}
          onChange={(e) => handleChangePasswordv(e)}
        >
          Altes Passwort:
        </PasswordInput>
        <PasswordInput
          name="password"
          value={password}
          onChange={(e) => handleChangePassword(e)}
        >
          {" "}
          Neues Passwort:{" "}
        </PasswordInput>
        <PasswordInput
          name="passwordb"
          value={passwordb}
          onChange={(e) => handleChangePasswordb(e)}
        >
          {" "}
          Passwort Bestätigen:{" "}
        </PasswordInput>
        <div className="buttonBar">
          <InputButton onClick={(e) => handleQuitButton(e)} />
          <SubButton className="div_button" />
        </div>
      </Form>
      <Footer />
    </div>
  );
}

export default ChangePassword;
