const mongoose = require('mongoose');

const mongodb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Gomern');
    console.log('Connected to MongoDB');

    // Fetch data from 'foodi' collection
    const fetch_data = mongoose.connection.db.collection('foodi');
    const data = await fetch_data.find({}).toArray();
    global.food_item = data; // Set global food_item

    // Fetch data from 'foodCategory' collection
    const foodCategory = mongoose.connection.db.collection('foodcat');
    const catData = await foodCategory.find({}).toArray();
    global.food_category = catData; // Set global food_category

    console.log("Data stored in global.food_item:", global.food_item);
    console.log("Data stored in global.food_category:", global.food_category);

  } catch (err) {
    console.error('Error connecting to MongoDB or fetching data:', err);
  }
};

module.exports = mongodb;
