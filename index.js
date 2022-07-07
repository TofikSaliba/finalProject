import "./server/db/mongoose.js";
import { server } from "./socket.js";

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log("SERVER IS UP AND RUNNING ON PORT " + PORT)
);
