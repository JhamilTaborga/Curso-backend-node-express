const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  // const { categoryId } = req.params;
  res.json([
    {
      category: 'clothes',
      products: ['jeans', 'shoes', 'jacket']

    },
    {
      category: 'electronics',
      products: ['consoles', 'pc', 'monitor']

    },
    {
      category: 'miscellaneous',
      products: ['table', 'guitar', 'catsand']
    }
  ]);
});

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});


module.exports = router;
