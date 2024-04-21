const productsLengthValidation = (value) => {
  if (!(value instanceof Array)) return false
  return value.length > 0
}

module.exports = {
  productsLengthValidation
}