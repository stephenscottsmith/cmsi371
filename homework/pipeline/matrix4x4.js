
var Matrix4x4 = (function () {
	
    // constructor
    var matrix4x4 = function () {
        this.coordinates = arguments.length ? [].slice.call(arguments) : 
               [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0
                0, 0, 0, 1];
    };

    matrix4x4.prototype.multiply = function (matrix) {
        var result = new Matrix4x4(),
            i,
            j,
            k,
            sum,
            rows = 4,
            columns = 4;

        // Check to make sure they are both matrice's that have 
        // the same 4x4 dimensions
        checkDimensions(this, matrix);

        for (i = 0; i < rows; i += 1) {
            for (j = 0; j < columns; j += 1) {
                sum = 0;
                for (k = 0; k < rows; k += 1) {
                    sum += this.coordinateAt((i * 4) + k) * matrix.coordinateAt((k * 4) + j); 
                }
                result.coordinates[(i * 4) + j] = sum;
            }
        }
        
        return result;
    };

    var matrix4x4.getTranslationMatrix = function (tx, ty, tz) {
        return new matrix4x4(
            1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
            0, 0, 0, 1
        );
    };

    matrix4x4.getScaleMatrix = function (sx, sy, sz) {
        return new Matrix4x4(
            sx,  0,  0, 0,
             0, sy,  0, 0,
             0,  0, sz, 0,
             0,  0,  0, 1
        );
    };






    // HELPER FUNCTIONS & EXTRA PROPERTIES
    
    // Returns length of coordinates array, should be 16
    matrix4x4.prototype.dimensions = function () {
        return this.coordinates.length;
    };

    var checkDimensions = function(matrix1, matrix2) {
        if (matrix1.dimensions() !== matrix2. dimensions()) {
            throw "Matrices have different dimensions";
        }
    };















    



    // Returns the array of coordinates in the matrix
    matrix4x4.prototype.coordinates = function () {
        return this.coordinates;
    }



    var getRotationMatrix = function (angle, x, y, z) {
        // In production code, this function should be associated
        // with a matrix object with associated functions.
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
            s = Math.sin(angle * Math.PI / 180.0),
            c = Math.cos(angle * Math.PI / 180.0),
            oneMinusC = 1.0 - c,

            // We can't calculate this until we have normalized
            // the axis vector of rotation.
            x2, // "2" for "squared."
            y2,
            z2,
            xy,
            yz,
            xz,
            xs,
            ys,
            zs;

        // Normalize the axis vector of rotation.
        x /= axisLength;
        y /= axisLength;
        z /= axisLength;

        // *Now* we can calculate the other terms.
        x2 = x * x;
        y2 = y * y;
        z2 = z * z;
        xy = x * y;
        yz = y * z;
        xz = x * z;
        xs = x * s;
        ys = y * s;
        zs = z * s;

        // GL expects its matrices in column major order.
        return [
            (x2 * oneMinusC) + c, (xy * oneMinusC) + zs, (xz * oneMinusC) - ys, 0.0,

            (xy * oneMinusC) - zs, (y2 * oneMinusC) + c, (yz * oneMinusC) + xs, 0.0,

            (xz * oneMinusC) + ys, (yz * oneMinusC) - xs, (z2 * oneMinusC) + c, 0.0,

            0.0, 0.0, 0.0, 1.0
        ];
    },

    getOrthoMatrix = function (left, right, bottom, top, zNear, zFar) {
            var width = right - left,
                height = top - bottom,
                depth = zFar - zNear;

            return [
                2.0 / width,
                0.0,
                0.0,
                0.0,

                0.0,
                2.0 / height,
                0.0,
                0.0,

                0.0,
                0.0,
                -2.0 / depth,
                0.0,

                -(right + left) / width,
                -(top + bottom) / height,
                -(zFar + zNear) / depth,
                1.0
            ];
        };
})();