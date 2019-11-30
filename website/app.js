/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

(function() {
    document.querySelector("#generate").addEventListener("click", function(e) {
        fetch(`zipcode/${document.querySelector('#zip').value}`).then(x => x.json()).then(x => {
            alert(`The temperature will be ${x.wet}!`);

        });
    })
})();