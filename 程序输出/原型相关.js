//num 1
function Person() {}
let p = new Person()
console.log(p.__proto__);
console.log(p.__proto__.__proto__);
console.log(p.__proto__.__proto__.constructor);
console.log(p.__proto__.__proto__.constructor.prototype);
console.log(p.__proto__.__proto__.constructor.prototype.constructor);
console.log(p.__proto__.__proto__.constructor.prototype.constructor.constructor);
console.log(p.__proto__.__proto__.constructor.prototype.constructor.constructor.constructor);

//num 2
