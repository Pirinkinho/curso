// function addTogether(sum1, sum2) {
//     let result;
//     if (arguments.length <= 1) {
//         if (typeof (sum1) == "number") {
//             let sum_one_argument = function (add1) {
//                 console.log("yepe");
//                 console.log(add1);
//                 console.log(typeof (add1));
//                 if (typeof (add1) == "number") {
//                     console.log("inside equal to number");
//                     return add1 + sum1;
//                 }
//                 else {
//                     return undefined;
//                 }

//             }
//             return sum_one_argument;
//         }
//         else {
//             return undefined;
//         }

//     }
//     else {
//         if ((typeof (sum1) == "number") && (typeof (sum2) == "number")) {
//             result = sum1 + sum2;
//         }
//     }

//     return result
// }


// console.log(addTogether(2)([3]));


// apuntes para la clase:

// Me había equivocado al escribir y había puesto:
// (typeof (add1 == "number")) en vez de (typeof (add1) == "number")
// con eso ya iba

//Ahora refactoricemos
// 1. primero vamos a devolver un sólo return, quitamos los undefined y en los return que devuelve algo pongo el result

// function addTogether(sum1, sum2) {
//     let result;
//     if (arguments.length <= 1) {
//         if (typeof (sum1) == "number") {
//             let sum_one_argument = function (add1) {
//                 let second_result;
//                 console.log("yepe");
//                 console.log(add1);
//                 console.log(typeof (add1));
//                 if (typeof (add1) == "number") {
//                     console.log("inside equal to number");
//                     second_result = add1 + sum1;
//                 }
//                 return second_result;
//             }
//             result = sum_one_argument;
//         }

//     }
//     else {
//         if ((typeof (sum1) == "number") && (typeof (sum2) == "number")) {
//             result = sum1 + sum2;
//         }
//     }

//     return result
// }

// 2. Ahora vamos a intentar simplificar los if anidados, podríamos extraer la función anidada también.


function sum_or_undefined(sum1, sum2) {
    let result;
    if ((typeof (sum1) == "number") && (typeof (sum2) == "number")) {
        result = sum1 + sum2;
    }
    return result;
}


function return_fixed_sum(sum1) {
    let result;
    if (typeof (sum1) == "number") {
        let sum_one_argument = function (add1) {
            let second_result;
            if (typeof (add1) == "number") {
                second_result = add1 + sum1;
            }
            return second_result;
        }
        result = sum_one_argument;
    }
    return result;
}


function addTogether(sum1, sum2) {
    let result;
    if (arguments.length <= 1) {
        result = return_fixed_sum(sum1);
    }
    else {
        result = sum_or_undefined(sum1, sum2);
    }

    return result
}

console.assert(addTogether(2, 3) == 5, "test 1");
console.assert(addTogether(23.4, 30) == 53.4, "test 2");
console.assert(addTogether("2", 3) == undefined, "test 3");
console.assert(addTogether(5, undefined) == undefined, "test 4");
console.assert(addTogether("https://www.youtube.com/watch?v=dQw4w9WgXcQ") == undefined, "test 5");
console.assert(typeof (addTogether(5)) == "function", "test 6");
console.assert(addTogether(5)(7) == 12, "test 7");
console.assert(addTogether(2)([3]) == undefined, "test 8");
console.assert(addTogether(2, "3") == undefined, "test 9");

console.log("All tests passed");