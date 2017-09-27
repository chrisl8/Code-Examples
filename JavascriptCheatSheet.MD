JavaScript Cheat Sheet
======================
These are handy things that, at least for me, are not quite "no brainer" level.
Currently I'm using ES6.

##Find Object Value in Array of Objects by Value of specified Key:
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

##Find Index of Object in Array of Objects by Value of specified Key:
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

##Split by comma into array ignoring any whitespace
```
let listAsArray = list.split(/[\s,]+/g);
```
