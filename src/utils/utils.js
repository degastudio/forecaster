const path = require('path');
const fs = require('fs');
const db = require('../database');

module.exports = {
    fsInstall: (value) => {
        const folder = path.join(path.dirname(require.main.path), '/.keys/open-weather.txt');
        let result = true;

        try {
            fs.writeFile(folder, value, (err) => {
                if (err) {
                    result = false;
                }
            });
        }
        catch {
            result = false;
        }

        return result;
    },
    dbInstall: async (key) => {
        let isConnected = await db.connect();

        if (!isConnected) {
            console.log('No DB Connection!');
            return false;
        }

        let result = await db.insert({ name: 'OpKey', key: key });

        return result.insertedCount === 1;
    }
}

