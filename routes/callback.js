var express = require("express");
var router = express.Router();
const request = require("superagent");
require("dotenv").config();

/* Handle LinkedIn OAuth callback and return user profile. */
router.get("/", function (req, res, next) {
  requestAccessToken(req.query.code, req.query.state)
      .then((response) => {
        requestProfile(response.body.access_token).then((response) => {
          console.log(response.body);
          res.render("callback", { profile: response.body });
        });
      })
      .catch((error) => {
        res.status(500).send(`${error}`);
        console.error(error);
      });
});

function requestAccessToken(code, state) {
  return request
      .post("https://www.linkedin.com/oauth/v2/accessToken")
      .send("grant_type=authorization_code")
      .send(`redirect_uri=${process.env.EXPRESS_APP_REDIRECT_URI}`)
      .send(`client_id=${process.env.EXPRESS_APP_CLIENT_ID}`)
      .send(`client_secret=${process.env.EXPRESS_APP_CLIENT_SECRET}`)
      .send(`code=${code}`)
      .send(`state=${state}`);
}

function requestProfile(token) {
  return request
      .get(
          "https://api.linkedin.com/v2/me?projection=(id,vanityName,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))"
      )
      .set("Authorization", `Bearer ${token}`);
}

function getUser(i) {
  return request
      .get(
          "https://nubela.co/proxycurl/api/v2/linkedin?url=https://www.linkedin.com/in/" +
          i
      )
      .set("Authorization", `Bearer ${"a447e7c8-8861-46bd-bf38-1093d68eb085"}`);
}

router.post("/user", function (req, res, next) {
  getUser(req.body.i)
      .then((response) => {
        console.log(response.body);
        res.send({ user: response.body });
      })

      .catch((error) => {
        res.status(500).send(`${error}`);
        console.error(error);
      });
});

module.exports = router;
