const router = require('express').Router();

router.get('/', (req, res) => { 
    return res.send('User')
})

module.exports = router