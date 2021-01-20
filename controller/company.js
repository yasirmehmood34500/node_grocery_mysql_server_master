module.exports = {
  addCompany: (req, res) => {
    console.log(req.body);
    let companyName = req.body.companyName;
    let phoneNumber = req.body.phoneNumber;
    let emailAddress = req.body.emailAddress;
    let companyType = req.body.companyType;
    let locationId = req.body.locationId;
    let contact = req.body.contact;
    let aboutCompany = req.body.aboutCompany;
    if (companyName) {
      if (phoneNumber) {
        if (emailAddress) {
          if (companyType) {
            if (locationId) {
              if (contact) {
                let query =
                  "INSERT INTO company(companyName,phoneNumber,emailAddress,companyType,locationId,contact,aboutCompany,companyActive) VALUES('" +
                  companyName +
                  "','" +
                  phoneNumber +
                  "','" +
                  emailAddress +
                  "','" +
                  companyType +
                  "','" +
                  locationId +
                  "','" +
                  contact +
                  "','" +
                  aboutCompany +
                  "','" +
                  "1" +
                  "')";
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
                      id: result.insertId,
                    });
                  }
                });
              } else {
                res.status(400).send({
                  success: "false",
                  message: "contact is required",
                });
              }
            } else {
              res.status(400).send({
                success: "false",
                message: "locationID is required",
              });
            }
          } else {
            res.status(400).send({
              success: "false",
              message: "companyType is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "emailAddress is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "phoneNumber is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "companyName is required",
      });
    }
  },
  editCompany: (req, res) => {
    console.log(req.body);
    let companyName = req.body.companyName;
    let phoneNumber = req.body.phoneNumber;
    let emailAddress = req.body.emailAddress;
    let companyType = req.body.companyType;
    let locationId = req.body.locationId;
    let contact = req.body.contact;
    let aboutCompany = req.body.aboutCompany;
    let companyActive = req.body.companyActive;

    if (companyName) {
      if (phoneNumber) {
        if (emailAddress) {
          if (companyType) {
            if (locationId) {
              if (contact) {
                // UPDATE Customers
                // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
                // WHERE CustomerID = 1;
                let query =
                  "UPDATE company SET companyName = " +
                  "'" +
                  companyName +
                  "'" +
                  "," +
                  "phoneNumber=" +
                  "'" +
                  phoneNumber +
                  "'" +
                  "," +
                  "companyType=" +
                  "'" +
                  companyType +
                  "'" +
                  "," +
                  "locationId=" +
                  "'" +
                  locationId +
                  "'" +
                  "," +
                  "contact=" +
                  "'" +
                  contact +
                  "'" +
                  "," +
                  "emailAddress=" +
                  "'" +
                  emailAddress +
                  "'" +
                  "," +
                  "aboutCompany=" +
                  "'" +
                  aboutCompany +
                  "'" +
                  "," +
                  "companyActive=" +
                  "'" +
                  companyActive +
                  "'" +
                  " WHERE companyID=" +
                  req.params.id;
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
                      message: "company edited succesfully",
                      id: result,
                    });
                  }
                });
              } else {
                res.status(400).send({
                  success: "false",
                  message: "contact is required",
                });
              }
            } else {
              res.status(400).send({
                success: "false",
                message: "locationID is required",
              });
            }
          } else {
            res.status(400).send({
              success: "false",
              message: "companyType is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "emailAddress is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "phoneNumber is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "companyName is required",
      });
    }
  },
  getCompanies: (req, res) => {
    let query =
      "SELECT * FROM COMPANY LEFT JOIN location on location.locationID=COMPANY.locationID";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
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
  getCompany: (req, res) => {
    let query = "SELECT * FROM COMPANY WHERE companyID=" + req.params.id;
    let query1 =
      "SELECT * FROM `COMPANY` LEFT JOIN location on location.locationID=COMPANY.locationID LEFT JOIN user ON user.userID=COMPANY.contact WHERE COMPANY.COMPANYID=" +
      req.params.id;
    db.query(query1, (err, result) => {
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
};
