import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import cards from './cards/router'
import categories from './category/router'

const app = express();
app.use(json());
app.use(cors());
app.use('/api/cards', cards);
app.use('/api/categories', categories);

app.listen(8080, () => console.log('Server started on 8080...'));