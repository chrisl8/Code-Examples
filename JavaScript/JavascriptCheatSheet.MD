JavaScript Cheat Sheet
======================
These are super basic things that we do many times every day, and yet I still have to look them up sometimes,
along with a few that, at least for me, are not quite "no brainer" level.

###Iterate over an object (aka. Enumerating all properties of an object):
[Stack Overflow](http://stackoverflow.com/a/14379304)  
NOTE: There are some new ES5 ways to do this. See [MDN's Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects). I'm not using them yet because this method is more easily recognized by most developers.
```
for (var key in yourobject) {
   if (yourobject.hasOwnProperty(key)) {
   // Without the 'hasOwnProperty' check you will pick up object prototype values and functions!
      console.log(key, yourobject[key]);
   }
}
```

### Find Object Value in Array of Objects by Value of specified Key:
[Stack Overflow](http://stackoverflow.com/a/35398031)
```
let arrayOfObjects = [{
    name: 'bob',
    number: 12
},
{
    name: 'joe',
    number: 14
}];
let joeNumber = arrayOfObjects.find(x=> x.name === 'joe')['number'];
console.log(joeNumber); // 14
// Returns undefined if not found
```

### Find Index of Object in Array of Objects by Value of specified Key:
[Stack Overflow](http://stackoverflow.com/a/35398031)
```
let arrayOfObjects = [{
    name: 'bob',
    number: 12
},
{
    name: 'joe',
    number: 14
}];
let joeIndex = arrayOfObjects.findIndex(x=> x.name === 'joe');
console.log(joeIndex); // 1
// Returns -1 if not found.
```

### Split by comma into array ignoring any whitespace
```
let listAsArray = list.split(/[\s,]+/g);
```

### Get a random integer
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
```
function getRandomIntBelow(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

console.log(getRandomInt(3));
// expected output: 0, 1 or 2

console.log(getRandomInt(1));
// expected output: 0

console.log(Math.random());
// expected output: a number between 0 and 1
```

### Async/Await over an array
[Stack Overflow](https://stackoverflow.com/a/37576787/4982408)

If you want to run each entry in *parallel*, then you use `Promise.all()`  

```
async function printFiles () {
 const files = await getFilePaths();

 await Promise.all(files.map(async (file) => {
   const contents = await fs.readFile(file, 'utf8');
   console.log(contents);
 }));
}
```

If you want to run them in *series* you have to use `for...of`  
NOTE that `forEach` *CANNOT* and **SHOULD NOT** be used with async/await!  

```
async function printFiles () {
  const files = await getFilePaths();

  for (const file of files) {
    const contents = await fs.readFile(file, 'utf8');
    console.log(contents);
  }
}
```
NOTE, there are some other ideas that were floated:
[There is something new coming up for ES2018.](http://2ality.com/2016/10/asynchronous-iteration.html)
and indeed, the `for await of` syntax DOES exist, but
[Use Promise.all() instead](https://stackoverflow.com/a/46889489/4982408)

Because with `for await of` it fires them all in parallel, but then waits on them in series, and fails if in series.
The results are weird, as it LOOKS LIKE they fire in series, but they do not.
That `for await of` syntax is for a specific use case, and it isn't one I actually do often, so stick with `await Promise.all()` instead.

### Base64 Encoding in Node.js
https://stackoverflow.com/questions/6182315/how-can-i-do-base64-encoding-in-node-js


