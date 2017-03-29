class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setAge(age) {
        this.age = age;
    }

    getAge() {
        return this.age;
    }

    toString() {
        return `name: ${this.name}, age: ${this.age}`;
    }
}

export default Person;