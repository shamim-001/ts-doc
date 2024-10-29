# Primitive Types

## string, number, boolean

```ts
/**
 * string types
 */
var firstName: string = "John";
let autoMobile: string = "BMW";
// Variables defined with const cannot be Reassigned
// Constants therefore have a stricter type
// It's better to let TypeScript infer this correctly instead of making it a string
const city = "New York";
// Constant cannot be reassigned doing so you get an error
city = "San Fransisco";

//  Any expression that eveluates to a string is also a string type
let students = 32;
let studentsAsString: string = students.toString();

/**
 * Number types
 */
var age: number = 21;
let year: number = 2024;
// Again constants are a stricter type and use literal values
const numberOfMembers = 61;
// Any express that evaluates to a number is a number type
let stringToNumber: number = parseInt("1985");

/**
 * Boolean Types
 */
var isStudent: boolean = true;
let hasGraduated: boolean = false;
// Constant here again is not a boolean value but always true
const alwaysStudent = true;
// Expressions that evalue to a boolean value are also boolean.
let minimumAge: boolean = age >= 6 ? true : false;
```

## undefined, null

```ts
// primitive types that reflect the absence of a value

// Undefined values
let user: undefined;
console.log(user);

// null values
let userRole: null;
// Using user role before defining it throws an error with TS
//! console.log(userRole);
// Hence define it first
userRole = null;
console.log(userRole);

// null and undefined are not the same
console.log(userRole === user);

// Even though used interchangebly by JS developers in conditions
if (!userRole) {
  console.log("The condition is true");
}

if (!user) {
  console.log("The condition is true");
}
```

## BigInt

```ts
/**
 * BigInt type newly introduced in ES2020
 */
let bigInt1:bigint = BigInt(945845);

let bigInt2:bigint = 123564564n;
// BigInt constructor also create bigint in a similar way
console.log(bigInt1);

// Maximum integer possible with JavaScript before BigInt
const safeInt = Number.MAX_SAFE_INTEGER;

console.log(safeInt);

// Adding values to the maximum integer does not change the number
const safeIntPlusOne = safeInt + 1;
const safeIntPlusTwo = safeInt + 2;

console.log(safeIntPlusOne);
console.log(safeIntPlusTwo);

// They would still be the same even after adding number
console.log(safeIntPlusOne === safeIntPlusTwo);

// Expression that evali
let c: bigint = bigInt1 - bigInt1;

// Cannot use a floating point value for creating a bigint
// TS warns you if you try to create BigInt with wrong types
let e:bigint = 24551.2n;

// Type checks for methods which only require number as an arguement
let f = Math.log(bigInt1);
```

## Symbol

```ts
let id: symbol = Symbol(1234);
let alphabeticId: symbol = Symbol("id");

let user = {
  [id]: "12344",
  [alphabeticId]: "uniqueId",
  name: "Mark",
  getId() {
    return this[id];
  },
};

// Symbols are  private
console.log(user.name);
// will throw a typescript error with id not accessible
// Throws error because the key here is not 'id' but a symbol generated with 1234 who's value is unknown but guaranteed to be unique
//! console.log(user.id);

// The id property does exist add the getId method to the object
console.log(user.getId());
```

## Test

```ts
/**
 * Assign the correct types to each of the following variables
 */
let message = "Hello, TypeScript!";
let age = 42;
let isStudent = true;
let fetched = null;
let user = undefined;
let largeNumber = 9007199254740991n;
let unique = Symbol("uniqueSymbol");
```

## Test Answers

```ts
/**
 * Assign the correct types to each of the following variables
 */
let message: string = "Hello, TypeScript!";
let age: number = 42;
let isStudent: boolean = true;
let fetched: null = null;
let user: undefined = undefined;
let largeNumber: bigint = 9007199254740991n;
let unique: symbol = Symbol("uniqueSymbol");
```
