let userData = {};

const userForm = {
	init: function(){
		let form = document.querySelector('form');
		form.addEventListener('submit', this.createData);
	},
	createData: function(e){
		e.preventDefault();
		let type = document.querySelector('input[name="type"]');
		let name = document.querySelector('input[name="name"]');
		const formData = {
			type: document.querySelector('input[name="type"]').value,
			name: document.querySelector('input[name="name"]').value,
			age: document.querySelector('input[name="age"]').value,
			gender: document.querySelector('input[name="gender"]:checked').value
		}
		userForm.sendData(formData);
	},
	sendData: function(data) {
		(async () => {
		const rawResponse = await fetch('/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const content = await rawResponse.json();
		userForm.succes(content)
		})();
	},
	succes: function(data) {
		if(data && data._id){
			userData = data;
			let firstState = document.querySelector('.first-state');
			let secondState = document.querySelector('.second-state');
			firstState.classList.add('inactive');
			secondState.classList.add('active');
			interview.init();
		}
	},
}

userForm.init();

var audioRec = new AUAudioRecorder();
audioRec.requestPermission();

const interview = {
	init: function(){
		this.startInterview();
	},
	questionNr: 0,
	startInterview: function() {
		let activeArticle = document.querySelectorAll('article');
		for(let i = 0; i < activeArticle.length; i++){
			activeArticle[i].classList.remove('active');
			if(i === this.questionNr) {
				activeArticle[i].classList.add('active');
			}
		}
		audioRec.startRecording( (err) => { console.log(err); } );
		let button = document.querySelectorAll('article')[this.questionNr];
		button = button.querySelector('button');
		button.addEventListener('click', function(e){
		e.preventDefault();
		audioRec.stopRecording( (err) => { console.log(err); } );
		setTimeout(function(){
			let data = audioRec.getRecordingFile();
			interview.sendData(data);
		}, 500);
		interview.startInterview();
		})
		this.questionNr++;
	},
	sendData: function(data) {
		var reader = new FileReader();
		reader.addEventListener("loadend", function() {
		var base64FileData = reader.result.toString();
		let obj = {
			userId: userData._id,
			audioBlob: base64FileData,
			questionNr: (interview.questionNr + 1),
			type: 'audio'
		};
		(async () => {
			console.log(obj);
			const rawResponse = await fetch('/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data'
			},
			body: JSON.stringify(obj)
			});
			const content = await rawResponse.json();
			console.log(content);
		})();
		});
		reader.readAsDataURL(data);
	}
}
