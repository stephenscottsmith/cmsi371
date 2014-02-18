/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // drawBackground = function (renderingContext) {
        //     var backgroundImage = new Image();
        //     backgroundImage.src = "PNG/background.png";
        //     renderingContext.drawImage(backgroundImage, 110, 110);
        //     console.log("THIS");
        // }(),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
        square = function (renderingContext) {
            renderingContext.fillStyle = "blue";
            renderingContext.fillRect(-20, -20, 40, 40);
        },

        circle = function (renderingContext) {
            renderingContext.strokeStyle = "red";
            renderingContext.beginPath();
            renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
            renderingContext.stroke();
        },

        mario = function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/marioIdle.png";
            renderingContext.drawImage(drawing, -30, 465);
        },

        marioWalk = function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/marioWalk.png";
            renderingContext.drawImage(drawing, 30, 457);
        },

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: mario,

                keyframes: [
                    {
                        frame: 0,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 90,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.quadEaseInOut
                    }

                    // {
                    //     frame: 80,
                    //     tx: 80,
                    //     ty: 60,
                    //     rotate: 60 // Keyframe.rotate uses degrees.
                    // },

                    // {
                    //     frame: 160,
                    //     tx: 600,
                    //     ty: -2000,
                    //     sx: 5,
                    //     sy: 5,
                    //     ease: KeyframeTweener.quadEaseOut
                    // }
                ]
            },

            {
                draw: marioWalk,

                keyframes: [
                    {
                        frame: 0,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 90,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.quadEaseInOut
                    }
                ]
            },

            // {
            //     draw: EightBitSpriteLibrary.cube.draw,

            //     predraw: function (currentFrame) {
            //         if (currentFrame % 30) {
            //             return;
            //         }

            //         if (EightBitSpriteLibrary.cube.drawData.goldInside.fillColor === "#ffcc00") {
            //             EightBitSpriteLibrary.cube.drawData.goldInside.fillColor = "#DC8909";
            //         } else if (EightBitSpriteLibrary.cube.drawData.goldInside.fillColor === "#DC8909") {
            //             EightBitSpriteLibrary.cube.drawData.goldInside.fillColor = "#ffcc00";
            //         }
            //     },

            //     keyframes: [
            //         {
            //             frame: 50,
            //             tx: 300,
            //             ty: 600,
            //             sx: 0.5,
            //             sy: 0.5,
            //             ease: KeyframeTweener.quadEaseOut
            //         },

            //         {
            //             frame: 100,
            //             tx: 300,
            //             ty: 0,
            //             sx: 3,
            //             sy: 0.25,
            //             ease: KeyframeTweener.quadEaseOut
            //         },

            //         {
            //             frame: 150,
            //             tx: 300,
            //             ty: 600,
            //             sx: 0.5,
            //             sy: 0.5
            //         }
            //     ]
            // }
        ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites,
        background: function (renderingContext) {
            renderingContext.save();
            // renderingContext.fillStyle = "white";
            // renderingContext.fillRect(0, 0, canvas.width, canvas.height);
            var backgroundImage = new Image();
            backgroundImage.src = "PNG/background.png";
            renderingContext.drawImage(backgroundImage, 0, 0);
            var pipe = new Image();
            pipe.src = "PNG/pipe.png";
            renderingContext.drawImage(pipe, 840, 358);

            // EightBitSpriteLibrary.cube.draw(renderingContext);
            renderingContext.restore();
        }
    });
}());
