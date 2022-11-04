import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
const MeetupDetails = (props) => {
  // const router = useRouter();
  // router.query.meetupID = props.id;
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://sadory:123456123456@cluster0.mnnk48w.mongodb.net/meetsupDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetsupCollection = db.collection("meetsupCollection");
  const meetsupIDFromDB = await meetsupCollection
    .find({}, { _id: 1 })
    .toArray();
  client.close();
  return {
    fallback: true,
    paths: meetsupIDFromDB.map((meetupId) => ({
      params: {
        meetupID: meetupId._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupID;
  const client = await MongoClient.connect(
    "mongodb+srv://sadory:123456123456@cluster0.mnnk48w.mongodb.net/meetsupDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetsupCollection = db.collection("meetsupCollection");
  const meetupFromDB = await meetsupCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: meetupFromDB._id.toString(),
        image: meetupFromDB.image,
        title: meetupFromDB.title,
        address: meetupFromDB.address,
        description: meetupFromDB.description,
      },
    },
  };
}
export default MeetupDetails;
