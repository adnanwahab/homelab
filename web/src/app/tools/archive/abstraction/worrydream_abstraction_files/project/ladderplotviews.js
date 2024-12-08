//
//  LadderPlotViews.js
//  LadderOfAbstraction
//
//  Created by Bret Victor on 8/21/11.
//  (c) 2011 Bret Victor.  MIT open-source license.
//
//  Classes:
//    LadderTimePlot
//    LadderTimeGrid
//    LadderTimeGridDescription
//    LadderProcessing


(function(){


//====================================================================================
//
//  LadderTimePlot


Tangle.classes.LadderTimePlot = new Class({

    Extends: BVScrubbableLayer,

    initialize: function (hostElement, options, tangle) {
        this.parent(null);
        $(hostElement).grab(this.element);
        this.element.setStyle("position", "relative");
    
        this.options = options;
        this.tangle = tangle;
        
        this.variable = this.options.sweeparc ? "arcDegrees" : "turningDegrees";
        this.lockedVariable = this.options.sweeparc ? "lockedArcDegrees" : "lockedTurningDegrees";

        this.metrics = gLadderRoadMetrics;
        this.setSize(404, 120);
        this.barWidth = 4;
        
        this.minStateCount = 350;
        this.maxStateCount = this.options.sweeparc ? 1000 : 750;
        
        this.canvas = (new Element("canvas", { width:this.width, height:this.height })).inject(this.element);
        this.canvas.setStyles({ position:"absolute", left:0, top:0 });
        
        this.addLabels();
        
        if (this.options.scrub) {
            this.setHoverable(true);
            this.setTouchable(true);
            this.element.setStyle("cursor", "pointer");

            this.label = new BVText(this);
            this.label.setSize(100,10);
            this.label.setTextClass("PlotLabel");
            this.label.setHidden(true);
        }
    },

    update: function (hostElement, sweptVariable, arcDegrees, turningDegrees) {
        if (this.options.sweeparc) {
            if (!this.sweep || this.sweep.turningDegrees !== turningDegrees) {
                this.sweep = LadderSimulationArcSweepCreate(this.metrics, turningDegrees, 0, 90, 1);
            }
        }
        else {
            if (!this.sweep || this.sweep.arcDegrees !== arcDegrees) {
                this.sweep = LadderSimulationTurningSweepCreate(this.metrics, arcDegrees, 0, 10.01, 0.1);
            }
        }

        var simulations = this.sweep.getSimulations();
        
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,0,this.width,this.height);

        simulations.each( function (simulation, i) {
            var stateCount = simulation.getStates().length;
            var x = i * this.barWidth;
            var y = this.height * (1 - (stateCount - this.minStateCount) / (this.maxStateCount - this.minStateCount));
            simulation.barTop = { x:x, y:y };
            
            var deltaDegrees = Math.abs(this.options.sweeparc ? (arcDegrees - simulation.arcDegrees) : (turningDegrees - simulation.turningDegrees));
            var isHighlighted = (this.options.scrub && deltaDegrees < 0.05);
            ctx.fillStyle = isHighlighted ? "#f00" : "#bbb";

            ctx.fillRect(x, y, this.barWidth - 1, this.height - y);
        }, this);
    },

    //----------------------------------------------------------
    //
    // labels
    
    addLabels: function () {
        var plotWidth = this.barWidth * (this.options.sweeparc ? 91 : 101);
        var yAxisLabelX = plotWidth + (this.options.sweeparc ? 22 : 18);
    
        if (this.options.labelyaxis) {
            this.addLabelWithString("steps to the finish line", yAxisLabelX, -15, "right", 120);
        }
        this.addLabelWithString(this.options.sweeparc ? "bend angle" : "turning rate", 0, this.height + 14, "left");

        for (var stateCount = 400; stateCount <= (this.options.sweeparc ? 1000 : 700); stateCount += (this.options.sweeparc ? 200 : 100)) {
            var y = this.height * (1 - (stateCount - this.minStateCount) / (this.maxStateCount - this.minStateCount));
            this.addLabelWithString(sprintf("%d", stateCount), yAxisLabelX, y - 5, "right");
        }

        if (this.options.sweeparc) {
            for (var arcDegrees = 0; arcDegrees <= 90; arcDegrees += 10) {
                var x = arcDegrees * this.barWidth;
                this.addLabelWithString(sprintf("%d&deg;", arcDegrees), x + 4, this.height + 3, "center", 40);
            }
        }
        else {
            for (var turningDegrees = 0; turningDegrees <= 10; turningDegrees++) {
                var x = 10 * turningDegrees * this.barWidth;
                this.addLabelWithString(sprintf("%d&deg;", turningDegrees), x + 4, this.height + 3, "center", 40);
            }
        }
    },
    
    addLabelWithString: function (string,x,y,align,width) {
        var label = new BVText(this);
        label.setSize(width || 100, 30);
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
    
    cursorMovedToPoint: function (x,y,isDown) {
        if (!this.sweep) { return; }

        var simulations = this.sweep.getSimulations();
        var barIndex = Math.floor(x / this.barWidth).limit(0, simulations.length - 1);
        var simulation = simulations[barIndex];
        
        var labelString;
        if (this.options.sweeparc) {
            this.tangle.setValue("arcDegrees", simulation.arcDegrees);
            labelString = sprintf("%.0f", simulation.arcDegrees) + "&deg; bend<br><span class='PlotLabelDark'>" + 
                simulation.getStates().length + " steps</span>";
        }
        else {
            this.tangle.setValue("turningDegrees", simulation.turningDegrees);
            labelString = sprintf("%.1f", simulation.turningDegrees) + "&deg; angle<br><span class='PlotLabelDark'>" + 
                simulation.getStates().length + " steps</span>";
        }
        this.label.setHTML(labelString);
        this.label.setHidden(false);
        this.label.setPosition(simulation.barTop.x + 0.5 * (this.barWidth - this.label.width), -simulation.barTop.y + 30);

        if (isDown) {
            this.tangle.setValue(this.lockedVariable, this.tangle.getValue(this.variable));
        }
    },
    
    cursorExited: function () {
        this.label.setHidden(true);
        this.tangle.setValue(this.variable, this.tangle.getValue(this.lockedVariable));
    },

    cursorWasTapped: function () {
        this.tangle.setValue(this.lockedVariable, this.tangle.getValue(this.variable));

        var slider = this.tangle.slidersByVariable && this.tangle.slidersByVariable[this.variable];
        if (slider) { slider.bounce(); }
    }
    
});



//====================================================================================
//
//  LadderTimeGrid


Tangle.classes.LadderTimeGrid = new Class({

    Extends: BVScrubbableLayer,

    initialize: function (hostElement, options, tangle) {
        this.parent(null);
        $(hostElement).grab(this.element);
        this.element.setStyle("position", "relative");
    
        this.options = options;
        this.tangle = tangle;

        this.metrics = gLadderRoadMetrics;
        this.margins = { left:32, right:10, top:6, bottom:26 };

        this.canvasWidth = 364;
        this.canvasHeight = 300;
        this.cellWidth = 4;
        this.cellHeight = 3;
        
        this.setWidth(this.margins.left + this.canvasWidth + this.margins.right);
        this.setHeight(this.margins.top + this.canvasHeight + this.margins.bottom);
        
        this.frame = new BVLayer(this);
        this.frame.setContentsURLAndSize("Images/GridFrame.png", 372, 308);
        this.frame.setPosition(this.margins.left - 4, -this.margins.top + 2);
        
        if (this.options.useprerendered){
            this.addPrerenderedGrid();
        }
        else {
            this.canvas = (new Element("canvas", { width:this.canvasWidth, height:this.canvasHeight })).inject(this.element);
            this.canvas.setStyles({ position:"absolute", left:this.margins.left, top:this.margins.top });
        }
        
        this.addLabels();

        this.marker = new BVLayer(this);
        this.marker.setContentsURLAndSize("Images/GridMarker.png", 10, 9);
        this.marker.setHidden(true);

        this.rowMarker = new BVLayer(this);
        this.rowMarker.setContentsURLAndSize("Images/GridMarkerHorizontal.png", 402, 11);
        this.rowMarker.setHidden(true);

        this.columnMarker = new BVLayer(this);
        this.columnMarker.setContentsURLAndSize("Images/GridMarkerVertical.png", 13, 331);
        this.columnMarker.setHidden(true);

        if (this.options.scrub) {
            this.setHoverable(true);
            this.setTouchable(true);
        }
    },

    update: function (element, sweptVariable, arcDegrees, turningDegrees) {
        if (!this.options.useprerendered && !this.didDrawGrid) {
            this.didDrawGrid = true;
            this.drawGrid();
        }
        this.updateMarker(sweptVariable, arcDegrees, turningDegrees);
    },
    
    updateMarker: function (sweptVariable, arcDegrees, turningDegrees) {
        var canvasX = this.cellWidth * arcDegrees.round();
        var canvasY = this.canvasHeight - this.cellHeight * (1 + (turningDegrees / 0.1).round());
        
        this.marker.setHidden(sweptVariable !== "none");
        this.marker.setPosition(this.margins.left + canvasX - 3, -this.margins.top - canvasY + 2);
        
        this.rowMarker.setHidden(sweptVariable !== "arcDegrees");
        this.rowMarker.setPosition(6, -this.margins.top - canvasY + 3);

        this.columnMarker.setHidden(sweptVariable !== "turningDegrees");
        this.columnMarker.setPosition(this.margins.left + canvasX - 4, 4);
    },

    //----------------------------------------------------------
    //
    // labels
    
    addLabels: function () {
        this.addLabelWithString("turning<br>rate", -4, this.canvasHeight - 17, "right");
        this.addLabelWithString("bend<br>angle", 0, this.canvasHeight + 3, "left");
        
        for (var turningDegrees = 1; turningDegrees <= 10; turningDegrees++) {
            var y = this.canvasHeight - (1 + 10 * turningDegrees) * this.cellHeight;
            this.addLabelWithString(sprintf("%d&deg;", turningDegrees), -4, y, "right");
        }

        for (var arcDegrees = 10; arcDegrees <= 90; arcDegrees += 10) {
            var x = arcDegrees * this.cellWidth;
            this.addLabelWithString(sprintf("%d&deg;", arcDegrees), x, this.canvasHeight + 3, "center");
        }
        
    },
    
    addLabelWithString: function (string,x,y,align) {
        var label = new BVText(this);
        label.setSize(50,30);
        label.setTextClass("LadderTimeGridLabel");
        label.setTextStyle("textAlign", align || "left");
        label.setHTML(string);
        
        label.setX(this.margins.left + x - label.width * (align == "right" ? 1.0 : align == "center" ? 0.5 : 0));
        label.setY(-this.margins.top - y);
        return label;
    },

    
    //----------------------------------------------------------
    //
    // draw
    
    addPrerenderedGrid: function () {
        this.prerenderedImage = new BVLayer(this);
        this.prerenderedImage.setContentsURLAndSize("Images/GridPrerendered.png", this.canvasWidth, this.canvasHeight);
        this.prerenderedImage.setPosition(this.margins.left, -this.margins.top);
    },

    drawGrid: function () {
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,0,this.width,this.height);
        
        this.arcIndex = 0;
        this.drawNextColumn();
    },
    
    drawNextColumn: function () {
        var arcDegrees = this.arcIndex;
        if (arcDegrees > 90) { return; }
        
        var sweep = LadderSimulationTurningSweepCreate(this.metrics, arcDegrees, 0, 10.01, 0.1);
        this.drawSweep(sweep, this.arcIndex);
        this.arcIndex++;
        
        this.drawNextColumn.delay(20,this);
    },
        
    drawSweep: function (sweep, arcIndex) {
        var ctx = this.canvas.getContext("2d");
        var simulations = sweep.getSimulations();
    
        var redCount = 400;
        var blackCount = 460;
        var greyCount = 580;
        var whiteCount = 1000;
    
        simulations.each( function (simulation, turningIndex) {
            var stateCount = simulation.getStates().length;
            
            var x = arcIndex * this.cellWidth;
            var y = this.canvasHeight - (1 + turningIndex) * this.cellHeight;
            
            if (stateCount < blackCount) {
                var red = remap(stateCount, redCount, blackCount, 255, 0).limit(0,255).round();
                ctx.fillStyle = "rgba(" + red + ",0,0,1)";
            }
            else if (stateCount < greyCount) {
                var black = remap(stateCount, blackCount, greyCount, 0, 200).limit(0,255).round();
                ctx.fillStyle = "rgba(" + black + "," + black + "," + black + ",1)";
            }
            else {
                var grey = remap(stateCount, greyCount, whiteCount, 200, 255).limit(0,255).round();
                ctx.fillStyle = "rgba(" + grey + "," + grey + "," + grey + ",1)";
            }

            ctx.fillRect(x, y, this.cellWidth, this.cellHeight);
        }, this);
    },

    //----------------------------------------------------------
    //
    // scrub

    cursorMovedToPoint: function (x,y) {
        var yOffset = 3;
        var arcDegrees = Math.floor((x - this.margins.left) / this.cellWidth).limit(0,90);
        var turningDegrees = (0.1 * Math.floor((this.canvasHeight - (y - yOffset - this.margins.top)) / this.cellHeight)).limit(0,9.9);
        var sweptVariable = (x < this.margins.left) ? "arcDegrees" : (y - yOffset > this.height - this.margins.bottom) ? "turningDegrees" : "none";
        
        this.tangle.setValues({ sweptVariable:sweptVariable, arcDegrees:arcDegrees, turningDegrees:turningDegrees });
    },
    
    cursorExited: function () {
        if (BVLayer.isTouch) { return; }
        this.tangle.setValue("sweptVariable", "both");
    }
    
});



//====================================================================================
//
//  LadderTimeGridDescription


Tangle.classes.LadderTimeGridDescription = new Class({

    update: function (element, sweptVariable, arcDegrees, turningDegrees) {
        var string = "";
        if (sweptVariable !== "turningDegrees" && sweptVariable !== "both") {
            string += "Car turns by " + sprintf("%.1f", turningDegrees) + "&deg; per step. ";
        }
        if (sweptVariable !== "arcDegrees" && sweptVariable !== "both") {
            string += "Road bends by " + sprintf("%.0f", arcDegrees) + "&deg;. ";
        }
        element.set("html", string);
    }
      
});



//====================================================================================
//
//  LadderProcessing


Tangle.classes.LadderProcessing = new Class({

    initialize: function (hostElement, options, tangle) {
        this.width = 400;
        this.height = 200;
    
        this.canvas = (new Element("canvas", { width:this.width, height:this.height })).inject(hostElement);
        this.canvas.setStyles({ left:0, top:0, border:"1px solid #ccc" });
    },

    update: function (element, r, g, b, x, y, w, h, i0, k, dx) {
        k = k.limit(i0, i0 + 1000);

        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,0,this.width,this.height);
        
        for (var i = i0; i < k; i++) {
            ctx.save();
            
            ctx.fillStyle = sprintf("rgba(%d,%d,%d,1)", r.limit(0,255).round(), g.limit(0,255).round(), b.limit(0,255).round());
            ctx.translate(x + i*dx, y);
            ctx.scale(w,h);
    
            ctx.beginPath();
            ctx.arc(0,0,1,0,2*Math.PI,false);
            ctx.fill();
    
            ctx.restore();
        }
    }
      
});


//====================================================================================

})();


