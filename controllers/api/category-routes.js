const router = require('express').Router();
const { Category, Item } = require('../../models');
const withAuth =  require('../../utils/auth');

// The `/api/categories` endpoint

// GET all categories
router.get('/', withAuth, async (req, res) => {
    // needs to modify this to Items
    try {
        // Get all projects and JOIN with user data
        const categoryData = await Category.findAll();

        // Serialize data so the template can read it
        const categories = categoryData.map((category) => category.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('categories', {
            categories
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET One category
router.get('/:id', withAuth, async (req, res) => {
    // find one category by its `id` value
    try {
        // Get all projects and JOIN with user data
        const categoryData = await Category.findByPk(req.params.id, {
            include: [
                {
                    model: Item
                }
            ]
        });

        // Serialize data so the template can read it
        const category = categoryData.map((category) => category.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('category', {
            category
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//POST new category
router.post('/', withAuth, async (req, res) => {
    // create a new category
    try {
        const newCategory = await Category.create(req.body);
        res.status(200).json(newItem);
    } catch (err) {
        res.status(400).json(err);
    }
});

//PUT update category
router.put('/:id', withAuth, async (req, res) => {
    // update a category by its `id` value
    try {
        const updateCategory = await Category.update(req.body,
            {
                where: {
                    id: req.params.id
                }
            });
        res.status(200).json(updateCategory);
    } catch (err) {
        res.status(400).json(err);
    }
});

//DELETE category
router.delete('/:id', withAuth, async (req, res) => {
    // delete a category by its `id` value
    try {
        const categoryData = await Category.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!categoryData) {
            res.status(404).json({ message: 'No category found with this id! ' });
            return;
        }
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
