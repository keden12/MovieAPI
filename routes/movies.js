import express from 'express';
import { addMovie, getMovie } from '../controllers/movies.js'

const router = express.Router();

router.get('/movies', getMovie);

router.post('/movies', addMovie);

export default router;