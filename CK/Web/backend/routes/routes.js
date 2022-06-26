const controllers = require("../controllers/controllers")
module.exports = function (app) {
    app.get("/phone/:id", controllers.getProduct)
    app.post("/phone", controllers.getProductList)
}