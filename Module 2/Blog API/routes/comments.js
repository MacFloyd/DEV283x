module.exports = {
  getComments(req, res) {
    res.status(200).send(req.store.posts[req.params.id].comments);
  }, 
  addComment(req, res) {
    req.store.posts[req.params.id].comments.push(req.body);
    res.status(201).send({ id: req.store.posts[req.params.id].comments.length -1 });
  },
  updateComment(req, res) {
    req.store.posts[req.params.id].comments[req.params.commentId] = req.body;
    res.status(200).send(req.store.posts[req.params.id].comments[req.params.commentId]);
  },
  removeComment(req, res) {
    req.store.posts[req.params.id].comments.splice(req.params.commentId, 1);
    res.status(204).send();
  }  
}
