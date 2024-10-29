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

# Exploring TypeScript's Type System

## Any Type

```ts
// any type is the default JavaScript behavior of types.
// The intention is to avoid any type
let firstName: any = "Mark";

// Once any time is assigned then any value can be assigned to such variable
firstName = 123;

// Here we are assigning an array
firstName = [5, 4, 8, 4];

// TypeScript warns us if any value is implicitly any
// Which means we did not defione a type and TS knows that the value can be anything
// so it warns us that we should assign a strict type to it

function returnParam(param) {
  return param;
}

//There is an option to disable this behaviour by setting noImplicitAny: false;
// but we do not want to do this
```

## Unknown Type

```ts
// Unknown is a better type than any

// function multiByTwo(number: unknown) {
//     return number * 2;
// }

// You can check types to avoid error when dealing
function multiByTwo(number: unknown) {
  if (typeof number === "number") {
    return number * 2;
  }
  return "Please provide a valid number";
}

console.log(multiByTwo(4));
console.log(multiByTwo("john"));
```

## Custom Types

```ts
// Date;
// Array;
// Map;
// Set;
// Promise;
// RegExp;
// Error;
// Function;
// Symbol;
// WeakMap;
// WeakSet;

// As naming convention use Upper Camel Case or also called PascalCase
type CustomString = string;
type CustomNumberType = number;
type CustomDate = Date;
type CustomSymbol = Symbol;

let firstName: CustomString = "Mark";
let age: CustomNumberType = 32;
let today: CustomDate = new Date(); // Object instantiation hence has a constructor and new keyword
let unique: CustomSymbol = Symbol(); // Primitive does not require new keyword
```

```ts
// As naming convention use Upper Camel Case or also called PascalCase
type CustomString = string;
type CustomNumberType = number;
type CustomDate = Date;
type CustomSymbol = Symbol;

// Duck Typing is used by TypeScript for inference of types
//* "If it looks like a duck and quacks like a duck, it's a duck".
let firstName: CustomString = "Mark";
let age: CustomNumberType = 32;
let today: CustomDate = new Date(); // Object instantiation hence has a constructor and new keyword
let unique: CustomSymbol = Symbol(); // Primitive does not require new keyword

// If you do not assign a type to a variable TS will still try to infer it
// If I try to assign another type to firstName it will throw error
let lastName = "Doe";
lastName = 25;

// This is an example of a declaration
function addNumber(a: number, b: number) {
  return a + b;
}

// TypeScript is able to infer that final result will be a number
let finalResult = addNumber(10, 15);
```

## Union Types

```ts
// As naming convention use Upper Camel Case or also called PascalCase
type StringOrNumber = string | number;
type NumberOrUndefined = number | undefined;
type StringNumberUndefined = string | number | undefined;
type StringOrNull = string | null;
type DateOrUndefined = Date | undefined;
type SymbolOrNull = Symbol | null;

// We will see a better way to make params optional later
// when we talk about functions but for now input can be considered as undefined
// as we are talking about basic union types
function print(input: string | undefined) {
  if (input) {
    console.log(input);
  }
  console.log("Please input something to print");
}
```

## Conditional Types

```ts
type CustomDate = Date;
type CustomString = string;

// Type declarations using conditional types in TypeScript
type TrueString = CustomString extends string ? true : false;
type ConditionalNumber = CustomDate extends Date ? number : string;
type DateAssigment = CustomDate extends Date ? Date : undefined;
```

## subtype - parent type

```ts
// A subtype will always exten the parent type
type check = any extends unknown ? true : false;
type check2 = string extends any ? true : false;
type check3 = number extends any ? true : false;
type check4 = {} extends Object ? true : false;
type check5 = [] extends Object ? true : false;
type check6 = Function extends Object ? true : false;
type check7 = never extends any ? true : false;

// A funtion delclaration that never completes and returns a never type
const throwError = (errorMsg: string) => {
  throw new Error(errorMsg);
};

let strings: Object = ["a", "b"];
let myFunc: Function = () => 2;
```

## Type casting

```ts
// Types can be casted other types.
// This shoudl be done when you are sure that TypeScript is not able to infer the types correctly
let firstName = <any>"Mark";
let lastName = "Doe" as any;

let user = {
  name: "Mark",
  email: "mark@email.com",
};

type User = {
  name: string;
  email: string;
};

function fetchUser() {
  return user as User;
}

const fetchedData = fetchUser();
```

## Test

```ts
let city = "New York"; // string
let population = 8400000;
const age = 32;
let oldAge = 79 as const;
let newAge = oldAge;
let data = new Map();
let score = [90, 86, 100];
type Primitive = string | number | boolean;
type CustomName = "John" extends string ? string : "John";
type CustomAge = typeof newAge extends number ? 79 : number;
type CheckData = typeof data extends Object ? true : false;
type CheckScore = typeof score extends never ? {} : [];

/**
 * Are the following statements valid
 * Check if below lines of code are valid as per TypeScript or not without uncommenting them
 *  */

// age = 85;
// score.push(10);
// score.push("New Score");
// let customAge: CustomAge = 50;
// let primitive: Primitive = new Date();
// let years: CheckScore = [];
```

## Test Answers

```ts
let city = "New York"; // string
let population = 8400000; // number
const age = 32; // litral 32
let oldAge = 79 as const; // litral 79
let newAge = oldAge; // litral 79
let data = new Map(); // Map<any, any>
let score = [90, 86, 100]; // number []
type Primitive = string | number | boolean; //  string | number | boolean
type CustomName = "John" extends string ? string : "John"; // string
type CustomAge = typeof newAge extends number ? 79 : number; // 79
type CheckData = typeof data extends Object ? true : false; // true
type CheckScore = typeof score extends never ? {} : []; // []

/**
 * Are the following statements valid
 * Check if below lines of code are valid as per TypeScript or not without uncommenting them
 *  */

age = 85; // @Error age is a const and connot be re-assigned
score.push(10); // This is valid as score is an array of numbers
score.push("New Score"); // @Errro Score is an array of number and can only have numbers
let customAge: CustomAge = 50; // @Error custom age has a literal value of 79
let primitive: Primitive = new Date(); // @Error data is not a part of the union
let years: CheckScore = []; // Valid is years is a litral empty array
```
