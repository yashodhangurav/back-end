
//---------------------------------------------------------------------factory function method 1
// function  personMaker(name,age){
//     const person = {
//         name : name,
//         age : age,
//         talk(){
//             console.log(`Hi my name is ${this.name}`)
//         }
//     }
//     return person;
// }
// let p1 = personMaker("yash", 23);
// let p2 = personMaker("omkar", 22);

// ----------------------------------------------------------------------//new Operator method 2
//new Operator method 2
//constructor - doesn't return anything and start with capital letter

// function  Person(name,age){
//     this.name = name;
//     this.age = age;
// }
// Person.prototype.talk = function() {
//     console.log(`Hi , my name is ${this.name}`);
// }
// let p1 = new Person("yash", 23); //instances
// let p2 = new Person("omkar", 23); //instances


// // ----------------------------------------------------------------------//Classes method 3
// class Person {
//     constructor ( name , age ) {   //constructor internally create the all object instance of the classes 
//         this.name = name;
//         this.age = age;
//     }
//     talk() {
//         console.log(`Hi my name is ${this.name}`)
//     }
// };
// let p1 = new Person("yash", 23); //instances
// let p2 = new Person("omkar", 23); //instances

// // ----------------------------------------------------------------------------------inheritance

// class Person {
//     constructor (name, age){
//         this.name = name;
//         this.age = age;
//     }
//     talk() {
//         console.log(`Hi, Iam ${this.name}`)
//     }
// }

// class Student extends Person {
//     constructor(name , age, marks){
//         super(name,age); //parent class constructor is beign called
//         this.marks = marks;
//     }
// }

// class Teacher extends Person {
//     constructor(name , age, subjects){
//         super(name,age); //parent class constructor is beign called
//         this.subjects = subjects;
//     }
// }

// ----------------------------------------------------------------------------practice question

class Box {
    constructor(name, l , b ) {
        this.name = name;
        this.l = l;
        this.b = b;
    }
    area() {
        let area = this.l * this.b;
        console.log(`box area is ${area}`);
    }
}

class Square extends Box {
    constructor(a) {
        super("square", a, a);
    }
    area() {
        let area = this.l * this.b;
        console.log(`square area is ${area}`);
    }
}

let sq1 = new Square(4);
sq1.area();