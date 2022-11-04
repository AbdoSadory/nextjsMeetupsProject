// /api/new-meetup
// only run on server
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  //   req contains data about incoming req
  //   res is response obj which is needed to send back response
  //   req.method to know what type of req
  //   req.body contains the data of incoming req
  if (req.method === "POST") {
    const data = req.body;
    //   Don't EVER run this line in client side to not expose your credebtials to your visitors
    //    returns promise
    const client = await MongoClient.connect(
      "mongodb+srv://sadory:123456123456@cluster0.mnnk48w.mongodb.net/meetsupDatabase?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetsupCollection = db.collection("meetsupCollection");
    const result = await meetsupCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "done insertion" });
  }
};

export default handler;
