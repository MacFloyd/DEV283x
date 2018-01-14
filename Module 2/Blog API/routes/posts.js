module.exports = {
  getPosts(req, res) {
    res.status(200).send(req.store.posts);
  },
  addPost(req, res) {
    req.body.comments = [];
    req.store.posts.push(req.body);
    res.status(201).send({ id: req.store.posts.length - 1 });
  },
  updatePost(req, res) {
    req.store.posts[req.params.id] = req.body;
    res.status(200).send(req.store.posts[req.params.id]);
  },
  removePost(req, res) {
    req.store.posts.splice(req.params.id, 1);
    res.status(204).send();
  }
}
