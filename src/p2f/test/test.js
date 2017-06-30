import * as p2f from '../app';
import {it} from "mocha";

describe("p2f", function () {
    describe("api", function () {

        it("should return valid api functions", function () {
            should.exist(p2f.getApi().setCurrentPage);
            should.exist(p2f.getApi().getCurrentZoom);
            should.exist(p2f.getApi().setCurrentZoom);
        });

        it("should return an array with more than one element", function () {
            should(p2f.getSettings().length).be.above(0);
        });

        it("should have a title in the settings", function () {
            p2f.getSetting("Title").should.not.be.empty();
        });

        it("should throw on an invalid property", function () {
            (function () {
                p2f.getSetting("blah");
            }).should.throw(RangeError);
        });

        it("should return page1's svg element", function () {
            let svg = p2f.getSvg("Page1");
            should.exist(svg);
            svg.tagName.should.be.exactly("svg");
        });

        it("should return page1's IFrame element", function () {
            let iframe = p2f.getSvgIFrame("Page1");
            should.exist(iframe);
            iframe.tagName.should.be.exactly("IFRAME");
        });
    });

    describe("Document", function () {
        it("should display the document", function () {
            should.exist(document.getElementById("doc1").contentWindow.document.getElementById("Page1"));
        });

        it("should rotate the document", function () {
            let page1 = p2f.getSvg("Page1");

            //Get the viewBox before and make sure that the two final values swap
            let viewBoxBefore = page1.attributes.getNamedItem("viewBox").value.split(" ");

            p2f.getApi().Rotate();

            let viewBoxAfter = page1.attributes.getNamedItem("viewBox").value.split(" ");

            viewBoxBefore[2].should.be.exactly(viewBoxAfter[3]);
            viewBoxBefore[3].should.be.exactly(viewBoxAfter[2]);

            p2f.rotate();
            p2f.rotate();
            p2f.rotate();
        });

        it("should zoom in/out", function () {

            //Zoom in and then out and check that the view expanded and then returned to the original size

            let currentZoom = p2f.getApi().getCurrentZoom();
            p2f.getApi().setCurrentZoom(100);
            let iframe = p2f.getSvgIFrame("Page1");
            let originalIFrameWidth = p2f.getSvgIFrame("Page1").attributes.getNamedItem("width").value;
            let originalIFrameHeight = p2f.getSvgIFrame("Page1").attributes.getNamedItem("height").value;

            p2f.zoomIn(10);

            let newIFrameWidth = p2f.getSvgIFrame("Page1").attributes.getNamedItem("width").value;
            let newIFrameHeight = p2f.getSvgIFrame("Page1").attributes.getNamedItem("height").value;
            let newZoom = p2f.getApi().getCurrentZoom();

            should(newIFrameWidth).be.above(originalIFrameWidth);
            should(newIFrameHeight).be.above(originalIFrameHeight);
            should(newZoom).be.exactly(110);

            p2f.zoomOut(10);

            newIFrameWidth = p2f.getSvgIFrame("Page1").attributes.getNamedItem("width").value;
            newIFrameHeight = p2f.getSvgIFrame("Page1").attributes.getNamedItem("height").value;
            newZoom = p2f.getApi().getCurrentZoom();

            should(newIFrameWidth).be.exactly(originalIFrameWidth);
            should(newIFrameHeight).be.exactly(originalIFrameHeight);
            should(newZoom).be.exactly(100);

            p2f.getApi().setCurrentZoom(currentZoom);
        });

        it("should fit page", function() {
            //no way to really test this
            //as long as it doesn't throw, we'll consider it to be successful
            p2f.fitPage();
        });

        it("should fit width", function () {
            //no way to really test this
            //as long as it doesn't throw, we'll consider it to be successful
            p2f.fitWidth();
        });

        it("should go fullscreen", function () {
            p2f.fullscreen();
        });
    });
});