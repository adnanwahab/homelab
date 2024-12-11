---
  title: stixels-voxels-minecraft
---
# Diffusion 3d policy

<iframe src="https://nbviewer.org/github/adnanwahab/homelab/blob/main/notebooks/perception/diffusion-3d-policy.ipynb"></iframe>


camera - turn it into point clouds

# how are point clouds related to voxels
server side voxel rendering webgpu

# References
1. https://3d-diffusion-policy.github.io/ 
30,000 arm - 



```js

let canvasContainer = document.createElement('canvas');
document.body.appendChild(canvasContainer);

let NOTCH = () => {
  const canvas = canvasContainer
  var ctx;
  var pixels;

  var w = 212 * 4;
  var h = 120 * 4;

  var map = new Array(64 * 64 * 64);
  var texmap = new Array(16 * 16 * 3 * 16);

  function init() {
    for (var i = 1; i < 16; i++) {
      var br = 255 - ((Math.random() * 96) | 0);
      for (var y = 0; y < 16 * 3; y++) {
        for (var x = 0; x < 16; x++) {
          var color = 0x966c4a;
          if (i == 4) color = 0x7f7f7f;
          if (i != 4 || ((Math.random() * 3) | 0) == 0) {
            br = 255 - ((Math.random() * 96) | 0);
          }
          if (i == 1 && y < (((x * x * 3 + x * 81) >> 2) & 3) + 18) {
            color = 0x6aaa40;
          } else if (i == 1 && y < (((x * x * 3 + x * 81) >> 2) & 3) + 19) {
            br = (br * 2) / 3;
          }
          if (i == 7) {
            color = 0x675231;
            if (x > 0 && x < 15 && ((y > 0 && y < 15) || (y > 32 && y < 47))) {
              color = 0xbc9862;
              var xd = x - 7;
              var yd = (y & 15) - 7;
              if (xd < 0) xd = 1 - xd;
              if (yd < 0) yd = 1 - yd;
              if (yd > xd) xd = yd;

              br = 196 - ((Math.random() * 32) | 0) + (xd % 3) * 32;
            } else if (((Math.random() * 2) | 0) == 0) {
              br = (br * (150 - (x & 1) * 100)) / 100;
            }
          }

          if (i == 5) {
            color = 0xb53a15;
            if ((x + (y >> 2) * 4) % 8 == 0 || y % 4 == 0) {
              color = 0xbcafa5;
            }
          }
          if (i == 9) {
            color = 0x4040ff;
          }
          var brr = br;
          if (y >= 32) brr /= 2;

          if (i == 8) {
            color = 0x50d937;
            if (((Math.random() * 2) | 0) == 0) {
              color = 0;
              brr = 255;
            }
          }

          var col =
            (((((color >> 16) & 0xff) * brr) / 255) << 16) |
            (((((color >> 8) & 0xff) * brr) / 255) << 8) |
            (((color & 0xff) * brr) / 255);
          texmap[x + y * 16 + i * 256 * 3] = col;
        }
      }
    }

    ctx = canvas.getContext("2d");

    for (var x = 0; x < 64; x++) {
      for (var y = 0; y < 64; y++) {
        for (var z = 0; z < 64; z++) {
          var i = (z << 12) | (y << 6) | x;
          var yd = (y - 32.5) * 0.4;
          var zd = (z - 32.5) * 0.4;
          map[i] = (Math.random() * 16) | 0;
          if (Math.random() > Math.sqrt(Math.sqrt(yd * yd + zd * zd)) - 0.8)
            map[i] = 0;
        }
      }
    }

    pixels = ctx.createImageData(w, h);

    for (var i = 0; i < w * h; i++) {
      pixels.data[i * 4 + 3] = 255;
    }

    setInterval(clock, 100);
    clock();
  }

  function clock() {
    renderMinecraft();
    ctx.putImageData(pixels, 0, 0);
  }

  var f = 0;
  function renderMinecraft() {
    var xRot =
      Math.sin(((Date.now() % 10000) / 10000) * Math.PI * 2) * 0.4 +
      Math.PI / 2;
    var yRot = Math.cos(((Date.now() % 10000) / 10000) * Math.PI * 2) * 0.4;
    var yCos = Math.cos(yRot);
    var ySin = Math.sin(yRot);
    var xCos = Math.cos(xRot);
    var xSin = Math.sin(xRot);

    var ox = 32.5 + ((Date.now() % 10000) / 10000) * 64;
    var oy = 32.5;
    var oz = 32.5;

    f++;
    for (var x = 0; x < w; x++) {
      var ___xd = (x - w / 2) / h;
      for (var y = 0; y < h; y++) {
        var __yd = (y - h / 2) / h;
        var __zd = 1;

        var ___zd = __zd * yCos + __yd * ySin;
        var _yd = __yd * yCos - __zd * ySin;

        var _xd = ___xd * xCos + ___zd * xSin;
        var _zd = ___zd * xCos - ___xd * xSin;

        var col = 0;
        var br = 255;
        var ddist = 0;

        var closest = 32;
        for (var d = 0; d < 3; d++) {
          var dimLength = _xd;
          if (d == 1) dimLength = _yd;
          if (d == 2) dimLength = _zd;

          var ll = 1 / (dimLength < 0 ? -dimLength : dimLength);
          var xd = _xd * ll;
          var yd = _yd * ll;
          var zd = _zd * ll;

          var initial = ox - (ox | 0);
          if (d == 1) initial = oy - (oy | 0);
          if (d == 2) initial = oz - (oz | 0);
          if (dimLength > 0) initial = 1 - initial;

          var dist = ll * initial;

          var xp = ox + xd * initial;
          var yp = oy + yd * initial;
          var zp = oz + zd * initial;

          if (dimLength < 0) {
            if (d == 0) xp--;
            if (d == 1) yp--;
            if (d == 2) zp--;
          }

          while (dist < closest) {
            var tex = map[((zp & 63) << 12) | ((yp & 63) << 6) | (xp & 63)];

            if (tex > 0) {
              var u = ((xp + zp) * 16) & 15;
              var v = ((yp * 16) & 15) + 16;
              if (d == 1) {
                u = (xp * 16) & 15;
                v = (zp * 16) & 15;
                if (yd < 0) v += 32;
              }

              var cc = texmap[u + v * 16 + tex * 256 * 3];
              if (cc > 0) {
                col = cc;
                ddist = 255 - (((dist / 32) * 255) | 0);
                br = (255 * (255 - ((d + 2) % 3) * 50)) / 255;
                closest = dist;
              }
            }
            xp += xd;
            yp += yd;
            zp += zd;
            dist += ll;
          }
        }

        var r = (((col >> 16) & 0xff) * br * ddist) / (255 * 255);
        var g = (((col >> 8) & 0xff) * br * ddist) / (255 * 255);
        var b = ((col & 0xff) * br * ddist) / (255 * 255); // + (255 -

        pixels.data[(x + y * w) * 4 + 0] = r;
        pixels.data[(x + y * w) * 4 + 1] = g;
        pixels.data[(x + y * w) * 4 + 2] = b;
      }
    }
  }

  init();
  return 10;
}
NOTCH();

```



<!-- 

An **Observable Framework Demo** illustrating the concepts of Perception, Localization, and Simultaneous Localization and Mapping (SLAM). This interactive visualization demonstrates how a robot perceives its environment, localizes itself within a map, and incrementally builds a map of unknown environments.

## Table of Contents
- [Introduction](#introduction)
- [Interactive Visualization](#interactive-visualization)
  - [3D Environment with Three.js](#3d-environment-with-threejs)
  - [Sensor Data Visualization with D3.js](#sensor-data-visualization-with-d3js)
- [References](#references)

## Introduction

Simultaneous Localization and Mapping (SLAM) is a critical capability for autonomous robots, enabling them to navigate unknown environments by building a map while keeping track of their own location within that map. The process involves two main components:

- **Perception**: Sensing and interpreting the environment using various sensors (e.g., LiDAR, cameras).
- **Localization**: Determining the robot's position and orientation within the map.

This demo provides interactive visualizations to explore these concepts using **Three.js** for 3D rendering and **D3.js** for data-driven charts.

## Interactive Visualization

### 3D Environment with Three.js

The following visualization demonstrates a robot navigating a 3D environment while building a map of obstacles.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SLAM Visualization</title>
  <style>
    body { margin: 0; }
    canvas { display: block; }
  </style>
</head>
<body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script>
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10).normalize();
    scene.add(light);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);

    // Robot representation
    const robotGeometry = new THREE.BoxGeometry(1, 0.5, 1);
    const robotMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});
    const robot = new THREE.Mesh(robotGeometry, robotMaterial);
    scene.add(robot);

    // Map (obstacles)
    const obstacles = [];
    const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
    const obstacleMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    for (let i = 0; i < 20; i++) {
      const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
      obstacle.position.set(
        (Math.random() - 0.5) * 20,
        0.5,
        (Math.random() - 0.5) * 20
      );
      scene.add(obstacle);
      obstacles.push(obstacle);
    }

    // Robot movement parameters
    let angle = 0;
    const radius = 8;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Move robot in a circle
      angle += 0.01;
      robot.position.set(
        radius * Math.cos(angle),
        0.25,
        radius * Math.sin(angle)
      );
      robot.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  </script>
</body>
</html>
```

**Explanation:**

- **Scene Setup**: Initializes a Three.js scene with a grid helper to represent the ground.
- **Robot Representation**: A green box represents the robot, which moves in a circular path.
- **Obstacles**: Red boxes are randomly placed to simulate obstacles in the environment.
- **Animation Loop**: Continuously updates the robot's position and orientation to simulate movement.

You can view this visualization by saving the above HTML code and opening it in a web browser.

### Sensor Data Visualization with D3.js

The following visualization illustrates sensor data (e.g., LiDAR scans) as the robot navigates the environment.

```html
<!DOCTYPE html>
<meta charset="utf-8">
<style>
  body { font: 12px Arial;}
  .axis path,
  .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }
</style>
<body>
  <svg width="800" height="300"></svg>
  <script src="https://d3js.org/d3.v6.min.js"></script>
  <script>
    const svg = d3.select("svg"),
          width = +svg.attr("width"),
          height = +svg.attr("height"),
          margin = {top: 20, right: 30, bottom: 30, left: 40};

    const x = d3.scaleLinear()
                .domain([0, 360])
                .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
                .domain([0, 10])
                .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(12).tickFormat(d => d + "°"));

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    const line = d3.line()
                   .x(d => x(d.angle))
                   .y(d => y(d.distance));

    // Simulate sensor data
    let sensorData = [];
    for (let angle = 0; angle <= 360; angle += 5) {
      sensorData.push({angle: angle, distance: Math.random() * 10});
    }

    svg.append("path")
       .datum(sensorData)
       .attr("fill", "none")
       .attr("stroke", "steelblue")
       .attr("stroke-width", 1.5)
       .attr("d", line);

    // Update sensor data periodically
    setInterval(() => {
      sensorData = sensorData.map(d => ({
        angle: d.angle,
        distance: Math.max(0, Math.min(10, d.distance + (Math.random() - 0.5)))
      }));
      svg.select("path")
         .datum(sensorData)
         .attr("d", line);
    }, 500);
  </script>
</body>
```

**Explanation:**

- **SVG Setup**: Creates an SVG canvas with axes representing angle (0° to 360°) and distance (0 to 10 units).
- **Sensor Data Simulation**: Generates random distance measurements for each angle to mimic LiDAR scans.
- **Dynamic Updates**: Periodically updates the sensor data to simulate real-time changes as the robot moves.

You can view this visualization by saving the above HTML code and opening it in a web browser.

## References

### Research Papers
1. **"A Survey of Simultaneous Localization and Mapping"**  
   *Huang, C., & Dissanayake, G.*  
   IEEE Transactions on Robotics, 2016.  
   [Link](https://ieeexplore.ieee.org/document/7351850)

2. **"ORB-SLAM: a Versatile and Accurate Monocular SLAM System"**  
   *Mur-Artal, R., Montiel, J.M.M., & Tardós, J.D.*  
   IEEE Transactions on Robotics, 2015.  
   [Link](https://ieeexplore.ieee.org/document/7351850)

3. **"Probabilistic Robotics"**  
   *Sebastian Thrun, Wolfram Burgard, and Dieter Fox*  
   MIT Press, 2005.  
   [Link](http://www.probabilistic-robotics.org/)

4. **"FastSLAM: A Factored Solution to the Simultaneous Localization and Mapping Problem"**  
   *Montemerlo, M., Thrun, S., Koller, D., & Wegbreit, B.*  
   In *Proceedings of the AAAI Conference on Artificial Intelligence*, 2002.  
   [Link](https://www.aaai.org/Papers/AAAI/2002/AAAI02-140.pdf)

5. **"Graph-Based SLAM"**  
   *Grisetti, G., Stachniss, C., & Burgard, W.*  
   Foundations and Trends® in Robotics, 2010.  
   [Link](https://www.nowpublishers.com/article/Details/ROB-015)

### Blogs
1. **"Understanding SLAM: How Robots Map Their World"**  
   *Robot Operating System (ROS) Blog*  
   [Read More](https://www.robotics.org/blog-article.cfm/Understanding-SLAM--How-Robots-Map-Their-World/188)

2. **"A Gentle Introduction to SLAM"**  
   *Towards Data Science*  
   [Read More](https://towardsdatascience.com/a-gentle-introduction-to-slam-f2ab8c3d4970)

3. **"Visual SLAM: An Overview"**  
   *OpenCV Blog*  
   [Read More](https://opencv.org/visual-slam-an-overview/)

4. **"The Fundamentals of SLAM: Understanding the Basics"**  
   *Medium Robotics Collection*  
   [Read More](https://medium.com/robotics-collection/the-fundamentals-of-slam-understanding-the-basics-8a4fdaa6f5a)

5. **"Implementing SLAM Algorithms: A Beginner's Guide"**  
   *Towards AI*  
   [Read More](https://towardsai.net/p/slam-algorithms-beginners-guide) -->
