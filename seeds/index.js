const sequelize = require('../config/connection');

const seedCategory = require('./categoryData');
const seedItem = require('./itemData');


const seedAll = async () => {
  await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedCategory();
    console.log('\n----- CATEGORY SEEDED -----\n');

  await seedItem();
    console.log('\n----- ITEM SEEDED -----\n');

  process.exit(0);
};

seedAll();