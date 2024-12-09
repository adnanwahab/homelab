import Ollama from 'ollama'
import { $ } from "bun";

// Example usage of $ for shell commands
const parallel_ollama = async () => {
    const result = await $`ollama run llama3.1 "how many days in the week"`.text()
    console.log(result)
}




export default parallel_ollama