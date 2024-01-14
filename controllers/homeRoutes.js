const router = require('express').Router();
const { Event, User } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');



router.get('/event/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const event = eventData.get({ plain: true });

    res.render('event', {
      ...event,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Event }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});



// router.get('/', async (req, res) => {
//   try {
//     // Get the current date in the format YYYY-MM-DD
//     const currentDate = new Date().toISOString().split('T')[0];
//     console.log(currentDate);

//     // Get all events for the current day and JOIN with user data
//     const eventData = await Event.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//       where: {
//         date: {
//           [Op.eq]: `${currentDate}`, // filter events for current day
//         },
//       },
//     });

//     // Serialize data so the template can read it
//     const events = eventData.map((event) => event.get({ plain: true }));


//     // Pass serialized data and session flag into the template
//     res.render('homepage', { 
//       events, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/', async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const events = eventData.map((event) => event.get({ plain: true }));
    res.render('homepage', {
      events,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
