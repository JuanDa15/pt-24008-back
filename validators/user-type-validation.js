const isValidUserType = (value) => {
  return ['admin', 'user'].includes(value);
}

module.exports = {
  isValidUserType
}