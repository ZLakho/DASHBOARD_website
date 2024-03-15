function shortenUrl() {
    const originalUrl = document.getElementById('originalUrl').value;

    fetch('http://localhost:3000/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('shortUrl').innerText = `Shortened URL: http://localhost:3000/${data.shortUrl}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
