const User = require('./model');

module.exports = {
  saveUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
}

// Register new user
function saveUser(req, res, next) {
  console.log(req.body);
  const username = req.body.username ? req.body.username.trim() : '';
  const email = req.body.email ? req.body.email.trim() : '';

  // Check if email already exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) return next(err);

    // if the email exists return error
    if (existingUser && existingUser.email.length > 0) {
      return res
        .status(422)
        .send({ error: 'The email is already registered.' });
    }

    // Create a new user object
    const newUser = new User({
      username: username,
      email: email,
    });

    // Save the new user into the database
    newUser.save(function (err, userData) {
      if (err) return next(err);

      // Respond to request indicating that the user was created
      return res.json({
        user: {
          id: userData._id,
          username: userData.username,
          email: userData.email
        }
      });
    });
  });
}

// Update user
function updateUser(req, res, next) {
  const userId = req.params.id;
  const username = req.body.username ? req.body.username.trim() : '';
  const email = req.body.email ? req.body.email.trim() : '';

  // Check if email already exists
  User.findOne({ _id: userId }, function (err, existingUser) {
    if (err) return next(err);

    // if the email exists return error
    if (!existingUser) {
      return res
        .status(422)
        .send({ error: "The user doesn't exist." });
    }

    existingUser.username = username;
    existingUser.email = email;

    // Save the new user into the database
    existingUser.save(function (err, userData) {
      if (err) return next(err);

      // Respond to request indicating that the user was created
      return res.json({
        user: {
          id: userData._id,
          username: userData.username,
          email: userData.email
        }
      });
    });

  });
}

// Get one user
function getUser(req, res, next) {
  User.findById(req.params.id)
    .exec()
    .then((user) => {
      if (!user || user.email.length <= 0) {
        return next(new Error('No user with that id'));
      }
      return res.json({ user })
    })
    .catch(err => next(err));
};

function getUsers(req, res) {
  try {
    User.find().exec((err, users) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({
        users
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

// Delete user
function deleteUser(req, res) {
  try {
    User.findOne({
      _id: req.params.id,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send(err);
      }

      user.remove(() => {
        res.json({
          success: true,
          message: 'Success'
        })
      });
    });
  } catch (err) {
    res.status(500).send(err);
  }
}