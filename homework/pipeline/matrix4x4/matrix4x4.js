var Matrix4x4 = (function () {
    // Constructor
    var matrix4x4 = function () {
        this.elements = arguments.length ?
        [].slice.call(arguments) :
        [1, 0, 0, 0,
         0, 1, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1];
    };


    matrix4x4.prototype.getMultiplicationMatrix = function (m) {
        // Sorry I suck at matrix multiplication, this was the easiest way for me
        // to figure it out without a in person Dondi Matrix Multiplication Dance
        return new Matrix4x4(
            this.elements[0] * m[0] + this.elements[1] *
            m[4] + this.elements[2] * m[8] + this.elements[3] * m[12],
            this.elements[0] * m[1] + this.elements[1] *
            m[5] + this.elements[2] * m[9] + this.elements[3] * m[13],
            this.elements[0] * m[2] + this.elements[1] *
            m[6] + this.elements[2] * m[10] + this.elements[3] * m[14],
            this.elements[0] * m[3] + this.elements[1] *
            m[7] + this.elements[2] * m[11] + this.elements[3] * m[15],

            this.elements[4] * m[0] + this.elements[5] *
            m[4] + this.elements[6] * m[8] + this.elements[7] * m[12],
            this.elements[4] * m[1] + this.elements[5] *
            m[5] + this.elements[6] * m[9] + this.elements[7] * m[13],
            this.elements[4] * m[2] + this.elements[5] *
            m[6] + this.elements[6] * m[10] + this.elements[7] * m[14],
            this.elements[4] * m[3] + this.elements[5] *
            m[7] + this.elements[6] * m[11] + this.elements[7] * m[15],

            this.elements[8] * m[0] + this.elements[9] *
            m[4] + this.elements[10] * m[8] + this.elements[11] * m[12],
            this.elements[8] * m[1] + this.elements[9] *
            m[5] + this.elements[10] * m[9] + this.elements[11] * m[13],
            this.elements[8] * m[2] + this.elements[9] *
            m[6] + this.elements[10] * m[10] + this.elements[11] * m[14],
            this.elements[8] * m[3] + this.elements[9] *
            m[7] + this.elements[10] * m[11] + this.elements[11] * m[15],

            this.elements[12] * m[0] + this.elements[13] *
            m[4] + this.elements[14] * m[8] + this.elements[15] * m[12],
            this.elements[12] * m[1] + this.elements[13] *
            m[5] + this.elements[14] * m[9] + this.elements[15] * m[13],
            this.elements[12] * m[2] + this.elements[13] *
            m[6] + this.elements[14] * m[10] + this.elements[15] * m[14],
            this.elements[12] * m[3] + this.elements[13] *
            m[7] + this.elements[14] * m[11] + this.elements[15] * m[15]
        );
    };

    matrix4x4.getTranslationMatrix = function (tx, ty, tz) {
        return new Matrix4x4(
            1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
            0, 0, 0, 1
        );
    };

    matrix4x4.getScaleMatrix = function (sx, sy, sz) {
        return new Matrix4x4(
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        );
    };

    matrix4x4.getRotationMatrix = function (angle, x, y, z) {
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
            s = Math.sin(angle * Math.PI / 180.0),
            c = Math.cos(angle * Math.PI / 180.0),
            oneMinusC = 1.0 - c,
            x2, 
            y2,
            z2,
            xy,
            yz,
            xz,
            xs,
            ys,
            zs;

        x /= axisLength;
        y /= axisLength;
        z /= axisLength;

        x2 = x * x;
        y2 = y * y;
        z2 = z * z;
        xy = x * y;
        yz = y * z;
        xz = x * z;
        xs = x * s;
        ys = y * s;
        zs = z * s;

        return new Matrix4x4(
            (x2 * oneMinusC) + c,
            (xy * oneMinusC) - zs,
            (xz * oneMinusC) + ys,
            0.0,

            (xy * oneMinusC) + zs,
            (y2 * oneMinusC) + c,
            (yz * oneMinusC) - xs,
            0.0,

            (xz * oneMinusC) - ys,
            (yz * oneMinusC) + xs,
            (z2 * oneMinusC) + c,
            0.0,

            0.0,
            0.0,
            0.0,
            1.0
        );
    };

    matrix4x4.getOrthoMatrix = function (left, right, bottom, top, near, far) {
        var width = right - left,
            height = top - bottom,
            depth = far - near;

        return new Matrix4x4(
            2.0 / width,
            0.0,
            0.0,
            -(right + left) / width,

            0.0,
            2.0 / height,
            0.0,
            -(top + bottom) / height,

            0.0,
            0.0,
            -2.0 / depth,
            -(far + near) / depth,

            0.0,
            0.0,
            0.0,
            1.0
        );
    };

    matrix4x4.getFrustumMatrix = function (left, right, bottom, top, near, far) {
        var width = right - left,
            height = top - bottom,
            depth = far - near;

        return new Matrix4x4(
            2.0 * near / width,
            0.0,
            (right + left) / width,
            0.0,

            0.0,
            2.0 * near / height,
            (top + bottom) / height,
            0.0,

            0.0,
            0.0,
            -(far + near) / depth,
            -2.0 * far * near / depth,

            0.0,
            0.0,
            -1.0,
            0.0
        );
    };

    matrix4x4.prototype.getColumnMajorOrder = function () {
        return new Matrix4x4(
            this.elements[0],
            this.elements[4],
            this.elements[8],
            this.elements[12],

            this.elements[1],
            this.elements[5],
            this.elements[9],
            this.elements[13],

            this.elements[2],
            this.elements[6],
            this.elements[10],
            this.elements[14],

            this.elements[3],
            this.elements[7],
            this.elements[11],
            this.elements[15]
        );
    };

    matrix4x4.getTransformMatrix = function (transforms) {
        var translate = new Matrix4x4(),
            scale = new Matrix4x4(),
            rotate = new Matrix4x4();

        translate = Matrix4x4.getTranslationMatrix(
            transforms.tx || 0,
            transforms.ty || 0,
            transforms.tz || 0
        );

        scale = Matrix4x4.getScaleMatrix(
            transforms.sx || 1,
            transforms.sy || 1,
            transforms.sz || 1
        );

        if (transforms.rVector) {
            if (transforms.rVector.x() === 0 && transforms.rVector.y() === 0 &&
                transforms.rVector.z() === 0) {
                rotate = Matrix4x4.getRotationMatrix(
                    transforms.angle, 1, 1, 1);
            } else {
                rotate = Matrix4x4.getRotationMatrix(
                    transforms.angle || 0,
                    transforms.rVector.rx() || 0,
                    transforms.rVector.ry() || 0,
                    transforms.rVector.rz() || 0
                );
            }
        } 

        return rotate.getMultiplicationMatrix(scale.getMultiplicationMatrix(translate));
    };

    // p, q, and r are expected to be vectors
    matrix4x4.getLookAtMatrix = function (p, q, v){
        var ze = (p.subtract(q)).unit(),
            ye = (v.subtract(v.projection(ze))).unit(),
            xe = ye.cross(ze);

        return new Matrix4x4(
            xe.x(), xe.y(), xe.z(), -(p.dot(xe)),
            ye.x(), ye.y(), ye.z(), -(p.dot(ye)),
            ze.x(), ze.y(), ze.z(), -(p.dot(ze)),
            0,0,0,1
        );
    };

    return matrix4x4;
})();