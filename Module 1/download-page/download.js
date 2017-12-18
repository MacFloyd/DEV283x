const http = require('http');
const path = require('path');
const fs = require('fs');
const uuidv1 = require('uuid/v1')

const downloadPage = (url = 'http://nodeprogram.com') => {
    console.log(`Downloading ${url}`);

    const fetchPage = (urlF, callback) => {
        http.get(urlF, (res) => {
            let buff = '';

            res.on('data', (chunck) => {
                buff += chunck;
            });

            res.on('end', () => {
                callback(null, buff);
            });
        }).on('error', (err) => {
            console.error(`Got error: ${err}`);
            callback(err.message);
        });
    }

    const folderName = uuidv1();
    fs.mkdir(folderName);
    fetchPage(url, (err, data) => {
        if(err) return console.log(err);
        fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url);
        fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data);
        console.log(`Downloading is done in folder ${folderName}`);
    });
}

downloadPage(process.argv[2]);
