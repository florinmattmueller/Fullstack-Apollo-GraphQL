import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import Form from "../Elements/Form";
import { SubButton, InputButton } from "../Elements/Buttons";
import BlockingMessage from "../Blocking";
import { CREATE_PHILOSOPHER } from "../../graphQL/mutations";
import { rHome, rScientists } from "../RoutesName";
import {
  PNameInput,
  LivedInInput,
  BiographicalDataInput,
  TopicsInput,
  BiographyInput,
  WorksInput,
} from "../Elements/Inputs";

const NewPhilosopher = () => {
  const history = useHistory();

  const userIdSession = sessionStorage.getItem("userId");

  if (userIdSession === null) {
    history.push(rHome);
  }

  let [isBlocking, setIsBlocking] = useState(false);
  const [name, setName] = useState("");
  const [livedIn, setLivedIn] = useState("");
  const [biographicalData, setBiographicalData] = useState("");
  const [topics, setTopics] = useState("");
  const [biography, setBiography] = useState("");
  const [works, setWorks] = useState("");
  const [createPhilosopher, { loading, error, data }] = useMutation(
    CREATE_PHILOSOPHER
  );

  function handleName(event) {
    setName(event.target.value);
    setIsBlocking(event.target.value.length > 0);
  }

  function handleLivedIn(event) {
    setLivedIn(event.target.value);
    setIsBlocking(event.target.value.length > 0);
  }

  function handleBiogracicalData(event) {
    setBiographicalData(event.target.value);
    setIsBlocking(event.target.value.length > 0);
  }

  function handleTopics(event) {
    setTopics(event.target.value);
    setIsBlocking(event.target.value.length > 0);
  }

  function handleBiography(event) {
    setBiography(event.target.value);
    setIsBlocking(event.target.value.length > 0);
  }

  function handleWorks(event) {
    setWorks(event.target.value);
    setIsBlocking(event.target.value.length > 0);
  }

  function handleButtonClick(event) {
    event.preventDefault();
    history.push(rScientists);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsBlocking(false);
    createPhilosopher({
      variables: { name, livedIn, biographicalData, topics, biography, works },
    })
      .then(({ data }) => {
        history.push(rScientists);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <BlockingMessage when={isBlocking} />
      <h2>Neuer Philosoph</h2>
      <PNameInput
        value={name}
        onChange={(e) => {
          handleName(e);
        }}
      />
      <LivedInInput
        value={livedIn}
        onChange={(e) => {
          handleLivedIn(e);
        }}
      />
      <BiographicalDataInput
        value={biographicalData}
        onChange={(e) => {
          handleBiogracicalData(e);
        }}
      />
      <TopicsInput
        value={topics}
        onChange={(e) => {
          handleTopics(e);
        }}
      />
      <BiographyInput
        value={biography}
        onChange={(e) => {
          handleBiography(e);
        }}
      />
      <WorksInput
        value={works}
        onChange={(e) => {
          handleWorks(e);
        }}
      />

      <InputButton
        className="div_button"
        onClick={(e) => handleButtonClick(e)}
      />
      <SubButton className="subButton" value="Erstelle Philosophen" />
    </Form>
  );
};

export default NewPhilosopher;