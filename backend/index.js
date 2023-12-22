const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const r = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "5dfad651-4b15-4236-990c-2d88cb15004f" } }
    );

    return res.status(r.status).json(r.data);
  } catch (e) {
    if (e.response) {
      // If there is a response object in the error, use its properties
      return res.status(e.response.status).json(e.response.data);
    } else {
      // If there is no response object, handle the error accordingly
      console.error("Error:", e.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});


app.listen(3001);