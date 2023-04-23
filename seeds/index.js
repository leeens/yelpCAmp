const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '643bea6968c549ca3ebc4d4e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                        cities[random1000].longitude,
                        cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dk8oaecs7/image/upload/v1681906502/mzci8dtmj8ojqv8pvzkd.jpg',
                    filename: 'mzci8dtmj8ojqv8pvzkd'
                },
                {
                    url: 'https://res.cloudinary.com/dk8oaecs7/image/upload/v1681906502/em5hx4tzktvtgbafma6i.jpg',
                    filename: 'em5hx4tzktvtgbafma6i'
                }
            ],
        });
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
});