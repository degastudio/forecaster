let input = document.getElementById('search-input');
let button = document.querySelector('button');
let h3 = document.querySelector('#forecast-result h3');
let primary = document.querySelector('.primary-details');
let secondary = document.querySelector('.secondary-details');
let tertiary = document.querySelector('.tertiary-details');

input.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        button.click();
    }
});

button.addEventListener('click', (e) => {
    secondary.innerHTML = 'Loading..';
    
    fetch(`/forecast/${input.value}`)
        .then((res) => {
            if(res.status > 299) {
                secondary.innerHTML = '<h3>Place Not Found! Try Another One.</h3>';
                return;
            }

            res.json().then((data) => {
                if(data.error) {
                    secondary.innerHTML = '<h3>Place Not Found! Try Another One.</h3>';
                    return;
                }

                let w = JSON.parse(data);
                h3.innerText = w.name.toUpperCase();
                primary.innerHTML = `${w.weather[0].description}&nbsp;&nbsp;${w.main.temp.toFixed(1)}&deg;`;
                secondary.innerHTML = `Min: ${w.main.temp_min.toFixed(1)}&deg; - Max: ${w.main.temp_max.toFixed(1)}&deg;`;
                tertiary.innerHTML = `Umidity: ${w.main.humidity}&percnt;`;
            });
        });
});