/* JavaScript copies objects by reference,
   meaning that if you copy an object and modify
   either the original or the copy, they are both changed,
   which can make for some weird bugs.
   There isn't an elegant way to "clone" an object,
   because JS objects can contain anything, even functions,
   and also JS objects contain a lot of fancy 'prototype' functions
   and objects by default that copying would make a mess of.

   However, if your object is ONLY a container for 'simple'
   data, you can clone it by stringifying it and then rebuilding it.

   This should be fast and stable in Chrome and Node.js (which is based on Chrome).
   I would recommend this mostly for Node.js.
   For in-browser I would make VERY sure the object is quite shallow,
   or avoid this altogether.
   Node.js code is more stable than browser code in edge cases because it has a single target engine.
 */

// This demonstrates how objects are copied by reference:
console.log('Copy:');
var object1 = {
    one: 1,
    two: 2,
    three: 3
};
var object1copy = object1;
object1.one = 4;
console.log(object1copy);
object1copy.three = 5;
console.log(object1);

// Now we make a separate copy:
console.log('Copy with JSON.parse(JSON.stringify()):')
object1 = {
    one: 1,
    two: 2,
    three: 3
};
object1copy = JSON.parse(JSON.stringify(object1));
object1.one = 4;
console.log(object1copy);
object1copy.three = 5;
console.log(object1);

/* There are utilities for "deep" and "shallow" object copying.
   My experience has been that they are either unstable,
   or have so many caviets, that it is better to just NOT
   attempt "deep" copies, and only use "shallow" copies
   when you can test generously and ensure the object isn't
   going to be "enhanced" later by a future version of yourself
   with nested functions or other data that stringify
   might mangle.
 */