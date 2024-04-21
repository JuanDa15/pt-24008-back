const { Schema, model } = require('mongoose');

const OrderSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    created: {
      type: Date,
      default: Date.now,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = model('Order', OrderSchema);
