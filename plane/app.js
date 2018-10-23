/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var plane_1 = __webpack_require__(4);
var drop_1 = __webpack_require__(1);
var list_1 = __webpack_require__(3);
var mathUtil_1 = __webpack_require__(5);
var Stage = (function () {
    function Stage(canvas) {
        this.tick = 0;
        this.tickTime = 0;
        this.interval = 1000 / 60;
        this.dropList = new list_1.default();
        this.images = {};
        this.nextItemTick = 0;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }
    ;
    Stage.prototype.prepare = function () {
        if (this.touches) {
            this.canvasTouch = {
                x: this.touches[0].pageX,
                y: this.touches[0].pageY,
            };
        }
    };
    ;
    Stage.prototype.action = function () {
        var stage = this;
        stage.createDrop();
        this.dropList.filter(function (drop) {
            drop.move(stage.interval);
            if (drop.isDelete) {
                return false;
            }
            if (mathUtil_1.default.collision(drop, stage.plane)) {
                return false;
            }
        });
        this.plane.move();
    };
    ;
    Stage.prototype.render = function () {
        var stage = this, context = stage.context;
        context.clearRect(0, 0, canvas.width, canvas.height);
        stage.dropList.forEach(function (drop) {
            drop.draw(context);
        });
        this.plane.draw(context);
    };
    Stage.prototype.loop = function (time) {
        var stage = this;
        !time ? time = new Date().getTime() : 0;
        if (time > stage.tickTime + 50) {
            stage.tickTime = time;
            stage.tick++;
        }
        this.prepare();
        this.action();
        this.render();
        var now = new Date().getTime();
        var delay = time + this.interval - now;
        delay < 0 ? delay = 0 : 0;
        setTimeout(function () {
            stage.loop(now);
        }, delay);
    };
    ;
    Stage.prototype.start = function (option) {
        var stage = this;
        stage.h = option.h;
        stage.w = option.w;
        loadImg("image/ship.png").then(function (plane) {
            stage.images.plane = plane;
            stage.plane = new plane_1.default({
                x: stage.w / 2 - 12,
                y: stage.h - 24 - 50,
                w: 24,
                h: 24,
                stage: stage,
                vx: 0,
                vy: 0,
                image: stage.images.plane
            });
            stage.loop();
        });
        this.canvas.addEventListener('touchmove', function (e) {
            stage.touches = e.targetTouches;
        });
        this.canvas.addEventListener('touchstart', function (e) {
            stage.touches = e.targetTouches;
        });
        this.canvas.addEventListener('mousemove', function (e) {
            stage.canvasTouch = { x: e.clientX, y: e.clientY };
        });
    };
    ;
    Stage.prototype.createDrop = function () {
        var stage = this;
        if (stage.tick >= stage.nextItemTick) {
            stage.dropList.append(new drop_1.default({
                x: Math.random() * (stage.w - 24),
                y: 0,
                w: 24,
                h: 24,
                stage: stage,
                vx: 0,
                vy: 0.02 + Math.random() * (0.08),
                image: stage.images.plane
            }));
            stage.nextItemTick = stage.tick + Math.floor(Math.random() * 20);
        }
    };
    return Stage;
}());
function loadImg(src) {
    var img = new Image();
    return new Promise(function (resolve, reject) {
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function () {
            resolve(img);
        };
        img.src = src;
    });
}
var canvas = document.getElementById("cas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
new Stage(canvas).start({ h: canvas.height, w: canvas.width });
window.ontouchstart = function (e) {
    e.preventDefault();
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var baseSprite_1 = __webpack_require__(2);
var Drop = (function (_super) {
    __extends(Drop, _super);
    function Drop(option) {
        var _this = _super.call(this, option) || this;
        _this.image = option.image;
        return _this;
    }
    Drop.prototype.move = function (time) {
        this.y += this.vy * time;
        if (this.y > this.stage.h) {
            this.isDelete = true;
        }
    };
    Drop.prototype.draw = function (context) {
        var sheetCode = (Math.floor((this.stage.tick - this.sheetStartTick) / 5) % 7);
        context.drawImage(this.image, sheetCode * this.w, 0, this.w, this.h, this.x, this.y, this.w, this.h);
    };
    return Drop;
}(baseSprite_1.default));
exports.default = Drop;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BaseSprite = (function () {
    function BaseSprite(param) {
        this.isDelete = false;
        this.stage = param.stage;
        this.h = param.h;
        this.w = param.w;
        this.x = param.x;
        this.y = param.y;
        this.vx = param.vx;
        this.vy = param.vy;
        this.sheetStartTick = this.stage.tick;
    }
    return BaseSprite;
}());
exports.default = BaseSprite;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var List = (function () {
    function List() {
        this.length = 0;
    }
    ;
    List.prototype.append = function (data) {
        var cNode = new Node(data);
        if (this.length === 0) {
            this.tail = this.head = cNode;
        }
        else {
            cNode.prev = this.tail;
            this.tail.next = cNode;
            this.tail = cNode;
        }
        this.length++;
    };
    ;
    List.prototype.prepend = function (data) {
        var cNode = new Node(data);
        if (this.length === 0) {
            this.tail = this.head = cNode;
        }
        else {
            cNode.next = this.head;
            this.head.prev = cNode;
            this.head = cNode;
        }
        this.length++;
    };
    ;
    List.prototype.forEach = function (fun) {
        var cNode = this.head, index = 0;
        while (cNode) {
            fun(cNode.data, index);
            cNode = cNode.next;
            index++;
        }
    };
    ;
    List.prototype.filter = function (fun) {
        var list = this;
        var cNode = this.head, index = 0;
        var delCounter = 0;
        while (cNode) {
            var next = cNode.next;
            var flag = fun(cNode.data, index);
            if (flag === false) {
                delCounter++;
                if (this.length === delCounter) {
                    list.head = list.tail = null;
                }
                else {
                    if (list.head === cNode) {
                        list.head = cNode.next;
                        cNode.next.prev = null;
                    }
                    else if (list.tail === cNode) {
                        list.tail = cNode.prev;
                        cNode.prev.next = null;
                    }
                    else {
                        cNode.prev.next = cNode.next;
                        cNode.next.prev = cNode.prev;
                    }
                    cNode.prev = null;
                    cNode.next = null;
                    cNode.data = null;
                }
            }
            cNode = next;
            index++;
        }
        list.length -= delCounter;
    };
    ;
    return List;
}());
exports.default = List;
var Node = (function () {
    function Node(data) {
        this.prev = null;
        this.next = null;
        this.data = data;
    }
    ;
    return Node;
}());


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mathUtil_1 = __webpack_require__(5);
var baseSprite_1 = __webpack_require__(2);
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane(option) {
        var _this = _super.call(this, option) || this;
        _this.image = option.image;
        return _this;
    }
    Plane.prototype.move = function () {
        if (this.stage.canvasTouch) {
            this.x = this.stage.canvasTouch.x - this.w / 2;
            this.y = this.stage.canvasTouch.y - this.h / 2;
            this.x = mathUtil_1.default.between(this.x, 0, this.stage.w - this.w);
            this.y = mathUtil_1.default.between(this.y, 0, this.stage.h - this.h);
        }
    };
    Plane.prototype.draw = function (context) {
        var sheetCode = (Math.floor((this.stage.tick - this.sheetStartTick) / 5) % 7);
        context.drawImage(this.image, sheetCode * this.w, 0, this.w, this.h, this.x, this.y, this.w, this.h);
    };
    return Plane;
}(baseSprite_1.default));
exports.default = Plane;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    between: function (val, a, b) {
        if (a > b) {
            _a = [b, a], a = _a[0], b = _a[1];
        }
        if (val < a) {
            val = a;
        }
        else if (val > b) {
            val = b;
        }
        return val;
        var _a;
    },
    collision: function (spriteA, spriteB) {
        if (spriteA.y + spriteA.h < spriteB.y || spriteB.y + spriteB.h < spriteA.y) {
            return false;
        }
        if (spriteA.x + spriteA.w < spriteB.x || spriteB.x + spriteB.w < spriteA.x) {
            return false;
        }
        return true;
    }
};


/***/ })
/******/ ]);