const express = require('express');

const app = express();

function createData(name, link, description, language, hits) {
  return { name, link, description, language, hits };
}

// link must start with http or https
const rows = [
  createData('neneTV', 'http://www.nene365.com', '종합 스포츠 중계 사이트', '한국어', 100),
  createData('spoTV', 'http://www.spotv365.com', '종합 스포츠 중계 사이트', '한국어', 100),
  createData('만수TV', 'http://www.mstv24.com', '종합 스포츠 중계 사이트', '한국어', 100),
  createData('coolTV', 'http://www.cool-365.com', '종합 스포츠 중계 사이트', '한국어', 100),
];

// api route
app.get('/api/links', (req, res) => {
  res.json(rows);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);