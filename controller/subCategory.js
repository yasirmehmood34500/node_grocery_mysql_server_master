module.exports = {
  addSubCategory: (req, res) => {
    let subCategoryName = req.body.subCategoryName;
    let subCategoryDescription = req.body.subCategoryDescription;
    let categoryID = req.body.categoryID;
    if (subCategoryName) {
      if (categoryID) {
        let query =
          "INSERT INTO subCategory(subCategoryName,subCategoryDescription,categoryID,subCategoryActive) VALUES('" +
          subCategoryName +
          "','" +
          subCategoryDescription +
          "','" +
          categoryID +
          "','" +
          "1" +
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
              message: "Sub Category added succesfully",
              id: result.insertId,
            });
          }
        });
      } else {
        res.status(400).send({
          success: "false",
          message: "subCategoryName is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "categoryID is required",
      });
    }
  },
  editSubCategory: (req, res) => {
    let subCategoryName = req.body.subCategoryName;
    let subCategoryDescription = req.body.subCategoryDescription;
    let subCategoryActive = req.body.subCategoryActive;
    if (subCategoryName) {
      // UPDATE Customers
      // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
      // WHERE CustomerID = 1;
      let query =
        "UPDATE subCategory SET subCategoryName = " +
        "'" +
        subCategoryName +
        "'" +
        "," +
        "subCategoryDescription=" +
        "'" +
        subCategoryDescription +
        "'" +
        "," +
        "subCategoryActive=" +
        "'" +
        subCategoryActive +
        "'" +
        " WHERE subCategoryID=" +
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
            message: "category edited succesfully",
            id: result,
          });
        }
      });
    } else {
      res.status(400).send({
        success: "false",
        message: "subCategoryName is required",
      });
    }
  },
  getSubCategories: (req, res) => {
    let query = "SELECT * FROM subCategory";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          message: "company added succesfully",
          result: result,
        });
      }
    });
  },
  getSubCategory: (req, res) => {
    let query =
      "SELECT * FROM `subCategory` LEFT JOIN category on category.categoryID=subCategory.subCategoryID WHERE subCategory.subCategoryID=" +
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
          result: result,
        });
      }
    });
  },
  deleteSubCategory: (req, res) => {
    let query =
      "Delete FROM `subCategory` WHERE subCategoryID=" + req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          result: "subCategory deleted",
        });
      }
    });
  },
};
