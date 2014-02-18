/*
 * This template file is meant to be a template for canvas-based
 * web page code.  Nothing here is set in stone; it is mainly
 * intended to save you some typing.
 */
// Yes, we can use jQuery here, but avoid it just in case you
// really don't want to use it.  We do still keep things away
// from the global namespace.
window['EightBitSpriteLibrary'] = window['EightBitSpriteLibrary'] || {};

window['EightBitSpriteLibrary'].mario = (function () {
    var mario = {
        draw: function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/marioIdle.png";
            drawing.onload = function () {
                renderingContext.drawImage(drawing, -30, 465);
            }

            console.log("HERE");
        },
    };

    return mario;
}());
