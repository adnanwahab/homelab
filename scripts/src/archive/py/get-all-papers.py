import json
from concurrent.futures import ThreadPoolExecutor
import subprocess
#cb if should not - then disorder -> so make it so theres no should not ever.
def get_url(id):
    url = f'https://arxiv.org/abs/{id}'
    return url

def is_robotics(entry):
    return "robot" in entry['categories'] or "cs.RO" in entry['categories']

# Function to process each JSON object and extract URL
def process_entry(entry):
    if is_robotics(entry):
        url = get_url(entry['id'])
        return url
# Open file and process in chunks



def get_urls():
    with open('/home/adnan/derp/support_bret/arxiv_meta.json', 'r') as f:
        urls = []
        for line in f:
            entry = json.loads(line.strip())
            with ThreadPoolExecutor(max_workers=20) as executor:  # Adjust number of workers
                future = executor.submit(process_entry, entry)
                url = future.result()
                if url:
                    print(url)
                    urls.append(url)

# Save URLs to a file
    # with open('./urls.txt', 'w') as f:
        #     f.write('\n'.join(urls))
    return urls


    
urls = get_urls()




# Send file via SSH
#subprocess.run(["scp", "/tmp/urls.txt", "adnan@gpu:/home/adnan/derp/support_bret/all-papers.txt"])




#.js .cjs .mjs .mts .cts .ts .tsx .jsx .toml .json .txt .wasm .node

#sqlite + vector search -> is it faster mozilla 



#import contents from "./file.txt";
#console.log(contents); 

#// To import an html file as text
#// The "type' attribute can be used to override the default loader.
#import html from "./index.html" with { type: "text" };


#https://bun.sh/docs/bundler/loaders
#import db from "./my.db" with { type: "sqlite", embed: "true" };

