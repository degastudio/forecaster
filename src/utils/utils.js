const path = require('path');
const fs = require('fs');

module.exports = {
    install: (value) => {
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
    }
}

