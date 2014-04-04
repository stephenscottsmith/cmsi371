/*
 * Unit tests for our vector object.
 */
$(function () {
	// This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var v = new Vector(5, 6, 3);

        equal(v.dimensions(), 3, "Vector size");
        equal(v.elements[0], 5, "First element by index");
        equal(v.elements[1], 6, "Second element by index");
        equal(v.elements[2], 3, "Third element by index");
        equal(v.x(), 5, "First element by coordinate");
        equal(v.y(), 6, "Second element by coordinate");
        equal(v.z(), 3, "Third element by coordinate");

        v = new Vector(300, 200);

        equal(v.dimensions(), 2, "Vector size");
        equal(v.elements[0], 300, "First element by index");
        equal(v.elements[1], 200, "Second element by index");
        equal(v.x(), 300, "First element by coordinate");
        equal(v.y(), 200, "Second element by coordinate");

        v = new Vector(3, 2, 1, 2);

        equal(v.dimensions(), 4, "Vector size");
        equal(v.elements[0], 3, "First element by index");
        equal(v.elements[1], 2, "Second element by index");
        equal(v.elements[2], 1, "Third element by index");
        equal(v.elements[3], 2, "Fourth element by index");
        equal(v.x(), 3, "First element by coordinate");
        equal(v.y(), 2, "Second element by coordinate");
        equal(v.z(), 1, "Third element by coordinate");
        equal(v.w(), 2, "Fourth element by coordinate");

        v = new Vector();
        equal(v.dimensions(), 0, "Empty vector (boundary case)");
    });
}