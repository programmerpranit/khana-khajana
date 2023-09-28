import dbConnect from "@/middleware/mongo";
import Dish from "@/models/Dish";

const handler = async (req, res) => {
  if (req.method == "GET") {
    try {
      await dbConnect();

      const dish = await Dish.find();
      return res.status(200).json({ message: "Dish Fetched", dish });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else if (req.method == "POST") {
    const { name, price, category } = req.body;

    try {
      await dbConnect();

      const dish = await Dish.create({ name, price, category });

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
