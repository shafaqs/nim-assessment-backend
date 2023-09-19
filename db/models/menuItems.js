const mongoose = require("../db.js");

const menuItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
}, { timestamps: true });
menuItemsSchema.set("toJSON", {
  virtuals: true
});
// menu model
const MenuItems = mongoose.model("MenuItems", menuItemsSchema);

const getAll = async () => {
  try {
    const menuItems = await MenuItems.find();
    return menuItems;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const menuItem = await MenuItems.findById(id);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const create = async (body) => {
  try {
    const menuItem = await MenuItems.create(body);
    return menuItem;
  } catch (error) {
    return error;
  }
};
const remove = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const menuItem = await MenuItems.findByIdAndDelete(id);
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    return menuItem.id;
  } catch (error) {
    throw error;
  }
};
const update = async (id, body) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const menuItem = await MenuItems.findByIdAndUpdate(id, body, { new: true });
    if (!menuItem) {
      throw new Error("Menu item not found");
    }
    return menuItem;
  } catch (error) {
    throw error;
  }
};
const search = async (query) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const regex = new RegExp(query, "i");  // Create a case-insensitive regex pattern
    const menuItems = await MenuItems.find({
      $or: [
        { name: regex },
        { description: regex }
      ]
    });
    return menuItems;
  } catch (error) {
    throw error;
  }
};




module.exports = { getAll, getOne, create, update, search, remove, MenuItems };
