function validString(str) {
  if (!str || typeof str !== "string" || !str.trim()) return false;
  return true;
}

function validnum(num) {
  if (!num || isNaN(num)) return false;
  return true;
}
// Takes in a single argument.
// Return true if the argument is a boolean; otherwise return false.
function validBoolean(bool) {
  if (typeof bool !== "boolean") return false;
  return true;
}

// Takes in a MongoDB document (JavaScript object).
// Returns the same document with its _id field as a string.
function convertObjId(doc) {
  doc._id = doc._id.toString();
  return doc;
}

// Takes in a number argument.
// Return true if the argument is above 0 and is a positive integer, false otherwise.
function validAge(age) {
  if (!age || typeof age != "number" || !Number.isInteger(age) || age < 1)
    return false;
  return true;
}

function validRating(num) {
  if (
    !num ||
    typeof num != "number" ||
    !Number.isInteger(num) ||
    num < 1 ||
    num > 5
  )
    return false;
  return true;
}

// Takes in a string argument.
// Return true if the argument is a valid email using regex expression.
function validEmail(email) {
  if (!validString(email)) return false;
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return String(email).toLowerCase().match(re) != null;
}

function validLink(link) {
  if (!validString(link)) return false;
  const re = /^(ftp|http|https):\/\/[^ "]+$/;
  return String(link).toLowerCase().match(re) != null;
}

function generateList(n) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
}

module.exports = {
  validString,
  convertObjId,
  validAge,
  validEmail,
  validBoolean,
  validRating,
  validLink,
  validnum,
  generateList,
};
