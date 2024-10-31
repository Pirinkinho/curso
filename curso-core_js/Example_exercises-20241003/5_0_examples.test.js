
// to run jest, needed in windows
// npm install -g jest
// Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
// install package.json in directory
// run npm run test

let examples = require("./5_0_examples.js");
let examples_utils = require("./5_0_examples_utils.js");

describe("area_circle()", () => {

    test("calculates area correctly", () => {

        expect(examples.area_circle(1)).toBe(Math.PI);
        expect(examples.area_circle(2)).toBe(4*Math.PI);
        expect(examples.area_circle(0)).toBe(0);
        expect(examples.area_circle(Infinity)).toBe(Infinity);
    });
});



describe("area_circle()", () => {

    test("calculates area correctly", () => {

        expect(examples.super_area_circle(1)).toBe(Math.PI);
        jest.spyOn(examples_utils, "is_radio").mockReturnValue(false);
        expect(examples.super_area_circle(1)).toBe(21);

    });
});


// afterEach(() => {
//     // restore the spy created with spyOn
//     jest.restoreAllMocks();
// });

// describe("calculate_new_iva()", () => {

//     test("calculates mock iva", () => {

//         expect(examples.calculate_new_iva(10, 21)).toBe(12.1);
//         expect(examples.calculate_new_iva(10, 9)).toBe(11);

//         jest.spyOn(examples_utils, "calculate_iva_ten").mockReturnValue("El precio final es lo que Mariana quiera");
//         expect(examples.calculate_new_iva(10, 21)).toBe(12.1);
//         expect(examples.calculate_new_iva(10, 13)).toBe(3);

//     });
// });

// describe("call_prompt()", () => {

    // test("mocks prompt", () => {

        //jest.spyOn(window, "prompt").mockImplementation(() => {yield "Mighty David"});
        // global.prompt = () => "Mighty David"

        // expect(examples.call_prompt()).toBe("Mighty David");

        // jest.spyOn(window, "prompt").mockReturnValueOnce("Mighty David").mockReturnValueOnce("suerte");
        // expect(examples.call_prompt()).toStrictEqual(expect.arrayContaining(["Mighty David", "suerte"]));


    //});
//});