import express from 'express';
import { json } from 'body-parser';

const PORT = 3000;
const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
    res.send('hi there')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
