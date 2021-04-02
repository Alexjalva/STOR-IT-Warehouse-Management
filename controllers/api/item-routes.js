const router = require('express').Router();
const { Item, Category } = require('../../models');
const withAuth = require('../../utils/auth');
const cloudinary = require('cloudinary').v2;

// The `/api` endpoint

// get all Items
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all items 
    const itemData = await Item.findAll();

    // Serialize data so the template can read it
    const items = itemData.map((item) => item.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('all', {
      items
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one Item
router.get('/:id', withAuth, async (req, res) => {
  // find a single item by its `id`
  try {
    // Get one item 
    const itemData = await Item.findByPk(req.params.id);

    // Serialize data so the template can read it
    const item = itemData.get({ plain: true });

    // Pass serialized data into template
    res.render('item', {
      item
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new item
router.post('/', withAuth, async (req, res) => {
  try {
    await cloudinary.uploader.upload(
      req.body.picture,
      { public_id: req.body.name },
      function (error, result) {
        console.log(result)
      }
    );
    const catName = req.body.category;
    let category = await Category.findOne({ where: { name: catName } });
    if (category == null) {
      category = await Category.create({ name: catName });
    }

    const catID = category.dataValues.id;
    const newItem = await Item.create({
      name: req.body.name,
      dimensions: req.body.dimensions,
      owner: req.body.owner,
      location: req.body.location,
      value: req.body.value,
      picture: req.body.picture,
      comments: req.body.comments,
      category_id: catID
    });
    res.status(200).json(newItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put('/', withAuth, async (req, res) => {
  // update product data
  try {
    const catName = req.body.category;
    let category = await Category.findOne({ where: { name: catName } });
    if (category == null) {
      category = await Category.create({ name: catName });
    }
    const catID = category.dataValues.id;
    const currItem = await Item.findOne({ where: { name: req.body.name } });
    const updateItem = await Item.update({
      name: req.body.name,
      dimensions: req.body.dimensions,
      owner: req.body.owner,
      location: req.body.location,
      value: req.body.value,
      picture: req.body.picture,
      comments: req.body.comments,
      category_id: catID
    },
      {
        where: {
          id: currItem.dataValues.id
        }
      });
    res.status(200).json(updateItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  // delete one product by its `id` value
  try {
    const itemData = await Item.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!itemData) {
      res.status(404).json({ message: 'No item found with this id! ' });
      return;
    }
    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;