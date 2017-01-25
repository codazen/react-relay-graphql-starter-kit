import express from 'express';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
