const e = require("express");

module.exports = {
  addRef_prod_fav: (req, res) => {
    let userID = req.body.userID;
    let itemID = req.body.itemID;
    if (userID) {
      if (itemID) {
        let query =
          "INSERT INTO ref_prod_fav(userID,itemID) VALUES('" +
          userID +
          "','" +
          itemID +
          "')";
        db.query(query, (err, result) => {
          if (err) {
            res.status(400).send({
              success: "false",
              message: "Something went wrong",
            });
          } else {
            res.status(201).send({
              success: "true",
              message: "reference of fav added added succesfully",
              id: result.insertId,
            });
          }
        });
      } else {
        res.status(400).send({
          success: "false",
          message: "itemID is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "userID  is required",
      });
    }
  },
  editRef_prod_fav: (req, res) => {
    let userID = req.body.userID;
    let itemID = req.body.itemID;
    if (userID) {
      if (itemID) {
        let query =
          "UPDATE ref_prod_fav SET itemID = " +
          "'" +
          itemID +
          "'" +
          "," +
          "userID=" +
          "'" +
          userID +
          "'" +
          " WHERE favID=" +
          "'" +
          req.params.id +
          "'";
        console.log(query);
        db.query(query, (err, result) => {
          if (err) {
            res.status(400).send({
              success: "false",
              message: err,
            });
          } else {
            res.status(201).send({
              success: "true",
              message: "reference of fav edited succesfully",
              id: result,
            });
          }
        });
      } else {
        res.status(400).send({
          success: "false",
          message: "itemID is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "userID is required",
      });
    }
  },
  getRef_prod_fav: (req, res) => {
    let query = "SELECT * FROM ref_prod_fav";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          result: result,
        });
      }
    });
  },
  getRef_prod_fav: (req, res) => {
    let query = "SELECT * FROM ref_prod_fav WHERE favID=" + req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          result: result,
        });
      }
    });
  },
  deleteRef_prod_fav: (req, res) => {
    let query = "DELETE  FROM ref_prod_fav WHERE favID=" + req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(200).send({
          success: "true",
          message: "reference of product deleted succesfully",
          result: result,
        });
      }
    });
  },
  userRef_prod_fav: (req, res) => {
    let query =
      "SELECT * FROM ref_prod_fav LEFT JOIN items on ref_prod_fav.itemID = items.itemID LEFT JOIN product on product.productID = items.productID LEFT JOIN store on items.storeID = store.storeID  where ref_prod_fav.userID=" +
      req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(200).send({
          success: "true",
          //   message: "reference of product deleted succesfully",
          result: result,
        });
      }
    });
  },
  userStoreRef_prod_fav: (req, res) => {
    let query =
      "SELECT * FROM ref_prod_fav LEFT JOIN items on ref_prod_fav.itemID = items.itemID LEFT JOIN product on product.productID = items.productID where ref_prod_fav.userID=" +
      req.params.id +
      " AND items.storeID=" +
      req.params.storeID;

    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(200).send({
          success: "true",
          //   message: "reference of product deleted succesfully",
          result: result,
        });
      }
    });
  },
};
