const trimText = (text) => {
  return text.length < 20 ? text : text.slice(0, 20) + "..";
};

export default trimText;
