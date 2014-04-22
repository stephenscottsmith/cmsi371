/*
 * Unit tests for our vector object.
 */
$(function () {
	test("Basic Instantiation and Access", function () {
        var m1 = new Matrix4x4();
        deepEqual(m1.coordinates,
            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1],
            "Default matrix");

        m = new Matrix4x4(  0,        1,       2,  3,
                           90,     1024,      67, 32,
                          123,  0.12345, Math.PI,  6,
                          3.2,   444444,       0,  7);
        deepEqual(m.coordinates,
            [  0,        1,       2,  3,
              90,     1024,      67, 32,
             123,  0.12345, Math.PI,  6,
             3.2,   444444,       0,  7],
            "Matrix constructor with passed values");

        m = new Matrix4x4( 0,  1,  2,  3,
                           4,  5,  6,  7,
                           8,  9, 10, 11,
                          12, 13, 14, 15);

        deepEqual(m.rowAt(0),
            [0, 1, 2, 3],
            "First Row");
        deepEqual(m.rowAt(1),
            [4, 5, 6, 7],
            "Second Row");
        deepEqual(m.rowAt(2),
            [8, 9, 10, 11],
            "Third Row");
        deepEqual(m.rowAt(3),
            [12, 13, 14, 15],
            "Fourth Row");

        deepEqual(m.columnAt(0),
            [0, 4, 8, 12],
            "First Column");
        deepEqual(m.columnAt(1),
            [1, 5, 9, 13],
            "Second Column");
        deepEqual(m.columnAt(2),
            [2, 6, 10, 14],
            "Third Column");
        deepEqual(m.columnAt(3),
            [3, 7, 11, 15],
            "Fourth Column");

        equal(m.coordinateAt(0),
            0,
            "Matrix array[0]");
        equal(m.coordinateAt(1),
            1,
            "Matrix array[1]");
        equal(m.coordinateAt(2),
            2,
            "Matrix array[2]");
        equal(m.coordinateAt(3),
            3,
            "Matrix array[3]");

        equal(m.coordinateAt(4),
            4,
            "Matrix array[4]");
        equal(m.coordinateAt(5),
            5,
            "Matrix array[5]");
        equal(m.coordinateAt(6),
            6,
            "Matrix array[6]");
        equal(m.coordinateAt(7),
            7,
            "Matrix array[7]");

        equal(m.coordinateAt(8),
            8,
            "Matrix array[8]");
        equal(m.coordinateAt(9),
            9,
            "Matrix array[9]");
        equal(m.coordinateAt(10),
            10,
            "Matrix array[10]");        
        equal(m.coordinateAt(11),
            11,
            "Matrix array[11]");  

        equal(m.coordinateAt(12),
            12,
            "Matrix array[12]");        
        equal(m.coordinateAt(13),
            13,
            "Matrix array[13]");        
        equal(m.coordinateAt(14),
            14,
            "Matrix array[14]");        
        equal(m.coordinateAt(15),
            15,
            "Matrix array[15]");

    });

    test("Translate, Scale, Rotate", function () {
        var m = Matrix4x4.getTranslationMatrix(1, -2, 3);
        deepEqual(m.coordinates,
            [1, 0, 0, 1,
             0, 1, 0, -2,
             0, 0, 1, 3,
             0, 0, 0, 1],
            "Translation matrix");

        m = Matrix4x4.getScaleMatrix(7, 13, 23);
        deepEqual(m.coordinates,
            [7, 0,  0, 0,
             0, 13,  0, 0,
             0, 0, 23, 0,
             0, 0,  0, 1],
            "Scale matrix");

        m = new Matrix4x4( 0,  1,  2,  3,
                           4,  5,  6,  7,
                           8,  9, 10, 11,
                          12, 13, 14, 15);
      
        m = Matrix4x4.getRotationMatrix(30, 1, 0, 0);
        deepEqual(m.coordinates,
            [Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6), 0, 0,
             Math.sin(Math.PI / 6),  Math.cos(Math.PI / 6), 0, 0,
                                 0,                      0, 1, 0,
                                 0,                      0, 0, 1],
            "Rotating matrix 30 degrees about the x-axis.");

        m = Matrix4x4.getRotationMatrix(120, 0, 1, 0);
        deepEqual(m.coordinates,
            [ Math.cos(2 * (Math.PI / 6)), 0, Math.sin(2 * (Math.PI / 6)), 0,
                                        0, 1,                           0, 0,
             -Math.sin(2 * (Math.PI / 6)), 0, Math.cos(2 * (Math.PI / 6)), 0,
                                        0, 0,                           0, 1],
            "Rotating matrix 120 degrees about the y-axis.");

        m = Matrix4x4.getRotationMatrix(77, 0, 0, 1);
        deepEqual(m.coordinates,
            [1,                            0,                             0, 0,
             0, Math.cos(77 * Math.PI / 180), -Math.sin(77 * Math.PI / 180), 0,
             0, Math.sin(77 * Math.PI / 180),  Math.cos(77 * Math.PI / 180), 0,
             0,                            0,                             0, 1],
            "Rotating matrix 77 degrees about the z-axis.");
    });

});