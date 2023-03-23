import express from 'express';
const app = express();

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];


app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

// /api/courses/1

app.get('/api/courses/:id', (req, res) => {
    res.send(req.query);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
