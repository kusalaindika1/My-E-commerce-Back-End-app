const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res
          .status(404)
          .json({ error: "can not find data. have some server err" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "can not find data. have some server err" });
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  if (req.params.id) {
    const id = parseInt(req.params.id);
    Category.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Product,
        },
      ],
    })
      .then((data) => {
        if (data) {
          res.json(data);
        } else {
          res
            .status(404)
            .json({ error: "can not find data. have some server error" });
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: "can not find data. have some server error" });
      });
  }
});

router.post("/", (req, res) => {
  // create a new category
  if (req.body.category_name) {
    Category.create({
      category_name: req.body.category_name,
    })
      .then((data) =>
        res.json({ msg: `${req.body.category_name} is created!` })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
      });
  } else {
    res
      .status(500)
      .json({ error: "internal server error not set category_name" });
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  if (req.params.id && req.body.category_name) {
    Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((data) =>
        res.json({
          msg: `${req.body.category_name} is update to id: ${req.params.id}`,
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "internal server error" });
      });
  } else {
    res.status(500).json({ error: "sended data have some error" });
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  if (req.params.id) {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        res.json({ msg: `${req.params.id} is deleted successfully` });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "some error" });
      });
  }
});

module.exports = router;
