import arxiv
import json

papers = []

def fetch_robotics_papers(max_results=10000):
    search = arxiv.Search(
        query="cat:cs.RO",
        max_results=max_results,
        sort_by=arxiv.SortCriterion.SubmittedDate,
        sort_order=arxiv.SortOrder.Descending,
    )
    
    for result in search.results():
        paper_info = {
            'title': result.title,
            'authors': [author.name for author in result.authors],
            'published': result.published.strftime('%Y-%m-%d'),  # Convert datetime to string
            'summary': result.summary,
            'url': result.entry_id
        }
        papers.append(paper_info)

    print(f"Fetched {len(papers)} papers")
    json.dump(papers, open('robotics_papers.json', 'w'), indent=2)

    return papers

# Fetch papers
robotics_papers = fetch_robotics_papers()


import requests
import os

# def download_pdfs(papers):
    
#     #os.makedirs("papers", exist_ok=True)
#     for paper in papers:
#         pdf_url = paper['url'].replace('abs', 'pdf')
#         pdf_path = os.path.join("papers", f"{paper['title']}.pdf")
#         print(f"Downloading {pdf_url} to {pdf_path}...")
#         response = requests.get(pdf_url)
#         with open(pdf_path, 'wb') as f:
#             f.write(response.content)

# # Download the PDFs
# download_pdfs(robotics_papers)