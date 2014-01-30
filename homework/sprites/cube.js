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
        startingY = 300,
        currentX = startingX,
        currentY = startingY,
        pixelSize = 20;

    var updateX = function (multiplier) {
        currentX = currentX + (multiplier * pixelSize);
        return currentX;
    }

    var updateY = function (multiplier) {
        currentY = currentY + (multiplier * pixelSize);
        return currentY;
    }
    
    var cube = {
        drawData: {
            orangeOutline: {
                fillColor: "orange",
                moves: [[0, 0]],
                lines: [
                    [[15, 0], [0, 1], [-14, 0], [0, 14], [-1, 0], [0, -15]]
                ]
            },

            goldInside: {
                fillColor: "#ffcc00",
                moves: [[1, 1]],
                lines: [
                    [[14, 0], [0, 14], [-14, 0], [0, -14]]
                ]
            },

            blackSquares: {
                fillColor: "black",
                moves: [[1, 1], [11, 0], [0, 11], [-11, 0]],
                lines: [
                    [[1, 0], [0, 1], [-1, 0], [0, -1]],
                    [[1, 0], [0, 1], [-1, 0], [0, -1]],
                    [[1, 0], [0, 1], [-1, 0], [0, -1]],
                    [[1, 0], [0, 1], [-1, 0], [0, -1]]
                ]
            },

            outerShadow: {
                fillColor: "black",
                moves: [[-2, 2]],
                lines: [
                    [[15, 0], [0, -15], [1, 0], [0, 16], [-16, 0], [0, -1]]
                ]
            },

            orangeQuestion: {
                fillColor: "orange",
                moves: [[4, -8]],
                lines: [
                    [[0, -3], [1, 0], [0, -1], [5, 0], [0, 1], [1, 0], [0, 3],
                     [-2, 0], [0, 2], [-2, 0], [0, -2], [1, 0], [0, -1], [1, 0],
                     [0, -2], [-3, 0], [0, 3]]
                ]
            },

            innerShadow: {
                fillColor: "black",
                moves: [[-1, 0], [3, 2]],
                lines: [
                    [[1, 0], [0, -3], [3, 0], [0, 1], [-2, 0], [0, 3], [-2, 0], [0, -1]],
                    [[1, 0], [0, -2], [2, 0], [0, -2], [1, 0], [0, 3], [-2, 0], [0, 2], [-2, 0]]
                ]
            },

            dot: {
                fillColor: "orange",
                moves: [[-1, 1]],
                lines: [
                    [[2, 0], [0, 2], [-2, 0], [0, -2]]
                ]
            },

            dotShadow: {
                fillColor: "black",
                moves: [[1, 2]],
                lines: [
                    [[1, 0], [0, -1], [1, 0], [0, 2], [-2, 0], [0, -1]]
                ]
            }
        },
        flash: function() {
            (function changeBackground () {
                if (cube["drawData"].goldInside.fillColor === "#ffcc00") {
                    cube["drawData"].goldInside.fillColor = "000000";
                    console.log(cube["drawData"].goldInside.fillColor);
                }
            }());
        }
    };

    for (var elements in cube["drawData"]) {
        renderingContext.beginPath();
        for (var i = 0; i < cube["drawData"][elements].moves.length; i++) {
            renderingContext.fillStyle = cube["drawData"][elements].fillColor;
            renderingContext.moveTo(updateX(cube["drawData"][elements].moves[i][0]), 
                                    updateY(cube["drawData"][elements].moves[i][1]));
            
            for (var j = 0; j < cube["drawData"][elements].lines[i].length; j++) {
                renderingContext.lineTo(updateX(cube["drawData"][elements].lines[i][j][0]),
                                        updateY(cube["drawData"][elements].lines[i][j][1]));
            }
        }
        renderingContext.fill();
    }
    cube["flash"]();
}());
