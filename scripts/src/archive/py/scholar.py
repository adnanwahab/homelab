from scholarly import scholarly
import json



def get_author_publications(author_name):
    # Retrieve the author's data and publications
    print('shit')
    #author_name = 'kai wang zoox'
    search_query = scholarly.search_author(author_name)
    time.sleep(3)
    try:
        author = scholarly.fill(next(search_query))
    except Exception as e:
        print(f"Error processing author: {e}")
        return None
    print('shit2')
    # Get PDF links from publications
    #pdf_links = []
    return author
    for pub in author['publications']:
        try:
            # Fill in the publication details
            filled_pub = scholarly.fill(pub)
            
            # Try to get PDF link if available
            if 'pub_url' in filled_pub:
                pdf_links.append({
                    'title': filled_pub['bib']['title'],
                    'url': filled_pub['pub_url']
                })
                
        except Exception as e:
            print(f"Error processing publication: {e}")

    return pdf_links


    # Example usage
    ##author_name = "Steven A Cholewiak"  # Can be changed or passed as command line argument
import sys

with open('research_papers.json', 'r', encoding='utf8') as f:
    authors_data = json.load(f)

all_results = []
import time
for author in authors_data[:1000]:
    time.sleep(3)
    author_name = author['name']
    
    if 'View' in author_name:
        author_name = author_name.split('View')[0].strip()
    
      # Adjust this based on your JSON structure
    author_name = author_name #+ ' zoox'
    # llama in the loop
    print(f"Processing author: {author_name}")
    results = get_author_publications(author_name)
    all_results.append(results)


# Save all results
with open('scholar_results.json', 'w', encoding='utf8') as f:
    json.dump(all_results, f, indent=4, ensure_ascii=False)
# Print results
print("\nFound PDF links:")
# for item in pdf_links:
#     print(f"\nTitle: {item['title']}")
#     print(f"URL: {item['url']}")
