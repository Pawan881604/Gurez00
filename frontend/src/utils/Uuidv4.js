const { v4: uuidv4 } = require("uuid");

function generateUuid() {
  const uuid = uuidv4().replace(/-/g, "");

  const uuid34Bit = parseInt(uuid.substring(0, 9), 16);
  return uuid34Bit.toString(16);
}

export default generateUuid;
