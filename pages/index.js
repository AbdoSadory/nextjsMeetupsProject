import { MongoClient } from "mongodb";
import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_DATA = [
//   {
//     id: "m1",
//     title: "first meeting",
//     image:
//       "https://cdn.vox-cdn.com/thumbor/NlloDN7QuPk4txV6PohltW8aqo4=/0x0:4428x1993/920x613/filters:focal(1872x1198:2580x1906):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63371518/shutterstock_785442694.0.jpg",
//     address: "some address 10 10 10 10 10",
//     description: "this is a first meeting",
//   },
//   {
//     id: "m2",
//     title: "second meeting",
//     image:
//       "https://cdn.vox-cdn.com/thumbor/NlloDN7QuPk4txV6PohltW8aqo4=/0x0:4428x1993/920x613/filters:focal(1872x1198:2580x1906):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63371518/shutterstock_785442694.0.jpg",
//     address: "some address 10 10 10 10 10",
//     description: "this is a second meeting",
//   },
//   {
//     id: "m3",
//     title: "third meeting",
//     image:
//       "https://cdn.vox-cdn.com/thumbor/NlloDN7QuPk4txV6PohltW8aqo4=/0x0:4428x1993/920x613/filters:focal(1872x1198:2580x1906):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63371518/shutterstock_785442694.0.jpg",
//     address: "some address 10 10 10 10 10",
//     description: "this is a third meeting",
//   },
// ];

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetups Main Page</title>
        <meta name="description" content="meets up for yooooooooooooooooooou" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://sadory:123456123456@cluster0.mnnk48w.mongodb.net/meetsupDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetsupCollection = db.collection("meetsupCollection");
  const meetsupFromDB = await meetsupCollection.find().toArray();
  client.close();
  console.log("revalided !");
  return {
    props: {
      meetups: meetsupFromDB.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
