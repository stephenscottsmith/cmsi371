/*
 * This is a very simple module that demonstrates rudimentary,
 * pixel-level image processing.
 */
var Nanoshop = {
    // This is a basic "darkener."
    Darken: function (r, g, b, a) {
        return [r / 2, g / 2, b / 2, a];
    },

    BlackAndWhite: function (r, g, b, a) {
        if (r < 255 || g < 255 || b < 255) {
            return [0, 0, 0, a];
        } else {
            return [r , g, b, a];
        }

    },

    Greenify: function (r, g, b, a) {
        return [0, Math.max(r, g, b), 0, a];
    },

    // This filter is more specific to Mario given I only have one rgb red value
    ConvertRedToGreen: function (r, g, b, a) {
        var max = Math.max(r, g, b);
        if (r > g && r > b && g < 105 && b < 97) {
            return [0, max, 0, a];
        } else {
            return [r, g, b, a];
        }
    },




    /*
     * Applies the given filter to the given ImageData object,
     * then modifies its pixels according to the given filter.
     *
     * A filter is a function (r, g, b, a) that returns another
     * pixel as a 4-element array representing an RGBA value.
     */
    applyFilter: function (imageData, filter) {
        // For every pixel, replace with something determined by the filter.
        var i,
            j,
            max,
            pixel,
            pixelArray = imageData.data;

        for (i = 0, max = imageData.width * imageData.height * 4; i < max; i += 4) {
            pixel = filter(pixelArray[i], pixelArray[i + 1], pixelArray[i + 2], pixelArray[i + 3]);
            for (j = 0; j < 4; j += 1) {
                pixelArray[i + j] = pixel[j];
            }
        }

        return imageData;
    }
};
