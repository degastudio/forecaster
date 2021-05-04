const fs = require('fs');

module.exports = {
    install: (value) => {
        const folder = path.join(path.dirname(require.main.path));
        try {
            fs.writeFile(`${folder}/.keys/open-weather.txt`, value);
        }
        catch (err) {
            return false;
        }
        return true;
    }
}

