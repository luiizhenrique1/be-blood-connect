import express from 'express';
import routes from './routes/index.route.js';

const app = express();

app.use(express.json());
app.use('/api', routes);

app.listen(8000, console.log('Server Online'));
