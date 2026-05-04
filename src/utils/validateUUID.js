module.exports = (id) => {
  return /^[0-9a-fA-F-]{36}$/.test(id);
};