//
//  Misc.js
//  LadderOfAbstraction
//
//  Created by Bret Victor on 8/21/11.
//  (c) 2011 Bret Victor.  MIT open-source license.
//

var lerp = function (a,b,t) { return a + (b - a) * t; };
var remap = function (x,fromLow,fromHigh,toLow,toHigh) { return lerp(toLow, toHigh, (x - fromLow) / (fromHigh - fromLow)); };
var hypot = function (a,b) { return Math.sqrt(a*a + b*b); };
var deg2rad = function (deg) { return deg * Math.PI / 180; };
var rad2deg = function (rad) { return rad / Math.PI * 180; };

