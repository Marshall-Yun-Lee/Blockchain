const name = "marshall",
    age = 24,
    gender = "male";

const greet = (name: string, age: number, gender?: string): void => {
    console.log("hello " + name + ", " + age + "years old! " + gender);
    console.log("meh!!");
}

greet(name, age, gender);

 export{};