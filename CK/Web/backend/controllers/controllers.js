const knex = require("./db")
async function getProductList(req, res) {
    try {
        let page = req.body.page || 1
        let perpage = req.body.perpage || 8 

        let productList = await knex("phone").paginate({ perPage: perpage, currentPage: page, isLengthAware: true });

        return res.status(200).json({
            success: true,
            result: productList
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

async function getProduct(req, res) {
    try {
        const id = parseInt(req.params.id);
        let product = await knex("phone").where("id",id).first();

        return res.status(200).json({
            success: true,
            result: product
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

module.exports = {
    getProductList: getProductList,
    getProduct: getProduct,
}