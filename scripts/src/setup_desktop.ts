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

function compare_commits() {
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
}


const latest_commit = `#!/usr/bin/env bash

# Set your repository owner and name
OWNER="adnanwahab"
REPO="homelab"

# Fetch the latest commit using GitHub CLI's API endpoint for commits
latest_commit_sha=$(gh api repos/$OWNER/$REPO/commits --jq '.[0].sha')

echo "The latest commit SHA for $OWNER/$REPO is: $latest_commit_sha"`
export default async function setup_desktop() {
    const result = await $`echo "Hello World!!"`.text();
    // const { stdout, stderr } =  await $`${latest_commit}`.quiet();

    // try {
    //     const output = await $`${latest_commit}`.text();
    //     console.log(output);
    //   } catch (err) {
    //     console.log(`Failed with code ${err.exitCode}`);
    //     console.log(err.stdout.toString());
    //     console.log(err.stderr.toString());
    //   }

    return result + result;
}

