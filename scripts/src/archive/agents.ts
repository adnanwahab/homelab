import fs from 'fs';


const prompt = `Your directive is to repost worry dream's content and index all his friends 3 social links --- and repost and follow all of them`;



function init () {
    const path = '/home/adnan/derp/social_archive/agents.json';

    let agents = fs.readFileSync(path, 'utf8');
    console.log(agents);
    for (let i = 0; i < 10; i++) {
        const agent = agents[i];
        makeTwitter(agent);
        //console.log(response);
        // r-30o5oe r-1dz5y72 r-13qz1uu r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-fdjqy7
    }

    //console.log(response)

    fs.writeFileSync(path, agents);
}



function makeTwitter(agent) {
    console.log(agent); 
    agent.twitter = {
        'username': '',
        'password': '',
        'pfp': '',
        'bio': '',
        'following': [],
        'followers': [],
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function logintoTwitter(agent) {}


const { chromium } = require('playwright');
import ollama from 'ollama'

async function understand_page(content) {
    //console.log('attempting to answer msg', content);
    const response = await ollama.chat({
        model: 'llama3.2',
        messages: [{ role: 'user', content: content }],
      })
      //console.log(response.message.content)
      return response.message.content;
}



(async () => {
    // Launch browser
    console.log('launching browser');
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to Twitter login page
    await page.goto('https://twitter.com/login');
    console.log('wtf is going on');
    // Enter phone number


    //const selector = await understand_page("please figure out the selector for the form to get to the next step" + content);


    let selector = '.r-30o5oe.r-1dz5y72.r-13qz1uu.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-fdjqy7';
    await page.fill(selector, 'mail@adnanwahab.com');


    const content = await page.evaluate(() => document.body.innerHTML);



    //selector = '.css-146c3p1.r-bcqeeo.r-qvutc0.r-37j5jr.r-q4m81j.r-a023e6.r-rjixqe.r-b88u0q.r-1awozwy.r-6koalj.r-18u37iz.r-16y2uox.r-1777fci';
    
    const buttons = await page.$$('button');
    for (const button of buttons) {
        const buttonText = await page.evaluate(button => button.textContent, button);
        if (buttonText.toLowerCase().includes('next')) {
            await button.click();
            console.log('Clicked the "Next" button');
            break;
        }
    }

    selector = '.css-175oi2r.r-1f0wa7y';


    //await page.fill('.css-175oi2r.r-1roi411.r-z2wwpe.r-rs99b7.r-18u37iz', '7136773669');


    //let unusual_selector = await understand_page('class="css-175oi2r r-z2wwpe r-rs99b7 r-18u37iz r-vhj8yc r-9cip40"');

    //await page.fill(unusual_selector, 'roboticsodyssey');
    //console.log(unusual_selector);

    const shit_selector = `.r-30o5oe.r-1dz5y72.r-13qz1uu.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-fdjqy7`;

    const inputs = await page.$$(shit_selector);
    //await inputs.evaluate(input => input.value = 'roboticsodyssey');

    //await inputs[1].click();
    //await inputs[1].click();

    //selector = await understand_page("please traverse the document.body content for a form to find a css-selector for the form to execute a playwright action to get to the next step" + content);
    await sleep(30000);

    //console.log('hi dynamicland.org!!!', selector);
    // Enter password
    //await page.fill('input[name="session[password]"]', 'sicp.123');
    // Click login button
    //await page.click('div[data-testid="LoginForm_Login_Button"]');

    // Wait for navigation to confirm login
    //await page.waitForNavigation();


    // Add additional actions here if needed

    // Close the browser
    await browser.close();
})();

///mike bostock could have made a more commercializable startup than observable
//but he knows english code gen will make obsrvable as popular as jupyyter 
//jupyter = for gpu direct access 
//observable = UI for reactive responsive data visualization  + AI observability
//




// strateegy
// 2 millions per month - each second, 1 agent  - repost dynamicland1 - follows 100 random people.


//bayseian spam filtering data pipeline - avoid detection - minimal action - only exalt bret 

//150 million / 2 million = 75 months = 6 years 

const hundred_random_people = [
    'https://x.com/dynamicland1',
    'https://x.com/worrydream',
    'https://x.com/oxytim',
    'https://x.com/mattrothenberg',
    'https://x.com/smdnano',
    


    'https://x.com/adamcadre',
    'https://x.com/mtbdesignworks',
    'https://x.com/aresnick',
    'https://x.com/tom7',
    'https://x.com/shapeoperator',
    'https://x.com/tophtucker',
    'https://x.com/lukexi',
    'https://x.com/joannekcheung',
    'https://x.com/qualmist'
]


//1 petabyte data pipeline - for students
//20% archive internet
//20% action data from reality 
// 
