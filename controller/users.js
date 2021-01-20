const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  addUser: async (req, res) => {
    console.log(req.body);
    let firstName = req.body.firstName;
    let middleName = req.body.middleName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let password = req.body.password;
    let isGuest = req.body.isGuest;
    let type = req.body.type;
    let shippingAddress = req.body.shippingAddress;
    let billingAddress = req.body.billingAddress;
    let storeID = req.body.storeID;
    let isGuestVerified = req.body.isGuestVerified;
    let creationDate = new Date();
    if (firstName) {
      if (lastName) {
        if (email) {
          let myQuery = "SELECT * FROM user where email=" + "'" + email + "'";
          db.query(myQuery, (err, result) => {
            if (err) {
              return res.status(400).send({
                success: "false",
                message: "ASDsda",
              });
            }
            if (result.length > 0) {
              res.status(409).send({
                success: "false",
                message: "Email/Username already exists",
              });
            } else {
              if (mobile) {
                if (password) {
                  console.log("ASD");

                  if (type) {
                    bcrypt.hash(password, 10, function (err, hash) {
                      // console.log("ASD");

                      if (err) {
                        res.status(500).send({
                          success: "false",
                          message: "ASDsda1123",
                        });
                      } else {
                        let query =
                          "INSERT INTO user(firstName,middleName,lastName,email,mobile,password,isGuest,type,shippingAddress,billingAddress,creationDate,storeID,isGuestVerified,isActive) VALUES('" +
                          firstName +
                          "','" +
                          middleName +
                          "','" +
                          lastName +
                          "','" +
                          email +
                          "','" +
                          mobile +
                          "','" +
                          hash +
                          "','" +
                          isGuest +
                          "','" +
                          type +
                          "','" +
                          shippingAddress +
                          "','" +
                          billingAddress +
                          "','" +
                          creationDate +
                          "','" +
                          storeID +
                          "','" +
                          isGuestVerified +
                          "','" +
                          "1" +
                          "')";
                        console.log(query);
                        db.query(query, (err, result) => {
                          if (err) {
                            return res.status(400).send({
                              success: "false",
                              message: "err",
                              error: "Is here",
                            });
                          } else {
                            return res.status(201).send({
                              success: "true",
                              message: "user added succesfully",
                              id: result.insertId,
                            });
                          }
                        });
                      }
                    });
                  } else {
                    res.status(400).send({
                      success: "false",
                      message: "type is required",
                    });
                  }
                } else {
                  res.status(400).send({
                    success: "false",
                    message: "password is required",
                  });
                }
              } else {
                res.status(400).send({
                  success: "false",
                  message: "mobile is required",
                });
              }
            }
          });
        } else {
          res.status(400).send({
            success: "false",
            message: "email is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "lastName is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "firstName is required",
      });
    }
  },
  getUsers: (req, res) => {
    let query =
      "SELECT * FROM user LEFT JOIN location ON location.locationID=user.shippingAddress";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
        });
      } else {
        res.status(201).send({
          success: "true",
          result: result,
        });
      }
    });
  },
  getUser: (req, res) => {
    let query =
      "SELECT * FROM user LEFT JOIN location ON location.locationID=user.shippingAddress WHERE userID=" +
      req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          // message: "company added succesfully",
          result: result,
        });
      }
    });
  },
  editUser: (req, res) => {
    console.log(req.body);
    let firstName = req.body.firstName;
    let middleName = req.body.middleName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let isGuest = req.body.isGuest;
    let type = req.body.type;
    let shippingAddress = req.body.shippingAddress;
    let billingAddress = req.body.billingAddress;
    let storeID = req.body.storeID;
    let isGuestVerified = req.body.isGuestVerified;
    let creationDate = new Date();

    // UPDATE Customers
    // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
    // WHERE CustomerID = 1;
    let query =
      "UPDATE user SET firstName = " +
      "'" +
      firstName +
      "'" +
      "," +
      "middleName=" +
      "'" +
      middleName +
      "'" +
      "," +
      "lastName=" +
      "'" +
      lastName +
      "'" +
      "," +
      "email=" +
      "'" +
      email +
      "'" +
      "," +
      "mobile=" +
      "'" +
      mobile +
      "'" +
      "," +
      "isGuest=" +
      "'" +
      isGuest +
      "'" +
      "," +
      "type=" +
      "'" +
      type +
      "'" +
      "," +
      "shippingAddress=" +
      "'" +
      shippingAddress +
      "'" +
      "," +
      "billingAddress=" +
      "'" +
      billingAddress +
      "'" +
      "," +
      "storeID=" +
      "'" +
      storeID +
      "'" +
      "," +
      "creationDate=" +
      "'" +
      creationDate +
      "'" +
      "," +
      "isGuestVerified=" +
      "'" +
      isGuestVerified +
      "'" +
      " WHERE userID=" +
      req.params.id;
    console.log(query);
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
        console.log(err);
      } else {
        res.status(201).send({
          success: "true",
          message: "User edited succesfully",
          id: result,
        });
      }
    });
  },
  checkEmail: (req, res) => {
    let query = "SELECT * FROM user WHERE email=" + "'" + req.params.id + "'";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
          err,
        });
      } else {
        if (result.length > 0) {
        }
        res.status(200).send({
          success: "true",
          result: result,
        });
      }
    });
  },
  forgotPassword: (req, res) => {
    let query = "SELECT * FROM user WHERE email=" + "'" + req.body.email + "'";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
          err,
        });
      } else {
        if (result.length > 0) {
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
              res.status(500).send({
                success: "false",
                message: "ASDsda1123",
              });
            } else {
              let query =
                "UPDATE user SET password = " +
                "'" +
                hash +
                "'" +
                " WHERE email=" +
                "'" +
                req.body.email +
                "'";
              db.query(query, (err, result) => {
                if (err) {
                  res.status(400).send({
                    success: "false",
                    message: "Something is really bad happens",
                    err,
                  });
                } else {
                  res.status(200).send({
                    success: "false",
                    result: result,
                  });
                }
              });
            }
          });
        } else {
          res.status(200).send({
            success: "true",
            message: "userName Does not exists",
          });
        }
      }
    });
  },
  checkNumber: (req, res) => {
    let query = "SELECT * FROM user WHERE mobile=" + "'" + req.params.id + "'";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
          err,
        });
      } else {
        res.status(200).send({
          success: "true",
          result: result,
        });
      }
    });
  },
  userLogin: (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let query =
      "SELECT * FROM user LEFT JOIN location ON location.locationID=user.shippingAddress WHERE email=" +
      "'" +
      email +
      "'";
    db.query(query, (err, user) => {
      if (err) {
        console.log(err);

        return res.status(400).send({
          success: "false",
          message: err,
        });
      }
      if (user.length > 0) {
        console.log(user.type);

        if (user[0].type == "Store") {
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
              return res.status(401).send({
                message: "Auth failed",
              });
            }
            if (result) {
              let query =
                "SELECT * FROM store WHERE storeID=" + user[0].storeID;
              db.query(query, (err, myStore) => {
                if (err) {
                  res.status(400).send({
                    success: "false",
                    message: err,
                  });
                  return;
                } else {
                  const token = jwt.sign(
                    {
                      id: user[0].id,
                      email: user[0].email,
                      userId: user[0].userID,
                      firstName: user[0].firstName,
                      middleName: user[0].middleName,
                      lastName: user[0].lastName,
                      email: user[0].email,
                      mobile: user[0].mobile,
                      zipCode: user[0].zipCode,
                      isGuest: user[0].isGuest,
                      type: user[0].type,
                      storeID: user[0].storeID,
                      shippingAddress: user[0].shippingAddress,
                      store: myStore,
                    },
                    "hereIsMySpecialToken",
                    {
                      expiresIn: "720h",
                    }
                  );
                  return res.status(200).send({
                    message: "Auth successful",
                    token: token,
                  });
                }
              });
            } else {
              return res.status(401).send({
                message: "Auth failed",
              });
            }
          });
          return;
        }
        if (user[0].type == "admin") {
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
              return res.status(401).send({
                message: "Auth failed",
              });
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: user[0].email,
                  userId: user[0].userID,
                  firstName: user[0].firstName,
                  middleName: user[0].middleName,
                  lastName: user[0].lastName,
                  email: user[0].email,
                  mobile: user[0].mobile,
                  zipCode: user[0].zipCode,
                  isGuest: user[0].isGuest,
                  type: user[0].type,
                  storeID: user[0].storeID,
                  shippingAddress: user[0].shippingAddress,
                },
                "hereIsMySpecialToken",
                {
                  expiresIn: "720h",
                }
              );
              return res.status(200).send({
                message: "Auth successful",
                token: token,
              });
            } else {
              return res.status(401).send({
                message: "Auth failed",
              });
            }
          });
          return;
        } else if (user[0].type == "user" || user[0].type == "customer") {
          // console.log("start")
          // console.log(user[0].password)
          // console.log(req.body.password)
          // console.log("end")
          bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
              return res.status(401).send({
                message: "Auth failed",
              });
            }
            // console.log(result)
            if (result) {
              const token = jwt.sign(
                {
                  email: user[0].email,
                  userId: user[0].userID,
                  firstName: user[0].firstName,
                  middleName: user[0].middleName,
                  lastName: user[0].lastName,
                  email: user[0].email,
                  mobile: user[0].mobile,
                  zipCode: user[0].zipCode,
                  isGuest: user[0].isGuest,
                  type: user[0].type,
                  storeID: user[0].storeID,
                  shippingAddress: user[0].shippingAddress,
                  location: user[0].address1 + user[0].address2,
                  type: "user",
                  address1: user[0].address1,
                  address2: user[0].address2,
                  city: user[0].city,
                  country: user[0].country,
                  state: user[0].state,
                  zipCode: user[0].zipCode,
                  lat: user[0].lat,
                  lng: user[0].lng,
                },
                "hereIsMySpecialToken",
                {
                  expiresIn: "720h",
                }
              );
              return res.status(200).send({
                message: "Auth successful",
                token: token,
              });
            } else {
              return res.status(401).send({
                message: "Auth failed",
              });
            }
          });
        } else {
          return res.status(404).send({
            success: "false",
            message: "type is incorrect",
          });
        }
      } else {
        res.status(404).send({
          success: "false",
          message: "User Does not exists",
          // user: result,
        });
      }
    });
  },
};
