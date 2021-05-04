const req = require('request-promise');
const path = require('path');
const fs = require('fs').promises;

const getOpenWeatherConfigs = async (lang, units = 'metric') => {
    const file = path.join(path.dirname(require.main.path), '/.keys/open-weather.txt');

    console.log('FILE PATH:', file);

    const key = await fs.readFile(file, { encoding: 'utf8', flag: 'r' })
        .catch((err) => {
            console.log('FILE READING ERROR:', err);
        });

    return `https://api.openweathermap.org/data/2.5/weather?appid=${key}&lang=${lang}&units=${units}&q=`;
} 

module.exports = {
    forecast: async (place) => {
        const url = await getOpenWeatherConfigs('it');
        return await req.get(url + place, (err, res) => {
            return !err ? JSON.parse(res.body) : {};
        });
    }
}