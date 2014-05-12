/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl, // The WebGL context.

        // This variable stores 3D model information.
        objectsToDraw,

        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        currentRotation = 0.0,
        currentInterval,
        projectionMatrix,
        transformMatrix,
        rotationMatrix,
        cameraMatrix,
        vertexPosition,
        vertexColor,

        // An individual "draw object" function.
        drawObject,

        // The big "draw scene" function.
        drawScene,

        // Reusable loop variables.
        i,
        maxi,
        j,
        maxj,
        isRotating = false,
        currentXRotation = 0,
        currentYRotation = 0,

        createVertices,


    // Grab the WebGL rendering context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    // Build the objects to display.
    objectsToDraw = [
        // {
        //     vertices: [].concat(
        //         [ 0.0, 0.0, 0.0 ],
        //         [ 0.5, 0.0, -0.75 ],
        //         [ 0.0, 0.5, 0.0 ]
        //     ),
        //     colors: [].concat(
        //         [ 1.0, 0.0, 0.0 ],
        //         [ 0.0, 1.0, 0.0 ],
        //         [ 0.0, 0.0, 1.0 ]
        //     ),
        //     mode: gl.TRIANGLES
        // },

        // {
        //     color: { r: 0.0, g: 1.0, b: 0 },
        //     vertices: [].concat(
        //         [ 0.25, 0.0, -0.5 ],
        //         [ 0.75, 0.0, -0.5 ],
        //         [ 0.25, 0.5, -0.5 ]
        //     ),
        //     mode: gl.TRIANGLES
        // },

        // {
        //     color: { r: 0.0, g: 0.0, b: 1.0 },
        //     vertices: [].concat(
        //         [ -0.25, 0.0, 0.5 ],
        //         [ 0.5, 0.0, 0.5 ],
        //         [ -0.25, 0.5, 0.5 ]
        //     ),
        //     mode: gl.TRIANGLES
        // },

        // {
        //     color: { r: 0.0, g: 0.0, b: 1.0 },
        //     vertices: [].concat(
        //         [ -1.0, -1.0, 0.75 ],
        //         [ -1.0, -0.1, -1.0 ],
        //         [ -0.1, -0.1, -1.0 ],
        //         [ -0.1, -1.0, 0.75 ]
        //     ),
        //     mode: gl.LINE_LOOP
        // },

        // {
        //     color: { r: 0.0, g: 0.5, b: 0.0 },
        //     vertices: Shapes.toRawLineArray(Shapes.icosahedron()),
        //     mode: gl.LINES
        // }

        // {
        //     color: { r: 1.0, g: 0.0, b: 0.0 },
        //     vertices: Shapes.toRawTriangleArray(Shapes.cube()),
        //     mode: gl.TRIANGLES
        // },

        // {
        //     color: { r: 0.0, g: 0.0, b: 1.0 },
        //     vertices: Shapes.toRawTriangleArray(Shapes.perfectPyramid()),
        //     mode: gl.TRIANGLES
        // },

        // {
        //     color: {r: 0.5, g: 0.5, b: 0.5},
        //     vertices: Shapes.toRawTriangleArray(Shapes.hemisphere(0.5)),
        //     mode: gl.TRIANGLES
        // },

        // {
        //   color: { r: 0.3, g: 0.3, b: 0.8 },
        //   vertices: Shapes.toRawLineArray(Shapes.hemisphere(0.5)),
        //   mode: gl.LINES
        // }

    ];

    createVertices = function (objectsToDraw) {
        // Redeclaration of i necessary for recursiveness.
        var i;
        
        for (i = 0; i < objectsToDraw.length; i += 1) {
            objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].vertices);

            if (!objectsToDraw[i].colors) {
                // If we have a single color, we expand that into an array
                // of the same color over and over.
                objectsToDraw[i].colors = [];
                for (j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
                        objectsToDraw[i].color.r,
                        objectsToDraw[i].color.g,
                        objectsToDraw[i].color.b
                    );
                }
            }

            // Normal buffer.
            objectsToDraw[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].normals);

            // Color buffer.
            objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].colors);

            if (objectsToDraw[i].children && (objectsToDraw[i].children.length !== 0)) {
                vertexify(objectsToDraw[i].children);
            }
        }
    };  

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);
    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);

    // JD: Use it or lose it buddy...
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    cameraMatrix = gl.getUniformLocation(shaderProgram, "cameraMatrix");
    transformMatrix = gl.getUniformLocation(shaderProgram, "transformMatrix");
    xRotationMatrix = gl.getUniformLocation(shaderProgram, "xRotationMatrix");
    yRotationMatrix = gl.getUniformLocation(shaderProgram, "yRotationMatrix");

    // Note the additional variables.
    lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
 
    /*
     * Displays an individual object.
     */
    drawObject = function (objectsToDraw, inheritedTransforms) {

        var i,
            inheritedTransformMatrix = new Matrix4x4 ();

        for (i = 0; i < objectsToDraw.length; i += 1) {
            // This if statement check to see if the object that is about to be drawn has any transforms.
            if (objectsToDraw[i].transforms) {

                // This if statement checks to see if the object's parents had any transforms.
                // They will be multiplied through another matrix. If not, only the object's
                // transforms are applied.
                if (inheritedTransforms) {
                    inheritedTransformMatrix = Matrix4x4.getTransformMatrix(inheritedTransforms).multiply(
                            Matrix4x4.getTransformMatrix(objectsToDraw[i].transforms));
                    gl.uniformMatrix4fv(transformMatrix, gl.FALSE, 
                        new Float32Array(
                            inheritedTransformMatrix.columnOrder()
                        )
                    );
                } else {
                    gl.uniformMatrix4fv(transformMatrix, gl.FALSE, 
                        new Float32Array(
                            Matrix4x4.getTransformMatrix(objectsToDraw[i].transforms).columnOrder()
                        )
                    );
                }
            }
            // Set the varying normal vectors.
            gl.bindBuffer(gl.ARRAY_BUFFER, objectsToDraw[i].normalBuffer);
            gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

            // Set the varying colors.
            gl.bindBuffer(gl.ARRAY_BUFFER, objectsToDraw[i].colorBuffer);
            gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

            // Set the varying vertex coordinates.
            gl.bindBuffer(gl.ARRAY_BUFFER, objectsToDraw[i].buffer);
            gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
            gl.drawArrays(objectsToDraw[i].mode, 0, objectsToDraw[i].vertices.length / 3);

            if (objectsToDraw[i].children && (objectsToDraw[i].children.length !== 0)) {
                inheritedTransforms = objectsToDraw[i].transforms;
                drawObjects(objectsToDraw[i].children, inheritedTransforms);
            }
        }
    };

    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up the rotation matrix before we draw the objects.
        gl.uniformMatrix4fv(xRotationMatrix, gl.FALSE,
            new Float32Array(
                Matrix4x4.getRotationMatrix(currentXRotation / 4, 1, 0, 0).getColumnMajorOrder()
            )
        );

        // Set up the rotation matrix before we draw the objects.
        gl.uniformMatrix4fv(yRotationMatrix, gl.FALSE,
            new Float32Array(
                Matrix4x4.getRotationMatrix(currentYRotation / 4, 0, 1, 0).getColumnMajorOrder()
            )
        );
        
        // Display the objects.
        drawObject(objectsToDraw);

        // All done.
        gl.flush();
    };

    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        } else {
            currentInterval = setInterval(function () {
                currentRotation += 1.0;
                drawScene();
                if (currentRotation >= 360.0) {
                    currentRotation -= 360.0;
                }
            }, 30);
        }
    });

    $("#add").click(function (canvas) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var shapeToDraw = $('option:selected').val();
            red = parseFloat($('#red').val(), 10),
            green = parseFloat($('#green').val(), 10),
            blue = parseFloat($('#blue').val(), 10);
            console.log(red + ", " + green + ", " + blue);

        // JD: Nice that you are doing this, but you are missing something.  Hint:
        //     Compare the way objectsToDraw is set up in the sample code (or even
        //     your code before) to what this is doing.  Something is missing here.
        //
        //     Hint #2: Look at your scene objects in the prior, "pre-existing objects"
        //     implementation, and compare those to these added scene objects .  Spot
        //     the difference.  By "look at," I mean console.log.
        if (shapeToDraw === "Cube") {
            var cube = {};
            cube.color = {};
            cube.color.r = red;
            cube.color.g = green;
            cube.color.b = blue;
            cube.vertices = Shapes.toRawLineArray(Shapes.cube());
            cube.mode = gl.LINES;
            objectsToDraw.push(cube);
        } else if (shapeToDraw === "Pyramid") {
            objectsToDraw.push({
                color: { r: red, g: green, b: blue },
                vertices: Shapes.toRawLineArray(Shapes.perfectPyramid()),
                mode: gl.LINES
            });
        } else if (shapeToDraw === "Icosahedron") {
            objectsToDraw.push({
                color: { r: red, g: green, b: blue },
                vertices: Shapes.toRawLineArray(Shapes.icosahedron()),
                mode: gl.LINES
            });
        } else if (shapeToDraw === "Sphere") {
            objectsToDraw.push({
                color: { r: red, g: green, b: blue },
                vertices: Shapes.toRawLineArray(Shapes.hemisphere(0.5)),
                mode: gl.LINES
            });
        }
        console.log("length: " + objectsToDraw.length);

        drawScene();

    });
    
}(document.getElementById("hello-webgl")));
