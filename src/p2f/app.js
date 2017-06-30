module.exports = {
// Print2Flash API documentation at: http://print2flash.com/help/UsingDocumentAPIforHTML5.php

    minimumZoomLevel: 10,
    maximumZoomLevel: 300,

    /**
     * Gets a Print2Flash setting by name
     * @returns (string/int) setting value
     */
    getSetting: function (name) {
        var item = this.getSettings().getNamedItem(name);

        if (!item) {
            throw new RangeError("No setting with name \"" + name + "\"");
        }

        return item.value;
    },

    /**
     * Gets settings for Print2Flash document stored in an xml file loaded in an iframe
     * @returns (NamedNodeMap) settings for this document
     */
    getSettings: function () {
        return document.getElementById("doc1").contentWindow.document.getElementById('Settings').contentWindow.document.documentElement.attributes;
    },

    /**
     * Returns
     * @returns {Document}
     */
    getApi: function () {
        return document.getElementById("doc1").contentDocument;
    },

    /**
     * Returns a reference to the IFrame the page with the id is being displayed in
     * @param id of the page
     * @returns {Element} the IFrame
     */
    getSvgIFrame: function (id) {
        return document.getElementById("doc1").contentDocument.getElementById(id);
    },

    /**
     * Returns a reference to the svg of the page with the id
     * @param id of the page
     * @returns {Element} the svg
     */
    getSvg: function (id) {
        return this.getSvgIFrame(id).contentDocument.getElementsByTagName("svg")[0];
    },

    /**
     * Zoom in by percent
     * @param percentage to zoom in by
     */
    zoomIn: function (percentage) {
        let newZoom = this.getApi().getCurrentZoom() + percentage;

        //Correct zoom level
        if (newZoom < this.minimumZoomLevel) {
            newZoom = this.minimumZoomLevel;
        } else if (newZoom > this.maximumZoomLevel) {
            newZoom = this.maximumZoomLevel;
        }

        this.getApi().setCurrentZoom(newZoom);
    },

    /**
     * Zoom out by percentage
     * @param percentage to zoom out by
     */
    zoomOut: function (percentage) {
        this.zoomIn(percentage * (-1));
    },

    /**
     * Rotate the document 90 degrees to clockwise
     */
    rotate: function () {
        this.getApi().Rotate();
    },

    /**
     * Fits the document to the width of the display
     */
    fitWidth: function () {
        this.getApi().setCurrentZoom("width");
    },

    /**
     * Fits one page to the display
     */
    fitPage: function () {
        this.getApi().setCurrentZoom("page");
    },

    /**
     * Show the document in full-screen mode
     */
    fullscreen: function () {
        throw new Error("Not implemented");
    }
};