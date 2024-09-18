const route = require("express").Router();
const { AmazonResult } = require("../Functions/StoreAPIs");

route.post("/search", async (req, res) => {
    try {
        let searchParam = req.body.searchText;
        let country = req.body.country ? req.body.country : "CA";
        let startPoint = req.body.startPoint;
        let sortVariable = req.body.sortVariable;
        const products = await AmazonResult(searchParam, country, startPoint, sortVariable);
        res.status(200).json(products);
    } catch (e) {
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});

module.exports = route;