const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(fileUpload());

app.post('/upload', (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).send('No file uploaded.');
    }

    let EDFile = req.files.file;

    EDFile.mv(`./files/${EDFile.name}`, err => {
        if (err) return res.status(500).send({ message: err });

        return res.status(200).send({ message: 'File uploaded successfully.' });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
