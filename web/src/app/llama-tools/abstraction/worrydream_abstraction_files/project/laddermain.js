//
//  LadderMain.js
//  LadderOfAbstraction
//
//  Created by Bret Victor on 8/21/11.
//  (c) 2011 Bret Victor.  MIT open-source license.
//


(function(){


//====================================================================================
//
//  domready
//

window.addEvent('domready', function () {
    initializeTouchSpans();
    initializeTangleElements();
});


//====================================================================================
//
//  mouse vs touch
//

function initializeTouchSpans () {
    var isTouch = BVLayer.isTouch;
    
    $$(".ifMouse").each(function (element) {
        element.setStyle("display", isTouch ? "none" : "inline");
    });

    $$(".ifTouch").each(function (element) {
        element.setStyle("display", isTouch ? "inline" : "none");
    });
}


//====================================================================================
//
//  tangle
//

function initializeTangleElements () {
    if (Browser.ie6 || Browser.ie7 || Browser.ie8) { return; }  // no canvas support

    var elements = $$(".tangle");
    loadNextElement.delay(100);
    
    function loadNextElement () {
        if (elements.length === 0) { return; }
        var element = elements.shift();
        initializeTangleElement(element);
        loadNextElement.delay(10);
    }
}

function initializeTangleElement (element) {
    var modelName = element.getAttribute("data-model") || "";
    var model = gModels[modelName] || gModels["default"];

    element.setStyle("position", "relative");
    var tangle = new Tangle(element, model);
}


//====================================================================================
//
//  models
//

var gModels = {

    "default": {
        initialize: function () {
            this.timeIndex = this.lockedTimeIndex = 0;
            this.arcDegrees = this.lockedArcDegrees = LadderSimulationDefaultArcDegrees;
            this.turningDegrees = this.lockedTurningDegrees = LadderSimulationDefaultTurningDegrees;
            this.sweptVariable = "none";  // can be "none", "arcDegrees", "turningDegrees", "both"
        },
    
        update: function () {
        }
    },

    "perspectives": {
        initialize: function () {
            this.timeIndex = this.lockedTimeIndex = 100;
            this.arcDegrees = this.lockedArcDegrees = LadderSimulationDefaultArcDegrees;
            this.turningDegrees = this.lockedTurningDegrees = LadderSimulationDefaultTurningDegrees;
            this.sweptVariable = "none";  // can be "none", "arcDegrees", "turningDegrees", "both"
        },
    
        update: function () {
        }
    },

    "grid": {
        initialize: function () {
            this.timeIndex = this.lockedTimeIndex = 0;
            this.arcDegrees = this.lockedArcDegrees = LadderSimulationDefaultArcDegrees;
            this.turningDegrees = this.lockedTurningDegrees = LadderSimulationDefaultTurningDegrees;
            this.sweptVariable = "both";
        },
    
        update: function () {
        }
    },
    
    "processing": {
        initialize: function () {
            this.r = 192;
            this.g = 192;
            this.b = 192;

            this.x = 130;
            this.y = 100;
            this.w = 25;
            this.h = 25;
            
            this.i0 = 0;
            this.k = 3;
            this.dx = 70;
        },
    
        update: function () {
        }
    },
    
    "swing": {
        initialize: function () {
            this.time = 0;
            this.lockedTime = 0;
        },
    
        update: function () {
        }
    }
};



//====================================================================================

})();

