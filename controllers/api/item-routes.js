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
  console.log(req.body);
  try {
    await cloudinary.uploader.upload(
      'http://mobileimages.lowes.com/product/converted/190873/190873002673.jpg',
      { public_id: 'fridge' },
      function (error, result) {
        console.log(result)
      }
    );
    console.log("cloudinary worked");
    console.log(req.body.category);
    const catName = req.body.category;
    console.log(catName);
    let category = await Category.findOne({ where: { name: catName } });
    console.log("tried to find");
    console.log(category);
    if (category == null) {
      console.log("trying to create");
      category = await Category.create({ name: catName});
    }
    console.log("past cloudinary");
    //const categoryData = category.map((category) => category.get({ plain: true }));

    const catID = category.dataValues.id;
    console.log(catID);
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
router.put('/:id', withAuth, async (req, res) => {
  // update product data
  try {
    const updateItem = await Item.update(req.body,
      {
        where: {
          id: req.params.id
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