// 1.8 Crea una clase para encontrar todos los grupos de tres elementos dado un
// set de n números reales que sumen zero.Ejemplo input:
// Input array: [-25, -10, -7, -3, 2, 4, 8, 10]
// Output: [[-10, 2, 8], [-7, -3, 10]]

let math = require("mathjs")

//notes:
// 1. The input array is a set of n numbers (so no duplicated numbers)
// 2. the number of addings is 3 numbers
// 3. the sum of the three numbers is zero


// test cases
// 1. -> si decidimos convertir a set después -> comprobar que no hay duplicados
// 1. -> si decidimos obligar a que sea un set -> lanzar un error y comprobarlo cuando no sea un set


// class SumZeroThreeNumbersArray {
//     constructor(inputArray) {
//         this.inputArray = new Set(inputArray);
//     }

//     // findSumZeroThreeSetElement() {
//     //     let result = [];
//     //     let inputArray = this.inputArray;

//     //     return result;
//     // }

// }


// | iter number | first_num | second_num | third_num | analyze? | result good? |
// |-------------|-----------|------------|-----------|----------|--------------|
// | 0           | -25       | -25        | -         |   no     | -            |
// | 0           | -25       | -10        | -25       |   no     | -            |
// | 0           | -25       | -10        | -10       |   no     | -            |
// | 0           | -25       | -10        | -7        |   si     | no           |
// | 0           | -25       | -10        | -3        |   si     | no           |
// | 0           | -25       | -10        | 2         |   si     | no           |


function k_combinations(set, k) {
    var i, j, combs, head, tailcombs;

    // There is no way to take e.g. sets of 5 elements from
    // a set of 4.
    if (k > set.length || k <= 0) {
        return [];
    }

    // K-sized set has only one K-sized subset.
    if (k == set.length) {
        return [set];
    }

    // There is N 1-sized subsets in a N-sized set.
    if (k == 1) {
        combs = [];
        for (i = 0; i < set.length; i++) {
            combs.push([set[i]]);
        }
        return combs;
    }

    // Assert {1 < k < set.length}

    // Algorithm description:
    // To get k-combinations of a set, we want to join each element
    // with all (k-1)-combinations of the other elements. The set of
    // these k-sized sets would be the desired result. However, as we
    // represent sets with lists, we need to take duplicates into
    // account. To avoid producing duplicates and also unnecessary
    // computing, we use the following approach: each element i
    // divides the list into three: the preceding elements, the
    // current element i, and the subsequent elements. For the first
    // element, the list of preceding elements is empty. For element i,
    // we compute the (k-1)-computations of the subsequent elements,
    // join each with the element i, and store the joined to the set of
    // computed k-combinations. We do not need to take the preceding
    // elements into account, because they have already been the i:th
    // element so they are already computed and stored. When the length
    // of the subsequent list drops below (k-1), we cannot find any
    // (k-1)-combs, hence the upper limit for the iteration:
    combs = [];
    for (i = 0; i < set.length - k + 1; i++) {
        // head is a list that includes only our current element.
        head = set.slice(i, i + 1);
        // We take smaller combinations from the subsequent elements
        tailcombs = k_combinations(set.slice(i + 1), k - 1);
        // For each (k-1)-combination we join it with the current
        // and store it to the set of k-combinations.
        for (j = 0; j < tailcombs.length; j++) {
            combs.push(head.concat(tailcombs[j]));
        }
    }
    return combs;
}




class SumZeroThreeNumbersSet {
    constructor(inputArray) {
        if (inputArray instanceof Set) {
            this.inputArray = inputArray;
        }
        else {
            throw new Error("The input array is not a Set");
        }
    }

    findSumZeroThreeElementsBruteForce() {
        let result = [];
        let aux_array = Array.from(this.inputArray);
        for (let first_num_index = 0; first_num_index < aux_array.length; first_num_index++) {
            for (let second_num_index = 0; second_num_index < aux_array.length; second_num_index++) {
                if (first_num_index === second_num_index) {
                    continue;
                }
                else {
                    for (let third_num_index = 0; third_num_index < aux_array.length; third_num_index++) {
                        if (first_num_index === third_num_index || second_num_index === third_num_index) {
                            continue;
                        }
                        else {
                            if (aux_array[first_num_index] + aux_array[second_num_index] + aux_array[third_num_index] === 0) {
                                result.push([aux_array[first_num_index], aux_array[second_num_index], aux_array[third_num_index]]);
                            }
                        }
                    }
                }
            }
        }
        result = check_duplicated_arrays(result);
        return result;
    }

    findSumZeroThreeElementsCombinations() {
        let indexes = [...Array(this.inputArray.size).keys()];
        let possible_permutations = k_combinations(indexes, 3)
        let result = [];
        let aux_array = Array.from(this.inputArray);
        for (let i = 0; i < possible_permutations.length; i++) {
            if (aux_array[possible_permutations[i][0]] + aux_array[possible_permutations[i][1]] + aux_array[possible_permutations[i][2]] === 0) {
                result.push([aux_array[possible_permutations[i][0]], aux_array[possible_permutations[i][1]], aux_array[possible_permutations[i][2]]]);
            }
        }
        return result;
    }
}


let sum_class = new SumZeroThreeNumbersSet(new Set([-25, -10, -7, -3, 2, 4, 8, 10]));
console.log(sum_class.findSumZeroThreeElementsBruteForce());
