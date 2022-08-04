import express from 'express';
import { addMovie } from '../controllers/movies.js'

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello');
})

router.post('/', addMovie);

export default router;