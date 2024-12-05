import { run } from "https://deno.land/std@0.210.0/process/mod.ts";

async function getCompressedRepoSize(): Promise<number> {
    // Get the list of tracked files
    const gitProcess = run({
        cmd: ["git", "ls-files", "-z"],
        stdout: "piped",
    });

    const gitOutput = await gitProcess.output();
    gitProcess.close();

    const decoder = new TextDecoder();
    const gitFilesList = decoder.decode(gitOutput).split("\0").filter(Boolean);

    // Create a compressed tarball of the tracked files
    const tarProcess = run({
        cmd: ["tar", "-czf", "-", ...gitFilesList],
        stdout: "piped",
    });

    const tarOutput = await tarProcess.output();
    tarProcess.close();

    return tarOutput.length;
}

const maxSize = 10 * 1024 * 1024; // 10MB in bytes
const repoSize = await getCompressedRepoSize();

if (repoSize > maxSize) {
    console.error(
        `Repository size (${(repoSize / (1024 * 1024)).toFixed(
            2
        )} MB) exceeds 10MB compressed. Please reduce the size before committing.`
    );
    Deno.exit(1);
} 