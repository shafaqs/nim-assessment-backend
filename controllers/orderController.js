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
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTotalSales = async (req, res) => {
  try {
    const query = {};

    if (req.query.startDate && req.query.endDate) {
      query.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    // Logging the query for debugging
    // eslint-disable-next-line no-console
    console.log("Query used for aggregation:", query);

    const results = await Order.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    // Logging the results for debugging
    // eslint-disable-next-line no-console
    console.log("Aggregation results:", results);

    const totalSales = results.length > 0 ? results[0].total : 0;
    res.json({ total: totalSales });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching total sales:", error);
    res.status(500).send(error);
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
