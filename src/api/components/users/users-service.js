const usersRepository = require('./users-repository');
const { hashPassword } = require('../../../utils/password');
const { passwordMatched } = require('../../../utils/password');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Get user email
 * @param {string} email - User email
 * @returns {Object}
 */
async function getCheckEmail(email) {
  const checkEmail = await usersRepository.getEmail(email);

  // Email
  if (!checkEmail) {
    return true;
  } else {
    return false;
  }
}

/**
 * Get user password
 * @param {string} password - User password
 * @returns {Object}
 */
async function getCheckPassword(password) {
  const checkPassword = await usersRepository.getPassword(password);

  // Password
  if (checkPassword) {
    return true;
  } else {
    return false;
  }
}

// PasswordNew
async function getChangePassword(
  id,
  password_old,
  password_new,
  password_confirm
) {
  //
  if (password_confirm != password_new) {
    throw errorResponder(
      errorTypes.INVALID_PASSWORD,
      'Invalid confirm password'
    );
  }

  // Compare
  const getUserId = await usersRepository.getUser(id);
  const comparePass = await passwordMatched(password_old, getUserId.password);

  if (!comparePass) {
    throw errorResponder(
      errorTypes.INVALID_PASSWORD,
      'Invalid current password'
    );
  }

  const hashedPassword = await hashPassword(password_new);
  await usersRepository.getPasswordNew(id, hashedPassword);
}

module.exports = {
  getUsers,
  getUser,
  getCheckEmail,
  getCheckPassword,
  getChangePassword,
  createUser,
  updateUser,
  deleteUser,
};
