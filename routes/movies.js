import express from 'express';
import { addMovie, getMovie } from '../controllers/movies.js'

const router = express.Router();

router.get('/', getMovie);

router.post('/', addMovie);

export default router;