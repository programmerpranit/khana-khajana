import dbConnect from "@/middleware/mongo";
import Bill from "@/models/Bill";

const handler = async (req, res) => {
  const { id } = req.query;

  // get bill by table number
  if (req.method == "GET") {
    try {
      await dbConnect();

      const bill = await Bill.findOne({ table: id, paid: false });
      return res.status(200).json({ message: "Bill Fetched", bill });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else if (req.method == "POST") {
    const { dish: dishId, quantity, price, dishName } = req.body;

    try {
      await dbConnect();

      const oldBill = await Bill.findById(id);

      const existingDish = oldBill.dishes.find((dish) => dish.dish == dishId);

      if (existingDish) {
        const billlss = await Bill.updateOne(
          {
            _id: id,
            "dishes.dish": dishId,
          },

          {
            $set: {
              "dishes.$.quantity": existingDish.quantity + quantity,
              total: oldBill.total + quantity * existingDish.price,
            },
          }
        );

        return res.status(201).json({ message: "Dish Added", billlss });
      }

      const bill = await Bill.findByIdAndUpdate(id, {
        $push: {
          dishes: {
            dish: dishId,
            quantity,
            dishName,
            price,
          },
        },
        $inc: {
          total: price * quantity,
        },
      });
      return res.status(201).json({ message: "Dish Added", bill });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Unkown Error Occured" });
    }
  } else if (req.method == "PUT") {
    const bill = await Bill.findByIdAndUpdate(id, { $set: { paid: true } });
    return res.status(200).json({ message: "Bill Paid" });
  } else {
    return res.status(405).json({ message: "This method is not allowed" });
  }
};

export default handler;
