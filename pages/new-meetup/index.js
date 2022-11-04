// https:http://localhost:3000/new-meetup
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";
const NewMeetup = () => {
  const router = useRouter();
  const onAddMeetupHandler = async (enteredMeetUpData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.replace("/");
  };
  return (
    <Fragment>
      <Head>
        <title>add your Meetup details</title>
        <meta
          name="description"
          content="detailssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
        />
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
