/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
const apikey = '4f1dc020feb035971c309f2a30e0f383';
const retrieveData = async () => {
    const request = await fetch(`/all/${document.querySelector('#zip').value}/${document.all('feelings').value}/${apikey}`);
    try {
        // Transform into JSON
        const allData = await request.json();
        console.log(allData)
        return allData;
    } catch (error) {
        console.log("error", error);
        alert('System Error');
    }

}
const postData = async () => {
        const request = await fetch(`/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                zip: document.all('zip').value
            })
        });
        try {
            // Transform into JSON
            const allData = await request.json();
            console.log(allData)
            return allData;
        } catch (error) {
            console.log("error", error);
            alert('System Error');
        }

    }
    (function () {
        document.querySelector("#generate").addEventListener("click", function (e) {

            retrieveData().then(allData => {
                console.log(allData);
                document.all('feelings').value = '';
                document.all('zip').value = '';
                document.getElementById('temp').innerHTML = (Math.round((allData.temp - 273.15) * 9 / 5 + 32)) + ' degrees';
                document.getElementById('content').innerHTML = allData.feel;
                document.getElementById("date").innerHTML = new Date(allData.date * 1000).toLocaleString();
            });

        });
        document.querySelector("#post").addEventListener("click", function (e) {

            postData().then(allData => {
                console.log(allData);
                document.all('feelings').value = '';
                document.all('zip').value = '';
                document.getElementById('temp').innerHTML = (Math.round((allData.temp - 273.15) * 9 / 5 + 32)) + ' degrees';
                document.getElementById('content').innerHTML = allData.feel;
                document.getElementById("date").innerHTML = new Date(allData.date * 1000).toLocaleString();
            });

        });
    })();