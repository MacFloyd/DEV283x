const fs = require('fs');
const path = require('path');

const csv2json = (fileName) => {
    fs.readFile(fileName, (err, file) => {
        if(err) console.log(`Error: ${err.message}`);
        else {
            const lines = file.toString().split('\r\n'); // Split by line
            const keys = lines.shift().split(','); // Store and remove the first line

            let objArray = [];
            for(let line of lines) {
                let values = line.split(','); // Split the values
                let jsonObj = {};

                for(let k in keys) {
                    jsonObj[keys[k]] = values[k];
                }

                objArray.push(jsonObj); // Insert into the JSON array
            }

            let jsonName = `${fileName.replace('.csv', '.json')}`
            fs.writeFileSync(path.join(__dirname, jsonName), JSON.stringify(objArray));
            console.log(`Created ${jsonName}`);
        }
    });
}

csv2json(process.argv[2]);
