const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const httpResponse = require('../utils/http-response');
const { serverError } = require('../utils/server-error');
const { response } = require('express');

const getOrders = async (req = request, res = response) => {
  const uid = req.uid;

  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json(httpResponse(false, 'User not found'));
    }

    if (user.type === 'admin') {
      const orders = await Order.find()
        .populate('products.product')
        .populate('user');

      return res.status(200).json(httpResponse(true, 'Orders found', orders));
    }

    const orders = await Order.find({ user: uid }).populate('products.product');

    return res.status(200).json(httpResponse(true, 'Orders found', orders));
  } catch (error) {
    console.log(error);
    return serverError(error, res);
  }
};

const createOrder = async (req = request, res = response) => {
  const { products } = req.body;
  const uid = req.uid;

  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json(httpResponse(false, 'User not found'));
    }
    const totalPrice = await validateProducts(products, res);

    const order = new Order({ products, user: uid, totalPrice });
    const productsToUpdate = products.map(async (product) => {
      const productToUpdate = await Product.findById(product.product);
      productToUpdate.stock -= product.quantity;
      return productToUpdate.save();
    })

    await Promise.all(productsToUpdate);

    await order.save();

    await order.populate('products.product');
    await order.populate('user');

    return res.status(200).json(httpResponse(true, 'Order created', order));
  } catch (error) {
    console.log(error);
    return serverError(error, res);
  }
};

const getOrder = async (req = request, res = response) => {
  const { id } = req.params;
  const uid = req.uid;

  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json(httpResponse(false, 'User not found'));
    }

    const order = await Order.findById(id)
      .populate('products.product')
      .populate('user');

    if (!order) {
      return res.status(404).json(httpResponse(false, 'Order not found'));
    }
    return res.status(200).json(httpResponse(true, 'Order found', order));
  } catch (error) {
    console.log(error);
    return serverError(error, res);
  }
};

async function validateProducts(products, res = response) {
  return new Promise((resolve) => {
    let totalPrice = 0;
    console.log(products)
    const temp = products.map(async (productDTO) => {
      const product = await Product.findById(productDTO.product);

      if (!product) {
        return res
          .status(404)
          .json(httpResponse(false, `Product ${productDTO.product} not found`));
      }
      if (product.stock < productDTO.quantity) {
        return res
          .status(400)
          .json(
            httpResponse(false, `Product ${product.name} out of stock`, product)
          );
      }
      return product;
    });
    Promise.all(temp).then((productsPromises) => {
      productsPromises.forEach((product) => {
        const { quantity } = products.find((p) => p.product === product._id.toString())
 
        totalPrice += product.price * quantity;
      });
      resolve(totalPrice);
    });
  });
}

module.exports = {
  createOrder,
  getOrders,
  getOrder,
};
