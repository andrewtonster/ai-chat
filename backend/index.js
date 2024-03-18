import app from "./app.js";
import { connect } from "./db/connections.js";

const port = process.env.PORT;
connect()
  .then(() => {
    app.listen(port, () => {
      console.log("server is running and connected to database");
    });
  })
  .catch((err) => {
    console.log(err);
  });
