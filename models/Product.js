const { Schema, model } = require("mongoose");

const ProductSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    }
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      }
    }
  }
)

module.exports = model('Product', ProductSchema);