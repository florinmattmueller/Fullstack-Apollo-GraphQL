import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import Form from "../Elements/Form";
import { SubButton, InputButton } from "../Elements/Buttons";
import BlockingMessage from "../Blocking";
import { CHANGE_SCIENTIST } from "../../graphQL/mutations";
import {
  FETCH_ALL_SCIENTISTS,
  SEARCH_SCIENTIST_BY_NAME,
  USERFINDBYID,
} from "../../graphQL/queries";
import { rHome, rScientists } from "../RoutesName";
import {
  LivedInInput,
  BiographicalDataInput,
  TopicsInput,
  BiographyInput,
} from "../Elements/Inputs";
import SelectName from "../Elements/SelectName";
import TextareaBiography from "../Elements/Textarea";
import Footer from "../Elements/Footer";

const ChangeScientist = () => {
  const history = useHistory();

  const userIdSession = sessionStorage.getItem("userId");
  const userIdToken = sessionStorage.getItem("token");

  const userfindById = useQuery(USERFINDBYID, {
    variables: { _id: userIdSession, token: userIdToken },
  });

  if (userfindById.error) {
    history.push(rHome);
  }

  const FetchAllScientists = useQuery(FETCH_ALL_SCIENTISTS);

  let names = [];
  if (FetchAllScientists.data) {
    const iterator = FetchAllScientists.data.allScientists.values();

    for (const value of iterator) {
      names.push(<option>{value.name}</option>);
    }
  }

  let [isBlocking, setIsBlocking] = useState(false);
  const [name, setName] = useState("");
  const SearchScientistByName = useQuery(SEARCH_SCIENTIST_BY_NAME, {
    variables: { name },
  });

  const [livedIn, setLivedIn] = useState("");
  const [biographicalData, setBiographicalData] = useState("");
  const [topics, setTopics] = useState("");
  const [biography, setBiography] = useState("");
  const [changeScientist, { loading, error, data }] = useMutation(
    CHANGE_SCIENTIST
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

  function handleButtonClick(event) {
    event.preventDefault();
    history.push(rScientists);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsBlocking(false);
    changeScientist({
      variables: {
        userId: userIdSession,
        name,
        livedIn,
        biographicalData,
        topics,
        biography,
      },
    })
      .then(({ data }) => {
        history.push(rScientists);
        window.location.reload(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <BlockingMessage when={isBlocking} />
        <h2>Ändere Wissenschaftler über Namen</h2>
        {FetchAllScientists.loading && <p>Loading...</p>}
        <SelectName
          value={name}
          onChange={(e) => {
            handleName(e);
          }}
        >
          {names}
        </SelectName>
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
        {/* <BiographyInput
        value={biography}
        onChange={(e) => {
          handleBiography(e);
        }}
      /> */}
        <TextareaBiography
          value={biography}
          onChange={(e) => {
            handleBiography(e);
          }}
        />
        <div className="buttonBar">
          <InputButton onClick={(e) => handleButtonClick(e)} />
          <SubButton value="Ändere Wissenschaftler" />
        </div>
      </Form>
      <Footer />
    </div>
  );
};

export default ChangeScientist;
