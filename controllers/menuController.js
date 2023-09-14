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
    const menuId = req.params.id;
    const updatedData = req.body;

    if (!menuId) {
      return res.status(400).json({ error: "Menu item ID is required." });
    }

    updatedData.updatedAt = new Date();

    const updatedMenuItem = await MenuItems.updateById(menuId, updatedData);

    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Menu item not found." });
    }

    return res.json(updatedMenuItem);
  } catch (err) {
    return res.status(500).json({ error: "An error occurred while updating the menu item." });
  }
};
const remove = async (req, res) => {
  try {
    const menuItem = await MenuItems.deleteById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found." });
    }
    // eslint-disable-next-line no-underscore-dangle
    return res.send({ id: menuItem._id });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const searchItems = async (req, res) => {
  try {
    const query = req.query.q;
    const items = await MenuItems.search(query);
    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
};


module.exports = { getAll, getOne, create, update, remove, searchItems };
