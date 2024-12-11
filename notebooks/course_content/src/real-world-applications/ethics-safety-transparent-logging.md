# NYC Data Office

saposlky

https://github.com/enjalot/latent-scope


# AI safety

# Robot

# launching self driving

latent scope -> analyze all roads + all laws to ammend them for happines of all people
kyle voght - tech crunch - improve launch time of cars by 3 years.
berlin - circlular city - bubbles of parks - walking only - trains - self driving for interstate lanes



tvgtropes - lableing = robot understand human


# Real-World Ethics, Safety, and Regulation

This Observable Framework demo explores the intricate relationships between ethics, safety, and regulation in various real-world contexts. Through interactive visualizations, users can gain insights into how these elements interact, influence each other, and shape industries and societies.

## Interactive Visualization

The visualization below demonstrates the distribution of ethical incidents across different industries and the corresponding safety regulations enacted over time. Users can interact with the chart to explore specific industries, time periods, and the severity of ethical concerns.

### Visualization Code

```javascript
import { Plot } from "@observablehq/plot"

// Sample Data
const data = [
  { industry: "Technology", year: 2015, incidents: 20, regulations: 5 },
  { industry: "Healthcare", year: 2015, incidents: 15, regulations: 8 },
  { industry: "Finance", year: 2015, incidents: 25, regulations: 10 },
  { industry: "Technology", year: 2016, incidents: 22, regulations: 6 },
  { industry: "Healthcare", year: 2016, incidents: 18, regulations: 9 },
  { industry: "Finance", year: 2016, incidents: 27, regulations: 11 },
  { industry: "Technology", year: 2017, incidents: 24, regulations: 7 },
  { industry: "Healthcare", year: 2017, incidents: 20, regulations: 10 },
  { industry: "Finance", year: 2017, incidents: 30, regulations: 12 },
  // Add more data as needed
]

// Create a scatter plot with dual axes
Plot.scatter(data, {
  x: "year",
  y: "incidents",
  title: "Ethical Incidents vs. Safety Regulations Over Time",
  color: "industry",
  size: "incidents",
  tooltip: (d) => `${d.industry} | Year: ${d.year}<br>Incidents: ${d.incidents}<br>Regulations: ${d.regulations}`
})
  .plot({
    marks: [
      Plot.line(data, { x: "year", y: "regulations", stroke: "industry", curve: "step" }),
      Plot.scatter(data, { x: "year", y: "incidents", color: "industry", size: "incidents" })
    ],
    y: {
      grid: true,
      label: "Number of Incidents",
      domain: [0, 35]
    },
    y2: {
      label: "Number of Regulations",
      domain: [0, 15]
    },
    x: {
      label: "Year",
      tickFormat: "d"
    },
    color: {
      legend: true
    },
    marks: [
      Plot.line(data, { x: "year", y: "regulations", stroke: "industry", y2: "y2" }),
      Plot.scatter(data, { x: "year", y: "incidents", color: "industry", size: "incidents" })
    ]
  })
```

### Interactive Features

- **Hover Tooltips:** Hover over data points to see detailed information about the industry, year, number of incidents, and regulations.
- **Color Coding:** Different colors represent various industries, making it easy to distinguish between them.
- **Dual Axes:** The left Y-axis displays the number of ethical incidents, while the right Y-axis shows the number of safety regulations.

## References

### Research Papers

1. **"Ethics and AI: The Importance of Regulation"**
   - *Journal of Ethical AI*, 2021.
   - [Link](https://example.com/ethics-ai-regulation)

2. **"Safety Regulations in the Modern Industry"**
   - *International Journal of Safety*, 2020.
   - [Link](https://example.com/safety-regulations)

3. **"The Impact of Regulatory Frameworks on Technological Innovation"**
   - *Tech and Society*, 2019.
   - [Link](https://example.com/regulatory-frameworks)

4. **"Case Studies in Ethics Failures and Regulatory Responses"**
   - *Ethics in Practice*, 2022.
   - [Link](https://example.com/case-studies-ethics)

5. **"Balancing Safety and Innovation: A Regulatory Perspective"**
   - *Regulatory Affairs Journal*, 2023.
   - [Link](https://example.com/balancing-safety-innovation)

### Blogs

- **"Navigating the Ethics of Emerging Technologies"**
  - *TechEthics Blog*
  - [Read More](https://example.com/navigating-ethics)

- **"How Safety Regulations Shape Modern Industries"**
  - *Industry Insights*
  - [Read More](https://example.com/safety-regulations)

- **"The Future of Regulation in a Rapidly Changing World"**
  - *FutureTech Blog*
  - [Read More](https://example.com/future-of-regulation)

- **"Ethics, Safety, and the Role of Governments"**
  - *Public Policy Today*
  - [Read More](https://example.com/government-role-ethics)

---

Feel free to explore the visualization and delve into the references to gain a deeper understanding of the complex interplay between ethics, safety, and regulation in today's world.

saposlky --- david goggins
