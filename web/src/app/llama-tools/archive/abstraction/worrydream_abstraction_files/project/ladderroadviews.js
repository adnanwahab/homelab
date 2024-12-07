//
//  LadderRoadViews.js
//  LadderOfAbstraction
//
//  Created by Bret Victor on 8/21/11.
//  (c) 2011 Bret Victor.  MIT open-source license.
//
//  Classes:
//    LadderCar
//    LadderRoad
//    LadderSensors
//    LadderSweptArcTrajectories
//    LadderAnimator


(function(){


//====================================================================================
//
//  globals

var gLadderRoadMetrics = this.gLadderRoadMetrics = {
    width: 400,
    height: 110,
    topMargin: 20,
    bottomMargin:20,
    roadWidth: 30
};

var gLadderRoadStyles = this.gLadderRoadStyles = {
    roadColor: "#646464",
    roadColorSweep: "#ddd",
    roadLineColor: "#ffff00",
    roadLineColorSweep: "#fff",
    roadLineWidth: 2,
    trajectoryColor: "#f00",
    trajectoryWidth: 2,
    sweepColor: "rgba(0,0,255,0.12)",
    sweepArcColor: "rgba(0,0,255,0.18)",
    sweepWidth: 1
};



//====================================================================================
//
//  LadderCar

var LadderCar = new Class({

    Extends: BVLayer,

    initialize: function (superlayer, isMarker) {
        this.parent(superlayer);
        this.isMarker = isMarker;
        this.bounceOffset = 0;
        
        if (isMarker) {
            this.image = new BVLayer(this);
            this.image.setContentsURLAndSize("Images/UnbentMarker.png", 18, 18);
        }
        else {
            this.shadow = new BVLayer(this);
            this.shadow.setContentsURLAndSize("Images/CarShadow.png", 42, 25);
            this.shadow.element.setStyle(BVLayer.addPrefixToStyleName("TransformOrigin"), "50% 50%");
            this.shadow.setPosition(-0.5 * this.shadow.width, 0.5 * this.shadow.height - 2);
                
            this.image = new BVLayer(this);
            this.image.setContentsURLAndSize("Images/Car.png", 32, 16);
            this.image.element.setStyle(BVLayer.addPrefixToStyleName("TransformOrigin"), "50% 50%");
        }

        this.setBounceOffset(0);
    },
    
    setBounceOffset: function (offset) {
        this.image.setPosition(-0.5 * this.image.width, 0.5 * this.image.height + offset);
    },
    
    setRotation: function (angle) {
        if (this.isMarker) { return; }
        this.shadow.setRotation(angle);
        this.image.setRotation(angle);
    },
    
    bounce: function () {
        if (!this.bounceTimer) { this.bounceTimer = this.incrementBounce.bind(this).periodical(20); }
        this.bounceProgress = 0;
    },
    
    incrementBounce: function () {
        this.bounceProgress = (this.bounceProgress + 0.04).limit(0,1);
        var p = this.bounceProgress;

        var bounceOffset = (p < 0.5) ? (15 * (1 - Math.pow(4*p - 1, 2))) : (4 * (1 - Math.pow(4*(p - 0.5) - 1, 2)));
        this.setBounceOffset(bounceOffset);
        
        if (this.bounceProgress === 1) {
            clearInterval(this.bounceTimer);
            delete this.bounceTimer;
        }
    }
});


    
//====================================================================================
//
//  LadderRoad

Tangle.classes.LadderRoad = new Class({

    Extends: BVScrubbableLayer,

    initialize: function (hostElement, options, tangle) {
        this.parent(null);
        $(hostElement).grab(this.element);
        this.element.setStyle("position", "relative");
    
        this.options = options;
        this.tangle = tangle;
        
        this.metrics = gLadderRoadMetrics;
        this.styles = gLadderRoadStyles;
        this.setSize(this.metrics.width, this.metrics.height);
        
        if (this.options.unbend) {
            this.addUnbendLabels();
        }
        
        this.addCanvas();
        
        if (this.options.showcar) {
            this.car = new LadderCar(this, !!this.options.unbend);
        }
        
        if (this.options.scrubtrajectory){
            this.touchRegion = new BVTouchRegion(this);
            this.touchRegion.setSize(this.getSize());
            this.touchRegion.setHoverable(true);
        }
    },
    

    //----------------------------------------------------------
    //
    // update
    
    update: function (element, sweptVariable, arcDegrees, turningDegrees, timeIndex) {
        if (this.options.sweeponly) {
            this.setHidden(this.options.sweeponly !== sweptVariable);
            if (this.hidden) { return; }
        }
    
        if (this.options.sweep) {
            this.updateSweep(arcDegrees, turningDegrees, timeIndex);
        }
        else {
            this.updateSimulation(arcDegrees, turningDegrees, timeIndex);
        }
    },
    
    updateSimulation: function (arcDegrees,turningDegrees,timeIndex) {
        if (!this.simulation || this.simulation.arcDegrees !== arcDegrees || this.simulation.turningDegrees !== turningDegrees) {
            this.simulation = LadderSimulationCreate(this.metrics, arcDegrees, turningDegrees);

            this.clearCanvas();
            this.drawRoadWithSimulation(this.simulation);
            this.drawTrajectoryWithSimulation(this.simulation);
        }

        this.updateCarWithSimulationAtTime(this.simulation, timeIndex);
    },
    
    updateSweep: function (arcDegrees,turningDegrees,timeIndex) {
        var shouldRedrawSweep = false;
        var shouldRedrawTrajectory = false;
        
        if (this.options.unbend) {
            if (!this.sweep || this.sweep.turningDegrees !== turningDegrees) {
                this.sweep = LadderSimulationArcSweepCreate(this.metrics, turningDegrees, 4, 60, 2);
                shouldRedrawSweep = true;
            }
        }
        else {
            if (!this.sweep || this.sweep.arcDegrees !== arcDegrees) {
                this.sweep = LadderSimulationTurningSweepCreate(this.metrics, arcDegrees, 0, 10, 0.125);
                shouldRedrawSweep = true;
            }
        }
        
        if (this.options.showtrajectory) {
            if (!this.simulation || this.simulation.arcDegrees !== arcDegrees || this.simulation.turningDegrees !== turningDegrees) {
                this.simulation = LadderSimulationCreate(this.metrics, arcDegrees, turningDegrees);
                shouldRedrawTrajectory = true;
            }
            this.updateCarWithSimulationAtTime(this.simulation, timeIndex);
        }
        
        if (shouldRedrawSweep) {
            this.clearCanvas();
            this.drawRoadWithSimulation(this.sweep.getSimulations()[0]);
        
            this.sweep.getSimulations().each( function (simulation) {
                this.drawTrajectoryWithSimulation(simulation, true);
            }, this);
        }
        
        if (shouldRedrawTrajectory) {
            if (this.trajectoryCanvas) { this.clearCanvas(this.trajectoryCanvas); }
            this.drawTrajectoryWithSimulation(this.simulation, false);
        }
    },


    //----------------------------------------------------------
    //
    // canvas
    
    addCanvas: function () {
        this.canvasTopMargin = 30;
        this.canvasBottomMargin = 60;
        this.canvasWidth = this.width;
        this.canvasHeight = this.height + this.canvasTopMargin + this.canvasBottomMargin;
    
        this.canvas = (new Element("canvas", { width:this.canvasWidth, height:this.canvasHeight })).inject(this.element);
        this.canvas.setStyles({ position:"absolute", left:0, top:-this.canvasTopMargin });
        this.canvas.getContext("2d").translate(0,this.canvasTopMargin);

        if (this.options.sweep && this.options.showtrajectory) {
            this.trajectoryCanvas = (new Element("canvas", { width:this.canvasWidth, height:this.canvasHeight })).inject(this.element);
            this.trajectoryCanvas.setStyles({ position:"absolute", left:0, top:-this.canvasTopMargin });
            this.trajectoryCanvas.getContext("2d").translate(0,this.canvasTopMargin);
        }
    },
    
    clearCanvas: function (canvas) {
        var ctx = (canvas || this.canvas).getContext("2d");
        ctx.clearRect(0,-this.canvasTopMargin,this.canvasWidth,this.canvasHeight);
    },
    

    //----------------------------------------------------------
    //
    // road
    
    drawRoadWithSimulation: function (simulation) {
        if (this.options.unbend) { 
            return this.drawRoadUnbentWithSimulation(simulation); 
        }
    
        var ctx = this.canvas.getContext("2d");
        ctx.lineCap = "butt";

        ctx.strokeStyle = this.options.sweep ? this.styles.roadColorSweep : this.styles.roadColor;
        ctx.lineWidth = this.metrics.roadWidth;
        ctx.beginPath();
        simulation.addRoadPathToContext(ctx);
        ctx.stroke();

        ctx.strokeStyle = this.options.sweep ? this.styles.roadLineColorSweep : this.styles.roadLineColor;
        ctx.lineWidth = this.styles.roadLineWidth;
        ctx.beginPath();
        simulation.addRoadPathToContext(ctx);
        ctx.stroke();
    },
    
    drawRoadUnbentWithSimulation: function (simulation) {
        var ctx = this.canvas.getContext("2d");
        ctx.lineCap = "butt";
        
        var roadTopY = 0.5 * (this.height - this.metrics.roadWidth);
        var leftX = simulation.leftX;

        ctx.fillStyle = "#ddd";
        ctx.fillRect(0, roadTopY, leftX, this.metrics.roadWidth);

        ctx.fillStyle = this.createHorizontalGradient(ctx, leftX, 0.25*this.width, "#bbb", "#eee");
        ctx.fillRect(leftX, roadTopY, 0.25*this.width, this.metrics.roadWidth);

        ctx.fillStyle = this.createHorizontalGradient(ctx, leftX + 0.25*this.width, 0.25*this.width, "#eee", "#bbb");
        ctx.fillRect(leftX + 0.25*this.width, roadTopY, 0.25*this.width, this.metrics.roadWidth);

        ctx.fillStyle = "#ddd";
        ctx.fillRect(leftX + 0.5*this.width, roadTopY, 0.5*this.width - leftX, this.metrics.roadWidth);

        ctx.strokeStyle = this.styles.roadLineColorSweep;
        ctx.lineWidth = this.styles.roadLineWidth;
        ctx.beginPath();
        ctx.moveTo(0, 0.5*this.height);
        ctx.lineTo(this.width, 0.5*this.height);
        ctx.stroke();
    },
    
    createHorizontalGradient: function (ctx, x, width, fromColor, toColor) {
        var gradient = ctx.createLinearGradient(x, 0, x + width, 0);
        gradient.addColorStop(0, fromColor);
        gradient.addColorStop(1, toColor);
        return gradient;
    },

    //----------------------------------------------------------
    //
    // trajectory

    drawTrajectoryWithSimulation: function (simulation, isSweep) {
        if (!isSweep && !this.options.showtrajectory) { return; }
        
        var canvas = (!isSweep && this.trajectoryCanvas) || this.canvas;
        var ctx = canvas.getContext("2d");
        
        if (isSweep) {
            ctx.lineWidth = this.styles.sweepWidth;
            ctx.strokeStyle = this.options.unbend ? this.styles.sweepArcColor : this.styles.sweepColor;
        }
        else {
            ctx.lineWidth = this.styles.trajectoryWidth;
            ctx.strokeStyle = this.styles.trajectoryColor;
        }
        
        if (this.options.unbend) {
            simulation.addOffsetTrajectoryPathToContext(ctx);
        }
        else {
            simulation.addTrajectoryPathToContext(ctx);
        }
        
        ctx.stroke();
    },

    //----------------------------------------------------------
    //
    // car
    
    updateCarWithSimulationAtTime: function (simulation, timeIndex) {
        if (!this.options.showcar) { return; }
        
        var states = this.options.unbend ? simulation.getStatesWithProgress() : simulation.getStates();
        var stateIndex = Math.min(timeIndex, states.length - 1);
        var state = states[stateIndex];
        
        var x = !this.options.unbend ? state.x : state.progress;
        var y = !this.options.unbend ? state.y : state.offset + 0.5 * this.height;

        this.car.setPosition(x,-y);
        this.car.setRotation(-state.angle);
    },
    
    //----------------------------------------------------------
    //
    // labels

    addUnbendLabels: function () {
        this.addLabelWithString("|<br>bend<br>begins", 20);  // todo, should use values from simulation
        this.addLabelWithString("|<br>bend<br>peaks", 20 + 0.25 * this.width);
        this.addLabelWithString("|<br>bend<br>ends", 20 + 0.5 * this.width);
    },
    
    addLabelWithString: function (string, x) {
        var label = new BVText(this);
        label.setSize(50,30);
        label.setTextClass("LadderSweptArcUnbendedLabel"); // todo
        label.setHTML(string);
        label.setPosition(x - 0.5 * label.width, -0.5 * this.height - 0.5 * this.metrics.roadWidth);
        return label;
    },

    //----------------------------------------------------------
    //
    // scrub trajectory
    
    getStateNearPoint: function (x,y,threshold) {
        if (!this.simulation) { return null; }
        var states = this.simulation.getStates();
        
        var stateCount = states.length;
        var closestState = null;
        var closestDistance = threshold || 32;

        for (var i = 0; i < stateCount; i++) {
            var state = states[i];
            var stateX = !this.options.unbend ? state.x : state.progress;
            var stateY = !this.options.unbend ? state.y : state.offset + 0.5 * this.height;
            var distance = hypot(x - stateX, y - stateY);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestState = state;
            }
        }
        
        return closestState;
    },
    
    cursorMovedToPoint: function (x,y,isDown) {
        var state = this.getStateNearPoint(x,y);
        if (!state) {
            this.cursorExited();
        }
        else {
            this.tangle.setValue("timeIndex", state.index);
            if (isDown) { this.tangle.setValue("lockedTimeIndex", state.index); }
        }
    },
    
    cursorExited: function () {
        this.tangle.setValue("timeIndex", this.tangle.getValue("lockedTimeIndex"));
    },
    
    cursorWasTapped: function () {
        this.tangle.setValue("lockedTimeIndex", this.tangle.getValue("timeIndex"));
        if (this.car) { this.car.bounce(); }

        var slider = this.tangle.slidersByVariable && this.tangle.slidersByVariable.timeIndex;
        if (slider) { slider.bounce(); }
    }
    
});



//====================================================================================
//
//  LadderSensors

Tangle.classes.LadderSensors = new Class({

    Extends: BVLayer,

    initialize: function (hostElement, options, tangle) {
        this.parent(null);
        $(hostElement).grab(this.element);
        this.element.setStyle("position", "relative");
    
        this.options = options;
        this.tangle = tangle;
        
        this.metrics = gLadderRoadMetrics;
        this.setSize(this.metrics.width, this.metrics.height);

        this.canvas = (new Element("canvas", { width:this.width, height:this.height })).inject(this.element);
        this.canvas.setStyles({ position:"absolute", left:0, top:0 });

        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,0,this.width,this.height);
        
        this.addRoadSegmentAtXWithCarOffset(0, 4, "on the road", "go straight", 0);
        this.addRoadSegmentAtXWithCarOffset(100, -18, "left of road", "veer right", 1);
        this.addRoadSegmentAtXWithCarOffset(200, 17, "right of road", "veer left", -1);
    },
    
    addRoadSegmentAtXWithCarOffset: function (roadX, carOffset, string1, string2, veerSign) {
        var roadY = this.height/2;
    
        var ctx = this.canvas.getContext("2d");
        ctx.lineCap = "butt";

        ctx.strokeStyle = gLadderRoadStyles.roadColor;
        ctx.lineWidth = this.metrics.roadWidth;
        ctx.beginPath();
        ctx.moveTo(roadX, roadY);
        ctx.lineTo(roadX + 80, roadY);
        ctx.stroke();

        ctx.strokeStyle = gLadderRoadStyles.roadLineColor;
        ctx.lineWidth = gLadderRoadStyles.roadLineWidth;
        ctx.beginPath();
        ctx.moveTo(roadX, roadY);
        ctx.lineTo(roadX + 80, roadY);
        ctx.stroke();
        
        if (this.options.showresponse) {
            ctx.save();

            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            ctx.strokeStyle = "#000000";

            ctx.translate(roadX + 50, roadY + carOffset + 0.5);

            var endY = 10 * veerSign;
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.bezierCurveTo(4,0,10,0,15,endY); 
            ctx.stroke();

            ctx.translate(15, endY);
            ctx.rotate(veerSign * Math.PI * 0.32);
            ctx.beginPath();
            ctx.moveTo(-5, -4);
            ctx.lineTo(0,0);
            ctx.lineTo(-5,4);
            ctx.stroke();

            ctx.restore();
        }
        
        var car = new LadderCar(this);
        car.setPosition(roadX + 30, -roadY - carOffset);
        
        var label = new BVText(this);
        label.setSize(80,14);
        label.setPosition(roadX, -roadY + this.metrics.roadWidth/2 + 24);
        label.setTextClass("LadderSensorsLabel");
        label.setHTML(this.options.showresponse ? string2 : string1);
    }
    
});


//====================================================================================
//
//  LadderSweptArcTrajectories

Tangle.classes.LadderSweptArcTrajectories = new Class({

    Extends: BVLayer,

    initialize: function (hostElement, options, tangle) {
        this.parent(null);
        $(hostElement).grab(this.element);
        this.element.setStyle("position", "relative");
    
        this.options = options;
        this.tangle = tangle;
        
        this.metrics = gLadderRoadMetrics;
        this.setSize(this.metrics.width, this.metrics.height);
        
        this.addCanvas();
    },

    addCanvas: function () {
        this.canvasTopMargin = 30;
        this.canvasBottomMargin = 60;
        this.canvasWidth = this.width;
        this.canvasHeight = this.height + this.canvasTopMargin + this.canvasBottomMargin;
    
        this.canvas = (new Element("canvas", { width:this.canvasWidth, height:this.canvasHeight })).inject(this.element);
        this.canvas.setStyles({ position:"absolute", left:0, top:-this.canvasTopMargin });
        this.canvas.getContext("2d").translate(0,this.canvasTopMargin);
    },
    
    clearCanvas: function () {
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,-this.canvasTopMargin,this.canvasWidth,this.canvasHeight);
    },
    
    update: function (element, turningDegrees) {
        this.sweep = LadderSimulationArcSweepCreate(this.metrics, turningDegrees, 4, 60, 2);
        
        this.clearCanvas();

        this.sweep.getSimulations().each( function (simulation) {
            this.drawRoadWithSimulation(simulation);
        }, this);

        this.sweep.getSimulations().each( function (simulation) {
            this.drawRoadCenterLineWithSimulation(simulation);
        }, this);

        this.sweep.getSimulations().each( function (simulation) {
            this.drawTrajectoryWithSimulation(simulation);
        }, this);
    },

    drawRoadWithSimulation: function (simulation) {
        var ctx = this.canvas.getContext("2d");
        ctx.lineCap = "butt";

        ctx.strokeStyle = "rgba(0,0,0,0.01)";
        ctx.lineWidth = this.metrics.roadWidth;
        ctx.beginPath();
        simulation.addRoadPathToContext(ctx);
        ctx.stroke();
    },

    drawRoadCenterLineWithSimulation: function (simulation) {
        var ctx = this.canvas.getContext("2d");
        ctx.strokeStyle = "rgba(255,255,0,0.1)";
        ctx.lineWidth = gLadderRoadStyles.roadLineWidth;
        ctx.beginPath();
        simulation.addRoadPathToContext(ctx);
        ctx.stroke();
    },

    drawTrajectoryWithSimulation: function (simulation, isSweep) {
        var ctx = this.canvas.getContext("2d");
        ctx.lineWidth = gLadderRoadStyles.sweepWidth;
        ctx.strokeStyle = gLadderRoadStyles.sweepArcColor;
        simulation.addTrajectoryPathToContext(ctx);
        ctx.stroke();
    }

});




//====================================================================================
//
//  LadderSweptArcMatrix

Tangle.classes.LadderSweptArcMatrix = new Class({

    Extends: BVLayer,

    initialize: function (hostElement, options, tangle) {
        this.parent(null);
        $(hostElement).grab(this.element);
        this.element.setStyle("position", "relative");
    
        this.options = options;
        this.tangle = tangle;
        
        this.metrics = gLadderRoadMetrics;
        this.setSize(this.metrics.width + 20, this.metrics.height + 20);

        this.canvas = (new Element("canvas", { width:this.width, height:this.height })).inject(this.element);
        this.canvas.setStyles({ position:"absolute", left:0, top:0 });
    },

    update: function (element, turningDegrees) {
        this.sweep = LadderSimulationArcSweepCreate(this.metrics, turningDegrees, 10, 74, 4);

        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,0,this.width,this.height);

        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;
        ctx.strokeRect(0.5, 4 + 0.5, this.width - 1, this.height - 10);
                      
        this.sweep.getSimulations().each( function (simulation, i) {
            this.drawSimulation(simulation, i);
        }, this);
    },

    drawSimulation: function (simulation, index) {
        if (index > 15) { return; }
    
        var ctx = this.canvas.getContext("2d");
        ctx.save();
        
        var scale = 1/4;
        var xPadding = 4;
        var yPadding = 4;
        
        ctx.translate(xPadding + Math.round((index % 4) * (this.metrics.width * scale + xPadding)),
                      yPadding + Math.round(Math.floor(index / 4) * this.metrics.height * scale + yPadding));
        
        ctx.scale(scale, scale);
        
        ctx.beginPath();
        ctx.rect(0,0,this.metrics.width,this.metrics.height);
        ctx.clip();
        
        ctx.lineCap = "butt";

        ctx.strokeStyle = "#aaa";
        ctx.lineWidth = this.metrics.roadWidth;
        ctx.beginPath();
        simulation.addRoadPathToContext(ctx);
        ctx.stroke();

        ctx.strokeStyle = gLadderRoadStyles.roadLineColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        simulation.addRoadPathToContext(ctx);
        ctx.stroke();

        ctx.lineWidth = 6;
        ctx.strokeStyle = gLadderRoadStyles.trajectoryColor;
        simulation.addTrajectoryPathToContext(ctx);
        ctx.stroke();
        
        ctx.restore();
    }

});



//====================================================================================
//
//  LadderRandomRoads

Tangle.classes.LadderRandomRoads = new Class({

    Extends: BVLayer,

    initialize: function (hostElement, options, tangle) {
        this.parent(null);
        $(hostElement).grab(this.element);
        this.element.setStyle("position", "relative");
    
        this.options = options;
        this.tangle = tangle;
        
        this.metrics = gLadderRoadMetrics;
        this.setSize(this.metrics.width, this.metrics.height);

        this.canvas = (new Element("canvas", { width:this.width, height:this.height+10 })).inject(this.element);
        this.canvas.setStyles({ position:"absolute", left:0, top:0 });

        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,0,this.width,this.height);
        
        this.drawRoadSegmentWithIndex(0);
        this.drawRoadSegmentWithIndex(1);
        this.drawRoadSegmentWithIndex(2);
        this.drawRoadSegmentWithIndex(3);
    },
    
    addPathWithIndex: function (index,w,h) {
        var ctx = this.canvas.getContext("2d");

        ctx.beginPath();
        
        if (index == 0) {
            ctx.moveTo(0,h);
            ctx.bezierCurveTo(w/4,0, w/4,0, w/2,h/2);
            ctx.bezierCurveTo(w*3/4,h, w*3/4,h, w,h/2);
        }
        else if (index == 1) {
            ctx.moveTo(0,h);
            ctx.bezierCurveTo(w/4,h, w/2,0, w/2,h*3/4);
            ctx.bezierCurveTo(w/2,h, w*3/4,h, w,0);
        }
        else if (index == 2) {
            ctx.moveTo(0,h);
            ctx.bezierCurveTo(w/4,h/4, 0,h/4, w/2,h/2);
            ctx.bezierCurveTo(w,h*3/4, w*2/4,h, w,h);
        }
        else if (index == 3) {
            ctx.moveTo(0,h/2);
            ctx.bezierCurveTo(w/2,h/4, w/2,h/4, w/2,h*3/4);
            ctx.bezierCurveTo(w/2,h*3/4, w/2,h*5/4, w,h*3/4);
        }
    },
    
    drawRoadSegmentWithIndex: function (index) {
        var ctx = this.canvas.getContext("2d");
        ctx.lineCap = "butt";
        
        ctx.save();
        ctx.translate((index % 2) ? this.width/2 : 10, (index >= 2) ? this.height*0.6 : 10);
        ctx.scale(0.43,0.43);

        ctx.strokeStyle = gLadderRoadStyles.roadColor;
        ctx.lineWidth = this.metrics.roadWidth;
        this.addPathWithIndex(index,this.width,this.height);
        ctx.stroke();

        ctx.strokeStyle = gLadderRoadStyles.roadLineColor;
        ctx.lineWidth = gLadderRoadStyles.roadLineWidth;
        this.addPathWithIndex(index,this.width,this.height);
        ctx.stroke();
        
        ctx.restore();
    }
    

});



//====================================================================================
//
//  LadderReflection

Tangle.classes.LadderReflection = new Class({

    Extends: BVLayer,

    initialize: function (hostElement, options, tangle) {
        this.parent(null);
        $(hostElement).grab(this.element);
        this.element.setStyle("position", "relative");
    
        this.options = options;
        this.tangle = tangle;
        
        this.styles = gLadderRoadStyles;
        this.metrics = gLadderRoadMetrics;
        this.setSize(this.metrics.width, this.metrics.height);

        this.canvas = (new Element("canvas", { width:this.width, height:this.height })).inject(this.element);
        this.canvas.setStyles({ position:"absolute", left:0, top:0 });

        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,0,this.width,this.height);
        
        this.roadY = this.metrics.roadWidth/2 + 8;
        this.drawRoadSegment();
        this.drawTrajectory();
        this.addLabels();
    },
    
    addRoadPath: function () {
        var ctx = this.canvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(0, this.roadY);
        ctx.lineTo(160, this.roadY);
    },
    
    drawRoadSegment: function () {
        var ctx = this.canvas.getContext("2d");
        ctx.lineCap = "butt";
        
        ctx.strokeStyle = this.styles.roadColor;
        ctx.lineWidth = this.metrics.roadWidth;
        this.addRoadPath();
        ctx.stroke();

        ctx.strokeStyle = this.styles.roadLineColor;
        ctx.lineWidth = this.styles.roadLineWidth;
        this.addRoadPath();
        ctx.stroke();
    },
    
    drawTrajectory: function () {
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "#ccc";
        
        var trajectoryTopY = this.roadY - this.metrics.roadWidth/2 + 4;
        var trajectoryBottomY = this.roadY + this.metrics.roadWidth/2-1;

        ctx.beginPath();
        ctx.moveTo(30, lerp(trajectoryTopY,trajectoryBottomY,30/80));
        ctx.lineTo(80, trajectoryBottomY);
        ctx.lineTo(30, trajectoryBottomY);
        ctx.arc(80, trajectoryBottomY, 50, Math.PI, Math.PI + 0.3, false);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(130, lerp(trajectoryTopY,trajectoryBottomY,30/80));
        ctx.lineTo(80, trajectoryBottomY);
        ctx.lineTo(130, trajectoryBottomY);
        ctx.arc(80, trajectoryBottomY, 50, 0, -0.3, true);
        ctx.fill();

        ctx.lineWidth = this.styles.trajectoryWidth;
        ctx.strokeStyle = this.styles.roadColor;

        ctx.beginPath();
        ctx.moveTo(0, trajectoryTopY + 1);
        ctx.lineTo(80, trajectoryBottomY + 2);
        ctx.lineTo(160, trajectoryTopY + 1);
        ctx.stroke();

        ctx.strokeStyle = this.styles.trajectoryColor;

        ctx.beginPath();
        ctx.moveTo(0, trajectoryTopY);
        ctx.lineTo(80, trajectoryBottomY + 1);
        ctx.lineTo(160, trajectoryTopY);
        ctx.stroke();
    },
    
    addLabels: function () {
        var label = new BVText(this);
        label.setSize(50,14);
        label.setPosition(25, -38);
        label.setTextClass("LadderReflectionLabel");
        label.setHTML("angle in");
        
        label = new BVText(this);
        label.setSize(50,14);
        label.setPosition(83, -38);
        label.setTextClass("LadderReflectionLabel");
        label.setHTML("angle out");
    }
    

});



//====================================================================================
//
//  LadderAnimator

Tangle.classes.LadderAnimator = new Class({

    Extends: BVLayer,

    initialize: function (hostElement, options, tangle, variable) {
        this.parent(null);
        $(hostElement).grab(this.element);
        this.element.setStyle("cursor", "pointer");
        
        this.tangle = tangle;
        this.variable = variable;

        this.setSize(400,90);
        this.setTouchable(true);
        
        this.whiteout = new BVLayer(this);
        this.whiteout.setBackgroundColor("rgba(255,255,255,0.9)");
        this.whiteout.setPosition(-30, 0);
        this.whiteout.setSize(this.width + 60, this.height + 10);
        
        this.icon = new BVLayer(this);
        this.icon.setContentsURLAndSize("Images/ClickToPlay" + (BVLayer.isTouch ? "Touch" : "") + ".png", 72, 54);
        this.icon.setPosition(0.5 * (this.width - this.icon.width), -0.5 * (this.height - this.icon.height));
    },
    
    update: function (element, value) {
    },
    
    setPlaying: function (playing) {
        if (playing && !this.timer) {
            this.timer = (function () {
                var timeIndex = this.tangle.getValue(this.variable) + 2;
                if (timeIndex > 500) { this.setPlaying(false); }
                else { this.tangle.setValue(this.variable, timeIndex); }
            }).periodical(20,this);
        }
        else if (!playing && this.timer) {
            clearInterval(this.timer);
            delete this.timer;
            this.fadeOut();
        }
    },
    
    fadeInAndPlay: function () {
        if (this.isFading) { return; }
        this.isFading = true;

        this.tangle.setValue(this.variable, 0);

        BVLayer.animate(500, function () {
            this.whiteout.setOpacity(0);
            this.icon.setOpacity(0);
        }, this);
        
        (function () {
            this.isFading = false;
            this.whiteout.setBackgroundColor("rgba(255,255,255,0.9)");
            this.setPlaying(true);
        }).delay(800, this);
    },
    
    fadeOut: function () {
        BVLayer.animate(800, function () {
            this.whiteout.setOpacity(1);
            this.icon.setOpacity(1);
        }, this);
    },
    
    touchDidGoDown: function (touches) {
        if (this.isFading || this.timer) { return; }
        this.fadeInAndPlay();
    }
    
});



//====================================================================================

})();

