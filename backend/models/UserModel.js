const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: [{
        type: Schema.Types.Mixed, // Adjust the type based on your order_data structure
        required: true
    }],
    order_date: {
        type: String, // Ensure this matches the type you're using to store date
        required: false
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;


