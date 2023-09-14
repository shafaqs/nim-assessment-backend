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
});
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
const updateById = async (id, updatedData) => {
  try {
    const updatedMenuItem = await MenuItems.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });
    return updatedMenuItem;
  } catch (error) {
    return error;
  }
};
const deleteById = async (id) => {
  try {
    const deletedItem = await MenuItems.findByIdAndDelete(id);
    return deletedItem;
  } catch (error) {
    return error;
  }
};

const search = async (query) => {
  try {
    const items = await MenuItems.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
    return items;
  } catch (error) {
    return error;
  }
};


module.exports = { getAll, getOne, create, updateById, deleteById, search, MenuItems };
