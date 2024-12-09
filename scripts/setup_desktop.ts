import { $ } from "bun";

// // .text() automatically calls .quiet() for you
// const welcome = await $`echo "Hello World!"`.text();

// console.log(welcome); // Hello World!\n


import { execSync } from 'child_process'

function getLocalCommitHash(): string {
    try {
        return execSync('git rev-parse HEAD').toString().trim()
    } catch (error) {
        console.error('Error getting local commit hash:', error)
        process.exit(1)
    }
}

function getRemoteCommitHash(): string {
    try {
        return execSync('git ls-remote origin HEAD').toString().split('\t')[0].trim()
    } catch (error) {
        console.error('Error getting remote commit hash:', error)
        process.exit(1)
    }
}

const localHash = getLocalCommitHash()
const remoteHash = getRemoteCommitHash()

console.log('Local hash:', localHash)
console.log('Remote hash:', remoteHash)

if (localHash !== remoteHash) {
    console.log('Different commits detected, pulling from origin...')
    try {
        execSync('git pull origin main', { stdio: 'inherit' })
        console.log('Successfully pulled latest changes')
    } catch (error) {
        console.error('Error pulling changes:', error)
        process.exit(1)
    }
} else {
    console.log('Already up to date')
}


export default async function setup_desktop() {
    //Bun.spawn(["sudo", "apt-get", "update", "-y"]); 
    const result = await $`echo "Hello World!!"`.text();

    //const result = 'hi_world';

    const latest_commit_sha = await $`./latest_commit.sh`.text();



    return result + latest_commit_sha;
}

