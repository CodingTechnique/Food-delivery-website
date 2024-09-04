const express = require('express');
const router = express.Router();
const Order = require('../models/Oders'); 

router.post('/orderData', async (req, res) => {
    const { email, order_data } = req.body;
    const order_date = new Date().toDateString();

    if (!email || !order_data) {
        return res.status(400).json({ error: "Email and order_data are required" });
    }

    try {       
        let existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            await Order.create({
                email: email,
                order_data: [order_data],
                order_date: order_date
            });
            return res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: email },
                { 
                    $push: { order_data: { $each: [order_data] } },
                    $set: { order_date: order_date }
                }
            );
            return res.json({ success: true });
        }
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).send("Server Error");
    }
});


router.post('/myorderData', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        let mydata = await Order.findOne({ email });
        if (!mydata) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json({ orderData: mydata });
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
