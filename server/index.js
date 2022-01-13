const express = require("express");
const cors = require("cors");
const { workers, users } = require("./utils/db.json");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const db = require("./models");
// db.sequelize.sync();
db.sequelize
  .sync({ force: true })
  .then(
    () => {
      console.log("Drop and re-sync db.");
      initial();
    },
    (error) => {
      Promise.reject(error);
    }
  )
  .catch((error) => console.log("drop db error ", error));
function initial() {
  try {
    db.companyUsers.bulkCreate(users).then(
      (response) => {
        Promise.resolve(response);
      },
      (error) => {
        console.log(error);
        Promise.reject(error);
      }
    );
    db.workers
      .bulkCreate(workers)
      .then(
        (response) => {
          Promise.resolve(response);
        },
        (error) => {
          Promise.reject(error);
        }
      )
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log("error", error);
  }
}
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to colmobile API." });
});
require("./routes/index")(app);

// set port, listen for requests
const PORT = 3001 || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
