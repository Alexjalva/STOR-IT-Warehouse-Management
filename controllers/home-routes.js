const router = require('express').Router();
const { Category, User, Item } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

    try {
      res.render('home-page');
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', async (req, res) => {

    try {
      res.render('login');
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;