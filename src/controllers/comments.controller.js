const comments = require('../models/comments');

// GET /api/v1/comments  و  GET /api/v1/comments?postId=xxx
function getAllComments(req, res) {
  const postId = req.query.postId;

  if (postId) {
    const filtered = comments.filter(function (c) {
      return c.postId === Number(postId);
    });
    return res.json(filtered);
  }

  res.json(comments);
}

// GET /api/v1/comments/:id
function getCommentById(req, res) {
  const id = Number(req.params.id);
  const comment = comments.find(function (c) {
    return c.id === id;
  });

  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  res.json(comment);
}

// POST /api/v1/comments
function createComment(req, res) {
  const newComment = {
    id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 1,
    postId: req.body.postId,
    userId: req.body.userId,
    text: req.body.text,
    createdAt: new Date().toISOString()
  };

  comments.push(newComment);
  res.status(201).json(newComment);
}

// PATCH /api/v1/comments/:id
function updateComment(req, res) {
  const id = Number(req.params.id);
  const comment = comments.find(function (c) {
    return c.id === id;
  });

  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  Object.assign(comment, req.body);
  res.json(comment);
}

// DELETE /api/v1/comments/:id
function deleteComment(req, res) {
  const id = Number(req.params.id);
  const index = comments.findIndex(function (c) {
    return c.id === id;
  });

  if (index === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  comments.splice(index, 1);
  res.status(204).send();
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};