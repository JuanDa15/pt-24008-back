const { request, response } = require("express");
const { serverError } = require("../utils/server-error");

const User = require("../models/User");
const Product = require("../models/Product");
const httpResponse = require("../utils/http-response");

const listProducts = async (req = request, res = response) => {

  try {
    if (!req.uid) {
      return httpResponse(res, 401, 'Missing token in request')
    }

    const products = await Product.find()

    return res.status(200).json(httpResponse(true, 'Products', products))
  } catch (error) {
    console.log(error)
    serverError(error, res)
  }
}

const createProduct = async (req = request, res = response) => {
  const uid = req.uid;
  const { name, description, price, stock, image } = req.body;

  try {
    const user = await User.findById(uid);

    if (user.type !== 'admin') {
      return res.status(401).json(httpResponse(false, 'Unauthorized'))
    }

    const product = new Product({ name, description, price, stock, image })

    await product.save()

    return res.status(201).json(httpResponse(true, 'Product created', product))

  } catch (error) {
    console.log(error)
    serverError(error, res)
  }
}

const getProduct = async (req = request, res = response) => {
  const uid = req.uid;
  const { id } = req.params;

  try {
    if (!uid) {
      return httpResponse(res, 401, 'Missing token in request')
    }

    const product = await Product.findById(id)


    if (!product) {
      return res.status(404).json(httpResponse(false, 'Product not found'))
    }

    return res.status(200).json(httpResponse(true, 'Product', product))

  } catch (error) {
    console.log(error)
    serverError(error, res)
  }
}

const updateProduct = async (req = request, res = response) => {
  const uid = req.uid;
  const {id} = req.params;

  try {
    const user = await User.findById(uid);
    if (user.type !== 'admin') {
      return res.status(401).json(httpResponse(false, 'Unauthorized'))
    }
    const product = await Product.findByIdAndUpdate(id, req.body, {new: true})

    if (!product) {
      return res.status(404).json(httpResponse(false, 'Product not found'))
    }

    return res.status(200).json(httpResponse(true, 'Product updated', product))
  } catch (error) {
    console.log(error)
    serverError(error, res)
  }
}

const deleteProduct = async (req = request, res = response) => {
  const uid = req.uid;
  const {id} = req.params;

  try {
    const user = await User.findById(uid);
    if (user.type !== 'admin') {
      return res.status(401).json(httpResponse(false, 'Unauthorized'))
    }

    const product = await Product.findByIdAndDelete(id)
    
    if (!product) {
      return res.status(404).json(httpResponse(false, 'Product not found'))
    }

    return res.status(200).json(httpResponse(true, 'Product deleted'))
  } catch (error) {
    console.log(error)
    serverError(error, res)
  }
}

module.exports = {
  listProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
}