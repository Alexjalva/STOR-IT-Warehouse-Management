const { Item } = require('../models');

const itemData = [
    {
        "name": "Sofa",
        "dimensions": "10ft",
        "owner": "Carlos",
        "location": "left side",
        "value": 2000,
        "picture":"",
        "comments": "Very dirty",
        "category_id": 1
    },
    {
        "name": "Bed",
        "dimensions": "Queen",
        "owner": "Alex",
        "location": "Top rack",
        "value": 800,
        "picture": "",
        "comments": "missing legs",
        "category_id": 1
    },
    {
        "name": "dinin chairs",
        "dimensions": "24 inches",
        "owner": "Miguel",
        "location": "bottom rack",
        "value": 120,
        "picture": "",
        "comments": "good conditon",
        "category_id": 1

    },
    {
        "name": "dining table",
        "dimensions": "12ft long",
        "owner": "Tom Brady",
        "location": "bottom rack",
        "value": 1200,
        "picture":"",
        "comments": "scratches on many places",
        "category_id": 1
    }
]

const seedItem = () => Item.bulkCreate(itemData);

module.exports = seedItem;