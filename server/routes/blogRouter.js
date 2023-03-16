const express = require('express');

const router = express.Router();

const {
  getVlogs,
  getVlog,
  createVlog,
  updateVlog,
  deleteVlog
} = require('../controllers/blogs');

router.get('/', getVlogs);
router.get('/:id', getVlog);

router.post('/', createVlog);

router.put('/:id', updateVlog);

router.delete('/:id', deleteVlog);

module.exports = router;
