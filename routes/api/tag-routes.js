const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{ model: Product }],
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: "data not found" });
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  if (req.params.id) {
    Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.status(404).json({ msg: "data not found" });
      });
  }
});

router.post("/", (req, res) => {
  // create a new tag
  if (req.body.tag_name) {
    Tag.create({
      tag_name: req.body.tag_name,
    })
      .then((data) => res.json({ msg: `${req.body.tag_name} is created` }))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "can not create your tag" });
      });
  } else {
    res.status(500).json({ msg: "your sended data have some problem" });
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  if (req.params.id && req.body.tag_name) {
    Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((data) =>
        res.json({
          msg: `your ${req.params.id} is updated as ${req.body.tag_name}`,
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: `can not update ${req.params.id}` });
      });
  } else {
    res.status(500).json({ msg: "your sended data have some problem" });
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  if (req.params.id) {
    Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((data) =>
        res.json({ msg: `${req.params.id} id deleted successfully` })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: `${req.params.id} can not delete have some server error.`,
        });
      });
  } else res.status(500).json({ msg: "you are not defind id correctly" });
});

module.exports = router;
