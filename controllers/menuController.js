const MenuItems = require("../db/models/menuItems.js");

const getAll = async (req, res) => {
  try {
    const menu = await MenuItems.getAll();
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const menu = await MenuItems.getOne(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const menu = await MenuItems.create(req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};
const update = async (req, res) => {
  try {
    const updatedItem = await MenuItems.update(req.params.id, req.body);
    res.send(updatedItem);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    await MenuItems.remove(req.params.id);
    res.send({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const search = async (req, res) => {
  try {
    const query = req.query.q;
    const results = await MenuItems.search(query);
    res.send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAll, getOne, create, remove, update, search };
