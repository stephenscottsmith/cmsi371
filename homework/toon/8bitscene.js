/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),
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

        marioIdle = function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/marioIdle.png";
            renderingContext.drawImage(drawing, -30, 457);
        },

        marioWalk = function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/marioWalk.png";
            renderingContext.drawImage(drawing, 20, 457);
        },

        marioJump = function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/marioJump.png";
            renderingContext.drawImage(drawing, -40, 450);
        },

        marioDie = function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/marioDie.png";
            renderingContext.drawImage(drawing, 400, 457);
        },

        boxOn = function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/boxOn.png";
            renderingContext.drawImage(drawing, 400, 300);
        },

        boxHit = function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/boxHit.png";
            renderingContext.drawImage(drawing, 400, 300);
        },

        pacUp = function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/pacUp.png";
            renderingContext.drawImage(drawing, 400, 227);
        },

        pacLeft = function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/pacLeft.png";
            renderingContext.drawImage(drawing, 400, 177);
        },

        pacDown = function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/pacDown.png";
            renderingContext.drawImage(drawing, 250, 177);
        },

        pacRight = function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/pacRight.png";
            renderingContext.drawImage(drawing, 250, 460);
        },

        pacClose = function (renderingContext) {
            var drawing = new Image();
            drawing.src = "PNG/pacClose.png";
            renderingContext.drawImage(drawing, 400, 340);
        },


        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: marioIdle,

                keyframes: [
                    {
                        frame: 0,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 30,
                        tx: 416,
                        ty: 0,
                        ease: KeyframeTweener.quadEaseInOut
                    }
                ]
            },

            {
                draw: marioJump,

                keyframes: [
                    {
                        frame: 31,
                        tx: 416,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 34,
                        tx: 416,
                        ty: -75,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },

                    {
                        frame: 36,
                        tx: 416,
                        ty: 0,
                        ease: KeyframeTweener.quadEaseInAndOut
                    }
                ]
            },

            {
                draw: marioIdle,

                keyframes: [
                    {
                        frame: 37,
                        tx: 416,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 140,
                        tx: 416,
                        ty: 0,
                        ease: KeyframeTweener.quadEaseInOut
                    }
                ]
            },

            // {
            //     draw: marioDie,

            //     keyframes: [
            //         {
            //             frame: 0,
            //             tx: 0,
            //             ty: 0,
            //             ease: KeyframeTweener.linear
            //         },

            //         {
            //             frame: 90,
            //             tx: 0,
            //             ty: 0,
            //             ease: KeyframeTweener.quadEaseInOut
            //         }
            //     ]
            // },

            {
                draw: boxOn,

                keyframes: [
                    {
                        frame: 0,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 34,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    }
                ]
            },

            {
                draw: boxHit,

                keyframes: [
                    {
                        frame: 35,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 37,
                        tx: 0,
                        ty: -30,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },

                    {
                        frame: 38,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },

                    {
                        frame: 300,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.quadEaseInOut
                    }
                ]
            },

            {
                draw: pacUp,

                keyframes: [
                    {
                        frame: 37,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 45,
                        tx: 0,
                        ty: -50,
                        ease: KeyframeTweener.linear
                    }
                ]
            },

            {
                draw: pacLeft,

                keyframes: [
                    {
                        frame: 46,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 70,
                        tx: -150,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    }
                ]
            },

            {
                draw: pacDown,

                keyframes: [
                    {
                        frame: 71,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 129,
                        tx: 0,
                        ty: 280,
                        ease: KeyframeTweener.linear
                    }
                ]
            },

            {
                draw: pacRight,

                keyframes: [
                    {
                        frame: 129,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 145,
                        tx: 140,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 300,
                        tx: 140,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    }
                ]
            },

            {
                draw: marioDie,

                keyframes: [
                    {
                        frame: 140,
                        tx: 0,
                        ty: 0,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 155,
                        tx: 0,
                        ty: -30,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },

                    {
                        frame: 165,
                        tx: 0,
                        ty: 100,
                        ease: KeyframeTweener.quadEaseInAndOut
                    }
                ]
            }

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
