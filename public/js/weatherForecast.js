const forecastForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// addEventListener starts
forecastForm.addEventListener('submit', (e) => { 
	e.preventDefault();

	const location = search.value;
    messageOne.textContent = 'Loading forecast...';
	messageTwo.textContent = '';
	fetch('/weather?address=' + location).then((response) => { // fetch starts
		response.json().then((data) => { // json parsed response starts
			if (data.error) { 
				messageOne.textContent = data.error;
				messageTwo.textContent = '';
			} else {
               messageOne.textContent = '';
			   messageTwo.textContent = data.location + ': ' + data.forecast;
			}
			

		}); // json parsed response ends

	}); // fetch ends
}); // addEventListener ends
