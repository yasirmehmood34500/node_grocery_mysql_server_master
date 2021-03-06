module.exports = {
  addProduct: (req, res) => {
    let productName = req.body.productName;
    let productDescription = req.body.productDescription;
    let productType = req.body.productType;
    let productBarcode = req.body.productBarcode;
    if (productName) {
      if (productDescription) {
        if (productType) {
          let query =
            "INSERT INTO product(productName,productDescription,productType,productBarcode) VALUES('" +
            productName +
            "','" +
            productDescription +
            "','" +
            productType +
            "','" +
            productBarcode +
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
                message: "Product added succesfully",
                id: result.insertId,
              });
            }
          });
        } else {
          res.status(400).send({
            success: "false",
            message: "productType is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "productDescription is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "productName is required",
      });
    }
  },
  editProduct: (req, res) => {
    let productID = req.params.id;
    let productName = req.body.productName;
    let productDescription = req.body.productDescription;
    let productType = req.body.productType;
    let productBarcode = req.body.productBarcode;

    if (productID) {
      if (productName) {
        if (productDescription) {
          if (productType) {
            // UPDATE Customers
            // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
            // WHERE CustomerID = 1;
            let query =
              "UPDATE product SET productName = " +
              "'" +
              productName +
              "'" +
              "," +
              "productDescription=" +
              "'" +
              productDescription +
              "'" +
              "," +
              "productType=" +
              "'" +
              productType +
              "'" +
              "," +
              "productBarcode=" +
              "'" +
              productBarcode +
              "'" +
              " WHERE productID=" +
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
                  message: "product edited succesfully",
                  id: result,
                  // qq: query,
                });
              }
            });
          } else {
            res.status(400).send({
              success: "false",
              message: "productType is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "productDescription is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "productName is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "productID is required",
      });
    }
  },
  getProduct: (req, res) => {
    let query = "SELECT * FROM product WHERE productID=" + req.params.id;
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
  getProducts: (req, res) => {
    let query = "SELECT * FROM product ";
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
};
