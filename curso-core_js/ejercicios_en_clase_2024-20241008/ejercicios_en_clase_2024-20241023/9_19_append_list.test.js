// TEST CASES
// Habría que pensar en los errores de input -> no lo voy a hacer
// 1. lista = [1, 2, 3], el = 4 -> [1, 2, 3, 4]
// 2. lista = [1, 2, 3], el = 3 -> ValueError
// 3. lista = [1, 2, 3], el = 1 -> ValueError
// 4. lista = [1, 3, 2], el = 2 -> ValueError
// 5. lista = [1, 8, 15], el = 5 -> [1, 8, 15, 5]
// 6. lista = [1, 8, 15, "c"], el = "15"  -> [1, 8, 15, "c", "15"]
// 7. lista = [1, 8, 15, "c", "15", 6, "3343"], el = "15"  -> ValueError
// 8. lista = [], el = "3343"  -> ["3343"]


const append_list = require('./9_19_append_list.js');


describe("append list returns an error (converted to string output or not)", () => {
    test("adding repeated number", () => {
        expect(append_list.add_different_element_to_list([1, 2, 3], 3)).toBe("this element already in list");
        expect(append_list.add_different_element_to_list([1, 2, 3], 1)).toBe("this element already in list");
        expect(append_list.add_different_element_to_list([1, 3, 2], 2)).toBe("this element already in list");
    });

    test("adding repeated string", () => {
        expect(append_list.add_different_element_to_list([1, 8, 15, "c", "15", 6, "3343"], "15")).toBe("this element already in list");
    });

    test("uncontrolled error", () => {
        expect(() => append_list.add_different_element_to_list({ "1": 2 }, "15")).toThrow(Error);
    });
});


describe("append list adding a new element returns an expected list", () => {
    test("adding new element", () => {
        expect(append_list.add_different_element_to_list([1, 2, 3], 4)).toEqual([1, 2, 3, 4]);
        expect(append_list.add_different_element_to_list([1, 8, 15], 5)).toEqual([1, 8, 15, 5]);
        expect(append_list.add_different_element_to_list([1, 8, 15, "c"], "15")).toEqual([1, 8, 15, "c", "15"]);
        expect(append_list.add_different_element_to_list([], "3343")).toEqual(["3343"]);
    });
});
