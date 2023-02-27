const jwt = require('jsonwebtoken')

const mongoose = require('mongoose');



module.exports.authentication = function (req, res, next) {
  try {

    let token = req.headers["authorization"]
    if (!token)
      return res.status(400).send({ status: false, message: "token must be present" })

   jwt.verify(token, "debojit-security", (err, user) => {
      if (err)
        return res.status(401).send({ message: "invalid token" });
       req.user = user;
  

      next();
    });
  }
  catch (err) {
    res.status(500).send(err.message)
  }
}