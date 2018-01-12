const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//GET - only one joke
router.get('/:id', (req,res) => {
    console.log('ID from request: ', req.params.id);
    //SQL query
    const queryText = 'SELECT * FROM jokes WHERE id=$1';
    pool.query(queryText, [req.params.id])
        // runs on successful query
        .then((result) => {
            console.log('query results: ', result);            
            res.send(result.rows);
        })
        // error handling
        .catch((err) => {
            console.log('error making select query:', err);
            res.sendStatus(500);
        });
});

router.get('/whose/:name', (req, res) => {
    const queryText = 'SELECT * FROM jokes WHERE whosejoke=$1';
    pool.query(queryText, [req.params.name])
    // runs on successful query
    .then((result) => {
        console.log('query results: ', result);            
        res.send(result.rows);
    })
    // error handling
    .catch((err) => {
        console.log('error making select query:', err);
        res.sendStatus(500);
    });
});

router.get('/', (req, res) => {
    // query DB
    const queryText = 'SELECT * FROM jokes JOIN authors ON authors.id = authors_id;';
    pool.query(queryText)
        // runs on successful query
        .then((result) => {
            console.log('query results: ', result);            
            res.send(result.rows);
        })
        // error handling
        .catch((err) => {
            console.log('error making select query:', err);
            res.sendStatus(500);
        });

    // send back the results
});

router.post('/', (req, res) => {
    console.log('req.body: ', req.body);
    const queryText = 'INSERT INTO jokes(whosejoke, jokequestion, punchline, funniness) VALUES ($1, $2, $3, $4)';
    // use prepared statements!!!!!!!!!
    pool.query(queryText,[req.body.whoseJoke, req.body.jokeQuestion, req.body.punchLine, req.body.funniness])
        .then((result) => {
        console.log('query results: ', result);
        res.sendStatus(201);
    })
        // error handling
        .catch((err) => {
            console.log('error making insert query:', err);
            res.sendStatus(500);
        });

    //res.sendStatus(201);
});

//DELETE - only one joke
router.delete('/:id', (req,res) => {
    console.log('ID from request: ', req.params.id);
    //SQL query
    const queryText = 'DELETE FROM jokes WHERE id=$1';
    pool.query(queryText, [req.params.id])
        // runs on successful query
        .then((result) => {
            console.log('query results: ', result);            
            res.sendStatus(200);
        })
        // error handling
        .catch((err) => {
            console.log('error making select query:', err);
            res.sendStatus(500);
        });
});

router.put('/:id', (req,res) => {
    console.log('ID from request: ', req.params.id);
    //SQL query
    const queryText = 'UPDATE jokes SET funniness=$1 WHERE id=$2';
    pool.query(queryText, [req.body.funniness, req.params.id])
        // runs on successful query
        .then((result) => {
            console.log('query results: ', result);            
            res.sendStatus(200);
        })
        // error handling
        .catch((err) => {
            console.log('error making select query:', err);
            res.sendStatus(500);
        });
});

router.get('/singleauthor/:author', (req, res) => {
    // query DB
    const queryText = 'SELECT * FROM jokes JOIN authors ON authors.id = authors_id WHERE authors.whoseJoke = $1';
    pool.query(queryText, [req.params.author])
        // runs on successful query
        .then((result) => {
            console.log('query results: ', result);            
            res.send(result.rows);
        })
        // error handling
        .catch((err) => {
            console.log('error making select query:', err);
            res.sendStatus(500);
        });

    // send back the results
});

module.exports = router;