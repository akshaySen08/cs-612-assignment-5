var fs = require('fs');

const getJsonData = () => {
    fs.readFileSync('json-data.json', 'utf8', async function (err, data) {
        // data = JSON.parse(data
        console.log({data});
        return data;
    });
}

module.exports.getJsonData = getJsonData;