//
//  LadderSimulation.js
//  LadderOfAbstraction
//
//  Created by Bret Victor on 8/21/11.
//  (c) 2011 Bret Victor.  MIT open-source license.
//
//  Classes:
//    LadderSimulation
//    LadderSimulationArcSweep
//    LadderSimulationTurningSweep


(function(){

this.LadderSimulationDefaultArcDegrees = 40;
this.LadderSimulationDefaultTurningDegrees = 2;


//====================================================================================
//
//  LadderSimulationCreate

var gDefaultSimulation = null;
var gCachedSimulation = null;

var LadderSimulationCreate = this.LadderSimulationCreate = function (metrics, arcDegrees, turningDegrees) {

    if (arcDegrees === LadderSimulationDefaultArcDegrees && turningDegrees === LadderSimulationDefaultTurningDegrees) {
        if (!gDefaultSimulation || gDefaultSimulation.metrics !== metrics) {
            gDefaultSimulation = new LadderSimulation(metrics, arcDegrees, turningDegrees);
        }
        return gDefaultSimulation;
    }

    if (gCachedSimulation && gCachedSimulation.metrics === metrics && 
        gCachedSimulation.arcDegrees === arcDegrees && gCachedSimulation.turningDegrees === turningDegrees) {
        return gCachedSimulation;
    }
        
    var simulation = new LadderSimulation(metrics, arcDegrees, turningDegrees);
    gCachedSimulation = simulation;

    return simulation;
};


//====================================================================================
//
//  LadderSimulation

var LadderSimulation = this.LadderSimulation = new Class({

    initialize: function (metrics, arcDegrees, turningDegrees) {
        this.metrics = metrics;
        this.arcDegrees = arcDegrees;
        this.turningDegrees = turningDegrees;

        Object.append(this,metrics);
        this.updateMetrics();
    },
    
    getStates: function () {
        if (!this.states) { this.states = this.getStatesBySimulating(); }
        return this.states;
    },
    
    getStatesWithProgress: function () {
        this.attachProgressToStates();
        return this.getStates();
    },
    
    //----------------------------------------------------------
    //
    // metrics

    updateMetrics: function () {
        this.arcAngle = deg2rad(this.arcDegrees.limit(0, 89.5));
        this.turningAngle = deg2rad(this.turningDegrees);
        
        this.lowY  = this.height - this.roadWidth/2 - this.bottomMargin;
        this.highY = this.roadWidth/2 + this.topMargin;
        this.arcRadius = (this.arcAngle == 0) ? 0 : (0.5 * (this.lowY - this.highY) / (1 - Math.cos(this.arcAngle)));
        
        this.leftX = (this.arcAngle == 0) ? this.width : 20;
        this.centerX = this.leftX + 2 * this.arcRadius * Math.sin(this.arcAngle);
        this.rightX = this.centerX + 2 * this.arcRadius * Math.sin(this.arcAngle);
        
        this.tanArcAngle = Math.tan(this.arcAngle);
    },

    attachProgressToStates: function () {
        if (this.hasAttachedProgress) { return; }
        this.hasAttachedProgress = true;
        
        this.getStates().each( function (state) {
            state.progress = this.getProgressAlongRoad(state.x, state.y);
        }, this);
    },

    //----------------------------------------------------------
    //
    // draw

    addRoadPathToContext: function (ctx) {
        ctx.moveTo(0, this.lowY);
        ctx.lineTo(this.leftX, this.lowY);
        ctx.arc(this.leftX, this.lowY - this.arcRadius, this.arcRadius, Math.PI/2, Math.PI/2 - this.arcAngle, true);
        ctx.arc(this.centerX, this.highY + this.arcRadius, this.arcRadius, -Math.PI/2 - this.arcAngle, -Math.PI/2 + this.arcAngle, false);
        ctx.arc(this.rightX, this.lowY - this.arcRadius, this.arcRadius, Math.PI/2 + this.arcAngle, Math.PI/2, true);
        if (this.rightX < this.width) {
            ctx.lineTo(this.width, this.lowY);
        }
    },

    addTrajectoryPathToContext: function (ctx) {
        var states = this.getStates();
        var stateCount = states.length;

        ctx.beginPath();

        for (var i = 0; i < stateCount; i++) {
            var state = states[i];
            if (i % 10 == 0) { ctx.moveTo(state.x, state.y); }
            else { ctx.lineTo(state.x, state.y); }
        }
    },

    addOffsetTrajectoryPathToContext: function (ctx) {
        this.attachProgressToStates();
        var states = this.getStates();
        var stateCount = states.length;

        ctx.beginPath();
        
        var x = 0;
        var y = 0;

        for (var i = 0; i < stateCount; i++) {
            var state = states[i];
            var newX = state.progress;
            if (newX - x < -80) { continue; }  // hack to suppress jumps when getOffsetFromCenterOfRoad thinks we're on the wrong section
            
            x = newX;
            y = state.offset + 0.5 * this.height;
            if (i % 10 == 0) { ctx.moveTo(x,y); }
            else { ctx.lineTo(x,y); }
        }
    },
    
    //----------------------------------------------------------
    //
    // road model
    
    getOffsetFromCenterOfRoad: function (x,y) {
        if (x <= this.leftX || x >= this.rightX) {
            return y - this.lowY;
        }

        var dx = x - this.leftX;
        var dy = y - (this.lowY - this.arcRadius);
        if (dx < dy * this.tanArcAngle) {
            return hypot(dx,dy) - this.arcRadius;
        }
        
        dx = x - this.centerX;
        dy = y - (this.highY + this.arcRadius);
        if (dx < -dy * this.tanArcAngle) {
            return this.arcRadius - hypot(dx,dy);
        }

        dx = x - this.rightX;
        dy = y - (this.lowY - this.arcRadius);
        return hypot(dx,dy) - this.arcRadius;
    },
    
    // arc is squished from leftX to leftX + 0.5*width
    getProgressAlongRoad: function (x,y) {
        var arcWidth = 0.5 * this.width;
        if (x <= this.leftX) { return x; }
        if (x >= this.rightX) { return this.leftX + arcWidth + x - this.rightX; }
        
        var dx = x - this.leftX;
        var dy = y - (this.lowY - this.arcRadius);
        if (dx < dy * this.tanArcAngle) {
            return this.leftX + arcWidth * 0.25 * Math.atan2(dx,dy) / this.arcAngle;
        }
        
        dx = x - this.centerX;
        dy = y - (this.highY + this.arcRadius);
        if (dx < -dy * this.tanArcAngle) {
            return this.leftX + arcWidth * (0.5 + 0.25 * Math.atan2(dx,-dy) / this.arcAngle);
        }

        dx = x - this.rightX;
        dy = y - (this.lowY - this.arcRadius);
        return this.leftX + arcWidth * (1.0 - 0.25 * Math.atan2(-dx,dy) / this.arcAngle);
    },

    //----------------------------------------------------------
    //
    // simulate

    getStatesBySimulating: function () {
        var states = [];
    
        var x = 0;
        var y = this.lowY + 0.25 * this.roadWidth;
        var angle = 0;
        var speed = 1;
        var maxX = this.width;
        
        var turningAngle = this.turningAngle;
        var turningThreshold = this.roadWidth/2;
        
        var offset = this.getOffsetFromCenterOfRoad(x,y);
        
        for (var i = 0; i < 1000; i++) {
            states.push({ x:x, y:y, angle:angle, offset:offset, index:i });
        
            x += speed * Math.cos(angle);
            y += speed * Math.sin(angle);
            offset = this.getOffsetFromCenterOfRoad(x,y);
            if (offset > turningThreshold) { 
                angle -= turningAngle;
            }
            else if (offset < -turningThreshold) {
                angle += turningAngle;
            }
            
            if (x > maxX) { break; }
        }
        
        return states;
    }

});



//====================================================================================
//
//  LadderSimulationArcSweep

var gCachedArcSweeps = {};

this.LadderSimulationArcSweepCreate = function (metrics, turningDegrees, fromDegrees, toDegrees, stepDegrees) {
    var cacheKey = null;
    if (turningDegrees === LadderSimulationDefaultTurningDegrees) {
        cacheKey = "" + fromDegrees.toFixed(2) + "," + toDegrees.toFixed(2) + "," + stepDegrees.toFixed(2);
        if (gCachedArcSweeps[cacheKey]) { return gCachedArcSweeps[cacheKey]; }
    }
    
    var sweep = new LadderSimulationArcSweep(metrics, turningDegrees, fromDegrees, toDegrees, stepDegrees);
    if (cacheKey) { gCachedArcSweeps[cacheKey] = sweep; }
    
    return sweep;
}

var LadderSimulationArcSweep = this.LadderSimulationArcSweep = new Class({

    initialize: function (metrics, turningDegrees, fromDegrees, toDegrees, stepDegrees) {
        this.metrics = metrics;
        this.turningDegrees = turningDegrees;
        
        this.simulations = [];
        for (var arcDegrees = fromDegrees; arcDegrees <= toDegrees; arcDegrees += stepDegrees) {
            this.simulations.push(LadderSimulationCreate(metrics, arcDegrees, turningDegrees));
        }
    },
    
    getSimulations: function () {
        return this.simulations;
    }

});


//====================================================================================
//
//  LadderSimulationTurningSweep

var gCachedTurningSweeps = {};

this.LadderSimulationTurningSweepCreate = function (metrics, arcDegrees, fromDegrees, toDegrees, stepDegrees) {
    var cacheKey = null;
    if (arcDegrees === LadderSimulationDefaultArcDegrees) {
        cacheKey = "" + fromDegrees.toFixed(2) + "," + toDegrees.toFixed(2) + "," + stepDegrees.toFixed(2);
        if (gCachedTurningSweeps[cacheKey]) { return gCachedTurningSweeps[cacheKey]; }
    }
    
    var sweep = new LadderSimulationTurningSweep(metrics, arcDegrees, fromDegrees, toDegrees, stepDegrees);
    if (cacheKey) { gCachedTurningSweeps[cacheKey] = sweep; }
    
    return sweep;
}

var LadderSimulationTurningSweep = this.LadderSimulationTurningSweep = new Class({

    initialize: function (metrics, arcDegrees, fromDegrees, toDegrees, stepDegrees) {
        this.metrics = metrics;
        this.arcDegrees = arcDegrees;

        this.simulations = [];
        for (var turningDegrees = fromDegrees; turningDegrees <= toDegrees; turningDegrees += stepDegrees) {
            this.simulations.push(LadderSimulationCreate(metrics, arcDegrees, turningDegrees));
        }
    },
    
    getSimulations: function () {
        return this.simulations;
    }

});


//====================================================================================

})();


