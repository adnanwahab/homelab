import { $ } from "bun";

// // .text() automatically calls .quiet() for you
// const welcome = await $`echo "Hello World!"`.text();

// console.log(welcome); // Hello World!\n



export default async function setup_desktop() {
    //Bun.spawn(["sudo", "apt-get", "update", "-y"]); 
    const result = await $`echo "Hello World!!"`.text();

    //const result = 'hi_world';

    return result;
}

