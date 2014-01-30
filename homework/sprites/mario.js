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

    var updateX = function (multiplier) {
        currentX = currentX + (multiplier * pixelSize);
        return currentX;
    }

    var updateY = function (multiplier) {
        currentY = currentY + (multiplier * pixelSize);
        return currentY;
    }
    
    var mario = {
        drawData: {
            hat: {
                fillColor: "red",
                moves: [[0, 0]],
                lines: [
                    [[5, 0], [0, 1], [3, 0], [0, 1], [-9, 0], [0, -1], [1, 0], [0, -1]]
                ]
            },

            facialHair: {
                fillColor: "black",
                moves: [[-1, 2], [-1, 1]],
                lines: [
                    [[3, 0], [0, 1], [-1, 0], [0, 1], [1, 0], [0, 1], [-2, 0],
                     [0, -2], [-1, 0], [0, -1]],
                    [[1, 0], [0, 2], [1, 0], [0, 1], [-2, 0], [0, -3]]
                ]
            },

            eyes: {
                fillColor: "black",
                moves: [[6, -1]],
                lines: [
                    [[1, 0], [0, 2], [-1, 0], [0, -2]]
                ]
            },

            mouth: {
                fillColor: "black",
                moves: [[1, 2]],
                lines: [
                    [[1, 0], [0, 1], [2, 0], [0, 1], [-4, 0], [0, -1], [1, 0], [0, -1]]
                ]
            },

            faceSkin: {
                fillColor: "#FFDCB2",
                moves: [[-3, -2], [3, 0], [-6, 1]],
                lines: [
                    [[2, 0], [0, 2], [1, 0], [0, 1], [-1, 0], [0, 1], [3, 0], [0, 1],
                     [-7, 0], [0, -2], [2, 0], [0, -1], [-1, 0], [0, -1], [1, 0], [0, -1]],
                    [[1, 0], [0, 1], [2, 0], [0, 1], [1, 0], [0, 1], [-3, 0], [0, -1],
                     [-1, 0], [0, -2]],
                    [[1, 0], [0, 2], [-1, 0], [0, -2]]  
                ]
            },

            shirt: {
                fillColor: "blue",
                moves: [[0, 4], [3, 0], [3, 1]],
                lines: [
                    [[2, 0], [0, 4], [-2, 0], [0, -1], [-2, 0],
                     [0, -1], [1, 0], [0, -1], [1, 0], [0, -1]],
                    [[3, 0], [0, 1], [-1, 0], [0, 2], [-2, 0], [0, -3]],
                    [[3, 0], [0, 1], [1, 0], [0, 1], [-2, 0], [0, 1], [-2, 0], [0, -3]] 
                ]
            },

            suspenders: {
                fillColor: "red",
                moves: [[-4, -1]],
                lines: [
                    [[1, 0], [0, 3], [2, 0], [0, -2], [1, 0], [0, 3], [-1, 0], [0, 1],
                     [1, 0], [0, -1], [1, 0], [0, 1], [1, 0], [0, 2], [-3, 0], [0, -1],
                     [-2, 0], [0, 1], [-3, 0], [0, -2], [1, 0], [0, -1], [1, 0], [0, 1],
                     [1, 0], [0, -1], [-1, 0], [0, -4]]
                ]
            },

            buttons: {
                fillColor: "yellow",
                moves: [[0, 4], [3, 0]],
                lines: [
                    [[1, 0], [0, 1], [-1, 0], [0, -1]],
                    [[1, 0], [0, 1], [-1, 0], [0, -1]]
                ]
            },

            leftHand: {
                fillColor: "#FFDCB2",
                moves: [[-4, 0]],
                lines: [
                    [[0, 1], [-1, 0], [0, 1], [-2, 0], [0, -3], [2, 0], [0, 1], [1, 0]]
                ]
            },

            rightHand: {
                fillColor: "#FFDCB2",
                moves: [[6, 0]],
                lines: [
                    [[1, 0], [0, -1], [2, 0], [0, 3], [-2, 0], [0, -1], [-1, 0], [0, -1]]
                ]
            },

            rightShoe: {
                fillColor: "#5E2605",
                moves: [[-1, 3]],
                lines: [
                    [[3, 0], [0, 1], [1, 0], [0, 1], [-4, 0], [0, -2]]
                ]
            },

            leftShoe: {
                fillColor: "#5E2605",
                moves: [[-4, 0]],
                lines: [
                    [[0, 2], [-4, 0], [0, -1], [1, 0], [0, -1], [3, 0]]
                ]
            }
        } 
    };
    
    for (var parts in mario["drawData"]) {
        renderingContext.beginPath();
        for (var i = 0; i < mario["drawData"][parts].moves.length; i++) {
            renderingContext.fillStyle = mario["drawData"][parts].fillColor;
            renderingContext.moveTo(updateX(mario["drawData"][parts].moves[i][0]), 
                                    updateY(mario["drawData"][parts].moves[i][1]));
            
            for (var j = 0; j < mario["drawData"][parts].lines[i].length; j++) {
                renderingContext.lineTo(updateX(mario["drawData"][parts].lines[i][j][0]),
                                        updateY(mario["drawData"][parts].lines[i][j][1]));
            }
        }
        renderingContext.fill();
    }
}());
