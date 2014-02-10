/*
 * This template file is meant to be a template for canvas-based
 * web page code.  Nothing here is set in stone; it is mainly
 * intended to save you some typing.
 */
// Yes, we can use jQuery here, but avoid it just in case you
// really don't want to use it.  We do still keep things away
// from the global namespace.
(function () {
    // Ditto on using jQuery here.
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        
        startingX = 300,
        startingY = 100,
        currentX = startingX,
        currentY = startingY,
        pixelSize = 20;

    // JD: See note in cube.js.
    var updateX = function (multiplier) {
        currentX = currentX + (multiplier * pixelSize);
        return currentX;
    } // JD: Missing semicolon.

    var updateY = function (multiplier) {
        currentY = currentY + (multiplier * pixelSize);
        return currentY;
    } // JD: Missing semicolon.
    
    var pacman = {
        drawData: {
            head: {
                fillColor: "yellow",
                moves: [[0, 0]],
                lines: [
                    [[5, 0], [0, 1], [2, 0], [0, 1], [1, 0], [0, 2], [-2, 0], [0, 1],
                     [-3, 0], [0, 1], [-3, 0], [0, 1], [3, 0], [0, 1], [3, 0], [0, 1],
                     [2, 0], [0, 2], [-1, 0], [0, 1], [-2, 0], [0, 1], [-5, 0], [0, -1],
                     [-2, 0], [0, -1], [-1, 0], [0, -2], [-1, 0], [0, -5], [1, 0], 
                     [0, -2], [1, 0], [0, -1], [2, 0], [0, -1]]
                ]
            }
        } 
    };

    for (var parts in pacman["drawData"]) {
        renderingContext.beginPath();
        for (var i = 0; i < pacman["drawData"][parts].moves.length; i++) {
            renderingContext.fillStyle = pacman["drawData"][parts].fillColor;
            renderingContext.moveTo(updateX(pacman["drawData"][parts].moves[i][0]), 
                                    updateY(pacman["drawData"][parts].moves[i][1]));
            
            for (var j = 0; j < pacman["drawData"][parts].lines[i].length; j++) {
                renderingContext.lineTo(updateX(pacman["drawData"][parts].lines[i][j][0]),
                                        updateY(pacman["drawData"][parts].lines[i][j][1]));
            }
        }
        renderingContext.fill();
    }
}());
