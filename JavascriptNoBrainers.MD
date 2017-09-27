JavaScript Cheat Sheet
======================
These are super basic things that we do many times every day, and yet I still have to look them up sometimes.
Currently I'm using ES6.

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
