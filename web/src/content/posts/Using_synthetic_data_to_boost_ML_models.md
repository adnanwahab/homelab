---
title: "Using_synthetic_data_to_boost_ML_models"
date: "05-22-2025"
---

So, what exactly is synthetic data?
Simply put, synthetic data is artificially generated data that mimics real-world data. Instead of relying solely on the physical world to collect data, engineers create simulated environments where AVs can “drive” through different scenarios, with every variable — from weather conditions to the density of pedestrian traffic — carefully controlled. These simulated environments are incredibly realistic and, in many cases, nearly indistinguishable from actual real-world settings.

There are a number of reasons why companies rely on synthetic data rather than real-world data:

Scarcity: There are only so many rare, high-risk situations you can encounter naturally. Synthetic data allows for the generation of those “edge cases” where accidents or unusual conditions occur.
Compliance: Gathering data in the real world can often come with privacy and regulatory concerns. By using synthetic data, companies can sidestep these issues while still gaining valuable insights. (More often this is a need in industries like health care and financial services where training data often involves extensive PII)
Bias: Real-world data can be biased. For example, if a vehicle is mostly trained in one geographic location, it may struggle in new settings. Synthetic data can ensure a more diverse dataset.
Edge cases: These are the rare, unpredictable scenarios — like a pedestrian suddenly darting into the road from an atypical angle — that are hard to capture but essential to preparing AVs for real-world operation.
This is why synthetic data has become an industry standard for not just AV companies but also the automotive industry more broadly. As the technology advances, the methods for generating and utilizing synthetic data continue to evolve, and AV companies are constantly expanding the toolbox they have for building synthetic data pipelines.

Synthetic Data Solutions in the AV Industry
The creation and management of synthetic data have turned into a specialized industry with several solutions available. Many companies now have specialized solutions to help AV companies use synthetic data efficiently.

Applied Intuition offers an Advanced Driver Assistance System (ADAS) and AV platform for managing, among other processes, synthetic data pipelines. This allows developers to simulate vast amounts of driving data and test assisted driving and AV systems in a wide array of situations. Their solutions ensure that AVs are trained in everything from routine drives to complex, rare scenarios.
Scale AI is another vendor in the space. Its offerings include a platform that helps AV companies annotate and generate synthetic data to train their algorithms. They focus on providing large-scale data labeling and manage the massive amount of information needed to train AV AI models.
NVIDIA’s Omniverse API launched earlier this year, is another significant ecosystem, offering the ability to synthetically generate new training scenarios for AVs, partnered with a host of simulator tools (e.g., NVIDIA’s Carla, MathWorks and Mitre). The Omniverse platform allows developers to create hyper-realistic simulations where vehicles can be tested in a safe, controlled environment.
These platforms, among others, provide the scaffolding that companies like Waymo use to ensure their vehicles are constantly learning, even when they’re not on the road.

Why Synthetic Data Matters for AVs
In 2022, Waymo researchers (Bronstein et al) published an important paper highlighting how essential synthetic data and scenario diversity are for the future of autonomous driving. They found that showing AVs challenging, rare examples can significantly boost performance. By oversampling low-likelihood but high-risk scenarios — situations where accidents are more likely to occur — they managed to increase accuracy by 15% while only using 10% of the total available training data. (This was possible since a vast majority of training data was repetitive in its scenario exposure.)

The researchers developed a difficulty score model based on simulated driving data, showing examples of both collision and non-collision scenarios to the difficulty model. A difficulty score allowed them to intelligently select the most critical scenarios for training (i.e., where there was more likely to be a crash). Using this approach, they were able to create a curriculum learning model, where the AVs prioritized the harder driving situations that would be rare in the real world but vital for improving safety. (Curriculum learning is a set of techniques used to increase the complexity and comrehensiveness of an AI model by prioritized, progressive exposure to more diverse and/or complex data sources.)

The curriculum learning approach, driven by synthetic data, helped Waymo vehicles better handle the long tail of rare, complex, and safety-critical driving situations. By improving the cars’ performance in the most challenging scenarios, Waymo made significant strides in overall vehicle safety.

The road ahead
As AVs continue to be tested in more diverse environments and introduced to a growing number of real-world geographies, it will be fascinating to see how the use of synthetic data evolves. Every new city and environment brings new types of road layouts, weather conditions, and driving behaviors.

There also continues to be scrutiny and need for safer AV systems; even in ‘well studied’ cities, there is continued need for improvement. For instance, in February this year a Waymo hit a San Francisco cyclist, sparking California DMV review.

How will these systems adapt to an ever-increasing range of edge cases?

The balance between overfitting to a specific region and maintaining broad, adaptable capabilities will be key. As synthetic data and real-world data continue to work hand-in-hand, AV companies must ensure that the systems remain flexible and resilient.

One thing is certain: as AVs continue their journey toward mainstream adoption, synthetic data will play an increasingly critical role. And with the right balance of synthetic and real-world data, we might just be on the cusp of making our roads a whole lot safer.

What industries and use cases do you think are most exciting for the application of synthetic data? What risks do you perceive? I welcome comments below.