import express from 'express';
import routes from './routes/index.route.js';

const app = express();

app.use(express.json());
app.use('/api', routes);

app.listen(process.env.PORT, console.log('Server Online'));
