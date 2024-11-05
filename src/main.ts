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
