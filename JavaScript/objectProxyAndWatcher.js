/*
 The goal here is to use "proxies" and "event handlers"
 in Node.js code to enable an action to take place
 whenever an object is updated.
 */

// A JavaScript Object to update and watch
/*
 It would also be correct to start the Proxy with a blank object,
 and add these things to it later.
 */
const myInitialObject = {
  thing1: 0,
  thing2: 0,
  thing3: 0,
  number1: 0,
};

//
/*
A "validator" or replacement for the function in the object that updates the object

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

 I believe it is called a "validator" in the example because the intention is that
 it can be used to "validate" incoming data updates to the object,
 and reject attempts to make updates that don't fit the required
 pattern.
 However, one can also always return true and perform other operations as well.
 */
const validator = {
  set(obj, prop, value) {
    // As a demonstration, you can validate the input to the object,
    // throw errors if it is bad,
    // and NOT update the object.
    if (prop.substr(0, 6) === 'number' && !Number.isFinite(value)) {
      throw new TypeError(
        `The property ${prop} may only accept finite numbers.`,
      );
    }

    // Do something different before setting, like console.log it,
    // or whatever you need to do.
    console.log(`The property ${prop} has been updated with ${value}`);

    // The default behavior to store the value
    // eslint-disable-next-line no-param-reassign
    obj[prop] = value;

    // Indicate success
    return true;
  },
};

// One could also start with a blank object:
const store = new Proxy({}, validator);
store.a = 'hello';

// And we can use the same validator function on many objects.

const myObservableObject = new Proxy({}, validator);

myObservableObject.thing1 = 1;
myObservableObject.thing2 = '2';
myObservableObject.thing3 = 'three';
myObservableObject.newThing = 10;
try {
  myObservableObject.number1 = 'bob';
} catch (e) {
  console.error(e.message);
}
console.log(myObservableObject);
myObservableObject.number1 = 2;
console.log(myObservableObject);
