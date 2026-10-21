const posts = require('../models/posts');
const comments = require('../models/comments');

// GET /api/v1/posts  و  GET /api/v1/posts?tag=xxx
function getAllPosts(req, res) {
  const tag = req.query.tag;

  if (tag) {
    const filtered = posts.filter(function (p) {
      return p.tags.includes(tag);
    });
    return res.json(filtered);
  }

  res.json(posts);
}

// GET /api/v1/posts/:id
function getPostById(req, res) {
  const id = Number(req.params.id);
  const post = posts.find(function (p) {
    return p.id === id;
  });

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(post);
}

// POST /api/v1/posts
function createPost(req, res) {
  const now = new Date().toISOString();

  const newPost = {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags || [],
    likes: 0,
    createdAt: now,
    updatedAt: now
  };

  posts.push(newPost);
  res.status(201).json(newPost);
}

// PATCH /api/v1/posts/:id
function updatePost(req, res) {
  const id = Number(req.params.id);
  const post = posts.find(function (p) {
    return p.id === id;
  });

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  Object.assign(post, req.body);
  post.updatedAt = new Date().toISOString();

  res.json(post);
}

// DELETE /api/v1/posts/:id
function deletePost(req, res) {
  const id = Number(req.params.id);
  const index = posts.findIndex(function (p) {
    return p.id === id;
  });

  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  posts.splice(index, 1);
  res.status(204).send();
}

// POST /api/v1/posts/:id/like
function likePost(req, res) {
  const id = Number(req.params.id);
  const post = posts.find(function (p) {
    return p.id === id;
  });

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  post.likes = post.likes + 1;
  res.json(post);
}

// GET /api/v1/posts/:id/comments
function getPostComments(req, res) {
  const id = Number(req.params.id);
  const postComments = comments.filter(function (c) {
    return c.postId === id;
  });

  res.json(postComments);
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostComments
};