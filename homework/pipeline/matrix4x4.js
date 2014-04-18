
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
    };

    matrix4x4.getOrthoMatrix = function (left, right, bottom, top, near, far) {
        var width = right - left,
            height = top - bottom,
            depth = far - near;

        // This statement checks to see if the viewing volume is symmetric.
        // If it is it returns the matrix as the first Matrix instead of the second.
        if (right === -left && top === -bottom) {
            return new Matrix4x4 (
                1.0 / right, 0.0, 0.0, 0.0,
                0.0, 1.0 / top, 0.0, 0.0,
                0.0, 0.0, -2.0 / depth, -(far + near) / depth,
                0.0, 0.0, 0.0, 1.0
            );
        } else {
            return new Matrix4x4 (
                2.0 / width, 0.0, 0.0,  -(right + left) / width,
                0.0, 2.0 / height, 0.0, -(top + bottom) / height,
                0.0, 0.0, -2.0 / depth, -(far + near) / depth,
                0.0, 0.0, 0.0, 1.0
            );
        }
    };

    matrix4x4.getFrustumMatrix = function (left, right, bottom, top, near, far) {
        var width = right - left,
            height = top - bottom,
            depth = far - near;

        // This statement checks to see if the viewing volume is symmetric.
        // If it is it returns the matrix as the first Matrix instead of the second.
        if (right === -left && top === -bottom) {
            return new Matrix4x4 (
                near / right, 0.0, 0.0, 0.0,
                0.0, near / top, 0.0, 0.0,
                0.0, 0.0, -(far + near) / depth, (-2.0 * near * far) / depth,
                0.0, 0.0, -1.0, 0.0
            );
        } else {
            return new Matrix4x4 (
                2.0 * near / width, 0.0, (right + left) / width, 0,
                0.0, 2.0 * near / height, (top + bottom) / height, 0,
                0.0, 0.0, -(far + near) / depth, (-2.0 * near * far) / depth,
                0.0, 0.0, -1.0, 0.0
            );
        }
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

    matrix4x4.prototype.coordinateAt = function (index) {
        if (index < 0 || index > 15) {
            throw "Index out of bounds";
        }
        return this.coordinates[index];
    };

    matrix4x4.prototype.rowAt = function (index) {
        if (index < 0 || index > 3) {
            throw "Index out of bounds";
        }

        return [this.coordinates[0 + (index * 4)],
                this.coordinates[1 + (index * 4)],
                this.coordinates[2 + (index * 4)],
                this.coordinates[3 + (index * 4)]];
    };

    matrix4x4.prototype.columnAt = function (index) {
        if (index < 0 || index > 3) {
            throw "Index out of bounds";
        }

        return [this.coordinates[index],
                this.coordinates[index + 4],
                this.coordinates[index + 8],
                this.coordinates[index + 12]];
    };

    // Returns the array of coordinates in the matrix
    matrix4x4.prototype.coordinates = function () {
        return this.coordinates;
    };

    matrix4x4.prototype.columnOrder = function () {
        return this.columnAt(0).concat(
               this.columnAt(1).concat(
               this.columnAt(2).concat(
               this.columnAt(3))));
    };

    return matrix4x4;

})();