const { User } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Get user detail (email)
 * @param {string} email - User email
 * @returns {Promise}
 */
async function getEmail(email) {
  return User.findOne({ email: email });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user detail (password)
 * @param {string} password - User password
 * @returns {Promise}
 */
async function getPassword(password) {
  return User.find({ password: password });
}

// NewPassword
async function getPasswordNew(id, password_new) {
  return User.findByIdAndUpdate(id, { password: password_new });
}

module.exports = {
  getUsers,
  getUser,
  getEmail,
  getPassword,
  getPasswordNew,
  createUser,
  updateUser,
  deleteUser,
};
