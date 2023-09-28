import dbConnect from "@/middleware/mongo";
import Bill from "@/models/Bill";

const handler = async (req, res) => {
  if (req.method == "GET") {
    try {
      await dbConnect();

      const bill = await Bill.find({ paid: false });
      return res.status(200).json({ message: "Bill Fetched", bill });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else if (req.method == "POST") {
    const { table } = req.body;

    try {
      await dbConnect();

      const dish = await Bill.create({ table });

      return res.status(201).json({ message: "Dish Created", dish });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else {
    return res.status(405).json({ message: "This method is not allowed" });
  }
};

export default handler;
