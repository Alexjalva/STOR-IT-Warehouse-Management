// links to the other Models //
const User = require('./User');
const Category = require('./Category');
const Item = require('./Item');

// I copied this from a class activity, need to updated as what we needed it//
Item.belongsTo(Category, {
  foreignKey: 'category_id',
});

Category.hasMany(Item, {
  foreignKey: 'category_id',
});

module.exports = { User, Category, Item };


