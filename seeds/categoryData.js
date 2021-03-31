const { Category } = require('../models');

const categoryData = [
    {
        "name": "Living room",
        
    },
    {
        "name": "Bedroom",
        
    },
    {
        "name": "Diner",
        
    },
    {
        "name": "Game room",
        
    },
    {
        "name": "Garage",
        
    }

]
const seedCategory = () => Category.bulkCreate(categoryData);

module.exports = seedCategory;