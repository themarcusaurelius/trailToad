require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
//const { graphql, buildSchema } = require('graphql');

const STORE = process.env.STORE
const TOKEN = process.env.TOKEN
const CLIENT = process.env.CLIENT
const URL = `https://api.bigcommerce.com/stores/${STORE}/v3/catalog/products?include=primary_image`
const URL2 = `https://api.bigcommerce.com/stores/${STORE}/v3/carts`

router.get('/product', async (req,res) => {
    try {
        const PRODUCT = await axios.get(`${URL}`, {
            headers: {
                'Content-Type': [
                    'application/json',  
                    'charset=utf-8' 
                ],
                'X-Auth-Token': `${TOKEN}`,
                'X-Auth-Client': `${CLIENT}`
            }
        })

        res.json({ data: PRODUCT.data })
    } catch (err) {
        console.log(err)
    }
});

router.post('/checkout', async (req,res) => {
    try {
        await axios.post(`${URL2}`, {
            headers: {
                'Content-Type': [
                    'application/json',  
                    'charset=utf-8' 
                ],
                'X-Auth-Token': `${TOKEN}`,
                'X-Auth-Client': `${CLIENT}`
                // body: {
                //     "line_items": [
                //         {
                //             "quantity": 1,
                //             "product_id": req.body.id
                //         }
                //     ]
                // }
            },
        })
    } catch (err) {
        console.log(err.response)
    }
})


module.exports = router;