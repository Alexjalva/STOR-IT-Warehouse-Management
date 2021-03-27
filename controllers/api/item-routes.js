const router = require('express').Router();
const { Item, Category } = require('../../models');

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
router.post('/', withAuth, (req, res) => {
  try {
    const newItem = await Item.create(req.body);
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
    if(!itemData) {
      res.status(404).json({message: 'No item found with this id! '});
      return;
    }
    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;