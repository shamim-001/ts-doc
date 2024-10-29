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
