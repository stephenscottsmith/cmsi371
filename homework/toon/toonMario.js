/*
 * This template file is meant to be a template for canvas-based
 * web page code.  Nothing here is set in stone; it is mainly
 * intended to save you some typing.
 */
// Yes, we can use jQuery here, but avoid it just in case you
// really don't want to use it.  We do still keep things away
// from the global namespace.
window['EightBitSpriteLibrary'] = window['EightBitSpriteLibrary'] || {};

// JD: Just as a note: officially, you shouldn't have copied this file
//     into a new version.  Instead, you should have refactored your
//     original sprite in place.  However, I will make an exception for
//     for you because I know that you essentially overhauled your sprite
//     approach to better match the original 8-bit style from the 1980s.
window['EightBitSpriteLibrary'].mario = (function () {
    var loadImage = function (filename) {
            var drawing = new Image();
            drawing.src = filename;
            return drawing;
        };

    var mario = {
        lastImage: 0,
        walkArray: [
            loadImage("PNG/marioIdle.png"),
            loadImage("PNG/marioWalk.png")
        ],

        draw: function (renderingContext) {
            renderingContext.drawImage(mario.walkArray[mario.lastImage], -30, 465);
            mario.lastImage = (mario.lastImage + 1) % mario.walkArray.length;
        },
    };

    return mario;
}());
