$(function () {

    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var m1 = new Matrix4x4();
        deepEqual(m1.elements,
            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1],
            "Default matrix constructor");
    });

    test("Multiplication", function () {
        var matrixToMultiply = new Matrix4x4(
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        );
        var m2 = matrixToMultiply.getMultiplicationMatrix(
            [1, 1, 1, 1,
             1, 1, 1, 1,
             1, 1, 1, 1,
             1, 1, 1, 1]
        );

        deepEqual(m2.elements,
            [0, 0, 0, 0,
             0, 0, 0, 0,
             0, 0, 0, 0,
             0, 0, 0, 0],
            "Matrix with all 0's multiplied by anything should still be all 0's.");

        matrixToMultiply = new Matrix4x4(
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1
        );

        m2 = matrixToMultiply.getMultiplicationMatrix(
            [1, 1, 1, 1,
             1, 1, 1, 1,
             1, 1, 1, 1,
             1, 1, 1, 1]
        );
        deepEqual(m2.elements,
            [4, 4, 4, 4,
             4, 4, 4, 4,
             4, 4, 4, 4,
             4, 4, 4, 4],
            "Matrix of all 1's multiplied by matrix of all 1's should be all 4's.");

        matrixToMultiply = new Matrix4x4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );

        m2 = matrixToMultiply.getMultiplicationMatrix(
            [0, 1, 2, 3,
             90, 1024, 67, 32,
             123, 0.12345, Math.PI, 6,
             3.2, 444444, 0, 7]
        );
        deepEqual(m2.elements,
            [0, 1, 2, 3,
             90, 1024, 67, 32,
             123, 0.12345, Math.PI, 6,
             3.2, 444444, 0, 7],
            "Many random numbers being multiplied.");
    });

    test("Translate, Scale, Rotate.", function () {
        var m3 = Matrix4x4.getTranslationMatrix(7, 10, -4);
        deepEqual(m3.elements,
            [1, 0, 0, 7,
             0, 1, 0, 10,
             0, 0, 1, -4,
             0, 0, 0, 1],
            "Translate by basic positive and negative integers.");

        m3 = Matrix4x4.getTranslationMatrix(-3.14, -72.6, 123.456);
        deepEqual(m3.elements,
            [1, 0, 0, -3.14,
             0, 1, 0, -72.6,
             0, 0, 1, 123.456,
             0, 0, 0, 1],
            "Translate by positive and negative floating point numbers.");

        m3 = Matrix4x4.getTranslationMatrix(0, 0, 0);
        deepEqual(m3.elements,
            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1],
            "Translate by 0, 0, 0.");

        m3 = Matrix4x4.getScaleMatrix(3, 7, 42);
        deepEqual(m3.elements,
            [3, 0, 0, 0,
             0, 7, 0, 0,
             0, 0, 42, 0,
             0, 0, 0, 1],
            "Scale by positive integers.");

        m3 = Matrix4x4.getScaleMatrix(0, 0, 0);
        deepEqual(m3.elements,
            [0, 0, 0, 0,
             0, 0, 0, 0,
             0, 0, 0, 0,
             0, 0, 0, 1],
            "Scale by 0.");

        m3 = Matrix4x4.getScaleMatrix(-90, -1, 314285);
        deepEqual(m3.elements,
            [-90, 0, 0, 0,
             0, -1, 0, 0,
             0, 0, 314285, 0,
             0, 0, 0, 1],
            "Scale by positive and negative integers.");

        m3 = Matrix4x4.getScaleMatrix(-3.2, 2.5, -8.9);
        deepEqual(m3.elements,
            [-3.2, 0, 0, 0,
             0, 2.5, 0, 0,
             0, 0, -8.9, 0,
             0, 0, 0, 1],
            "Scale by positive and negative floats.");

        m3 = Matrix4x4.getRotationMatrix(0, 0, 0, 1);
        deepEqual(m3.elements,
            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1],
            "Rotate by 0, 0, 0, 1.");

        m3 = Matrix4x4.getRotationMatrix(1, 0, 1, 0);
        deepEqual(m3.elements,
            [Math.cos(Math.PI / 180.0), 0, Math.sin(Math.PI / 180.0), 0,
             0, 1, 0, 0,
             (-1 * Math.sin(Math.PI / 180.0)), 0, Math.cos(Math.PI / 180.0), 0,
             0, 0, 0, 1],
            "Rotate by 1, 0, 1, 0.");

        m3 = Matrix4x4.getRotationMatrix(270, 1, 1, 1);
        var axisLength = Math.sqrt(3),
            x = 1 / axisLength,
            y = 1 / axisLength,
            z = 1 / axisLength,
            cosine = Math.cos(270 * Math.PI / 180.0),
            sine = Math.sin(270 * Math.PI / 180.0);
        deepEqual(m3.elements,
            [(x * x * (1 - cosine) + cosine), (x * y * (1 - cosine) - z * sine), (x * z * (1 - cosine) + y * sine), 0,
             (x * y * (1 - cosine) + z * sine), (y * y * (1 - cosine) + cosine), (y * z * (1 - cosine) - x * sine), 0,
             (x * z * (1 - cosine) - y * sine), (y * z * (1 - cosine) + x * sine), (z * z * (1 - cosine) + cosine), 0,
             0, 0, 0, 1],
            "Rotate by 270, 1, 1, 1.");

        m3 = Matrix4x4.getRotationMatrix(8.7, 0, 0, 1);
        x = 0;
        y = 0;
        z = 1;
        cosine = Math.cos(8.7 * Math.PI / 180.0);
        sine = Math.sin(8.7 * Math.PI / 180.0);
        deepEqual(m3.elements,
            [cosine, (-1 * z * sine), 0, 0,
             (z * sine), cosine, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1],
            "Rotating by 8.7, 0, 0, 1.");
    });

    test("Orthogonal and Frustrum Projection", function () {
        var m4 = Matrix4x4.getOrthoMatrix(-1, 1, -1, 1, -1, 1);
        width = 1 + 1;
        height = 1 + 1;
        depth = 1 + 1;
        deepEqual(m4.elements,
            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, -1, 0,
             0, 0, 0, 1],
            "Orthogonal Projection with all 1's.");

        m4 = Matrix4x4.getOrthoMatrix(0, 2, 0, 2, 0, 2);
        width = 2;
        height = 2;
        depth = 2;
        deepEqual(m4.elements,
            [1, 0, 0, -1,
             0, 1, 0, -1,
             0, 0, -1, -1,
             0, 0, 0, 1],
            "Orthogonal Projection shift by 1 to the positive so values range 0 to 2.");

        m4 = Matrix4x4.getOrthoMatrix(-8, 8, -6, 6, -12, 12),
            width = 8 + 8,
            height = 6 + 6,
            depth = 12 + 12;
        deepEqual(m4.elements,
            [2 / width, 0, 0, 0,
             0, 2 / height, 0, 0,
             0, 0, -2 / depth, 0,
             0, 0, 0, 1],
            "Orthogonal Projection with varying integer values.");

        m4 = Matrix4x4.getFrustumMatrix(-1, 1, -1, 1, -1, 1);
        width = 1 + 1;
        height = 1 + 1;
        depth = 1 + 1;
        deepEqual(m4.elements,
            [-1, 0, 0, 0,
             0, -1, 0, 0,
             0, 0, 0, 1,
             0, 0, -1, 0],
            "Frustrum Projection with all 1's.");

        m4 = Matrix4x4.getFrustumMatrix(0, 1, 0, 1, 0, 1);
        width = 1;
        height = 1;
        depth = 1;
        deepEqual(m4.elements,
            [0, 0, 1, 0,
             0, 0, 1, 0,
             0, 0, -1, 0,
             0, 0, -1, 0],
            "Frustrum Matrix condensed into ranges 0 to 1.");

        m4 = Matrix4x4.getFrustumMatrix(-8, 8, -6, 6, -12, 12);
        width = 8 + 8;
        height = 6 + 6;
        depth = 12 + 12;
        deepEqual(m4.elements,

            [2 * -12 / width, 0, 0, 0,
             0, -2, 0, 0,
             0, 0, 0, 12,
             0, 0, -1, 0],
            "Frustrum Projection with varying integer values.");
    });

    test("Pure Matrix4x4 Row Major To Column Major", function () {
        
        var rowMajorMatrix = new Matrix4x4(
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        );
        var m5 = rowMajorMatrix.getColumnMajorOrder();
        deepEqual(m5.elements,
            [0, 0, 0, 0,
             0, 0, 0, 0,
             0, 0, 0, 0,
             0, 0, 0, 0],
            "Row major to column with all 0's should be all 0's still.");

        rowMajorMatrix = new Matrix4x4(
            0, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 0,
            1, 1, 1, 1
        );
        m5 = rowMajorMatrix.getColumnMajorOrder();
        deepEqual(m5.elements,
            [0, 1, 0, 1,
             0, 1, 0, 1,
             0, 1, 0, 1,
             0, 1, 0, 1],
            "Row to major column test with all 0's and 1's.");

        rowMajorMatrix = new Matrix4x4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
        m5 = rowMajorMatrix.getColumnMajorOrder();
        deepEqual(m5.elements,
            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1],
            "Row to major column test with 1's down the middle criss-cross.");

        rowMajorMatrix = new Matrix4x4(
            1, 2.5, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16
        );
        m5 = rowMajorMatrix.getColumnMajorOrder();
        deepEqual(m5.elements,
            [1, 5, 9, 13,
             2.5, 6, 10, 14,
             3, 7, 11, 15,
             4, 8, 12, 16],
            "Row to major column test with numbers from 1 to 16.");        
    });
});