const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const urlDatabase = {};

app.post('/shorten', (req, res) => {
    const originalUrl = req.body.originalUrl;
    const shortUrl = generateShortUrl();

    urlDatabase[shortUrl] = originalUrl;

    res.json({ shortUrl });
});

app.get('/:shortUrl', (req, res) => {
    const shortUrl = req.params.shortUrl;
    const originalUrl = urlDatabase[shortUrl];

    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

function generateShortUrl() {
    return Math.random().toString(36).substring(2, 8);
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
