/*
 * This template file is meant to be a template for canvas-based
 * web page code.  Nothing here is set in stone; it is mainly
 * intended to save you some typing.
 */
// Yes, we can use jQuery here, but avoid it just in case you
// really don't want to use it.  We do still keep things away
// from the global namespace.
window['EightBitSpriteLibrary'] = window['EightBitSpriteLibrary'] || {};

window['EightBitSpriteLibrary'].pac = (function () {
    var loadImage = function (filename) {
            var drawing = new Image();
            drawing.src = filename;
            return drawing;
        };

    var pac = {
        lastImage: 0,
        walkArray: [
            loadImage("PNG/pacUp.png"),
            loadImage("PNG/pacClose.png")
        ],

        draw: function (renderingContext) {
            renderingContext.drawImage(pac.walkArray[pac.lastImage], 400, 227);
            pac.lastImage = (pac.lastImage + 1) % pac.walkArray.length;
        },
    };

    return pac;
}());
