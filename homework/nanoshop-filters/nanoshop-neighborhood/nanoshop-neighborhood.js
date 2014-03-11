/*
 * This is a very simple module that demonstrates rudimentary,
 * pixel-level image processing using a pixel's "neighborhood."
 */
var NanoshopNeighborhood = {
    /*
     * A basic "darkener"---this one does not even use the entire pixel neighborhood;
     * just the exact current pixel like the original Nanoshop.
     */
    Darken: function (rgbaNeighborhood) {
        return [
            rgbaNeighborhood[4].r / 2,
            rgbaNeighborhood[4].g / 2,
            rgbaNeighborhood[4].b / 2,
            rgbaNeighborhood[4].a
        ];
    },

    /*
     * A basic "averager"---this one returns the average of all the pixels in the
     * given neighborhood.
     */
    Blur: function (rgbaNeighborhood) {
        var rTotal = 0,
            gTotal = 0,
            bTotal = 0,
            aTotal = 0,
            i;

        for (i = 0; i < 9; i += 1) {
            rTotal += rgbaNeighborhood[i].r;
            gTotal += rgbaNeighborhood[i].g;
            bTotal += rgbaNeighborhood[i].b;
            aTotal += rgbaNeighborhood[i].a;
        }

        return [ rTotal / 9, gTotal / 9, bTotal / 9, aTotal / 9 ];
    },

    Maximizer: function (rgbaNeighborhood) {
        var rMax = 0,
            gMax = 0,
            bMax = 0,
            aMax = 0,
            i;

        for (i = 0; i < 9; i += 1) {
            rMax = Math.max(rMax, rgbaNeighborhood[i].r);
            gMax = Math.max(gMax, rgbaNeighborhood[i].g);
            bMax = Math.max(bMax, rgbaNeighborhood[i].b);
            aMax = Math.max(aMax, rgbaNeighborhood[i].a);
        }

        return [ rMax, gMax, bMax, aMax ];
    },

    Minimizer: function (rgbaNeighborhood) {
        var rMin = 255,
            gMin = 255,
            bMin = 255,
            aMin = 255,
            i;

        for (i = 0; i < 9; i += 1) {
            rMin = Math.min(rMin, rgbaNeighborhood[i].r);
            gMin = Math.min(gMin, rgbaNeighborhood[i].g);
            bMin = Math.min(bMin, rgbaNeighborhood[i].b);
            aMin = Math.min(aMin, rgbaNeighborhood[i].a);
        }

        return [ rMin, gMin, bMin, aMin ];
    },

    BlackAndWhite: function (rgbaNeighborhood) {
        for (i = 0; i < 9; i += 1) {
            if (rgbaNeighborhood[i].r < 255 || 
                rgbaNeighborhood[i].g < 255 ||
                rgbaNeighborhood[i].b < 255) {
                return [0, 0, 0, rgbaNeighborhood[i].a];
            } else {
                return [rgbaNeighborhood[i].r, rgbaNeighborhood[i].g,
                        rgbaNeighborhood[i].b, rgbaNeighborhood[i].a];
            }
        }
    },

    // Add a blur combined with a yellow/gold for a soft glow, decrease the alpha
    // just a little as well
    // Inspiration: https://docs.unity3d.com/Documentation/Components/script-GlowEffect.html
    SoftGlow: function (rgbaNeighborhood) {
        var rgba = NanoshopNeighborhood.Blur(rgbaNeighborhood),
            r = rgba[0],
            g = rgba[1],
            b = rgba[2],
            a = rgba[3],
            reduceAlpha = 0.8,
            multiplier = 1.5,
            halfBrightness = 127;

        if (r > halfBrightness || g > halfBrightness || b > halfBrightness) {
            // Add a yellow/gold
            return [r * multiplier, g * multiplier, b, a * reduceAlpha];
        } else {
            return [r, g, b, a];
        }
    },

    ThermalCamera: function (rgbaNeighborhood) {
        var neighborhood = NanoshopNeighborhood.Maximizer(rgbaNeighborhood),
            rMax = neighborhood[0],
            gMax = neighborhood[1],
            bMax = neighborhood[2],
            fullColor = 255,
            colorHelper = 102,
            colorStep = 43,
            lowLimitRed = fullColor - colorStep,
            lowLimitYellow = lowLimitRed - colorStep,
            lowLimitCyan = lowLimitYellow - colorStep,
            lowLimitNavy = lowLimitCyan - colorStep,
            lowLimitPurple = lowLimitNavy - colorStep,
            lowLimitBlack = lowLimitPurple - colorStep,
            lowest = 0;

        if (rMax >= lowLimitRed || gMax >= lowLimitRed || bMax >= lowLimitRed) {
            // Brightest is red
            return [fullColor, lowest, lowest, fullColor];

        } else if ((rMax < lowLimitRed && rMax >= lowLimitYellow) || 
                    (gMax < lowLimitRed && gMax >= lowLimitYellow) ||
                    (bMax < lowLimitRed && bMax >= lowLimitYellow)) {
            // yellow
            return [fullColor, fullColor, lowest, fullColor];

        } else if ((rMax < lowLimitYellow && rMax >= lowLimitCyan) || 
                    (gMax < lowLimitYellow && gMax >= lowLimitCyan) ||
                    (bMax < lowLimitYellow && bMax >= lowLimitCyan)) {
            // cyan
            return [lowest, fullColor, fullColor, fullColor];
            
        } else if ((rMax < lowLimitCyan && rMax >= lowLimitNavy) || 
                    (gMax < lowLimitCyan && gMax >= lowLimitNavy) ||
                    (bMax < lowLimitCyan && bMax >= lowLimitNavy)) {
            // navy
            return [fullColor, colorHelper, 204, fullColor];
            
        } else if ((rMax < lowLimitNavy && rMax >= lowLimitPurple) || 
                    (gMax < lowLimitNavy && gMax >= lowLimitPurple) ||
                    (bMax < lowLimitNavy && bMax >= lowLimitPurple)) {
            // purple
            return [colorHelper, lowest, colorHelper, fullColor];
            
        } else {
            // black
            return [lowest, lowest, lowest, fullColor];
        }
    },

    /*
     * Applies the given filter to the given ImageData object,
     * then modifies its pixels according to the given filter.
     *
     * A filter is a function ({r, g, b, a}[9]) that returns another
     * color as a 4-element array representing the new RGBA value
     * that should go in the center pixel.
     */
    applyFilter: function (renderingContext, imageData, filter) {
        // For every pixel, replace with something determined by the filter.
        var result = renderingContext.createImageData(imageData.width, imageData.height),
            i,
            j,
            max,
            iAbove,
            iBelow,
            pixel,
            pixelColumn,
            firstRow,
            lastRow,
            rowWidth = imageData.width * 4,
            sourceArray = imageData.data,
            destinationArray = result.data,

            // A convenience function for creating an rgba object.
            rgba = function (startIndex) {
                return {
                    r: sourceArray[startIndex],
                    g: sourceArray[startIndex + 1],
                    b: sourceArray[startIndex + 2],
                    a: sourceArray[startIndex + 3]
                };
            };

        for (i = 0, max = imageData.width * imageData.height * 4; i < max; i += 4) {
            // The 9-color array that we build must factor in image boundaries.
            // If a particular location is out of range, the color supplied is that
            // of the extant pixel that is adjacent to it.
            iAbove = i - rowWidth;
            iBelow = i + rowWidth;
            pixelColumn = i % rowWidth;
            firstRow = sourceArray[iAbove] === undefined;
            lastRow = sourceArray[iBelow] === undefined;

            pixel = filter([
                // The row of pixels above the current one.
                firstRow ?
                    (pixelColumn ? rgba(i - 4) : rgba(i)) :
                    (pixelColumn ? rgba(iAbove - 4) : rgba(iAbove)),

                firstRow ? rgba(i) : rgba(iAbove),

                firstRow ?
                    ((pixelColumn < rowWidth - 4) ? rgba(i + 4) : rgba(i)) :
                    ((pixelColumn < rowWidth - 4) ? rgba(iAbove + 4) : rgba(iAbove)),

                // The current row of pixels.
                pixelColumn ? rgba(i - 4) : rgba(i),

                // The center pixel: the filter's returned color goes here
                // (based on the loop, we are at least sure to have this).
                rgba(i),

                (pixelColumn < rowWidth - 4) ? rgba(i + 4) : rgba(i),

                // The row of pixels below the current one.
                lastRow ?
                    (pixelColumn ? rgba(i - 4) : rgba(i)) :
                    (pixelColumn ? rgba(iBelow - 4) : rgba(iBelow)),

                lastRow ? rgba(i) : rgba(iBelow),

                lastRow ?
                    ((pixelColumn < rowWidth - 4) ? rgba(i + 4) : rgba(i)) :
                    ((pixelColumn < rowWidth - 4) ? rgba(iBelow + 4) : rgba(iBelow))
            ]);

            // Apply the color that is returned by the filter.
            for (j = 0; j < 4; j += 1) {
                destinationArray[i + j] = pixel[j];
            }
        }

        return result;
    }
};
