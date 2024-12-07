//
//  LadderSwingViews.js
//  LadderOfAbstraction
//
//  Created by Bret Victor on 9/18/11.
//  (c) 2011 Bret Victor.  MIT open-source license.
//
//  Classes:
//    LadderSwing
//    LadderSwingPlot
//    LadderSwingSimulation


(function(){


//====================================================================================
//
//  LadderSwing

Tangle.classes.LadderSwing = new Class({

    Extends: BVLayer,

    initialize: function (hostElement, options, tangle) {
        this.parent(null);
        $(hostElement).grab(this.element);
        this.element.setStyle("position", "relative");
    
        this.options = options;
        this.tangle = tangle;
        
        this.setSize(250, 200);
        this.setX(100);
        this.setY(-20);
        
        this.tree = new BVLayer(this);
        this.tree.setContentsURLAndSize("Images/SwingTree.png", 231, 186);
        this.tree.setPosition(0, 15);

        this.shadow = new BVLayer(this);
        this.shadow.setContentsURLAndSize("Images/SwingShadow.png", 62, 20);
        this.shadow.setY(-141);
        
        this.tire = new BVLayer(this);
        this.tire.setContentsURLAndSize("Images/SwingTire.png", 51, 122);
        this.tire.setPosition(27,-20);
        this.tire.element.setStyle(BVLayer.addPrefixToStyleName("TransformOrigin"), "50% 0%");
        
        this.knot = new BVLayer(this);
        this.knot.setContentsURLAndSize("Images/SwingKnot.png", 12, 14);
        this.knot.setPosition(45, -7);
        
    },
    
    update: function (element, time) {
        if (!this.simulation) {
            this.simulation = new LadderSwingSimulation();
        }
        
        var state = this.simulation.getStateAtTime(time);
        var angle = -state.angle;

        this.tire.setRotation(angle);
        this.shadow.setX(this.tire.x + 0.5 * (this.tire.width - this.shadow.width) + 104 * Math.sin(angle) - 1);
        this.shadow.setOpacity(Math.cos(angle * 1.5));
    }
    
});



//====================================================================================
//
//  LadderSwingPlot


Tangle.classes.LadderSwingPlot = new Class({

    Extends: BVScrubbableLayer,

    initialize: function (hostElement, options, tangle) {
        this.parent(null);
        $(hostElement).grab(this.element);
        this.element.setStyle("position", "relative");
    
        this.options = options;
        this.tangle = tangle;

        this.setSize(400, 140);
        
        this.duration = 10; // s
        this.marginLeft = 40;
        this.marginBottom = 50;
        this.plotWidth = this.width - this.marginLeft;
        this.plotHeight = this.height - this.marginBottom;
        this.bounceOffset = 0;

        this.addLabels();
        
        this.canvas = (new Element("canvas", { width:this.plotWidth, height:this.plotHeight })).inject(this.element);
        this.canvas.setStyles({ position:"absolute", left:this.marginLeft, top:0 });

        this.marker = new BVLayer(this);
        this.marker.setContentsURLAndSize("Images/UnbentMarker.png", 18, 18);
        
        this.label = new BVText(this.marker);
        this.label.setSize(100,10);
        this.label.setTextClass("PlotLabel");
        this.label.setPosition(-0.5 * (this.label.width - this.marker.width), 14);
        this.label.setHidden(true);

        this.setHoverable(true);
        this.setTouchable(true);

    },

    update: function (hostElement, time) {
        if (!this.simulation) {
            this.updateSimulation();
        }
        this.time = time;
        this.updateMarker();
    },
    
    updateMarker: function () {
        this.marker.setX(this.marginLeft + this.plotWidth * this.time / this.duration - this.marker.width/2);
        this.marker.setY(-this.getYAtTime(this.time) + this.marker.height/2 + this.bounceOffset);
    },

    updateSimulation: function () {
       this.simulation = new LadderSwingSimulation();
    
       var ctx = this.canvas.getContext("2d");
       ctx.clearRect(0,0,this.plotWidth,this.plotHeight);
       
       ctx.fillStyle = "#ddd";
       ctx.fillRect(0,0,1,this.plotHeight);
       ctx.fillRect(0,this.plotHeight/2,this.plotWidth,1);
       
       ctx.strokeStyle = "#f00";
       ctx.lineWidth = 2;
       ctx.beginPath();
       for (var x = 0; x < this.plotWidth; x++) {
           var t = this.duration * x / this.plotWidth;
           var y = this.getYAtTime(t);
    
           if (x === 0) { ctx.moveTo(x,y); }
           else { ctx.lineTo(x,y); }
       }
       ctx.stroke();
    },

    getYAtTime: function (t) {
        var state = this.simulation.getStateAtTime(t);
        var y = this.plotHeight/2 * (1 - state.angle / (Math.PI * 0.25));
        return y;
    },

    //----------------------------------------------------------
    //
    // labels
    
    addLabels: function () {
        for (var t = 1; t <= 10; t++) {
            var x = t / this.duration * this.plotWidth;
            this.addLabelWithString(sprintf("%ds", t), this.marginLeft + x, this.plotHeight/2 + 3, "center");
        }

        for (var degrees = -45; degrees <= 45; degrees += 45) {
            var y = (45 - degrees) / 90 * this.plotHeight;
            var format = (degrees == degrees.round()) ? "%d&deg;" : "%.1f&deg;";
            this.addLabelWithString(sprintf(format, degrees), this.marginLeft - 4, y - 4, "right");
        }
    },
    
    addLabelWithString: function (string,x,y,align) {
        var label = new BVText(this);
        label.setSize(60,30);
        label.setTextClass("LadderTimePlotLabel");
        label.setTextStyle("textAlign", align || "left");
        label.setHTML(string);
        
        label.setX(x - label.width * (align == "right" ? 1.0 : align == "center" ? 0.5 : 0));
        label.setY(-y);
        return label;
    },
    
    //----------------------------------------------------------
    //
    // scrub

    cursorMovedToPoint: function (x,y) {
        var t = ((x - this.marginLeft) / this.plotWidth * this.duration).limit(0, this.duration);
        this.tangle.setValue("time", t);

        var state = this.simulation.getStateAtTime(t);
        var degrees = rad2deg(state.angle);
        var labelString = "<span class='PlotLabelDark'>" + sprintf("%.1f", degrees) + "&deg;</span> at " + sprintf("%.1fs", t);

        this.label.setHTML(labelString);
        this.label.setHidden(false);
    },
    
    cursorExited: function () {
        this.tangle.setValue("time", this.tangle.getValue("lockedTime"));
        this.label.setHidden(true);
    },
    
    cursorWasTapped: function () {
        this.tangle.setValue("lockedTime", this.tangle.getValue("time"));
        this.bounce();

        var slider = this.tangle.slidersByVariable && this.tangle.slidersByVariable.time;
        if (slider) { slider.bounce(); }
    },
    
    //----------------------------------------------------------
    //
    // bounce
    
    bounce: function () {
        if (!this.bounceTimer) { this.bounceTimer = this.incrementBounce.bind(this).periodical(20); }
        this.bounceProgress = 0;
    },
    
    incrementBounce: function () {
        this.bounceProgress = (this.bounceProgress + 0.04).limit(0,1);
        var p = this.bounceProgress;

        this.bounceOffset = (p < 0.5) ? (15 * (1 - Math.pow(4*p - 1, 2))) : (4 * (1 - Math.pow(4*(p - 0.5) - 1, 2)));
        this.updateMarker();

        if (this.bounceProgress === 1) {
            clearInterval(this.bounceTimer);
            delete this.bounceTimer;
        }
    }

});




//====================================================================================
//
//  LadderSwingSimulation

var LadderSwingSimulation = new Class({

    initialize: function () {
        this.dt = 0.01;
        this.states = this.getStatesBySimulating();
    },
    
    getStates: function () {
        return this.states;
    },
    
    getStateAtTime: function (t) {
        var states = this.getStates();
        var stateIndex = (t / this.dt).round().limit(0, states.length - 1);
        return states[stateIndex];
    },
    
    getStatesBySimulating: function () {
        var states = [];
        
        var g = 9.81; // m/s^2
        var L = 1.5;  // m
        var damping = 0.4; // s^-1
        
        var angle = Math.PI * 0.25;
        var velocity = 0;
        var dt = this.dt;
        
        for (var i = 0; i < 1000; i++) {
            states.push({ angle:angle, index:i });
            
            var newAngle = angle + dt * velocity;
            var newVelocity = velocity - dt * (g/L * Math.sin(angle) + damping * velocity);
            
            angle = newAngle;
            velocity = newVelocity;
        }

        return states;
    }

});



//====================================================================================
//
//  LadderSwingAnimator

Tangle.classes.LadderSwingAnimator = new Class({

    Extends: BVLayer,

    initialize: function (hostElement, options, tangle, variable) {
        this.parent(null);
        $(hostElement).grab(this.element);
        this.element.setStyles({ "cursor":"pointer", "position":"relative" });
        
        this.tangle = tangle;
        this.variable = variable;
        
        this.setContentsURLAndSize("Images/SwingPlayButton.png", 21, 22);
        this.setTouchable(true);
        
        var preload = new Image();
        preload.src = "Images/SwingPlayButtonDown.png";
    },
    
    update: function (element, value) {
    },
    
    setPlaying: function (playing) {
        if (playing && !this.timer) {
            this.startMillis = Date.now();
            this.lastTime = 0;
            this.tangle.setValue(this.variable, 0);

            this.timer = (function () {
                var tangleTime = this.tangle.getValue(this.variable);
                if (this.lastTime >= 9.9 || Math.abs(tangleTime - this.lastTime) > 0.1) { 
                    this.setPlaying(false);
                }
                else {
                    var time = (0.001 * (Date.now() - this.startMillis)).limit(0,9.94);
                    this.lastTime = time;
                    this.tangle.setValue(this.variable, time);
                }
            }).periodical(20,this);
        }
        else if (!playing && this.timer) {
            clearInterval(this.timer);
            delete this.timer;
        }
    },
    
    touchDidGoDown: function (touches) {
        this.setContentsURL("Images/SwingPlayButtonDown.png");
    },

    touchDidGoUp: function (touches) {
        this.setContentsURL("Images/SwingPlayButton.png");
        this.setPlaying(false);
        this.setPlaying(true);
    }
    
});



//====================================================================================

})();

