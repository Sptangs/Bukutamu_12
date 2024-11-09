const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const migration = require('./models/migration');
const router = require("./routes/routes");

const app = express();
const port = 3000;

migration();

app.use(cors());
app.use(bodyParser.json());


app.use("/api", router);
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
