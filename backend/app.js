const express = require("express");
const request = require("request");
const cors = require("cors");
const app = express();

app.use(cors());

// Read a photo from Flickr
app.get("/feeds", (req, res) => {
  const format = "json";
  const nojsoncallback = "1";
  const options = {
    url: `https://api.flickr.com/services/feeds/photos_public.gne?format=${format}&nojsoncallback=${nojsoncallback}`,
    method: "GET",
  };
  request(options, (error, request, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(body);
  });
});

// Read a photo from specific tag from Flickr
app.get("/feeds/:tag", (req, res) => {
  const tag = req.params.tag;
  const format = "json";
  const nojsoncallback = "1";
  const options = {
    url: `https://api.flickr.com/services/feeds/photos_public.gne?format=${format}&tags=${tag}&nojsoncallback=${nojsoncallback}`,
    method: "GET",
  };
  request(options, (error, request, body) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(body);
  });
});

module.exports = app;
