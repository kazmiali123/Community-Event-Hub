const router = require('express').Router();
const { Event, User, Image } = require('../models');

// const { findAll } = require('../models/event');
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
        {
          model: Image,
          arribute: ['url'],
        }
      ],
    });

    const event = eventData.get({ plain: true });
    console.log(event);
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

// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Event, include: User }],
//     });
//     console.log(userData);
//     const events = await Event.findAll(
//       {
//         include: [ User ]
//       }
//     )
//     // const dishes = dishData.map((dish) => dish.get({ plain: true }));
//     console.log(events);
//     // const user = userData.get({ plain: true });
//     res.render('profile', {
//       // ...user,
//       events,

//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route

  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/', async (req, res) => {
  try {
    // Get the current date in the format YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];
    console.log(currentDate);

    // Get all events for the current day and JOIN with user data
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
            {
              model: Image,
              arributes: ['url'],
            }
      ],
      where: {
        date: {
          [Op.eq]: `${currentDate}`, // filter events for current day
        },
      },
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


// router.get('/', async (req, res) => {
//   try {
//     // Get all events and JOIN with user data

//     const eventData = await Event.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//         {
//           model: Image,
//           arributes: ['url'],
//         }
//       ],
//     });


//     // Serialize data so the template can read it
//     const events = eventData.map((event) => event.get({ plain: true }));
//     // Pass serialized data and session flag into template
//     console.log(events);
//     res.render('homepage', {
//       events,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;

