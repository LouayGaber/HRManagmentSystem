const { error } = require("console");
const file = require("./db.json");

const searchJson = async ({ email, password }) => {
  try {
    const user = await file.users.find((user) => user.email == email);
    const userPassword = user?.password == password;
    if (user && userPassword) {
      return user;
    } else if (user && !userPassword) {
      throw "password incorrect";
    } else {
      throw "user not found";
    }
  } catch (error) {
    return { isError: true, message: error };
  }
};
module.exports = searchJson;
