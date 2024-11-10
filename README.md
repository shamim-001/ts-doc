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

# Objects in TypeScript

## Intro

```ts
let person = {
  name: "Mark",
  age: 32,
};

// Car is any object without a shape or defined properties
let car: Object = {
  brand: "BMW",
  color: "black",
};

// The problem using teh Object type, its a super type and Arrays are also objects
let score: Object = [];

// If you see just because car is a Object I can re-assign it as an array
// ! This is a problem
car = [21, 32, 48];

// Defining an object with the litral syntax
let newCar: {} = {
  brand: "BMW",
  color: "black",
};

// The problem with usign the litral object {} is that now properties are not defined and can vary
// This can lead to errors in the application
newCar = {
  brand: "BMW",
};
```

## Type Alias

```ts
// A post can be strictly typed using type annotations
// let post: {
//   title: string; // Type Annotations using semi-colons instead of commas
//   content: string;
//   date: Date;
// } = {
//   title: "This is a blog post",
//   content: "Content of the post",
//   date: new Date(),
// };

// We can use Type declarations using Type Alias

type Post = {
  title: string; // Type Annotations using semi-colons instead of commas
  content: string;
  date: Date;
};

let post: Post = {
  title: "This is a blog post",
  content: "Content of the post",
  date: new Date(),
};

// Advantage of type declaration, can use the same type again for a new object
let post2: Post = {
  title: "This is a blog post 2",
  content: "Content of the post 2",
  date: new Date(),
};
```

## Nested Objects

```ts
// Better to declare a separate type for Author
type Author = {
  name: string;
  age: number;
  email: string;
};

type Post = {
  title: string; // Type Annotations using semi-colons instead of commas
  content: string;
  date: Date;
  author: Author; // Assign Author type to author property on Post type
};

let post: Post = {
  title: "This is a blog post",
  content: "Content of the post",
  date: new Date(),
  author: {
    name: "John",
    age: 32,
    email: "john@doe.com",
  },
};
```

## Index Signature with object

```ts
// Better to declare a separate type for Author
type Author = {
  name: string;
  age: number;
  email: string;
  readonly type: "human" | "ai";
};

type AwardDetails = {
  name: string;
  date: Date;
};

type Awards = {
  [keyof: string]: AwardDetails;
};

type Post = {
  title: string; // Type Annotations using semi-colons instead of commas
  content: string;
  date: Date;
  author: Author; // Assign Author type to author property on Post type
  awards: Awards;
  category?: string;
};

let post: Post = {
  title: "This is a blog post",
  content: "Content of the post",
  date: new Date(),
  category: "javascript",
  author: {
    name: "John",
    age: 32,
    email: "john@doe.com",
    type: "human",
  },
  awards: {
    web: {
      name: "Wed Awards",
      date: new Date(),
    },
    web3: {
      name: "Web 3",
      date: new Date(),
    },
  },
};

let post2: Post = {
  title: "This is a blog post",
  content: "Content of the post",
  date: new Date(),
  author: {
    name: "John",
    age: 32,
    email: "john@doe.com",
    type: "human",
  },
  awards: {
    web: {
      name: "Wed Awards",
      date: new Date(),
    },
  },
};

// Readonly properties once created cannot be re-assigned
post2.author.type = "ai";
```

## union type with object

```ts
// Declare a type for the Dog
type Dog = {
  name: string;
  barks: boolean;
  wags: boolean;
};

// Declare a type for the Cat
type Cat = {
  name: string;
  purrs: boolean;
};

// Create a new type which is a union of Dog and Cat
type DogAndCatUnion = Dog | Cat;

// All Dog properties
let dog: DogAndCatUnion = {
  name: "Buddy",
  barks: true,
  wags: true,
};

// All Cat properties
let cat: DogAndCatUnion = {
  name: "Bella",
  purrs: true,
};

// All Dog and partial cat properties
let dogAndCat: DogAndCatUnion = {
  name: "Hybrid",
  barks: true,
  wags: true,
  purrs: true,
};

// Cannot contain partial Properties of one of the types
let partialDog: DogAndCatUnion = {
  name: "Hybrid",
  barks: true,
};
```

## Discriminated Unions

```ts
// To Discriminate Unions All the three types must have the state property
type NetworkLoadingState = {
  state: "loading";
};

type NetworkFailedState = {
  state: "failed";
  code: number;
};

type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

// We Want to create a Network State with includes Loading, Failed and Success
// Create a type which represents only one of the above types
// but you aren't sure which it is yet.
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;

// Based on the types created now we can discriminate the network state and take action based on the state
// We need to create a logger function which logs the state of the network
function logger(state: NetworkState): string {
  // Right now TypeScript does not know which of the three
  // potential types state could be.

  // Trying to access a property which isn't shared
  // across all types will raise an error
  //! state.code;

  // By switching on state, TypeScript can narrow the union
  // down in code flow analysis
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      // The type must be NetworkFailedState here,
      // so accessing the `code` field is safe
      return `Error ${state.code} downloading`;
    case "success":
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}
```

## Test

```ts
let airplane = {
  model: "Airbus A380",
  flightNumber: "A2201",
  timeOfDeparture: new Date(),
  timeOfArrival: new Date(),
  caterer: {
    name: "Special Food Ltd",
    address: "484, Some Street, New York",
    phone: 7867856751,
  },
  seats: {
    A1: "John Doe",
    A2: "Mark Doe",
    A3: "Sam Doe",
  },
};
```

## Test Answers

```ts
// Declare a Caterer type
type Caterer = {
  name: string;
  address: string;
  phone: number;
};

// Declare a Seats type
type Seats = {
  [keyof: string]: string;
};

// Declare a Airplane Type
type Airplane = {
  model: string;
  flightNumber: string;
  timeOfDeparture: Date;
  timeOfArrival: Date;
  caterer: Caterer;
  seats: Seats;
};

// Assign Airplane Type to Object
let airplane: Airplane = {
  model: "Airbus A380",
  flightNumber: "A2201",
  timeOfDeparture: new Date(),
  timeOfArrival: new Date(),
  caterer: {
    name: "Special Food Ltd",
    address: "484, Some Street, New York",
    phone: 7867856751,
  },
  seats: {
    A1: "John Doe",
    A2: "Mark Doe",
    A3: "Sam Doe",
  },
};
```

# Arrays and Enums

## Intro

```ts
// Declaring an array of numbers
let a: number[] = [1, 2, 3];
//  Generic syntax of declaring array of strings
let b: Array<string> = ["a", "b", "c"];
// Array containing mutiple types
let c: (string | number)[] = ["a", "b", 1];

// Declare a Caterer type
type Caterer = {
  name: string;
  address: string;
  phone: number;
};

// Declare a Seats type
type Seats = {
  [keyof: string]: string;
};

// Declare a Airplane Type
type Airplane = {
  model: string;
  flightNumber: string;
  timeOfDeparture: Date;
  timeOfArrival: Date;
  caterer: Caterer;
  seats: Seats;
};

// Declarign a type for an array of Airplanes
// Example of an array of objects
type Airplanes = Airplane[];

// Assign Airplane Type to Object
let airplanes: Airplanes = [
  {
    model: "Airbus A380",
    flightNumber: "A2201",
    timeOfDeparture: new Date(),
    timeOfArrival: new Date(),
    caterer: {
      name: "Special Food Ltd",
      address: "484, Some Street, New York",
      phone: 7867856751,
    },
    seats: {
      A1: "John Doe",
      A2: "Mark Doe",
      A3: "Sam Doe",
    },
  },
];
```

## Tuples

```ts
// What if the person array needs to have a fixed set of values
// We create a Tuple for such a situation
let person: [string, string, number];
person = ["John", "Doe", 18];

// A user array can have optional properties as well
let user: [string, string, number, string?];
user = ["Mark", "Doe", 21, "mark@doe.com"];

// Tuple with multiple string value which do not exist at the time of declaration
type listOfStudents = [number, boolean, ...string[]];

const passingStudents: listOfStudents = [3, true, "John", "Stella", "Mark"];

const failingStudents: listOfStudents = [1, false, "Scott"];

// Tuples with any number of value in the beginning or end
// Type Alias can be used with Tuples as well
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

let stringBooleanNumber: StringBooleansNumber = ["string", true, false, 32];
let booleanStringNumber: BooleansStringNumber = [true, false, "string", 32];
```

## Readonly Arrays

```ts
// An array can be converted into readonly using the readopnly keyword
let number: readonly number[] = [1, 2, 3];

// Once an array is readonly no values can be added or removed from an array
number.push(1);

// A tuple can be read only also
type ReadOnlyTuple = readonly [string, string, number];

// For our example let's create a new Tuple which is readonly
type ReadOnlyPerson = readonly [string, string, number];

// Creating a new readonly person
const person: ReadOnlyPerson = ["John", "Smith", 32];

//  There are some alternavites for creating Readonly Arrays
type a = Readonly<string[]>;
type b = ReadonlyArray<string>;

//  Alternative syntax for Readonly Tuple
type c = Readonly<[string, string, number]>;
```

## Enums

```ts
//  Why Are enums needed?
// We ofetn declare constants in JavaScript for eg.
const STATUS_LOADING = "loading";
const STATUS_STOPPED = "stopped";

// The intension of declaring these constants is that we do not want the value to change
// because these cannot be reassiged to developers bny mistake cannot do this
// JavaScript will not throw an error but will not reassign the constant it will always remain loading
STATUS_LOADING = "stopped";

// Auto incrementing values given to enums
// Single enum can contain all values
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// Assigning the first number and the rest would auto increment
enum Direction2 {
  Up = 1,
  Down,
  Left,
  Right,
}

// String Enums
export enum Roles {
  admin = "admin",
  author = "author",
  editor = "editor",
}

// Use case for enums
type Person = {
  name: string;
  email: string;
  password: string;
  role: Roles;
};

const person: Person = {
  name: "John",
  email: "john@email.com",
  password: "password",
  role: Roles.admin,
};

// Enums can be hetrogeneous as well
// Assigning the first number and the rest would auto increment
enum Direction3 {
  Up = 1,
  Down = "Down",
  Left = "Left",
}
```

## Enums are available in JavaScript as Objects

```ts
// Auto incrementing values given to enums
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// Assigning the first number and the rest would auto increment
enum Direction2 {
  Up = 1,
  Down,
  Left,
  Right,
}

// String Enums
export enum Roles {
  admin = "admin",
  author = "author",
  editor = "editor",
}

// Use case for enums
type Person = {
  name: string;
  email: string;
  password: string;
  role: Roles;
};

const person: Person = {
  name: "John",
  email: "john@email.com",
  password: "password",
  role: Roles.admin,
};

// Enums can be hetrogeneous as well
// Assigning the first number and the rest would auto increment
enum Direction3 {
  Up = 1,
  Down = "Down",
  Left = "Left",
}

// Enums are available in JavaScript as Objects
console.log(Roles);
```

## Enums vs Object

```ts
// Redeclaring the same  using Enum
// const Enum, is not compiled in JavaScript as an Object but only the value is used
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}
// Show the use of value
let eDirection = EDirection.Up;

// Declaring an object with same values as a constant
// Typescript sets each property as readonly
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

// Now this acts as an enum because you cannot change the value of properties
console.log("Object as const", ODirection.Up);
ODirection.Up = "newValue";
```

## Computed enums

```ts
// Enums can contain computed values as well
enum AccessPermission {
  None = 0,
  Read = 1,
  Write = 2,
  ReadWrite = Read + Write,
  Delete = 4,
  All = ReadWrite | Delete,
}

console.log(AccessPermission.ReadWrite);
console.log(AccessPermission.All);
```

## Test

```ts
// Practice Questions
//* 1. Create an array numbers that only accepts numbers and another array strings that only accepts strings.

//* 2. Create a tuple person that holds a string (name) and a number (age).

//* 3. Create a readonly array colors that holds strings and a readonly tuple point that holds two numbers (x, y). Attempt to modify their elements and observe the TypeScript error.

//* 4. Create an enum called StatusEnum that should 3 properties Active, Inactive, Pending

//* 5. Create an object as const called Status with the same structure as an StatusEnum
```

## Test Answers

```ts
//* 1. Create an array numbers that only accepts numbers and another array strings that only accepts strings.
let numbers: number[] = [1, 2, 3];
let strings: string[] = ["a", "b", "c"];

//* 2. Create a tuple person that holds a string (name) and a number (age).
type Person = [string, number];
let person: Person = ["John", 32];

//* 3. Create a readonly array colors that holds strings and a readonly tuple point that holds two numbers (x, y). Attempt to modify their elements and observe the TypeScript error.
type Colors = readonly string[];
type Point = readonly [number, number];

let colors: Colors = ["red", "green", "blue"];
let point: Point = [1, 2];

colors.push("yellow");
point.push(3);

//* 4. Create an enum called StatusEnum that should 3 properties Active, Inactive, Pending
enum StatusEnum {
  Active,
  Inactive,
  Pending,
}

//* 5. Create an object as const called Status with the same structure as an StatusEnum
const Status = {
  Active: "active",
  Inactive: "inactive",
  Pending: "pending",
} as const; // Object as const
```

# Functions in TypeScript

## Intro

```ts
// Defining a named function in TypeScript
// Functions often need optional params
// We can add optional params by using ? just like we do with objects
function intro(name: string, age: number, country?: string): string {
  if (country) {
    return `My name is ${name} and I am ${age} years old, I live in ${country}`;
  }
  return `My name is ${name} and I am ${age} years old`;
}

// TypeScript will throw an error if all defualt params are not added as arguments
// The error displays while you are programming and not at runtime
//! intro("John");
intro("John", 32);
```

## Custom params and return types

```ts
enum AgeUnit {
  Years = "years",
  Months = "months",
}

type Person = {
  name: string;
  age: number;
  ageUnit: AgeUnit;
  country: string;
};

let person: Person = {
  name: "Scott",
  age: 30,
  ageUnit: AgeUnit.Years,
  country: "USA",
};

function convertAgeToMonths(person: Person): Person {
  if (person.ageUnit === AgeUnit.Years) {
    person.age = person.age * 12;
    person.ageUnit = AgeUnit.Months;
  }
  return person;
}

console.log(convertAgeToMonths(person));
```

## Function call signatures

```ts
enum AgeUnit {
  Years = "years",
  Months = "months",
}

// Greeting can be defined as a type as well
type GreetingFunction = (
  greeting: string /* can have additional params */
) => string;

type Person = {
  name: string;
  age: number;
  ageUnit: AgeUnit;
  country: string;
  // greet: Function;
  greet: GreetingFunction;
};

let person: Person = {
  name: "Scott",
  age: 30,
  ageUnit: AgeUnit.Years,
  country: "USA",
  greet: (greeting) => {
    return `${greeting} ${person.name}`;
  },
};

function convertAgeToMonths(person: Person): Person {
  if (person.ageUnit === AgeUnit.Years) {
    person.age = person.age * 12;
    person.ageUnit = AgeUnit.Months;
  }
  return person;
}

console.log(convertAgeToMonths(person));
console.log(person.greet("Hello"));
```

## Anonymous functions

```ts
const students = ["Alice", "Bob", "Mark"];

// Lets assume that you are looping through the students array
// Since students is an array fo strings even when using annonymous function like this
// TypeScript is able to correctly infer the type of each student
students.map((student) => {
  console.log(student);
});

// This also works with the function defined using the function keyword and not just the arrow functions
students.map(function (student) {
  console.log(student);
});
```

## void and never

```ts
// At times there are functions which do not return anything
// this function does not return anything
// Hence for rerturn type we can use a special TypeScript type called void
function writeToDatabase(value: string): void {
  console.log("Writing to database:", value);
}

// This is different from void because this function never completes execution
function throwError(error: string): never {
  throw new Error(error);
}

// We check these types and hence void can be used in place of never but not visa versa
type check = never extends void ? true : false;
type checks = void extends never ? true : false;
```

## async functions

```ts
//  Async fucntion in JavaScript always return a promise
// Declaration of async function using the function keyword
async function fetchFromDatabase(id: number): Promise<any> {}

//  Declaration of async fucntion using the arrow function syntax
const anotherAsyncFunction = async (): Promise<any> => {};

// Async fucntion as a function express
const fucntionExpression = async function (): Promise<any> {};

// Setting return types apart from any
async function returnString(id: number): Promise<string> {
  return Promise.resolve("string");
}

type User = {
  name: string;
  age: number;
};

// If User type is nto returned TS throws an error
async function returnObject(id: number): Promise<User> {
  return Promise.resolve({ name: "John", age: 21 });
}
```

## rest parameters

```ts
// Unlimited function params using the
function multiplyBy(by: number, ...numbers: number[]) {
  return numbers.map((eachNumber) => by * eachNumber);
}

// Calling the function
console.log(multiplyBy(2, 3, 4, 5));
console.log(multiplyBy(2, 3, 4));

// Strictly typing rest parameters
const args = [8, 5];
// We get this erro because if we see the signature of the function it takes in 2 arguments
// Here TS s not sure that args will always contain 2 arguments
const angle = Math.atan2(...args);

// The solution is to define args as a tuple
const args1 = [8, 5] as const;
// Now TypeScript will not thwo an error because it will now know that args are always of a fixed length because its a tuple
const angle1 = Math.atan2(...args1);

// We can define type annotate it like this as well
const args2: [number, number] = [8, 5]; // Here using as const is not needed
const angle2 = Math.atan2(...args2);
```

## Parmaeter destructuring

```ts
// Parmaeter destructuring is also possible just like JavaScript
type Numbers = {
  a: number;
  b: number;
  c: number;
};

// Declare and object of numbers
let numbers: Numbers = {
  a: 2,
  b: 3,
  c: 4,
};

// create a function to print numbers
// function sum(numbers: Numbers) {
//   console.log(numbers);
// }

// Destructure numbers
// TS will infer each of the destructured params correctly as number types
function sum({ a, b, c }: Numbers) {
  return a + b + c;
}

// While invoking the function you pass the numbers object and
// destructuring with type inference will play the role
console.log(sum(numbers));

// wrong type will lead to an error
console.log(sum({ a: 3, b: 4, c: "c" }));
```

## Test

```ts
/**
 * Practice Excercise for functions
 */

//* 1. Declare a function named greet that takes a string parameter name and returns a greeting message.

//* 2. Define an type Product with properties id (number) and name (string). Create a function named getProduct that takes an id parameter and returns a Product.

//* 3. Declare a function signature named Calculator as a type that takes two numbers and returns a number. Implement two functions add and subtract that match this signature.

//* 4. Create a function named logMessage that takes a string message and logs it to the console, returning void. Also, create a function named throwError that takes a string message and throws an error, returning never.
```

## Test Answers

```ts
/**
 * Practice Excercise for functions
 */

//* 1. Declare a function named greet that takes a string parameter name and returns a greeting message.
function greet(name: string): string {
  return `Hello, ${name}!`;
}

//* 2. Define an type Product with properties id (number) and name (string). Create a function named getProduct that takes an id parameter and returns a Product.
interface Product {
  id: number;
  name: string;
}

function getProduct(id: number): Product {
  return { id, name: `Product ${id}` };
}

//* 3. Declare a function signature named Calculator as a type that takes two numbers and returns a number. Implement two functions add and subtract that match this signature.
type Calculator = (a: number, b: number) => number;

const add: Calculator = (a, b) => a + b;
const subtract: Calculator = (a, b) => a - b;

//* 4. Create a function named logMessage that takes a string message and logs it to the console, returning void. Also, create a function named throwError that takes a string message and throws an error, returning never.
function logMessage(message: string): void {
  console.log(message);
}

function throwError(message: string): never {
  throw new Error(message);
}
```

# Generics in TypeScript

## Intro

```ts
// Let us look at this simple function which just returns the param

//* function returnParam(param) {
//*   return param;
//* }

// TS has a problem and is warning that param is of any type or is implicitly declared at any
//* function returnParam(param: any) {
//*   return param;
//* }

// While using any is certainly generic in that it will cause the function to accept any and all types for the type of arg, we actually are losing the information about what that type was when the function returns. If we passed in a number, the only information we have is that any type could be returned.

// Since now we do not know the return type of this function we end up usign the return type as
// any as well. We are back to JS behaviour

//* function returnParam(param: any): any {
//*   return param;
//* }

// Here, we will use a type variable, a special kind of variable that works on types rather than values. This is a generic variable we can pass to our function to retain the type of the value used
// This is how it is done in case of functions

function returnParam<Type>(param: Type): Type {
  return param;
}

// With this generic in place the value of the type used to invoke the function is retained
// thi is one way of invoking the function
let stringOutput = returnParam<string>("string");

//Here we explicitly set Type to be string as one of the arguments to the function call, denoted using the <> around the arguments rather than ().

// The second way is also perhaps the most common. Here we use type argument inference — that is, we want the compiler to set the value of Type for us automatically based on the type of the argument we pass in:
let stringOutput2 = returnParam("string");
let numberOutput = returnParam(100);
let numberArray = returnParam([1, 2, 3]);
let objectOutput = returnParam({ name: "Mark", age: 21 });

// Generic function declaration as an arrow function
// using a call signature
const myParam: <T>(param: T) => T = (param) => param;

// Using a function expression
const myParam2 = function <U>(param: U): U {
  return param;
};

// Using a call signature in an object
type ObjectType = {
  myParam: <V>(param: V) => V;
};
```

## Generic functions declaration

```ts
// Declare Generic Type
type MyParam = <AnyName>(param: AnyName) => AnyName;

//  First declare a generics function signature
type GetFirstElement = <T>(arr: T[]) => T;
// A generic array function that gets first element of every type of array
const getFirstElement: GetFirstElement = (arr) => {
  return arr[0];
};

// We declare two different tyopes of array
const numberArray = [1, 2, 3];
const stringArray = ["a", "b", "c"];

// Typescript is correctly able to infer the value that will be return by expression
// Even though the function is the same the returned type is different based on the input value
let stringOutput = getFirstElement(stringArray);
let numberOutput = getFirstElement(numberArray);

// Where do declare generic dictates when typescript will binc a concrete type to a generic
// what if the above function was declared with a different placement of generic
type FirstElement<T> = (arr: T[]) => T;
```

## Generic and constrains with arrays

```ts
//  First declare a generics function signature
type GetFirstElement = <T>(arr: T[]) => T;
// A generic array function that gets first element of every type of array
const getFirstElement: GetFirstElement = (arr) => {
  return arr[0];
};

// We declare two different tyopes of array
const numberArray = [1, 2, 3];
const stringArray = ["a", "b", "c"];

// Typescript is correctly able to infer the value that will be return by expression
// Even though the function is the same the returned type is different based on the input value
let stringOutput = getFirstElement(stringArray);
let numberOutput = getFirstElement(numberArray);

// Where do declare generic dictates when typescript will binc a concrete type to a generic
// what if the above function was declared with a different placement of generic
type FirstElement<T> = (arr: T[]) => T;

// Here if the generic type is not passed at the time of function declaration TS will throw and error
// So now you need to tell TypeScript which types can we used with this fucntion which solves a completely different purpose from the function that has been declared above
// Hover over the function param and you will see that TS now identifies that param will be an
// array of strings
const firstElement: FirstElement<string> = (arr) => {
  return arr[0];
};

// Generics can have constraints as well
type HasLength = {
  length: number;
};

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

// Any array like value that has a length property on it will be accepted as an argument
logLength(numberArray);
logLength(stringArray);
logLength("Any String");

// But if used for an object it will throw an error
logLength({ name: "John", length: 12 });
```

## Generics with objects

```ts
type KeyValuePair<K, V> = {
  key: K;
  value: V;
};

const stringNumberPair: KeyValuePair<string, number> = {
  key: "age",
  value: 30,
};

const numberBooleanPair: KeyValuePair<number, boolean> = {
  key: 1,
  value: true,
};

console.log(stringNumberPair); // Output: { key: 'age', value: 30 }
console.log(numberBooleanPair); // Output: { key: 1, value: true }

/**
 * Generics Constraints With Objects
 */

type HasId = {
  id: number;
};

function printId<T extends HasId>(obj: T): void {
  console.log(obj.id);
}

const user = {
  id: 1,
  name: "Alice",
};

printId(user); // Output: 1

const product = {
  id: 101,
  name: "Laptop",
};

printId(product); // Output: 101
```

## keyof type operator

```ts
type Events = {
  id: number;
  date: Date;
  type: "indoor" | "outdoor";
};

// The keyof operator takes an object type and produces a string or numeric literal union of its keys. The following type P is the same type
// -> "id" | "date" | "type"

type UnionOfKeysOfEvents = keyof Events;

// You see these are literally the union of name of the keys of the Events object
let idOfEvent: UnionOfKeysOfEvents = "id";
let dateOfEvent: UnionOfKeysOfEvents = "date";

// If index signatures where keys are defined as numeric properties
type Numeric = {
  [key: number]: string;
};

type NumericKeyOf = keyof Numeric;

type NumberAndString = {
  [key: string]: string;
};
// We get a union of numbers as well as a string because this is how JavaScript objects work behind the scenes
// NumberAndString is string | number — this is because JavaScript object keys are always coerced to a string, so obj[0] is always the same as obj["0"].
type NumberAndStringKeyoff = keyof NumberAndString;

let stringObject: NumberAndString = {
  0: "first",
  second: "first",
};

// Accessing the object proerty with the index of the property
console.log(stringObject["0"]);

// Declaring partial types using generics and keyof
type Person = {
  name: string;
  age: number;
  address: string;
};

// Creating a type where the keys are the same as Person but the values are optional and nullable
// Hover over PartialPerson to see how TypeScript is inferring it
type PartialPerson = {
  [K in keyof Person]?: Person[K] | null;
};
```

## Generics Default Values

```ts
// Define a generic function to fetch data with a default type
async function fetchData<T = any>(url: string): Promise<T> {
  const response = await fetch(url);
  const data: T = await response.json();
  return data;
}

// Using the fetchData function with the default type (any)
async function fetchDefault() {
  const data = await fetchData("https://jsonplaceholder.typicode.com/posts/1");
  console.log(data); // Output: any data structure, depends on the response
}

fetchDefault();

// Using the fetchData function with a specified type
// Lets declare a type based on the response that we get from the above fake API
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetchPost() {
  const post = await fetchData<Post>(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  console.log(post); // Output: { userId: 1, id: 1, title: "...", body: "..." }
}

fetchPost();
```

## Implimenting a polymorphic function

```ts
// Trying to create a simple implementation of JavaScript's own filter method
const filter = (array: any[], predicate: Function) => {
  let result: any[] = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
};

let numbers = [1, 3, 4, 6, 9, 7, 10, 12];
// Predicate to filter all numbers greater than 7
function predicate(item: number) {
  return item > 7;
}

let animals = ["cat", "bat", "rat", "mat"];
// Predicate to filter all cats from animals array
function filterCats(item: string) {
  return item === "cat";
}

// Result of invoking the function
console.log(filter(numbers, predicate));
console.log(filter(animals, filterCats));
```

## Filter Method

```ts
type Filter = {
  (array: number[], predicate: (item: number) => boolean): number[];
  (array: string[], predicate: (item: string) => boolean): string[];
  (array: object[], predicate: (item: object) => boolean): object[];
}; // function overloading

// Trying to create a simple implementation of JavaScript's own filter method
const filter = (array: any[], predicate: Function) => {
  let result: any[] = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
};

let numbers = [1, 3, 4, 6, 9, 7, 10, 12];
// Predicate to filter all numbers greater than 7
function predicate(item: number) {
  return item > 7;
}

let animals = ["cat", "bat", "rat", "mat"];
// Predicate to filter all cats from animals array
function filterCats(item: string) {
  return item === "cat";
}

// Result of invoking the function
console.log(filter(numbers, predicate));
console.log(filter(animals, filterCats));
```

```ts
type Filter = {
  (array: number[], predicate: (item: number) => boolean): number[];
  (array: string[], predicate: (item: string) => boolean): string[];
  (array: object[], predicate: (item: object) => boolean): object[];
};

// Trying to create a simple implementation of JavaScript's own filter method
const filter = (array: any[], predicate: Function) => {
  let result: any[] = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
};

let numbers = [1, 3, 4, 6, 9, 7, 10, 12];
// Predicate to filter all numbers greater than 7
function predicate(item: number) {
  return item > 7;
}

let animals = ["cat", "bat", "rat", "mat"];
// Predicate to filter all cats from animals array
function filterCats(item: string) {
  return item === "cat";
}

// Result of invoking the function
console.log(filter(numbers, predicate));
console.log(filter(animals, filterCats));
```

## Map Method

```ts
const map = <T, U>(array: T[], func: (item: T) => U): (U | T)[] => {
  if (array.length === 0) {
    return array;
  }

  let result: U[] = [];

  for (let i = 0; i < array.length; i++) {
    result.push(func(array[i]));
  }
  return result;
};

let numbers = [4, 5, 6, 7, 8, 9];
const converted = map(numbers, (num) => num.toString());
console.log(converted);
```

# Classes in TypeScript

## Test 1

```ts
class Book {
  title: string;
  author: string;
  readonly ISBN: string;
  yearPublished?: number;

  constructor(
    title: string,
    author: string,
    ISBN: string,
    yearPublished?: number
  ) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.yearPublished = yearPublished;
  }
}

const book = new Book(
  "The Hobbit",
  "J.R.R. Tolkien",
  "978-0-06-070542-1",
  1937
);
console.log(book);

const logBookDetails = (book: Book): string => {
  return `Title: ${book.title}, Author: ${book.author}, ISBN: ${book.ISBN}, Year Published: ${book.yearPublished}`;
};

console.log(logBookDetails(book));

class Ebook extends Book {
  fileSize: number;
  format: string;

  constructor(
    title: string,
    author: string,
    readonly ISBN: string,
    fileSize: number,
    format: string,
    yearPublished?: number
  ) {
    super(title, author, ISBN, yearPublished);
    this.fileSize = fileSize;
    this.format = format;
  }
}

const ebook = new Ebook("abc", "Shamim", "23434-4234234-234", 56, "pdf");

console.log(ebook);
```

## Method overriding

```ts
class User {
  public name: string;
  readonly email: string;
  private phone: number;
  public lastName?: string;

  constructor(name: string, email: string, phone: number) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  greet(): string {
    return `Hello ${this.name}`;
  }

  getPhone(): number {
    return this.phone;
  }
}

const user = new User("jeff", "jeff@email.com", 123456789);
console.log(user.greet());

class Admin extends User {
  isAdmin: boolean = true;
  usersReporting: number;

  constructor(
    name: string,
    email: string,
    phone: number,
    usersReporting: number
  ) {
    super(name, email, phone);
    this.usersReporting = usersReporting;
  }

  // A greet methods can override the parent class method
  // but the condition is that the child class methods must have the same signature
  greet(): string {
    return `Hello ${
      this.name
    }, your phone number is ${this.getPhone()} and you are an admin`;
  }
}

const admin = new Admin("John", "john@email.com", 123456789, 10);
console.log(admin.greet());
```

## shorthand for constructor

```ts
class User {
  // shorthand for constructor
  constructor(
    public name: string,
    public readonly email: string,
    private phone: number,
    public lastName?: string
  ) {}

  greet(): string {
    return `Hello ${this.name}`;
  }

  getPhone(): number {
    return this.phone;
  }
}

const user = new User("jeff", "jeff@email.com", 123456789);
console.log(user.greet());

class Admin extends User {
  isAdmin: boolean = true;

  constructor(
    name: string,
    email: string,
    phone: number,
    public usersReporting: number
  ) {
    super(name, email, phone);
  }

  // A greet methods can override the parent class method
  // but the condition is that the child class methods must have the same signature
  greet(): string {
    return `Hello ${
      this.name
    }, your phone number is ${this.getPhone()} and you are an admin`;
  }
}

const admin = new Admin("John", "john@email.com", 123456789, 10);
console.log(admin.greet());
```

## getters and setters

```ts
class Person {
  private _age?: number;

  constructor(public firstName: string, public lastName: string) {}

  public set age(age: number) {
    if (age > 150 || age < 0) {
      throw new Error("Age must be between 0 and 150");
    }
    this._age = age;
  }

  public get age(): number {
    if (!this._age) {
      throw new Error("Age is not set");
    }
    return this._age;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

const John = new Person("John", "Doe");
console.log(John.fullName);
John.age = 32;
console.log(John.age);
```

## Static members and methods

```ts
class Counter {
  static count = 0;

  static increment() {
    Counter.count++;
  }
  static decrement() {
    Counter.count--;
  }
}

Counter.increment();
Counter.increment();
console.log(Counter.count); // 2
```

## Static blocks

```ts
class Counter {
  static count = 0;

  static increment() {
    Counter.count++;
  }
  static decrement() {
    Counter.count--;
  }

  static {
    console.log("Static block");
    Counter.count = 10;
  }
}

Counter.increment();
Counter.increment();
console.log(Counter.count); // 12
```

## Generics with classes

```ts
class Box<T> {
  private _value: T;

  constructor(value: T) {
    this._value = value;
  }

  get value(): T {
    return this._value;
  }
  set value(newValue: T) {
    this._value = newValue;
  }
}

const numberBox = new Box<number>(10);
console.log(numberBox.value);
numberBox.value = 20;
console.log(numberBox.value);

const stringBox = new Box<string>("Hello");
console.log(stringBox.value);
stringBox.value = "World";
console.log(stringBox.value);
```

## Generics use cases

```ts
type Identifiable = {
  id: number;
};

type User = Identifiable & {
  id: number;
  name: string;
  age: number;
  email: string;
};

class Repository<T extends Identifiable> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  getAll(): T[] {
    return this.items;
  }

  remove(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  update(item: T): void {
    const index = this.items.findIndex((item) => item.id === item.id);
    this.items[index] = item;
  }
}

const usersRepository = new Repository<User>();
usersRepository.add({ id: 1, name: "John", age: 32, email: "john@email.com" });
usersRepository.add({ id: 2, name: "Mark", age: 21, email: "mark@email.com" });
usersRepository.add({ id: 3, name: "Sam", age: 25, email: "sam@email.com" });

console.log(usersRepository.getAll());
console.log(usersRepository.getById(1));
console.log(usersRepository.getById(3));

usersRepository.remove(1);
console.log(usersRepository.getAll());

const user = usersRepository.getById(2);

if (user) {
  user.age = 40;
  usersRepository.update(user);
}
console.log(usersRepository.getById(2));
```

## Mixins

```ts
type Constructor = new (...args: any[]) => {};

function TimeStamp<T extends Constructor>(Base: T) {
  return class extends Base {
    protected timestamp: Date = new Date();

    getTimestamp() {
      return this.timestamp;
    }
  };
}

class User {
  constructor(public name: string) {}
}

class UserWithTimestamp extends TimeStamp(User) {
  constructor(name: string, public age: number) {
    super(name);
  }

  displayInfo() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

const user = new UserWithTimestamp("John", 38);
console.log(user.name);
console.log(user.age);
console.log(user.getTimestamp());
user.displayInfo();
```

## Test 2

```ts
/**
 * ! You are developing a simple employee management system for a company. Implement the following requirements using TypeScript:
 *
 * TODO: 1. Class Definition: Create a class Employee with the following properties:
 ** -  name (string, public)
 ** -  age (number, public)
 ** -  salary (number, private)
 ** -  id (number, protected)
 *
 * TODO: 2. Use shorthand syntax in the constructor to initialize the properties name and age.
 *
 * TODO: 3. Implement getter and setter methods for the salary property. The setter should ensure the salary is a positive number.
 *
 * TODO: 4. Add a static property companyName (string, public) and a static method getCompanyName that returns the company name.
 *
 * TODO: 5. Create a subclass Manager that extends the Employee class. Add an additional property department (string, public).
 *
 * TODO: 6. Override a method getDetails in the Manager class to include the department information along with the employee details.
 */
```

## Test answer

```ts
class Employee {
  static companyName = "John's Company";

  constructor(
    public name: string,
    public age: number,
    private _salary: number,
    protected id: number
  ) {}

  set salary(salary: number) {
    if (salary < 0) {
      throw new Error("Salary must be a positive number");
    }
    this._salary = salary;
  }
  get salary(): number {
    return this._salary;
  }

  public static getCompanyName(): string {
    return Employee.companyName;
  }

  getDetails(): string {
    return `${this.name} is ${this.age} years old and earns $${this.salary} per month`;
  }
}

const employee: Employee = new Employee("John", 32, 5000, 1);
console.log(employee.getDetails());

class Manager extends Employee {
  constructor(
    name: string,
    age: number,
    salary: number,
    id: number,
    public department: string
  ) {
    super(name, age, salary, id);
  }
  getDetails(): string {
    return `${super.getDetails()}, works in ${this.department}`;
  }
}

const manager: Manager = new Manager("Shamim Ahsan", 30, 5000, 1, "Sales");
console.log(manager.getDetails());
```

# Abstract Class in TypeScript

## Intro

```ts
type Holidays = {
  date: Date;
  reason: string;
}[];

abstract class Department {
  protected abstract holidays: Holidays;
  protected constructor(protected name: string) {}

  public addHolidays(holidays: Holidays) {
    if (Array.isArray(holidays)) {
      this.holidays.push(...holidays);
    }
  }

  public getHolidays() {
    if (this.holidays.length > 0) {
      console.log(`Holidays for ${this.name} are:`);
      this.holidays.forEach(
        (holiday: { date: Date; reason: string }, index: number) => {
          console.log(
            `${index + 1}. ${holiday.date.toLocaleDateString()} - ${
              holiday.reason
            }`
          );
        }
      );
      return;
    }

    console.log("No holidays found");
  }
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting Department");
  }
  protected holidays: Holidays = [];

  public getHolidays() {
    console.log(`Method overridding for ${this.name}`);
  }
}

class AdminDepartment extends Department {
  constructor() {
    super("Admin Department");
  }
  protected holidays: Holidays = [];

  public getHolidays() {
    console.log(`Method overridding for ${this.name}`);
  }
}

const accountingDepartment: AccountingDepartment = new AccountingDepartment();
const adminDepartment: AdminDepartment = new AdminDepartment();

const accountingHolidays: Holidays = [
  { date: new Date(2023, 0, 1), reason: "New Year's Day" },
  { date: new Date(2023, 0, 2), reason: "Valentine's Day" },
];

accountingDepartment.addHolidays(accountingHolidays);

const adminHolidays: Holidays = [
  { date: new Date(2023, 0, 3), reason: "Martin Luther King Jr. Day" },
  { date: new Date(2023, 0, 4), reason: "Washington's Birthday" },
];

adminDepartment.addHolidays(adminHolidays);

accountingDepartment.getHolidays();
adminDepartment.getHolidays();
```

## Abstract method

```ts
type Holidays = {
  date: Date;
  reason: string;
}[];

abstract class Department {
  protected abstract holidays: Holidays;
  protected constructor(protected name: string) {}

  public addHolidays(holidays: Holidays) {
    if (Array.isArray(holidays)) {
      this.holidays.push(...holidays);
    }
  }

  public abstract getHolidays(): void;
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting Department");
  }
  protected holidays: Holidays = [];

  public getHolidays() {
    if (this.holidays.length > 0) {
      console.log(`Holidays for ${this.name} are:`);
      this.holidays.forEach(
        (holiday: { date: Date; reason: string }, index: number) => {
          console.log(
            `${index + 1}. ${holiday.date.toLocaleDateString()} - ${
              holiday.reason
            }`
          );
        }
      );
      return;
    }

    console.log("No holidays found");
  }
}

class AdminDepartment extends Department {
  constructor() {
    super("Admin Department");
  }
  protected holidays: Holidays = [];

  public getHolidays() {
    if (this.holidays.length > 0) {
      console.log(`Holidays for ${this.name} are:`);
      this.holidays.forEach(
        (holiday: { date: Date; reason: string }, index: number) => {
          console.log(
            `${index + 1}. ${holiday.date.toLocaleDateString()} - ${
              holiday.reason
            }`
          );
        }
      );
      return;
    }

    console.log("No holidays found");
  }
}

const accountingDepartment: AccountingDepartment = new AccountingDepartment();
const adminDepartment: AdminDepartment = new AdminDepartment();

const accountingHolidays: Holidays = [
  { date: new Date(2023, 0, 1), reason: "New Year's Day" },
  { date: new Date(2023, 0, 2), reason: "Valentine's Day" },
];

accountingDepartment.addHolidays(accountingHolidays);

const adminHolidays: Holidays = [
  { date: new Date(2023, 0, 3), reason: "Martin Luther King Jr. Day" },
  { date: new Date(2023, 0, 4), reason: "Washington's Birthday" },
];

adminDepartment.addHolidays(adminHolidays);

accountingDepartment.getHolidays();
adminDepartment.getHolidays();
```

# Interface in Ts

## Intro

```ts
interface User {
  userName: string;
  email: string;
  login(): void;
}

class Admin implements User {
  constructor(
    public userName: string,
    public email: string,
    public adminLevel: number
  ) {}
  login(): void {
    console.log("Admin logged in");
  }
}

class Customer implements User {
  constructor(public userName: string, public email: string) {}
  login(): void {
    console.log("Customer logged in");
  }
}

const admin: Admin = new Admin("John", "john@email.com", 10);
const customer: Customer = new Customer("Mark", "mark@email.com");

class Auth {
  public static login(user: User): void {
    user.login();
  }
}

Auth.login(admin);
Auth.login(customer);
```

## Inherite from multiple interfaces

```ts
enum Roles {
  admin = "admin",
  author = "author",
  editor = "editor",
}

interface Role {
  role: Roles;
}

enum PermissionList {
  read = "read",
  write = "write",
  execute = "execute",
}

interface Permission {
  permission: PermissionList[];
}

interface User {
  name: string;
  email: string;
  phone: number;
  gender: string;
}

interface Admin extends User, Role, Permission {
  numberOfUsersReporting: number;
}

const admin: Admin = {
  name: "John",
  email: "john@email.com",
  phone: 123456789,
  gender: "male",
  role: Roles.admin,
  permission: [
    PermissionList.read,
    PermissionList.write,
    PermissionList.execute,
  ],
  numberOfUsersReporting: 10,
};

console.log(admin);
```

## Interfaces with Generics

```ts
enum AutomobileTypes {
  car = "car",
  motorcycle = "motorcycle",
  truck = "truck",
  van = "van",
  bus = "bus",
}

enum AutomobileBrands {
  bmw = "bmw",
  audi = "audi",
  mercedes = "mercedes",
  volkswagen = "volkswagen",
}

enum AutomobileColors {
  red = "red",
  blue = "blue",
  green = "green",
  black = "black",
  silver = "silver",
}

interface Automobile<Type, Brand, Colors> {
  type: Type;
  brand: Brand;
  colors: Colors[];
  description: string;
}

const bmw: Automobile<AutomobileTypes, AutomobileBrands, AutomobileColors> = {
  type: AutomobileTypes.car,
  brand: AutomobileBrands.bmw,
  colors: [AutomobileColors.red, AutomobileColors.blue],
  description: "BMW is a brand of luxury motor vehicles",
};

console.log(bmw);

const audi: Automobile<string, string, string> = {
  type: "car",
  brand: "audi",
  colors: ["red", "blue"],
  description: "Audi is a brand of luxury motor vehicles",
};

console.log(audi);

const mercedes: Automobile<string, AutomobileBrands, number> = {
  type: "car",
  brand: AutomobileBrands.mercedes,
  colors: [1, 2, 3],
  description: "Mercedes is a brand of luxury motor vehicles",
};

console.log(mercedes);
```

## Using Interfaces with classes

```ts
enum AutomobileBrands {
  bmw = "bmw",
  audi = "audi",
  mercedes = "mercedes",
  volkswagen = "volkswagen",
}

enum AutomobileColors {
  red = "red",
  blue = "blue",
  green = "green",
  black = "black",
  silver = "silver",
}

// Interfaces are the contract only for public methods and properties of a class. Interfaces can be used to define the shape of an object, but they cannot be instantiated. They are used to enforce a contract between classes and other objects. Object has no access modifiers, so does the interface.

//! Be aware of declaration merging. If you have two interfaces with the same name, both will be merged into one. It can cause confusion and errors if you are not careful.

interface Automobile<Type, Brand, Colors> {
  type: Type;
  brand: Brand;
  colors: Colors[];
  description: string;
}

class Car implements Automobile<string, AutomobileBrands, AutomobileColors> {
  public type: string = "car";
  constructor(
    public brand: AutomobileBrands,
    public colors: AutomobileColors[],
    public description: string
  ) {}
}

const bmw: Car = new Car(
  AutomobileBrands.bmw,
  [AutomobileColors.red, AutomobileColors.blue],
  "BMW is a brand of luxury motor vehicles"
);

console.log(bmw);
```

# Prototypes and Objects

## this keyword

```ts
const book = {
  title: "The Hobbit",
  authors: ["J.R.R. Tolkien", "John Ronald Reuel Tolkien"],
  year: 1925,
  isbn: "978-0-393-04346-2",
  log() {
    console.log(`Book: ${this.title}`);
  },
  getAuthors() {
    this.authors.forEach((author) => {
      // Arrow functions take the scope of the parent objects.
      console.log(`${this.title} -  Author: ${author}`);
    });
  },
};

book.getAuthors();
```

## constructor function

```ts
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.points = 0;
  }

  login() {
    console.log(`${this.name} logged in`);
  }

  logout() {
    console.log(` ${this.name} logged out`);
  }

  addPoints() {
    this.points++;
    console.log(`${this.name} added points. Total points: ${this.points}`);
  }
}

const user1 = new User("John", "john@email.com");
const user2 = new User("Mark", "mark@email.com");

console.log(user1);

user2.addPoints();
```

## JavaScript's own constructor function

```ts
function User(name, email) {
  this.name = name;
  this.email = email;
  this.points = 0;

  this.login = () => {
    console.log(`${this.name} logged in`);
  };

  this.logout = () => {
    console.log(` ${this.name} logged out`);
  };

  this.addPoints = () => {
    this.points++;
    console.log(`${this.name} added points. Total points: ${this.points}`);
  };
}

const user1 = new User("John", "john@email.com");

console.log(user1);
```

## Prototype

```ts
function User(name, email) {
  this.name = name;
  this.email = email;
  this.points = 0;
}

User.prototype.login = () => {
  console.log(`${this.name} logged in`);
};

User.prototype.logout = () => {
  console.log(` ${this.name} logged out`);
};

User.prototype.addPoints = () => {
  this.points++;
  console.log(`${this.name} added points. Total points: ${this.points}`);
};

const user1 = new User("John", "john@email.com");

console.log(user1);
```
