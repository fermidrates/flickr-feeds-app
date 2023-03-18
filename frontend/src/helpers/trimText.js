const trimText = (text) => {
  return text.length < 20 ? text : text.slice(0, 20) + "..";
};
module.exports = trimText;

export default trimText;
