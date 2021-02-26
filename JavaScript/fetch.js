// You can paste this into a browser
// If you are ON an httpS page, you must use https (google.com is https by default now)
url = "https://jsonplaceholder.typicode.com/posts/";

fetch(url)
    .then(response => response.json())
    // Note that you have to call .json() on the response to get anything
    // useful out of the response
    .then(data => console.log(data));
