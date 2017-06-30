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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// Print2Flash API documentation at: http://print2flash.com/help/UsingDocumentAPIforHTML5.php

const minimumZoomLevel = 10;
const maximumZoomLevel = 300;

/**
 * Gets a Print2Flash setting by name
 * @returns (string/int) setting value
 */
function getSetting(name) {
    var item = getSettings().getNamedItem(name);

    if (!item) {
        throw new RangeError("No setting with name \"" + name + "\"");
    }

    return item.value;
}

/**
 * Gets settings for Print2Flash document stored in an xml file loaded in an iframe
 * @returns (array) settings for this document
 */
function getSettings() {
    return document.getElementById("doc1").contentWindow.document.getElementById('Settings').contentWindow.document.documentElement.attributes;
}

/**
 * Returns
 * @returns {Document}
 */
function getApi() {
    return document.getElementById("doc1").contentDocument;
}

/**
 * Returns a reference to the IFrame the page with the id is being displayed in
 * @param id of the page
 * @returns {Element} the IFrame
 */
function getSvgIFrame(id) {
    return document.getElementById("doc1").contentDocument.getElementById(id);
}

/**
 * Returns a reference to the svg of the page with the id
 * @param id of the page
 * @returns {Element} the svg
 */
function getSvg(id) {
    return getSvgIFrame(id).contentDocument.getElementsByTagName("svg")[0];
}

/**
 * Zoom in by percent
 * @param percentage to zoom in by
 */
function zoomIn(percentage) {
    let newZoom = getApi().getCurrentZoom() + percentage;

    //Correct zoom level
    if (newZoom < minimumZoomLevel) {
        newZoom = minimumZoomLevel;
    } else if (newZoom > maximumZoomLevel) {
        newZoom = maximumZoomLevel;
    }

    getApi().setCurrentZoom(newZoom);
}

/**
 * Zoom out by percentage
 * @param percentage to zoom out by
 */
function zoomOut(percentage) {
    zoomIn(percentage * (-1));
}

/**
 * Rotate the document 90 degrees to clockwise
 */
function rotate() {
    getApi().Rotate();
}

/**
 * Fits the document to the width of the display
 */
function fitWidth() {
    getApi().setCurrentZoom("width");
}

/**
 * Fits one page to the display
 */
function fitPage() {
    getApi().setCurrentZoom("page");
}

/**
 * Show the document in full-screen mode
 */
function fullscreen() {
    throw new Error("Not implemented");
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__test__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__test___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__test__);







/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

let p2f = __webpack_require__(0);

describe("p2f", function () {
    describe("api", function () {

        it("should return valid api functions", function () {
            should.exist(getApi().setCurrentPage);
            should.exist(getApi().getCurrentZoom);
            should.exist(getApi().setCurrentZoom);
        });

        it("should return an array with more than one element", function () {
            should(getSettings().length).be.above(0);
        });

        it("should have a title in the settings", function () {
            getSetting("Title").should.not.be.empty();
        });

        it("should throw on an invalid property", function () {
            (function () {
                getSetting("blah");
            }).should.throw(RangeError);
        });

        it("should return page1's svg element", function () {
            let svg = getSvg("Page1");
            should.exist(svg);
            svg.tagName.should.be.exactly("svg");
        });

        it("should return page1's IFrame element", function () {
            let iframe = getSvgIFrame("Page1");
            should.exist(iframe);
            iframe.tagName.should.be.exactly("IFRAME");
        });
    });

    describe("Document", function () {
        it("should display the document", function () {
            should.exist(document.getElementById("doc1").contentWindow.document.getElementById("Page1"));
        });

        it("should rotate the document", function () {
            let page1 = getSvg("Page1");

            //Get the viewBox before and make sure that the two final values swap
            let viewBoxBefore = page1.attributes.getNamedItem("viewBox").value.split(" ");

            getApi().Rotate();

            let viewBoxAfter = page1.attributes.getNamedItem("viewBox").value.split(" ");

            viewBoxBefore[2].should.be.exactly(viewBoxAfter[3]);
            viewBoxBefore[3].should.be.exactly(viewBoxAfter[2]);

            rotate();
            rotate();
            rotate();
        });

        it("should zoom in/out", function () {

            //Zoom in and then out and check that the view expanded and then returned to the original size

            let currentZoom = getApi().getCurrentZoom();
            getApi().setCurrentZoom(100);
            let iframe = getSvgIFrame("Page1");
            let originalIFrameWidth = getSvgIFrame("Page1").attributes.getNamedItem("width").value;
            let originalIFrameHeight = getSvgIFrame("Page1").attributes.getNamedItem("height").value;

            zoomIn(10);

            let newIFrameWidth = getSvgIFrame("Page1").attributes.getNamedItem("width").value;
            let newIFrameHeight = getSvgIFrame("Page1").attributes.getNamedItem("height").value;
            let newZoom = getApi().getCurrentZoom();

            should(newIFrameWidth).be.above(originalIFrameWidth);
            should(newIFrameHeight).be.above(originalIFrameHeight);
            should(newZoom).be.exactly(110);

            zoomOut(10);

            newIFrameWidth = getSvgIFrame("Page1").attributes.getNamedItem("width").value;
            newIFrameHeight = getSvgIFrame("Page1").attributes.getNamedItem("height").value;
            newZoom = getApi().getCurrentZoom();

            should(newIFrameWidth).be.exactly(originalIFrameWidth);
            should(newIFrameHeight).be.exactly(originalIFrameHeight);
            should(newZoom).be.exactly(100);

            getApi().setCurrentZoom(currentZoom);
        });

        it("should fit page", function() {
            //no way to really test this
            //as long as it doesn't throw, we'll consider it to be successful
            fitPage();
        });

        it("should fit width", function () {
            //no way to really test this
            //as long as it doesn't throw, we'll consider it to be successful
            fitWidth();
        });

        it("should go fullscreen", function () {
            fullscreen();
        });
    });
});

/***/ })
/******/ ]);