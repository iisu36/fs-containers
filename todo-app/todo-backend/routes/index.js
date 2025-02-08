const express = require('express')
const router = express.Router()

const configs = require('../util/config')
const redis = require('../redis')
const { Todo } = require('../mongo')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits,
  })
})

router.get('/statistics', async (req, res) => {
  res.send({
    added_todos: parseInt((await redis.getAsync('added_todos')) || 0),
  })
})

module.exports = router
