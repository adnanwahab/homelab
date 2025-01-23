dynamicland_book_shelf = [
    "https://bookshop.org/book/9781477325766",
    "https://bookshop.org/book/9780521292429",
    "https://archive.org/details/in.gov.ignca.12550",
    "https://bookshop.org/book/9780674699069",
    "https://www.routledge.com/Orality-and-Literacy-30th-Anniversary-Edition/Ong/p/book/9780415538381",
    "https://bookshop.org/book/9780521299558",
    "https://en.wikipedia.org/wiki/The_Educated_Mind",
    "https://www.edwardtufte.com/book/envisioning-information/",
    "https://en.wikipedia.org/wiki/Understanding_Comics",
    "https://mitpress.mit.edu/9780262581462/cognition-in-the-wild/",
    "https://bookshop.org/book/9780143117469",
    "https://bookshop.org/book/9780679740476",
    "https://en.wikipedia.org/wiki/A_Pattern_Language",
    "https://en.wikipedia.org/wiki/The_Oregon_Experiment",
    "https://en.wikipedia.org/wiki/How_Buildings_Learn",
    "https://bookshop.org/book/9780226113470",
    "https://bookshop.org/book/9780679764892",
    "http://www.newmediareader.com/",
    "https://bookshop.org/book/9780125232708",
    "https://bookshop.org/book/9781783083442",
    "https://worrydream.com/refs/Nelson_T_1974_-_Computer_Lib,_Dream_Machines.pdf",
    "https://en.wikipedia.org/wiki/Literary_Machines",
    "https://bookshop.org/book/9781541675124",
    "https://worrydream.com/refs/Allen-Conn_2003_-_Powerful_Ideas_in_the_Classroom.pdf",
    "https://www.rheingold.com/texts/tft/",
    "https://en.wikipedia.org/wiki/Sketchpad",
    "https://dougengelbart.org/content/view/201/",
    "https://dl.acm.org/doi/book/10.1145/61975",
    "https://worrydream.com/refs/Krasner_1983_-_Smalltalk-80_Bits_of_History,_Words_of_Advice.pdf",
    "https://archive.org/details/humaninterfacewh0000bolt",
    "https://worrydream.com/refs/Bolt_1979_-_Spatial_Data_Management.pdf",
    "https://worrydream.com/refs/Kim_1988_-_Viewpoint,_Toward_a_Computer_for_Visual_Thinkers.pdf",
    "https://en.wikipedia.org/wiki/Seeing_Like_a_State",
    "https://mitpress.mit.edu/9780262546799/simulation-and-its-discontents/",
    "https://bookshop.org/book/9780143036531",
    "https://bookshop.org/book/9780679745402",
    "https://bookshop.org/book/9781842300114",
    "https://web.stanford.edu/dept/SUL/sites/mac/primary/docs/satori/",
    "https://bookshop.org/book/9781732265110",
    "https://bookshop.org/book/9780804738712",
    "https://worrydream.com/refs/Piumarta_2010_-_Points_of_View.pdf",
    "https://bookshop.org/book/9781849901154"
]


"""
Simple try of the agent.

@dev You need to add OPENAI_API_KEY to your environment variables.
"""

import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import asyncio

from langchain_openai import ChatOpenAI
from browser_use import Agent

llm = ChatOpenAI(model='gpt-4o')

# Updated task to instruct the agent to:
# 1. Visit each link to retrieve the book title,
# 2. Go to Amazon, search for it,
# 3. Sort results by best rating,
# 4. Add to wishlist.
#
# The agent should iterate over all `dynamicland_book_shelf` links.

agent = Agent(
    task="""
    For each link in dynamicland_book_shelf:
        1. Open the link and extract the book's title from the page.
        2. Then go to amazon.com.
        3. Search for that book's title.
        4. Sort the search results by the highest rating.
        5. Add the top-rated search result to your wishlist.
    """,
    llm=llm,
)


async def main():
    await agent.run(max_steps=100)  # allow enough steps for multiple link visits
    input('Press Enter to continue...')


asyncio.run(main())
