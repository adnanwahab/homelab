//
//  LadderHeaderGame.js
//  LadderOfAbstraction
//
//  Created by Bret Victor on 9/26/11.
//  (c) 2011 Bret Victor.  MIT open-source license.
//
//  Classes:
//    LadderHeaderGame
//    LadderHeaderCar
//    LadderHeaderWheel
//    LadderHeaderCarShadow
//    LadderHeaderBubble
//    LadderHeaderGridBubble
//    LadderHeaderRoad
//    LadderHeaderKeyboard
//    LadderHeaderKey


(function(){


var gUseAcceleration = true;
var gPulsateBubbles = true;  // in Safari, CSS animations trigger Core Animation mode, which turns off subpixel anti-aliasing


//====================================================================================
//
//  LadderHeaderGame

var LadderHeaderGame = Tangle.classes.LadderHeaderGame = new Class({

    Extends: BVLayer,

    initialize: function (hostElement, options, tangle) {
        this.parent(null);
        $(hostElement).grab(this.element);
        this.element.setStyle("position", "relative");
        
        this.world = new BVLayer(this);
        this.world.setPosition(0.5 * 920, -306);
        
        this.keyboard = new LadderHeaderKeyboard(this.world);
        if (BVLayer.isTouch) { this.keyboard.setPosition(300,61); }
        else { this.keyboard.setPosition(340,41); }
        
        this.hintArrowUp = new BVLayer(this.world);
        this.hintArrowUp.setContentsURLAndSize("Images/HeaderHintArrowUp.png", 19, 13);
        this.hintArrowUp.setPosition(85,104);
        this.hintArrowUp.setHidden(true);
        
        this.carShadow = new LadderHeaderCarShadow(this.world);
        this.car = new LadderHeaderCar(this.world);
        
        this.bubble = new LadderHeaderBubble(this.world);
        this.bubble.setActive(false);
        
        this.validCommands = { "left":1, "right":1, "up":1, "down":1 };
        this.activeCommands = {};
        
        this.validKeys = { "left":1, "right":1, "up":1, "down":1, "w":1, "a":1, "s":1, "d":1 };
        this.altKeys = { "up":"w", "left":"a", "down":"s", "right":"d" };
        this.downKeys = {};
        this.addKeyboardEvents();

        this.carShadow.updateWithCar(this.car);

		window.addEvent('scroll', this.windowDidScroll.bind(this));
    },
    
    update: function (element) {
    },
    
    windowDidScroll: function () {
        this.setHidden(window.getScroll().y > 360);
    },
    

    //----------------------------------------------------------
    //
    // tick
    
    startTicking: function () {
        if (this.tickInterval) { return; }

        this.tickInterval = this.tick.periodical(1000/60, this);
        this.lastTimestamp = Date.now();
    },
    
    stopTicking: function () {
        if (!this.tickInterval) { return; }
        
        clearInterval(this.tickInterval);
        delete this.tickInterval;
    },
    
    tick: function () {
        var now = Date.now();
        var interval = 0.001 * (now - (this.lastTimestamp || now));
        this.lastTimestamp = now;

        interval = interval.limit(0, 1/10);  // if framerate is super-slow, slow down animations
        
        while (true) {  // if framerate is kinda-slow, use multiple ticks per frame
            var dt = Math.min(interval, 1/30);
            if (dt < 0.001) { break; }
            interval -= dt;
            
            this.tickWithTimeInterval(dt);
            if (!this.wantsTick()) { this.stopTicking(); break; }
        }
    },
    
    tickWithTimeInterval: function (dt) {
        this.bubble.tickWithTimeInterval(dt, this.activeCommands);
        if (this.bubble.wantsDown()) {
            this.bubble.setActive(false);
            this.car.setActive(true);
        }

        this.car.tickWithTimeInterval(dt, this.activeCommands);
        this.carShadow.updateWithCar(this.car);
        
        this.hintArrowUp.setHidden(this.carWentUp || !this.car.canGoUp());
        
        if (this.car.wantsUp()) {
            this.car.setActive(false);
            this.bubble.setActive(true);
            this.carWentUp = true;
        }
        
        this.car.setHidden(!this.bubble.wantsCar());
    },
    
    wantsTick: function () {
        return this.bubble.wantsTick() || this.car.wantsTick();
    },
    

    //----------------------------------------------------------
    //
    // commands
    
    updateActiveCommands: function () {
        Object.each(this.validCommands, function (v,command) {
            this.activeCommands[command] = this.downKeys[command] || this.downKeys[this.altKeys[command]] || 
                                           this.keyboard.isKeyDownWithName(command);
        }, this);

        this.keyboard.updateHighlightsWithNames(this.activeCommands);
        this.startTicking();
    },


    //----------------------------------------------------------
    //
    // keys

    addKeyboardEvents: function () {
    	$(document).addEvent("keydown", this.keyDidGoDown.bind(this));
    	$(document).addEvent("keyup", this.keyDidGoUp.bind(this));
    },
    
    keyDidGoDown: function (event) {
        if (!this.validKeys[event.key] || event.alt || event.meta || event.control) { return; }
        event.stop();
        this.keyboard.removeHelpText();

        this.downKeys[event.key] = 1;
        this.updateActiveCommands();
    },
    
    keyDidGoUp: function (event) {
        if (!this.downKeys[event.key]) { return; }
        event.stop();

        delete this.downKeys[event.key];
        this.updateActiveCommands();
    }
    
});


//====================================================================================
//
//  LadderHeaderCar

var LadderHeaderCar = new Class({

    Extends: BVLayer,

    initialize: function (superlayer) {
        this.parent(superlayer);
        
        this.state = {
            x:120,
            y:0,
            vx:0,
            vy:0,
            isFacingRight:true,
            isOnGround:true,
            isAccelerating:false,

            isJumping:false,
            jumpProgress:0,
            isCrouching:false,
            crouchProgress:0,
            isLanding:false,
            landProgress:0,
            
            isActive:true,
            wantsUp:false
        };
        
        this.gravity = 2000;
        this.ladderX = 19;
        this.ladderY = 85;
        this.ladderWidth = 150;
        
        this.setAccelerated(gUseAcceleration);
        
        this.body = new BVLayer(this);
        this.body.setContentsURLAndSize("Images/HeaderCarLeft.png", 106, 32);  // preload left image
        this.body.setAccelerated(gUseAcceleration);
        
        this.leftWheel = new LadderHeaderWheel(this);
        this.rightWheel = new LadderHeaderWheel(this);
        
        this.updateAppearanceWithState(this.state);
    },

    //----------------------------------------------------------
    //
    // appearance
    
    updateAppearanceWithState: function (state) {
        this.setPosition(state.x, state.y);
        this.body.setContentsURL("Images/HeaderCar" + (state.isFacingRight ? "Right" : "Left") + ".png");
        this.leftWheel.setPosition(state.isFacingRight ? 11 : 13, 17);
        this.rightWheel.setPosition(state.isFacingRight ? 75 : 77, 17);
        
        this.updateBodyPositionWithState(state);
    },
    
    updateBodyPositionWithState: function (state) {
        var bodyOffset = 0;

        if (!state.isOnGround) {
            bodyOffset = 2;
        }
        else if (state.isJumping) {
            bodyOffset = lerp(-2,2, state.jumpProgress);
        }
        else if (state.isLanding) {
            bodyOffset = (state.landProgress < 1/2) ? 
                remap(state.landProgress, 0, 1/2, 2, -3) :
                remap(state.landProgress, 1/2, 1, -3, 0);
        }
        else if (state.crouchProgress) {
            bodyOffset = lerp(0,-3, state.crouchProgress);
        }
        else if (state.isAccelerating && Math.abs(state.vx) > 400) {
            bodyOffset = Math.cos(state.x / 30);  // bouncing along
        }
        
        this.body.setY(35 + bodyOffset);
    },

    //----------------------------------------------------------
    //
    // active
    
    setActive: function (active) {
        this.state.isActive = active;
    },

    wantsUp: function () {
        return this.state.isActive && this.state.wantsUp;
    },
    
    canGoUp: function () {
        var state = this.state;
        return (state.x + 10 > this.ladderX) && (state.x + this.body.width - 10 < this.ladderX + this.ladderWidth);
    },
    
    //----------------------------------------------------------
    //
    // tick
    
    wantsTick: function () {
        var state = this.state;
        if (!state.isActive) { return false; }
        return (state.vx != 0 || state.vy != 0 || !state.isOnGround ||
                state.isJumping || state.isLanding || state.isCrouching || state.crouchProgress != 0);
    },

    tickWithTimeInterval: function (dt, commands) {
        if (!this.state.isActive) { return; }
        this.tickXWithTimeInterval(dt,commands);
        this.tickYWithTimeInterval(dt,commands);
        this.updateAppearanceWithState(this.state);
    },
    
    tickXWithTimeInterval: function (dt, commands) {
        var state = this.state;
    
        state.isAccelerating = (commands.left || commands.right) && !(commands.left && commands.right);
        if (state.isAccelerating) {
            state.isFacingRight = !!commands.right;
            var isTurningAround = (state.isFacingRight && state.vx < 0) || (state.isFacingLeft && state.vx > 0);
            var acceleration = 1000 * (state.isFacingRight ? 1 : -1) * (isTurningAround ? 2 : 1) * (state.isOnGround ? 1 : 0.5);

            state.vx += dt * acceleration;
            state.vx = state.vx.limit(-800,800);

            var maxDistance = 10 + window.getSize().x / 2;
            if ((state.isFacingRight && state.x > maxDistance) || (!state.isFacingRight && state.x < -maxDistance - 100)) {
                state.vx = 0;
            }
        }
        else {
            state.vx *= Math.pow(0.9, dt/0.02);
            if (Math.abs(state.vx) < 20) { state.vx = 0; }
        }
        
        state.x += dt * state.vx;
        
        if (state.isOnGround) {
            var wheelSpinAngle = -Math.PI * state.vx / 3000;
            this.leftWheel.spinByAngle(wheelSpinAngle);
            this.rightWheel.spinByAngle(wheelSpinAngle);
        }
    },

    tickYWithTimeInterval: function (dt, commands) {
        var state = this.state;
        state.wantsUp = false;
        var oldY = state.y;
        
        state.isCrouching = state.isOnGround && commands.down;
        state.crouchProgress = (state.crouchProgress + dt / (state.isCrouching ? 0.08 : -0.08)).limit(0,1);
        
        if (state.isJumping) {
            state.jumpProgress += dt / 0.06;
            if (state.jumpProgress >= 1) {
                state.isJumping = false;
                state.isOnGround = false;
                state.jumpProgress = 0;
                state.vy = 720;
            }
        }
        else if (commands.up && state.isOnGround) {
            state.isJumping = true;
        }

        if (!state.isOnGround) {
            state.vy -= dt * this.gravity;
            state.y += dt * state.vy;
            if (state.y < 0) {
                state.isOnGround = true;
                state.y = 0;
                state.vy = 0;
                state.isLanding = true;
            }
            else if (oldY > this.ladderY && state.y <= this.ladderY && 
                     (state.x + 10 > this.ladderX) && (state.x + this.body.width - 10 < this.ladderX + this.ladderWidth)) {
                state.vx = 0;
                state.vy = 0;
                state.y = this.ladderY - 1;
                state.wantsUp = true;
            }
        }
        
        if (state.isLanding) {
            state.landProgress += dt / 0.11;
            if (state.landProgress >= 1) { 
                state.landProgress = 0;
                state.isLanding = false;
            }
        }
    }
    
});


//====================================================================================
//
//  LadderHeaderWheel

var LadderHeaderWheel = new Class({

    Extends: BVLayer,

    initialize: function (superlayer, isMarker) {
        this.parent(superlayer);
        
        this.setAccelerated(gUseAcceleration);
        this.setContentsURLAndSize("Images/HeaderCarWheel.png", 18, 18);

        this.spokes = new BVLayer(this);
        this.spokes.setContentsURLAndSize("Images/HeaderCarSpokes.png", 14, 14);
        this.spokes.element.setStyle(BVLayer.addPrefixToStyleName("TransformOrigin"), "50% 50%");
        this.spokes.setPosition(2,-2);
        
        this.spokeRotation = 0;
    },
    
    spinByAngle: function (angle) {
        this.spokes.setRotation((this.spokes.rotation + angle + 2 * Math.PI) % (2 * Math.PI));
    }
    
});


//====================================================================================
//
//  LadderHeaderCarShadow

var LadderHeaderCarShadow = new Class({

    Extends: BVLayer,

    initialize: function (superlayer) {
        this.parent(superlayer);
        
        this.fullWidth = 125;
        this.carWidth = 105;
        
        this.setAccelerated(gUseAcceleration);
        this.setContentsURLAndSize("Images/HeaderCarShadow.png", this.fullWidth, 16);        
    },
    
    updateWithCar: function (car) {
        var widthScale = remap(car.y, 0, 100, 1, 0.7).limit(0.7, 1);
        this.setWidth(this.fullWidth * widthScale);
        this.setX(car.x + 0.5 * (this.carWidth - this.width));
        this.setOpacity(remap(car.y, 0, 100, 1, 0).limit(0,1));
    }
});



//====================================================================================
//
//  LadderHeaderBubble

var LadderHeaderBubble = new Class({

    Extends: BVLayer,

    initialize: function (superlayer) {
        this.parent(superlayer);
        
        this.state = {
            level:1,
            jumpLevel:1,
            y:0,
            vy:0,
            isJumping:false,
            didBounce:false,
            
            x:0,
            vx:0,
            isAccelerating:false,
            isFacingRight:true,
            
            isScaling:false,
            scaleProgress:0,
            
            isActive:false,
            wantsDown:false
        };
        
        this.levelHeight = 82;
        this.baseY = 64;
        this.gravity = 2000;
        this.progressWidth = 600;

        this.state.y = this.baseY + this.levelHeight * this.state.level;
        this.setPosition(-52, this.state.y);
        this.setSize(292,92);
        this.element.setStyle(BVLayer.addPrefixToStyleName("TransformOrigin"), "50% 50%");

        this.addRoad();
        this.addImage();
        this.gridBubble = new LadderHeaderGridBubble(this);
        this.addHintArrows();
        
        this.setLevel(this.state.level);

        this.setActive(false);
        this.setHidden(true);
    },

    //----------------------------------------------------------
    //
    // image
    
    addImage: function () {
        this.image = new BVLayer(this);
        this.image.setContentsURLAndSize("Images/HeaderBubble.png", 324, 124);
        this.image.setPosition(0.5 * (this.width - this.image.width), -0.5 * (this.height - this.image.height));

        if (gPulsateBubbles) {
            this.image.element.setStyle(BVLayer.addPrefixToStyleName("TransformOrigin"), "50% 50%");
            this.image.element.setStyle(BVLayer.addPrefixToStyleName("AnimationDuration"), "1s");
            this.image.element.setStyle(BVLayer.addPrefixToStyleName("AnimationTimingFunction"), "linear");
            this.image.element.setStyle(BVLayer.addPrefixToStyleName("AnimationDirection"), "alternate");
            this.image.element.setStyle(BVLayer.addPrefixToStyleName("AnimationIterationCount"), "infinite");
            this.image.element.setStyle(BVLayer.addPrefixToStyleName("AnimationName"), "LadderHeaderBubbleBounce");
        }
    },

    //----------------------------------------------------------
    //
    // hint arrows

    addHintArrows: function () {
        this.hintArrowLeft = new BVLayer(this);
        this.hintArrowLeft.setContentsURLAndSize("Images/HeaderHintArrowLeft.png", 13, 19);
        this.hintArrowLeft.setPosition(-this.hintArrowLeft.width - 12, -(this.height - this.hintArrowLeft.height)/2 - 1);

        this.hintArrowRight = new BVLayer(this);
        this.hintArrowRight.setContentsURLAndSize("Images/HeaderHintArrowRight.png", 13, 19);
        this.hintArrowRight.setPosition(this.width + 11, this.hintArrowLeft.y);
    },
    
    updateHintArrowPositionWithLevel: function (level) {
        var xOffset = (level === 3) ? (-102) : 0;
        var yOffset = (level === 3) ? (-16) : 0;
        this.hintArrowLeft.setPosition(-this.hintArrowLeft.width - 12 + xOffset, this.hintArrowRight.y + yOffset);
    },

    //----------------------------------------------------------
    //
    // road
    
    addRoad: function () {
        this.road = new LadderHeaderRoad(this);
    },
    
    setLevel: function (level) {
        this.road.setLevel(level);
        
        this.state.vx = 0;
        this.state.x = this.road.getProgress() * this.progressWidth;

        this.state.level = level;
        
        this.gridBubble.setActive(level === 3);
        
        this.updateHintArrowPositionWithLevel(level);
    },
    
    
    //----------------------------------------------------------
    //
    // active
    
    setActive: function (active) {
        this.state.isActive = active;
        this.state.isScaling = true;
        this.state.x = 0;
        this.state.vx = active ? 500 : 0;
        this.road.setProgress(0);
    },
    
    wantsDown: function () {
        return this.state.isActive && this.state.wantsDown;
    },
    
    wantsCar: function () {
        return !this.state.isActive || this.state.isScaling;
    },
    
    
    //----------------------------------------------------------
    //
    // tick
    
    wantsTick: function () {
        return this.state.isScaling || this.state.isJumping || (this.state.isActive && this.state.vx != 0) || this.gridBubble.wantsTick();
    },

    tickWithTimeInterval: function (dt, commands) {
        var state = this.state;
        state.wantsDown = false;

        if (state.isScaling) {
            this.tickScalingWithTimeInterval(dt,commands);
        }
        else if (state.isActive) {
            this.tickXWithTimeInterval(dt,commands);
            this.tickYWithTimeInterval(dt,commands);
        }
        
        this.gridBubble.tickWithTimeInterval(dt,commands);
    },
            
    tickScalingWithTimeInterval: function (dt, commands) {
        var state = this.state;
        var isGrowing = state.isActive;
        
        var dProgress = dt / (isGrowing ? 0.5 : -0.25);
        var p = state.scaleProgress = (state.scaleProgress + dProgress).limit(0,1);
        
        var scale
        if (isGrowing) {
            scale = (p < 0.3) ? remap(p, 0.0, 0.3, 0.2, 1.2) :
                    (p < 0.6) ? remap(p, 0.3, 0.6, 1.2, 0.9) :
                    (p < 0.8) ? remap(p, 0.6, 0.8, 0.9, 1.05) :
                                remap(p, 0.8, 1.0, 1.05, 1.0);
        }
        else {
            scale = lerp(0.2, 1.0, p);
        }

        this.setHidden(false);
        this.setScale(scale);
        this.setOpacity(remap(p, 0.0, isGrowing ? 0.4 : 1.0, 0.0, 1.0).limit(0,1));
        
        if (isGrowing && p == 1.0) { 
            state.isScaling = false;
        }
        else if (!isGrowing && p == 0) {
            state.isScaling = false;
            this.setHidden(true);
        }
    },
    
    tickXWithTimeInterval: function (dt, commands) {
        var state = this.state;
        state.isAccelerating = (commands.left || commands.right) && !(commands.left && commands.right);
        
        if (state.level >= 2) {
            state.vx = !state.isAccelerating ? 0 : commands.left ? -400 : 400;
        }
        else {
            if (state.isAccelerating) {
                state.isFacingRight = !!commands.right;
                var isTurningAround = (state.isFacingRight && state.vx < 0) || (state.isFacingLeft && state.vx > 0);
                var acceleration = 1000 * (state.isFacingRight ? 1 : -1) * (isTurningAround ? 2 : 1);
                state.vx += dt * acceleration;
                state.vx = state.vx.limit(-800,800);
            }
            else {
                state.vx *= Math.pow(0.9, dt / 0.02);
                if (Math.abs(state.vx) < 20) { state.vx = 0; }
            }
        }
        
        state.x += dt * state.vx;
        state.x = state.x.limit(0, this.progressWidth);
        if (state.x == 0 || state.x == this.progressWidth) { state.vx = 0; }
        
        var progress = state.x / this.progressWidth;
        this.road.setProgress(progress);
        if (state.level == 3) {
            this.gridBubble.setProgress(progress);
        }
    },

    tickYWithTimeInterval: function (dt, commands) {
        var state = this.state;
        state.wantsDown = false;

        if (state.isJumping) {
            var oldY = state.y;
            var targetY = this.baseY + this.levelHeight * state.jumpLevel;
            
            state.vy -= dt * this.gravity;
            state.y  += dt * state.vy;
            
            if (oldY > targetY && state.y <= targetY) {
                if (!state.didBounce) {
                    state.didBounce = true;
                    state.vy = 240;
                    state.y = targetY + 1;
                    this.setLevel(state.jumpLevel);
                }
                else {
                    state.y = targetY;
                    state.isJumping = false;
                }
            }
            this.setY(state.y);
        }
        else if (!(commands.up && commands.down)) {
            if ((commands.up && state.level < 3) || (commands.down && state.level > 1)) {
                state.isJumping = true;
                state.jumpLevel = state.level + (commands.up ? 1 : -1);
                state.y += commands.up ? 1 : -1;
                state.vy = commands.up ? 720 : 0;
                state.didBounce = false;
            }
            else if (commands.down && state.level == 1) {
                state.wantsDown = true;
            }
        }
    }
    
    
});


//====================================================================================
//
//  LadderHeaderGridBubble

var LadderHeaderGridBubble = new Class({

    Extends: BVLayer,

    initialize: function (superlayer) {
        this.parent(superlayer);

        this.state = {
            isScaling:false,
            scaleProgress:0,

            isActive:false
        };
        
        this.gridScale = 0.27;
        this.setSize(Math.round(364 * this.gridScale), Math.round(300 * this.gridScale));
        this.element.setStyle(BVLayer.addPrefixToStyleName("TransformOrigin"), "50% 50%");

        this.setPosition(-74, -21);
        
        this.addImage();
        this.addGrid();
        this.setHidden(true);
    },

    //----------------------------------------------------------
    //
    // active
    
    setActive: function (active) {
        this.state.isActive = active;
        this.state.isScaling = true;
    },
    
    //----------------------------------------------------------
    //
    // grid
    
    addGrid: function  () {
        this.grid = new BVLayer(this);
        this.grid.setContentsURLAndSize("Images/GridPrerendered.png", this.width, this.height);
        this.grid.setPosition(0,-2);
        
        this.marker = new BVLayer(this.grid);
        this.marker.setContentsURLAndSize("Images/HeaderGridBubbleMarker.png", 5, 87);
        this.marker.setY(3);
    },
    
    setProgress: function (progress) {
        this.marker.setX(progress * this.grid.width - 2);
    },

    //----------------------------------------------------------
    //
    // image
    
    addImage: function () {
        this.image = new BVLayer(this);
        this.image.setContentsURLAndSize("Images/HeaderBubbleGrid.png", 184, 148);
        this.image.setPosition(0.5 * (this.width - this.image.width), -0.5 * (this.height - this.image.height));

        if (gPulsateBubbles) {
            this.image.element.setStyle(BVLayer.addPrefixToStyleName("TransformOrigin"), "50% 50%");
            this.image.element.setStyle(BVLayer.addPrefixToStyleName("AnimationDuration"), "1s");
            this.image.element.setStyle(BVLayer.addPrefixToStyleName("AnimationTimingFunction"), "linear");
            this.image.element.setStyle(BVLayer.addPrefixToStyleName("AnimationDirection"), "alternate");
            this.image.element.setStyle(BVLayer.addPrefixToStyleName("AnimationIterationCount"), "infinite");
            this.image.element.setStyle(BVLayer.addPrefixToStyleName("AnimationName"), "LadderHeaderBubbleBounce");
        }
    },

    //----------------------------------------------------------
    //
    // tick
    
    wantsTick: function () {
        return this.state.isScaling;
    },

    tickWithTimeInterval: function (dt, commands) {
        if (this.state.isScaling) {
            this.tickScalingWithTimeInterval(dt,commands);
        }
    },
            
    tickScalingWithTimeInterval: function (dt, commands) {
        var state = this.state;
        var isGrowing = state.isActive;
        
        var dProgress = dt / (isGrowing ? 0.5 : -0.25);
        var p = state.scaleProgress = (state.scaleProgress + dProgress).limit(0,1);
        
        var scale
        if (isGrowing) {
            scale = (p < 0.3) ? remap(p, 0.0, 0.3, 0.2, 1.2) :
                    (p < 0.6) ? remap(p, 0.3, 0.6, 1.2, 0.9) :
                    (p < 0.8) ? remap(p, 0.6, 0.8, 0.9, 1.05) :
                                remap(p, 0.8, 1.0, 1.05, 1.0);
        }
        else {
            scale = lerp(0.2, 1.0, p);
        }

        this.setHidden(false);
        this.setScale(scale);
        this.setOpacity(remap(p, 0.0, isGrowing ? 0.4 : 1.0, 0.0, 1.0).limit(0,1));
        
        if (isGrowing && p == 1.0) { 
            state.isScaling = false;
        }
        else if (!isGrowing && p == 0) {
            state.isScaling = false;
            this.setHidden(true);
        }
    }
    
});



//====================================================================================
//
//  LadderHeaderRoad

var LadderHeaderRoad = new Class({

    Extends: BVLayer,

    initialize: function (superlayer) {
        this.parent(superlayer);
        
        this.turningDegrees = 2;
        this.maxTurningDegrees = 5;
        this.minTimeIndex = 0;
        
        this.arcDegrees = 40;
        this.maxArcDegrees = 90;
        
        this.timeIndex = this.minTimeIndex;
        this.isCarFacingRight = true;
        
        this.metrics = gLadderRoadMetrics;
        this.styles = gLadderRoadStyles;
        this.setSize(292, 90);
        
        this.addCanvas();
        
        this.level = 1;
        this.setTurningAndArcDegrees(this.turningDegrees, this.arcDegrees);
    },

    //----------------------------------------------------------
    //
    // level

    setLevel: function (level) {
        if (level == this.level) { return; }
        this.level = level;
        
        this.updateDisplay();
    },
    
    setTurningAndArcDegrees: function (turningDegrees, arcDegrees) {
        arcDegrees = arcDegrees.round();

        this.turningDegrees = turningDegrees;
        this.arcDegrees = arcDegrees;
        
        var shouldUpdateBackCanvas = false;
        if (!this.sweep || this.sweep.arcDegrees != this.arcDegrees) {
            this.sweep = LadderSimulationTurningSweepCreate(this.metrics, this.arcDegrees, 0, this.maxTurningDegrees, 0.125);
            this.sweep.getSimulations().each(function (simulation) { simulation.getStates(); }, this);  // force all simulations now
            shouldUpdateBackCanvas = true;
        }

        var simulations = this.sweep.getSimulations();
        var simulation = simulations[lerp(0, simulations.length - 1, this.turningDegrees / this.maxTurningDegrees).round()];
        
        if (this.simulation != simulation) {
            this.simulation = simulation;
            
            if (shouldUpdateBackCanvas) { this.updateBackCanvas(); }
            this.updateTrajectoryCanvas();
        }
    },
    
    //----------------------------------------------------------
    //
    // progress
    
    getProgress: function () {
        return (this.level == 1) ? ((this.timeIndex - this.minTimeIndex) / (this.simulation.getStates().length - this.minTimeIndex)) :
               (this.level == 2) ? (1.0 - this.turningDegrees / this.maxTurningDegrees) :
                                   (this.arcDegrees / this.maxArcDegrees);
    },
    
    setProgress: function (progress) {
        progress = progress.limit(0,1);
        if (this.level == 1) {
            var timeIndex = lerp(this.minTimeIndex, this.simulation.getStates().length, progress).round(); 
            if (timeIndex == this.timeIndex) { return; }
            this.isCarFacingRight = (timeIndex > this.timeIndex);
            this.timeIndex = timeIndex;
            this.updateCarWithSimulationAtTime(this.simulation, this.timeIndex);
        }
        else if (this.level == 2) {
            this.setTurningAndArcDegrees((1.0 - progress) * this.maxTurningDegrees, this.arcDegrees);
        }
        else if (this.level == 3) {
            this.setTurningAndArcDegrees(this.turningDegrees, progress * this.maxArcDegrees);
        }
    },
    
    //----------------------------------------------------------
    //
    // canvas

    addCanvas: function () {
        this.canvasWidth = this.width;
        this.canvasHeight = this.height;

        var canvasStyles = { "position":"absolute", "top":0, "left":0 };
        this.canvas = (new Element("canvas", { styles:canvasStyles, width:this.canvasWidth, height:this.canvasHeight })).inject(this.element);
        this.trajectoryCanvas = (new Element("canvas", { styles:canvasStyles, width:this.canvasWidth, height:this.canvasHeight })).inject(this.element);
        this.carCanvas = (new Element("canvas", { styles:canvasStyles, width:this.canvasWidth, height:this.canvasHeight })).inject(this.element);
        
        this.canvasMaskImage = new Image();
        this.canvasMaskImage.src = "Images/HeaderBubbleMask.png";
        this.canvasMaskImage.onload = this.imageDidLoad.bind(this);

        this.carImage = new Image();
        this.carImage.src = "Images/Car.png";
        this.carImage.onload = this.imageDidLoad.bind(this);
        this.carShadowImage = new Image();
        this.carShadowImage.src = "Images/CarShadow.png";
        this.carShadowImage.onload = this.imageDidLoad.bind(this);

        this.canvasScale = 0.72;
        this.canvasOffsetX = 2;
        this.canvasOffsetY = 14;
    },
    
    imageDidLoad: function () {
        if (this.imagesLoaded || !this.canvasMaskImage.complete || !this.carImage.complete || !this.carShadowImage.complete) { return; }

        this.imagesLoaded = true;
        this.updateDisplay();
    },
    
    updateDisplay: function () {
        this.updateBackCanvas();
        this.updateTrajectoryCanvas();
        
        this.carCanvas.setStyle("display", (this.level <= 1) ? "block" : "none");
        if (this.level <= 1) {
            this.updateCarWithSimulationAtTime(this.simulation, this.timeIndex);
        }
    },
    
    updateBackCanvas: function () {
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);
        
        this.drawIntoClippedContext(ctx, function () {
            this.drawRoadWithSimulation(this.simulation);
            
            if (this.level >= 2) {
                this.sweep.getSimulations().each( function (simulation) {
                    this.drawTrajectoryWithSimulation(simulation, true);
                }, this);
            }
        }, this);
    },

    updateTrajectoryCanvas: function () {
        this.trajectoryCanvas.setStyle("display", (this.level <= 2) ? "block" : "none");
        if (this.level > 2) { return; }

        var ctx = this.trajectoryCanvas.getContext("2d");
        ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);

        this.drawIntoClippedContext(ctx, function () {
            this.drawTrajectoryWithSimulation(this.simulation, false);
        }, this);
    },
    
    drawIntoClippedContext: function (ctx,func,bind) {
        ctx.save();
        ctx.scale(this.canvasScale, this.canvasScale);
        ctx.translate(this.canvasOffsetX, this.canvasOffsetY);
        
        func.call(bind,ctx);
        
        ctx.restore();
        
        if (this.canvasMaskImage.complete) {
            ctx.save();
            ctx.globalCompositeOperation = "destination-in";
            ctx.drawImage(this.canvasMaskImage, 0, 0);
            ctx.restore();
		}
    },
    
    drawRoadWithSimulation: function (simulation) {
        var ctx = this.canvas.getContext("2d");
        ctx.lineCap = "butt";

        ctx.strokeStyle = (this.level >= 2) ? this.styles.roadColorSweep : this.styles.roadColor;
        ctx.lineWidth = this.metrics.roadWidth;
        ctx.beginPath();
        simulation.addRoadPathToContext(ctx);
        ctx.stroke();

        ctx.strokeStyle = (this.level >= 2) ? this.styles.roadLineColorSweep : this.styles.roadLineColor;
        ctx.lineWidth = this.styles.roadLineWidth;
        ctx.beginPath();
        simulation.addRoadPathToContext(ctx);
        ctx.stroke();
    },
    
    drawTrajectoryWithSimulation: function (simulation, isSweep) {
        var ctx = (isSweep ? this.canvas : this.trajectoryCanvas).getContext("2d");

        if (isSweep) {
            ctx.lineWidth = this.styles.sweepWidth;
            ctx.strokeStyle = "rgba(0,0,255,0.18)";
        }
        else {
            ctx.lineWidth = this.styles.trajectoryWidth;
            ctx.strokeStyle = this.styles.trajectoryColor;
        }
        
        simulation.addTrajectoryPathToContext(ctx);
        ctx.stroke();
    },

    updateCarWithSimulationAtTime: function (simulation, timeIndex) {
        var states = simulation.getStates();
        var stateIndex = timeIndex.limit(0, states.length - 1).round();
        var state = states[stateIndex];

        var ctx = this.carCanvas.getContext("2d");
        ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);

        var scale = this.canvasScale;

        ctx.save();
        ctx.translate(scale * this.canvasOffsetX, scale * this.canvasOffsetY);
        
        ctx.save();
        ctx.translate(scale * state.x, scale * state.y + 2);
        ctx.rotate(state.angle + (this.isCarFacingRight ? 0 : Math.PI));
        if (this.carShadowImage.complete) { ctx.drawImage(this.carShadowImage, -21, -13); }
        ctx.restore();

        ctx.translate(scale * state.x, scale * state.y);
        ctx.rotate(state.angle + (this.isCarFacingRight ? 0 : Math.PI));
        if (this.carImage.complete) { ctx.drawImage(this.carImage, -16, -8); }
        
        ctx.restore();
        
        if (this.canvasMaskImage.complete) {
            ctx.save();
            ctx.globalCompositeOperation = "destination-in";
            ctx.drawImage(this.canvasMaskImage, 0, 0);
            ctx.restore();
		}
    }
    
});


//====================================================================================
//
//  LadderHeaderKeyboard

var LadderHeaderKeyboard = new Class({

    Extends: BVLayer,

    initialize: function (superlayer) {
        this.parent(superlayer);
        this.game = this.getAncestorWithClass(LadderHeaderGame);
        
        this.downKeys = {};

        this.left = new LadderHeaderKey(this, "left");
        var keySize = this.left.getSize();
        this.left.setPosition(0, -keySize.height - 1);

        this.up = new LadderHeaderKey(this, "up");
        this.up.setPosition(keySize.width + 1, 0);
        
        this.down = new LadderHeaderKey(this, "down");
        this.down.setPosition(keySize.width + 1, -keySize.height - 1);

        this.right = new LadderHeaderKey(this, "right");
        this.right.setPosition(2 * (keySize.width + 1), -keySize.height - 1);
        
        this.helpText = new BVText(this);
        this.helpText.setTextClass("LadderHeaderKeyboardHelpText");
        this.helpText.setHTML("use arrow keys");
        this.helpText.setSize(100,14);
        this.helpText.setPosition(0.5 * (90 - this.helpText.width), 14);
        this.helpText.setHidden(BVLayer.isTouch);
    },
    
    updateHighlightsWithNames: function (names) {
        this.left.setHighlighted(!!names.left);
        this.up.setHighlighted(!!names.up);
        this.down.setHighlighted(!!names.down);
        this.right.setHighlighted(!!names.right);
    },
    
    isKeyDownWithName: function (name) {
        return !!this.downKeys[name];
    },

    keyDidGoDownWithName: function (name) {
        if (this.downKeys[name]) { return; }
        this.downKeys[name] = true;
        this.game.updateActiveCommands();
    },

    keyDidGoUpWithName: function (name) {
        if (!this.downKeys[name]) { return; }
        delete this.downKeys[name];
        this.game.updateActiveCommands();
    },
    
    removeHelpText: function () {
        this.helpText.setHidden(true);
    }
    
});


//====================================================================================
//
//  LadderHeaderKey

var LadderHeaderKey = new Class({

    Extends: BVLayer,

    initialize: function (superlayer, name) {
        this.parent(superlayer);
        this.name = name;
        this.keyboard = this.getAncestorWithClass(LadderHeaderKeyboard);

        this.setTouchable(true);
        this.element.setStyle("cursor", "pointer");
        
        var isTouch = BVLayer.isTouch;
        var keyWidth = isTouch ? 49 : 29;
        var keyHeight = isTouch ? 29 : 19;
        
        var capitalizedName = name.substring(0,1).toUpperCase() + name.substring(1);
        this.setContentsURLAndSize("Images/HeaderKey" + (isTouch ? "Touch" : "") + capitalizedName + ".png", keyWidth, keyHeight);

        this.highlight = new BVLayer(this);
        this.highlight.setContentsURLAndSize("Images/HeaderKey" + (isTouch ? "Touch" : "") + "Highlight.png", keyWidth, keyHeight);
        this.highlight.setHidden(true);
    },
    
    setHighlighted: function (highlighted) {
        this.highlight.setHidden(!highlighted);
    },
    
    touchDidGoDown: function (touches) {
        this.keyboard.keyDidGoDownWithName(this.name);
    },

    touchDidGoUp: function (touches) {
        this.keyboard.keyDidGoUpWithName(this.name);
    }

});




//====================================================================================

})();

