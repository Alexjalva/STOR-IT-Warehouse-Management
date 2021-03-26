const router = require('express').Router();
const { Category, User, Item } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    console.log("home route attempt");
    try {
      
      // Get all projects and JOIN with user data
    //   const blogData = await Blog.findAll({
    //     include: [
    //       {
    //         model: User,
    //         attributes: ['name'],
    //       },
    //     ],
    //   });
  
      // Serialize data so the template can read it
    //   const blogs = blogData.map((blog) => blog.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('home-page', { 
         
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;