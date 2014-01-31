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

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: EightBitSpriteLibrary.mario.draw,
                keyframes: [
                    {
                        frame: 0,
                        tx: -100,
                        ty: -100,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 30,
                        tx: 10,
                        ty: 10,
                        ease: KeyframeTweener.quadEaseInOut
                    },

                    {
                        frame: 80,
                        tx: 80,
                        ty: 60,
                        rotate: 60 // Keyframe.rotate uses degrees.
                    },

                    {
                        frame: 160,
                        tx: 600,
                        ty: -2000,
                        sx: 5,
                        sy: 5,
                        ease: KeyframeTweener.quadEaseOut
                    }
                ]
            },

            {
                draw: EightBitSpriteLibrary.mario.draw,
                keyframes: [
                    {
                        frame: 50,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 0,
                        sx: 3,
                        sy: 0.25,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 150,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5
                    }
                ]
            }
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
            renderingContext.fillStyle = "white";
            renderingContext.fillRect(0, 0, canvas.width, canvas.height);
            EightBitSpriteLibrary.cube.draw(renderingContext);
            renderingContext.restore();
        }
    });
}());
