'use client'
const twenty_twenty_four = [
  'Determined: A Science of Life without Free Will',
  'Probabilistic Robotics (Intelligent Robotics and Autonomous Agents series)',
  'Outlive: The Science and Art of Longevity',
  'Mindstorms: Children, Computers, And Powerful Ideas',
  'What Einstein Told His Cook: Kitchen Science Explained',
  "An Engineer's Guide to Silicon Valley Startups",
  'A Beautiful Mind: The Life of Mathematical Genius and Novel Laureate John Nash',
  'Direct Truth: Uncompromising, non-prescriptive Truths to the enduring questions of life',
  'Napoleon: A Life',
  'Measurement',
  'Facing Codependence: What it is, where it comes from, how it sabotages our lives',
  'The Mind Illuminated: A Complete Meditation Guide Integrating Buddhist Wisdom and Brain Science for Greater Mindfulness',
  'Out of the Desert: My Journey From Nomadic Bedouin to the Heart of Global Oil',
  'Softwar: An Intimate Portrait of Larry Ellison and Oracle',
  'Radical Acts Of Embodiment: Teaching and Practices of Katonah Yoga®',
  'Designing Machine Learning Systems: An Iterative Process for Production-Ready Applications',
  'Discipline Is Destiny: The Power of Self-Control (The Stoic Virtues Series)',
  'Practical Simulations for Machine Learning',
  'Antifragile: Things That Gain from Disorder (Incerto Book 3)',
  'This Is Your Mind on Plants',
  'How to Change Your Mind: What the New Science of Psychedelics Teaches Us About Consciousness, Dying, Addiction, Depression, and Transcendence',
  'Coding the Matrix: Linear Algebra through Computer Science Applications',
  'Linear Algebra Done Right (Undergraduate Texts in Mathematics)',
  'The Economics of Information Technology: An Introduction (Raffaele Mattioli Lectures)',
  'Ego Is the Enemy',
  'The Art of Living: Vipassana Meditation as Taught by S. N. Goenka',
  'The Network State: How To Start a New Country',
  'Already Free: Buddhism Meets Psychotherapy on the Path of Liberation',
  'Yoga as Origami: Themes from Katonah Yoga',
  'Foundation',
  'Katonah Yoga Home Practice',
  'Sapiens: A Brief History of Humankind',
  'Pragmatic Programmer, The: From Journeyman to Master',
  'Letting Go: The Pathway of Surrender',
  'Nonviolent Communication: A Language of Life: Life-Changing Tools for Healthy Relationships (Nonviolent Communication Guides)',
  'Design of Design, The: Essays from a Computer Scientist',
  "Finding Ultra, Revised and Updated Edition: Rejecting Middle Age, Becoming One of the World's Fittest Men, and Discovering Myself",
  "Can't Hurt Me: Master Your Mind and Defy the Odds",
  'Projections: The New Science of Human Emotion',
  'Principles: Life and Work',
  "I Don't Want to Talk About It: Overcoming the Secret Legacy of Male Depression",
  'Turning Pro',
  "Man's Search for Meaning",
  'Freedom from the Known',
  'Skin in the Game: Hidden Asymmetries in Daily Life (Incerto)',
  'Infinite Jest',
  'Mathematics for Computer Graphics (Undergraduate Topics in Computer Science)',
  'Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems',
  'The Ray Tracer Challenge: A Test-Driven Guide to Your First 3D Renderer (Pragmatic Bookshelf)',
  'Practicing the Power of Now: Essential Teachings, Meditations, and Exercises from the Power of Now',
  'Mother Night: A Novel',
  'Your True Home: The Everyday Wisdom of Thich Nhat Hanh',
  'AWAKEN THE GIANT WITHIN',
  'The Myth of Normal: Trauma, Illness, and Healing in a Toxic Culture',
  'Talent: How to Identify Energizers, Creatives, and Winners Around the World',
  'GANG FIT: Freedom & Strength',
  'The Truth Machine: The Blockchain and the Future of Everything',
  'Dream Hoarders: How the American Upper Middle Class Is Leaving Everyone Else in the Dust, Why That Is a Problem, and What to Do About It',
  'Behave: The Biology of Humans at Our Best and Worst',
  'Second Foundation',
  'Foundation and Empire',
  'Conspiracy: Peter Thiel, Hulk Hogan, Gawker, and the Anatomy of Intrigue',
  'Steve Jobs',
  'The Beginning of Infinity: Explanations That Transform the World',
  'Becoming Steve Jobs: The Evolution of a Reckless Upstart into a Visionary Leader',
  'Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future',
  'What You Do Is Who You Are: How to Create Your Business Culture',
  'Principles for Dealing with the Changing World Order: Why Nations Succeed and Fail',
  'Thinking in Systems: International Bestseller',
  'Why We Sleep: Unlocking the Power of Sleep and Dreams',
  'THE SCIENCE OF SELF-CONTROL: 53 Tips to stick to your diet, be more productive and excel in life',
  'SuperLife: The 5 Simple Fixes That Will Make You Healthy, Fit, and Eternally Awesome',
  'A World of Three Zeros: The New Economics of Zero Poverty, Zero Unemployment, and Zero Net Carbon Emissions',
  'The Business of Belonging: How to Make Community your Competitive Advantage',
  'The Laws of Human Nature',
  'The Power of Now: A Guide to Spiritual Enlightenment',
  'Mastering the Core Teachings of the Buddha: An Unusually Hardcore Dharma Book',
  'Letters from the Earth',
  'The Complete Works of Kahlil Gibran: All poems and short stories (Global Classics)',
  'The Prophet',
  'Gitanjali',
  'A Philosophy of Software Design',
  'The Observer is The Observed (The Collected Works Of J. Krishnamurti 1945-1948 Book 4)',
  'Power to the People Professional: How to Add 100s of Pounds to Your Squat, Bench,and Deadlift with Advanced Russian Techniques',
  'Super Joints: Russian Longevity Secrets for Pain-Free Movement,: Russian Longevity Secrets for Pain-Free Movement, Maximum Mobility & Flexible Strength',
  'Hard Style Abs: Hit Hard. Lift Heavy. Look the Part',
  "Krishnamurti's Notebook",
  'Mastery',
  'The Book of Five Rings',
  "Zen Mind, Beginner's Mind: Informal Talks on Zen Meditation and Practice",
  'Why Buddhism is True: The Science and Philosophy of Meditation and Enlightenment',
  'Pre-Suasion: A Revolutionary Way to Influence and Persuade',
  'Be As You Are: The Teachings of Sri Ramana Maharshi (Arkana S.)',
  'The Happy Body: The Simple Science of Nutrition, Exercise, and Relaxation',
  'Maybe You Should Talk to Someone: A Therapist, HER Therapist, and Our Lives Revealed',
  "Claim Your Power: A 40-Day Journey to Dissolve the Hidden Blocks That keep you Stuck and Finally Thrive in Your Life's Unique Purpose",
  'The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma',
  'The Untethered Soul: The Journey Beyond Yourself',
  'The Way of the Superior Man: A Spiritual Guide to Mastering the Challenges of Women, Work, and Sexual Desire (20th Anniversary Edition)',
  'The Almanack of Naval Ravikant: A Guide to Wealth and Happiness',
  'Hardwiring Happiness: The New Brain Science of Contentment, Calm, and Confidence',
  "Buddha's Brain: The Practical Neuroscience of Happiness, Love, and Wisdom",
  "I Used to Be a Miserable F*ck: An Everyman's Guide to a Meaningful Life",
  'The Book of Five Rings',
  'What Are You Doing With Your Life?',
  'Keys to Unlocking Depression: An Internationally Known Depression Expert Tells You What You Need to Know to Overcome Depression',
  'Total Freedom: The Essential Krishnamurti',
  'Burn Fat with The Metabolic Blowtorch Diet: The Ultimate Guide for Optimizing Intermittent Fasting: Burn Fat, Preserve Muscle, Enhance Focus and Transform Your Health',
  'Visual Computing for Medicine: Theory, Algorithms, and Applications (The Morgan Kaufmann Series in Computer Graphics)',
  'The Six Pillars of Self-Esteem',
  'The Fourth Way',
  '50 Misconceptions of Sex: A Modern Tantric Practice',
  'The Choice: Embrace the Possible',
  "A Master's Secret Whispers: For those who abhor the noise and seek The Truth about life and living",
  'Meditation Now: Inner Peace through Inner Wisdom',
  'Remote: Office Not Required',
  'Radical Honesty: How to Transform Your Life by Telling the Truth',
  'Love Yourself Like Your Life Depends on It',
  'Reprogram Your Sleep: The Sleep Recipe that Works',
  'How to Be a Poker Player: The Philosophy of Poker',
  'The Daily Stoic: 366 Meditations on Wisdom, Perseverance, and the Art of Living',
  'Paths to God: Living the Bhagavad Gita',
  'Dune',
  'My Secret Garden',
  'The Telomere Effect: A Revolutionary Approach to Living Younger, Healthier, Longer',
  'The Winner Effect: The Neuroscience of Success and Failure',
  'Breaking the Habit of Being Yourself: How to Lose Your Mind and Create a New One',
  'The Leangains Method: The Art of Getting Ripped. Researched, Practiced, Perfected.',
  'The Yoga of Personal Development: Enlightened Lessons on Peak Performance, Leadership and Living A Life of No Regrets',
  'The Wisdom of Insecurity',
  'How To Win Friends and Influence People',
  'Own the Day, Own Your Life: Optimized Practices for Waking, Working, Learning, Eating, Training, Playing, Sleeping, and Sex',
  'Scattered: How Attention Deficit Disorder Originates and What You Can Do About It',
  'Archie (2015-) #9',
  'Player Piano',
  'Play Winning Chess',
  'Zero to One: Notes on Startups, or How to Build the Future',
  'Musicophilia',
  'The Selfish Gene: 30th Anniversary edition',
  'The Four Agreements: A Practical Guide to Personal Freedom (A Toltec Wisdom Book)',
  "Grain Brain: The Surprising Truth about Wheat, Carbs,  and Sugar--Your Brain's Silent Killers",
  'Predictable Revenue: Turn Your Business Into A Sales Machine With The $100 Million Best Practices Of Salesforce.com',
  'Medium Raw: A Bloody Valentine to the World of Food and the People Who Cook (P.S.)',
  'The Four Steps to the Epiphany',
  'Major Account Sales Strategy',
  "The Cave Painters: Probing the Mysteries of the World's First Artists",
  'Mavericks at Work',
  'The Hard Thing About Hard Things: Building a Business When There Are No Easy Answers',
  'I Am Malala: The Girl Who Stood Up for Education and Was Shot by the Taliban',
  'Against the Gods: The Remarkable Story of Risk',
  'Ready Player One',
  'Forward the Foundation',
  "Inside Steve's Brain",
  'Flow: The Psychology of Optimal Experience (Harper Perennial Modern Classics)',
  'Racing the Beam: The Atari Video Computer System (Platform Studies)',
  'HTML5 Unleashed',
  'The War of Art',
  'Persuasive Games: The Expressive Power of Videogames (The MIT Press)',
  'The Pixar Touch',
  'King Richard II',
  'Hamlet (French Edition)',
  'King Henry V',
  "A Midsummer Night's Dream",
  'A First-Rate Madness: Uncovering the Links Between Leadership and Mental Illness',
  'Snow Crash',
  'It Is Known: An Analysis of Thrones, Vol. I',
  'The Mythical Man-Month: Essays on Software Engineering, Anniversary Edition (2nd Edition)',
  'The Art of Doing Science and Engineering: Learning to Learn',
  'Thinking, Fast and Slow',
  "Foundation's Edge",
  'Aquinas 101: A Basic Introduction to the Thought of Saint Thomas Aquinas',
  'Rainbows End: A Novel with One Foot in the Future',
  "Cat's Cradle",
  "Happiness: A Guide to Developing Life's Most Important Skill",
  'Wikinomics: How Mass Collaboration Changes Everything',
  'Spent: Sex, Evolution, and Consumer Behavior',
  'The Unwritten Rules of Social Relationships: Decoding Social Mysteries Through the Unique Perspectives of Autism',
  'Understanding Other People: The Five Secrets to Human Behavior',
  'The Dragons of Eden: Speculations on the Evolution of Human Intelligence',
  'Made to Stick: Why Some Ideas Survive and Others Die',
  'Technology, Management and Society',
  'All Your Base Are Belong to Us: How Fifty Years of Videogames Conquered Pop Culture',
  'Googled: The End of the World As We Know It',
  'Predictably Irrational, Revised and Expanded Edition: The Hidden Forces That Shape Our Decisions',
  'The Upside of Irrationality: The Unexpected Benefits of Defying Logic at Work and at Home',
  'The Honest Truth About Dishonesty: How We Lie to Everyone---Especially Ourselves',
  'Fooled by Randomness: The Hidden Role of Chance in Life and in the Markets (Incerto Book 1)',
  'Sell More Software: Website Conversion Optimization for Software Developers',
  "The Signal and the Noise: Why So Many Predictions Fail-but Some Don't",
  'Hackers: Heroes of the Computer Revolution - 25th Anniversary Edition',
  'iWoz: Computer Geek to Cult Icon',
  "George R. R. Martin's A Game of Thrones 5-Book Boxed Set (Song of Ice and Fire Series): A Game of Thrones, A Clash of Kings, A Storm of Swords, A Feast for Crows, and A Dance with Dragons",
  'The Count of Monte Cristo',
]

import { useRef, useEffect } from 'react'
import * as Plot from '@observablehq/plot'

// Your list of books

export default function BooksTablePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Books List (2024)</h1>
      <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th
                style={{
                  padding: '8px',
                  textAlign: 'right',
                  borderBottom: '2px solid #ddd',
                }}
              >
                Rank
              </th>
              <th
                style={{
                  padding: '8px',
                  textAlign: 'left',
                  borderBottom: '2px solid #ddd',
                }}
              >
                Title
              </th>
            </tr>
          </thead>
          <tbody>
            {twenty_twenty_four.map((title, i) => (
              <tr
                key={i}
                style={{ backgroundColor: i % 2 === 0 ? '#f9f9f9' : 'white' }}
              >
                <td
                  style={{
                    padding: '8px',
                    textAlign: 'right',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  {i + 1}
                </td>
                <td
                  style={{
                    padding: '8px',
                    textAlign: 'left',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  {title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
