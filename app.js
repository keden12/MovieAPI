import express from 'express';
import bodyParser from 'body-parser';

import moviesRoutes from './routes/movies.js';

const app = express()
const PORT = 3000

app.use(bodyParser.json());

app.use('/api', moviesRoutes);

app.use('*', (req, res) => {
  res.status(404)
  res.send({
    error: "Route not found"
  })
  
})


export default app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})