https://static.observableusercontent.com/thumbnail/6f5ffbede5275c985c76cffe8772f2eb6ced562b0d573ca934d7577fda9287e8.jpg


# attention mechnanisms


make a few atoms - make a periodic table - that can make it into anything
cs183

robots + biotech + fusion + dynamicland = avatar = 30T generatied in 5 years.

avatar beyond = avatat from the future - neo-cyberpunk steam punk avatar

> change gradient of background according to time of day / dx of scroll
> add a loading bar for time of scroll
> add a loading bar for indexing all of derps content
> add a llm from scratch like llm.c or micrograd
> add a chatbot that can answer questions about the content
> make every line of code editable like a wiki course -> hover -> see 3 possiblites -> click button ->

https://arxiv.org/pdf/1706.03762
https://arxiv.org/html/1706.03762v7
> make light table -
> 4 sides of cube - (demo-landing page, lessons, community-demos, admin-dashboard)

> "Tools that anticipate not obey" - Bret - magic ink 2008

> most Excitng field in robotics is creative AI - Kai Wang - (feb 2021)
Creative AI was the original term for Generative AI.

<iframe width="560" height="315" src="https://www.youtube.com/embed/PaCmpygFfXo?si=pamD56WkBAsJBEPF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


why difficult to do great things?
learning too difficult, no immediate reward + no incentive from society
reward is like 10 years away usually
so we built dynabot.dev - to make learning skills that will become more useful in 5 years
super fun and immediately rewarding so that people will do it for fun.


# PDF VEIWER HOW
```js
//import pdfviewer from './components/pdfViewer.js'
function pdfviewer () {}
pdfviewer(`https://arxiv.org/pdf/2410.24052`)

```
# PDF VEIWER HOW


```js

let require = d3.require

let dpr = window.devicePixelRatio

let initializeStyles = (options) => {
  let initialized;
  const uid = {uid: 'asdlfalsdfj'}
  const ns = uid.id;
  if (initialized) return uid;

  initialized = true;

  const { backgroundColor, fontColor } = options;
  const inputsNs = Inputs.text().classList[0];

  const styles = html`<style name="${ns}">
.${ns} form.${inputsNs} {
width: auto;
}

.${ns} {
--background-color: ${backgroundColor};
--font-color: ${fontColor};

padding: 0.5rem;
background-color: var(--background-color);
border-radius: 0.5rem;
overflow: hidden;
}

.${ns} > * + * {
margin-top: 0.5rem;
}

.${ns}__pagination {
display: flex;
justify-content: space-between;
align-items: center;
}

.${ns}__actions {
display: flex;
}

.${ns}__actions > * + * {
margin-left: 0.5rem;
}

.${ns}__info {
font-size: 0.875rem;
color: var(--font-color);
}

.${ns}__canvas-wrapper canvas {
max-width: 100%;
border-radius: 0.25rem;
}

.${ns} button[disabled] {
cursor: not-allowed;
}
</style>`;

  document.querySelector("head").append(styles);

  invalidation.then(
    () => styles.parentNode && styles.parentNode.removeChild(styles)
  );
  return uid;
}

// let pdfjsLib = (async () => {
//   const lib = await require("https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.min.js");
//   lib.GlobalWorkerOptions.workerSrc =
//     "https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js";

//   console.log(lib);
//   return lib;
//})();

// pdfView(`https://arxiv.org/pdf/2401.09718`);

```

```js
//import { exec_magic_iframe } from "@roboticsuniversity/dynamicland"
```


exec_magic_iframe(`https://www.norvig.com/spell-correct.html`)


# Bibliography

### Lesson 1: Introduction to Prediction in Robotics
- Research Paper: [https://arxiv.org/abs/1706.04329](https://arxiv.org/abs/1706.04329)
- Blog Post: [https://robohub.org/the-importance-of-prediction-in-robotics/](https://robohub.org/the-importance-of-prediction-in-robotics/)
- GitHub Repo: [https://github.com/petercorke/robotics-toolbox-python](https://github.com/petercorke/robotics-toolbox-python)

### Lesson 2: Fundamentals of Large Language Models (LLMs)
- Blog Post: [http://jalammar.github.io/illustrated-transformer/](http://jalammar.github.io/illustrated-transformer/)
- Research Paper: [https://arxiv.org/abs/1706.03762](https://arxiv.org/abs/1706.03762)
- GitHub Repo: [https://github.com/jadore801120/attention-is-all-you-need-pytorch](https://github.com/jadore801120/attention-is-all-you-need-pytorch)
- Jupyter Notebook: [https://github.com/tensorflow/docs/blob/master/site/en/tutorials/text/transformer.ipynb](https://github.com/tensorflow/docs/blob/master/site/en/tutorials/text/transformer.ipynb)

### Lesson 3: Integrating LLMs into Robotic Systems
- Research Paper: [https://arxiv.org/abs/2201.07207](https://arxiv.org/abs/2201.07207)
- GitHub Repo: [https://github.com/vimalabs/vima](https://github.com/vimalabs/vima)
- Blog Post: [https://deepmind.com/blog/article/combining-robotics-and-language-models](https://deepmind.com/blog/article/combining-robotics-and-language-models)

### Lesson 4: Predicting Behavior of Other Agents Using LLMs
- Research Paper: [https://arxiv.org/abs/1506.01919](https://arxiv.org/abs/1506.01919)
- GitHub Repo: [https://github.com/agrimgupta92/sgan](https://github.com/agrimgupta92/sgan)
- Jupyter Notebook: Included in the GitHub repository

### Lesson 5: Modeling Human Behavior with LLMs
- Research Paper: [https://arxiv.org/abs/1803.10813](https://arxiv.org/abs/1803.10813)
- Blog Post: [https://towardsdatascience.com/understanding-human-behavior-with-ai-1b5df846c6c0](https://towardsdatascience.com/understanding-human-behavior-with-ai-1b5df846c6c0)
- GitHub Repo: [https://github.com/healthai-lab/Human-Activity-Recognition](https://github.com/healthai-lab/Human-Activity-Recognition)

### Lesson 6: LLMs for Path Prediction in Multi-Agent Systems
- Research Paper: [https://arxiv.org/abs/2001.03093](https://arxiv.org/abs/2001.03093)
- GitHub Repo: [https://github.com/StanfordASL/Trajectron-plus-plus](https://github.com/StanfordASL/Trajectron-plus-plus)
- Jupyter Notebook: Included in the GitHub repository

### Lesson 7: Social Navigation with LLM-based Prediction
- Research Paper: [https://arxiv.org/abs/1803.10892](https://arxiv.org/abs/1803.10892)
- GitHub Repo: [https://github.com/agrimgupta92/sgan](https://github.com/agrimgupta92/sgan)
- Blog Post: [https://spectrum.ieee.org/robot-navigation-social-awareness](https://spectrum.ieee.org/robot-navigation-social-awareness)

### Lesson 8: LLMs in Predictive Maintenance
- Research Paper: [https://www.mdpi.com/1424-8220/18/10/3653](https://www.mdpi.com/1424-8220/18/10/3653)
- GitHub Repo: [https://github.com/Azure/MachineLearningSamples-PredictiveMaintenance](https://github.com/Azure/MachineLearningSamples-PredictiveMaintenance)
- Jupyter Notebook: Included in the GitHub repository

### Lesson 9: Stock Market Prediction with LLMs
- Research Paper: [https://arxiv.org/abs/1907.00970](https://arxiv.org/abs/1907.00970)
- GitHub Repo: [https://github.com/huseinzol05/Stock-Prediction-Models](https://github.com/huseinzol05/Stock-Prediction-Models)
- Jupyter Notebook: Included in the GitHub repository

### Lesson 10: Time Series Analysis Using LLMs
- Research Paper: [https://arxiv.org/abs/1912.09363](https://arxiv.org/abs/1912.09363)
- GitHub Repo: [https://github.com/unit8co/darts](https://github.com/unit8co/darts)
- Jupyter Notebook: [https://unit8co.github.io/darts/examples/](https://unit8co.github.io/darts/examples/)

### Lesson 11: Environmental Change Prediction
- Research Paper: [https://www.sciencedirect.com/science/article/pii/S0924271618300775](https://www.sciencedirect.com/science/article/pii/S0924271618300775)
- GitHub Repo: [https://github.com/rcdaudt/fully_convolutional_change_detection](https://github.com/rcdaudt/fully_convolutional_change_detection)
- Blog Post: [https://www.weforum.org/agenda/2020/01/ai-climate-change-environmental-impact/](https://www.weforum.org/agenda/2020/01/ai-climate-change-environmental-impact/)

### Lesson 12: LLMs in Autonomous Driving Prediction
- Research Paper: [https://arxiv.org/abs/2003.00089](https://arxiv.org/abs/2003.00089)
- GitHub Repo: [https://github.com/xk-huang/VectorNet](https://github.com/xk-huang/VectorNet)
- Jupyter Notebook: Included in the GitHub repository

### Lesson 13: Ethical Considerations in LLM-based Prediction
- Research Paper: [https://link.springer.com/article/10.1007/s00146-017-0760-8](https://link.springer.com/article/10.1007/s00146-017-0760-8)
- Blog Post: [https://www.brookings.edu/research/how-artificial-intelligence-is-transforming-the-world/](https://www.brookings.edu/research/how-artificial-intelligence-is-transforming-the-world/)

### Lesson 14: Integrating Reinforcement Learning and LLMs
- Research Paper: [https://arxiv.org/abs/2002.04105](https://arxiv.org/abs/2002.04105)
- GitHub Repo: [https://github.com/dennybritz/reinforcement-learning](https://github.com/dennybritz/reinforcement-learning)
- Jupyter Notebook: Included in the GitHub repository

### Lesson 15: Predicting Human Intentions with LLMs
- Research Paper: [https://ieeexplore.ieee.org/document/8462891](https://ieeexplore.ieee.org/document/8462891)
- GitHub Repo: [https://github.com/interaction-lab/Human-Intent-Recognition](https://github.com/interaction-lab/Human-Intent-Recognition)
- Blog Post: [https://towardsdatascience.com/predicting-human-intent-with-ai-5d3e1dbba8e0](https://towardsdatascience.com/predicting-human-intent-with-ai-5d3e1dbba8e0)

### Lesson 16: LLMs in Natural Language Processing for Prediction
- Research Paper: [https://arxiv.org/abs/2005.14165](https://arxiv.org/abs/2005.14165)
- GitHub Repo: [https://github.com/openai/gpt-3](https://github.com/openai/gpt-3)
- Jupyter Notebook: [https://colab.research.google.com/github/huggingface/blog/blob/master/notebooks/01_how_to_train.ipynb](https://colab.research.google.com/github/huggingface/blog/blob/master/notebooks/01_how_to_train.ipynb)

### Lesson 17: Predicting System Failures with LLMs
- Research Paper: [https://arxiv.org/abs/1607.00148](https://arxiv.org/abs/1607.00148)
- GitHub Repo: [https://github.com/khundman/telemanom](https://github.com/khundman/telemanom)
- Jupyter Notebook: Included in the GitHub repository

### Lesson 18: LLMs for Decision Making in Robotics
- Research Paper: [https://arxiv.org/abs/2106.01345](https://arxiv.org/abs/2106.01345)
- GitHub Repo: [https://github.com/kzl/decision-transformer](https://github.com/kzl/decision-transformer)
- Jupyter Notebook: Included in the GitHub repository

### Lesson 19: Multimodal Data Prediction with LLMs
- Research Paper: [https://arxiv.org/abs/1907.01166](https://arxiv.org/abs/1907.01166)
- GitHub Repo: [https://github.com/facebookresearch/mmbt](https://github.com/facebookresearch/mmbt)
- Jupyter Notebook: Included in the GitHub repository

### Lesson 20: LLMs in Predictive Control Systems
- Research Paper: [https://arxiv.org/abs/1802.04206](https://arxiv.org/abs/1802.04206)
- GitHub Repo: [https://github.com/locuslab/mpc.pytorch](https://github.com/locuslab/mpc.pytorch)
- Jupyter Notebook: Included in the GitHub repository

### Lesson 21: Future Trends in LLM-based Prediction
- Blog Post: [https://spectrum.ieee.org/robotics/artificial-intelligence](https://spectrum.ieee.org/robotics/artificial-intelligence)
- Research Paper: [https://arxiv.org/abs/2106.00000](https://arxiv.org/abs/2106.00000)

### Lesson 22: Case Study—Behavior Prediction in Robotics
- Research Paper: [https://arxiv.org/abs/1909.03807](https://arxiv.org/abs/1909.03807)
- GitHub Repo: [https://github.com/vita-epfl/CrowdNav](https://github.com/vita-epfl/CrowdNav)
- Blog Post: [https://news.stanford.edu/2018/12/14/robots-predicting-human-movement/](https://news.stanford.edu/2018/12/14/robots-predicting-human-movement/)

### Lesson 23: Case Study—Stock Market Prediction Using LLMs
- Research Paper: [https://arxiv.org/abs/2002.06103](https://arxiv.org/abs/2002.06103)
- GitHub Repo: [https://github.com/ZhengyaoJiang/PGPortfolio](https://github.com/ZhengyaoJiang/PGPortfolio)
- Jupyter Notebook: Included in the GitHub repository

### Lesson 24: Hands-on Project—Implementing LLM-based Prediction
- GitHub Repo: [https://github.com/huggingface/transformers](https://github.com/huggingface/transformers)
- Jupyter Notebook: [https://github.com/huggingface/transformers/blob/main/notebooks/01-training.ipynb](https://github.com/huggingface/transformers/blob/main/notebooks/01-training.ipynb)
- Blog Post: [https://towardsdatascience.com/how-to-build-a-language-model-733b7b9c6e19](https://towardsdatascience.com/how-to-build-a-language-model-733b7b9c6e19)

### Lesson 25: Review and Assessment
- Resources: Utilize the materials from the previous lessons for review.
- Assessment Tools: Create quizzes using Google Forms or interactive exercises using Jupyter Notebook.



email - nothing happened - reduce stress of dr katz.



<iframe width="560" height="315" src="https://www.youtube.com/embed/PaCmpygFfXo?si=pamD56WkBAsJBEPF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe

<iframe src="https://arxiv.org/html/2410.24052" />


LLMs = black box - cant understand how they work - no one can

but small langauge models = can understand how they work -
observablity = small langauge model = interface tto LLM -> better





Understanding the “Attention is All You Need” paper by Vaswani et al., which introduces the Transformer architecture, requires a solid foundation in several areas of machine learning and related disciplines. Here’s a comprehensive list of prerequisites to help you grasp the concepts and innovations presented in the paper:

1. Basic Machine Learning Concepts

	•	Supervised Learning: Understanding how models learn from labeled data.
	•	Loss Functions: Familiarity with how models are trained to minimize errors.
	•	Evaluation Metrics: Knowing how to assess model performance.

2. Neural Networks Fundamentals

	•	Perceptrons and Multilayer Perceptrons (MLPs): Basic building blocks of neural networks.
	•	Activation Functions: Such as ReLU, sigmoid, and tanh.
	•	Backpropagation: The algorithm used for training neural networks by updating weights.

3. Deep Learning

	•	Deep Neural Networks: Understanding architectures with multiple hidden layers.
	•	Regularization Techniques: Like dropout and batch normalization to prevent overfitting.
	•	Optimization Algorithms: Such as Stochastic Gradient Descent (SGD), Adam, etc.

4. Sequence Models

	•	Recurrent Neural Networks (RNNs): Handling sequential data.
	•	Long Short-Term Memory (LSTM) Networks: Addressing the vanishing gradient problem in RNNs.
	•	Gated Recurrent Units (GRUs): A simpler alternative to LSTMs.

5. Embeddings and Representation Learning

	•	Word Embeddings: Techniques like Word2Vec or GloVe that represent words in continuous vector space.
	•	Positional Encodings: Understanding how Transformers incorporate the order of sequences.

6. Attention Mechanism

	•	Basic Attention Concepts: How models focus on different parts of the input for generating outputs.
	•	Types of Attention: Such as additive and multiplicative (dot-product) attention.
	•	Scaled Dot-Product Attention: Specifically used in Transformers.

7. Transformer Architecture Specifics

	•	Encoder-Decoder Structure: How Transformers use stacked encoders and decoders.
	•	Multi-Head Attention: Allowing the model to focus on different representation subspaces.
	•	Residual Connections and Layer Normalization: Techniques to stabilize and improve training.

8. Linear Algebra

	•	Vectors and Matrices: Basic operations and transformations.
	•	Matrix Multiplication: Essential for understanding how data flows through neural networks.
	•	Tensor Operations: Since deep learning models often manipulate high-dimensional data.

9. Probability and Statistics

	•	Probability Distributions: Understanding how models predict probabilities over outputs.
	•	Bayesian Concepts: Basic familiarity can be helpful but not strictly necessary.
	•	Statistical Measures: Such as mean, variance, etc., used in data preprocessing and analysis.

10. Optimization Techniques

	•	Gradient Descent Variants: Understanding how different optimizers affect training.
	•	Learning Rate Schedules: Techniques for adjusting the learning rate during training.
	•	Loss Landscapes: Basic intuition about how optimization navigates them.

11. Practical Skills

	•	Programming Proficiency: Familiarity with Python and deep learning frameworks like TensorFlow or PyTorch.
	•	Model Implementation: Ability to implement and experiment with neural network architectures.
	•	Understanding of Computational Resources: Knowledge about GPUs and parallel computing can be beneficial.

Additional Resources for Preparation

	•	Books:
	•	“Deep Learning” by Ian Goodfellow, Yoshua Bengio, and Aaron Courville.
	•	“Neural Networks and Deep Learning” by Michael Nielsen (available online for free).
	•	Online Courses:
	•	Andrew Ng’s Machine Learning Course
	•	Deep Learning Specialization by Andrew Ng
	•	Natural Language Processing with Deep Learning
	•	Tutorials and Articles:
	•	The Illustrated Transformer by Jay Alammar.
	•	Attention? Attention! on Towards Data Science.

Tips for Studying the Paper

	1.	Start with Overviews: Read summaries or watch explanatory videos about Transformers to get a high-level understanding.
	2.	Break Down the Paper: Tackle one section at a time, ensuring you understand each component before moving on.
	3.	Implement Components: Coding parts of the Transformer model can solidify your understanding.
	4.	Join Study Groups: Discussing with others can provide new insights and clarify doubts.
	5.	Refer to References: The paper cites many foundational works; reviewing these can provide deeper context.

By building a strong foundation in these areas, you’ll be well-equipped to understand the “Attention is All You Need” paper and appreciate the transformative impact of the Transformer architecture in the field of machine learning and natural language processing.
