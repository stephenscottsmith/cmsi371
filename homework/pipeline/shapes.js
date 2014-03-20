/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {
    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606,
            Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    },

    cube: function (initialPosition, length) {
        // var startX = initialPosition[0],
        //     startY = initialPosition[1],
        //     startZ = initialPosition[2];
        var x = 0, y = 0, z = 0, l = 0.5;

        return {
            vertices: [
                [x, y, z],
                [x + l, y, z],
                [x + l, y + l, z],
                [x, y + l, z],
                [x, y, z + l],
                [x + l, y, z + l],
                [x + l, y + l, z + l],
                [x, y + l, z + l]

            ],

            indices: [
                [2, 3, 0],
                [2, 0, 1],
                [6, 2, 1],
                [6, 1, 5],
                [3, 7, 4],
                [3, 4, 0],
                [7, 6, 5],
                [7, 5, 4],
                [6, 7, 3],
                [6, 3, 2],
                [1, 0, 4],
                [1, 4, 5]
            ]
        };
    },

    perfectPyramid: function (initialPosition, lengthOfBaseX, lengthOfBaseY, height) {
        // var startX = initialPosition[0],
        //     startY = initialPosition[1],
        //     startZ = initialPosition[2];
        var x = 0, y = 0, z = 0, l = 0.5, midX = ((x + l) / 2), midZ = ((z + l) / 2);

        return {
            vertices: [
                [x, y, z],
                [x + l, y, z],
                [x + l, y, z + l],
                [x, y, z + l],
                [midX, y + l, midZ]
            ],

            indices: [
                [1, 0, 3],
                [1, 3, 2],
                [4, 3, 2],
                [4, 2, 1],
                [4, 1, 0],
                [4, 0, 3]
            ]
        };
    },

    hemisphere: function (radius) {
        // First determine the radius at the pole.
        var latitudeRadius = radius * Math.cos(Math.PI / 4),
            vertices = [];

        // Vertices consist of the center, surrounded by select points around
        // the pole radius.
        vertices.push([0, radius, 0]);

        // Iterate around the y-axis.
        var latitudeY = radius * Math.cos(Math.PI / 4);
        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 8) {
            vertices.push([
                latitudeRadius * Math.cos(theta),
                latitudeY,
                latitudeRadius * Math.sin(theta)
            ]);
        }


        latitudeRadius = radius * - Math.cos(Math.PI / 4);
        vertices.push([0, - radius, 0]);

        // Iterate around the y-axis.
        latitudeY = radius * - Math.cos(Math.PI / 4);
        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 8) {
            vertices.push([
                latitudeRadius * Math.cos(theta),
                latitudeY,
                latitudeRadius * Math.sin(theta)
            ]);
        }

        //Iterate around the equator.
        latitudeRadius = radius * Math.cos(0);
        latitudeY = radius * Math.sin(0);
        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 8) {
            vertices.push([
                latitudeRadius * Math.cos(theta),
                latitudeY,
                latitudeRadius * Math.sin(theta)
            ]);
        }

        latitudeRadius = radius * - Math.cos(0);
        latitudeY = radius * - Math.sin(0);
        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 8) {
            vertices.push([
                latitudeRadius * Math.cos(theta),
                latitudeY,
                latitudeRadius * Math.sin(theta)
            ]);
        }

        // Form the triangles.
        var indices = [];
        for (var i = 1; i <= 16; i += 1) {
            indices.push([ 0, i, (i < 16) ? (i + 1) : 1 ]);
        }

        for (var i = 18; i <= 33; i += 1) {
            indices.push([ 17, i, (i < 33) ? (i + 1) : 18 ]);
        }

        for (var i = 1; i <= 16; i += 1) {
            indices.push([ i, i + 16 + 17, (i < 16) ? i + 16 + 17 + 1 : 16 + 17 + 1]);
            indices.push([ i, (i < 16) ? i + 16 + 17 + 1 : i + 17 + 1, (i < 16) ? i + 1 : 1]);
        }

        for (var i = 18; i <= 33; i += 1) {
            indices.push([ i + 16 + 16,(i < 33) ? i : 18,(i < 33) ? i + 1 : i + 16 + 1]);
            indices.push([ i + 16 + 16 , (i < 33) ? i + 1 : i, (i < 33) ? i + 16 + 16 + 1: 18]);
        }


        return {
            vertices: vertices,
            indices: indices
        };
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    }

};
