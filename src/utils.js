const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some";

function getUserId(context) {
  const Authorization = context.request.get("Authorization");

  console.log("good here...");
  if (Authorization) {
    const token = Authorization.replace("Bearer: ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  try {
    throw new Error("Whoops! Something aint't right...");
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  APP_SECRET,
  getUserId
};
