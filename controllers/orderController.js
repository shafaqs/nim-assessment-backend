const Order = require("../db/models/orders.js");

const getAll = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const order = await Order.getOne(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};


const update = async (req, res) => {
  try {
    const updatedOrder = await Order.update(req.params.id, req.body);
    res.send(updatedOrder);
  } catch (error) {
    res.status(500).send("An error occurred while updating the order.");
  }
};



const remove = async (req, res) => {
  try {
    const order = await Order.remove(req.params.id);
    res.send(order);
  } catch (error) {
    res.status(500).send({ message: "An error occurred while trying to remove the order." });

  }
};

const getByCustomer = async (req, res) => {
  try {
    const orders = await Order.getByCustomer(req.params.id);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByStatus = async (req, res) => {
  try {
    const status = req.query.s;
    const filter = { status };

    if (req.query.startDate && req.query.endDate) {
      filter.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const orders = await Order.find(filter);

    // Here, log whether the orders are an array
    // eslint-disable-next-line no-console
    console.log(Array.isArray(orders));

    res.send({ type: typeof orders, isArray: Array.isArray(orders), data: orders });
  } catch (error) {
    res.status(500).send(error);
  }
};


const getTotalSales = async (req, res) => {
  try {
    const query = {};

    if (req.query.startDate && req.query.endDate) {
      query.createdAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    // eslint-disable-next-line no-console
    console.log("Query used for aggregation:", query);

    const results = await Order.aggregate([
      { $match: query },
      { $unwind: "$items" },  // Deconstruct the items array
      {
        $lookup: {
          from: "menuitems",
          localField: "items.item",
          foreignField: "_id",
          as: "itemDetails"
        }
      },
      { $unwind: "$itemDetails" }, // Deconstruct the resulting itemDetails array
      {
        $group: {
          _id: "$_id",
          totalForOrder: {
            $sum: { $multiply: ["$items.quantity", "$itemDetails.price"] }
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalForOrder" }
        }
      }
    ]);

    // eslint-disable-next-line no-console
    // console.log("Aggregation results:", results);

    const totalSales = results.length > 0 ? results[0].totalSales : 0;
    res.json({ total: totalSales });
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.error("Error fetching total sales:", error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByCustomer,
  getByStatus,
  getTotalSales
};
