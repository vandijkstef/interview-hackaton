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
  sendData: function(data){
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
    })();
  }
}

userForm.init();
