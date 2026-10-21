const users = require('../models/users');
const posts = require('../models/posts');

// GET /api/v1/users
function getAllUsers(req, res) {
  res.json(users);
}

// GET /api/v1/users/:id
function getUserById(req, res) {
  const id = Number(req.params.id);
  const user = users.find(function (u) {
    return u.id === id;
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
}

// POST /api/v1/users
function createUser(req, res) {
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    username: req.body.username,
    fullName: req.body.fullName,
    email: req.body.email,
    bio: req.body.bio || '',
    avatar: req.body.avatar || '',
    role: req.body.role || 'member',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  res.status(201).json(newUser);
}

// PATCH /api/v1/users/:id
function updateUser(req, res) {
  const id = Number(req.params.id);
  const user = users.find(function (u) {
    return u.id === id;
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  Object.assign(user, req.body);
  res.json(user);
}

// DELETE /api/v1/users/:id
function deleteUser(req, res) {
  const id = Number(req.params.id);
  const index = users.findIndex(function (u) {
    return u.id === id;
  });

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.status(204).send();
}

// GET /api/v1/users/:id/posts
function getUserPosts(req, res) {
  const id = Number(req.params.id);
  const userPosts = posts.filter(function (p) {
    return p.userId === id;
  });

  res.json(userPosts);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserPosts
};