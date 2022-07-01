const controllers = require("../controllers/controllers")
module.exports = function (app) {
    app.get("/phone/:id", controllers.getProduct)
    app.get("/filter", controllers.getFilter)
    app.post("/phone", controllers.getProductList)
}