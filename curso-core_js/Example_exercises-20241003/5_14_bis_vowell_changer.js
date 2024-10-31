// Crea una función que tenga como entrada un string y una vocal y te
// cambie todas las vocales del string por esa vocal. Después, imprime por
// pantalla “Cuando Fernando Séptimo llevaba pantalón” con las diferentes
// vocales.


// TC1: “Cuando Fernando Septimo llevaba pantalon”, a -> “Caanda Farnanda Saptama llavaba pantalan”
// TC2: “Cuando Fernando Septimo llevaba pantalon”, e -> “Ceende Fernende Septeme llevebe pentelen”
// TC3: “Cuando Fernando Septimo llevaba pantalon”, i -> “Ciindi Firnindi Siptimi llivibi pintilin”
// TC4: “”, i -> “”
// TC5: "132q2w42453" -> "132q2w42453"
// TC6: "aaaaaaaaaaaaa" -> "aaaaaaaaaaaaa"
// TC7: "AAA", e -> "eee"


function vowell_changer_basic(data, vowell)
{
    let new_string = "";
    for (let element = 0; element < data.length; element++)
    {
        let character = data[element];
        if (character == "a" || character == "e" || character == "i" || character == "o" || character == "u" ||
            character == "A" || character == "E" || character == "I" || character == "O" || character == "U")
        {
            character = vowell;
        }
        new_string += character;
    }
    return new_string;
}


function vowell_changer_basic2(data, vowell)
{
    let new_string = "";
    let vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
    for (let element = 0; element < data.length; element++)
    {
        let character = data[element];
        if (vowels.has(character))
        {
            character = vowell;
        }
        new_string += character;
    }
    return new_string;
}


function vowell_changer(data, vowell)
{
    let vowels_map = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];

    for (let vowell_to_change of vowels_map)
    {
        data = data.replaceAll(vowell_to_change, vowell);
    }

    return data;
}


function vowell_changer_superbe(data, vowell)
{
    return data.replace(/[aeiou]/gi, vowell)
}

let startTime = new Date();
console.log(vowell_changer_basic("Cuando Fernando Septimo llevaba pantalon", "a"));
let endTime = new Date();
console.log(endTime - startTime);
console.log(vowell_changer_basic("Cuando Fernando Septimo llevaba pantalon", "e"));
console.log(vowell_changer_basic("Cuando Fernando Septimo llevaba pantalon", "i"));
console.log(vowell_changer_basic("Cuando Fernando Septimo llevaba pantalon", "o"));
console.log(vowell_changer_basic("Cuando Fernando Septimo llevaba pantalon", "u"));
console.log(vowell_changer_basic("", "i"));
console.log(vowell_changer_basic("132q2w42453", "o"));
console.log(vowell_changer_basic("aaaaaaaaaaaaa", "a"));
console.log(vowell_changer_basic("aaaaaaaaaaaaa", "e"));
console.log(vowell_changer_basic("AAA", "a"));

startTime = new Date();
console.log(vowell_changer_basic2("Cuando Fernando Septimo llevaba pantalon", "a"));
endTime = new Date();
console.log(endTime - startTime);
console.log(vowell_changer_basic2("Cuando Fernando Septimo llevaba pantalon", "e"));
console.log(vowell_changer_basic2("Cuando Fernando Septimo llevaba pantalon", "i"));
console.log(vowell_changer_basic2("Cuando Fernando Septimo llevaba pantalon", "o"));
console.log(vowell_changer_basic2("Cuando Fernando Septimo llevaba pantalon", "u"));
console.log(vowell_changer_basic2("", "i"));
console.log(vowell_changer_basic2("132q2w42453", "o"));
console.log(vowell_changer_basic2("aaaaaaaaaaaaa", "a"));
console.log(vowell_changer_basic2("aaaaaaaaaaaaa", "e"));
console.log(vowell_changer_basic2("AAA", "a"));

startTime = new Date();
console.log(vowell_changer("Cuando Fernando Septimo llevaba pantalon", "a"));
endTime = new Date();
console.log(endTime - startTime);
console.log(vowell_changer("Cuando Fernando Septimo llevaba pantalon", "e"));
console.log(vowell_changer("Cuando Fernando Septimo llevaba pantalon", "i"));
console.log(vowell_changer("Cuando Fernando Septimo llevaba pantalon", "o"));
console.log(vowell_changer("Cuando Fernando Septimo llevaba pantalon", "u"));
console.log(vowell_changer("", "i"));
console.log(vowell_changer("132q2w42453", "o"));
console.log(vowell_changer("aaaaaaaaaaaaa", "a"));
console.log(vowell_changer("aaaaaaaaaaaaa", "e"));
console.log(vowell_changer("AAA", "a"));

startTime = new Date();
console.log(vowell_changer_superbe("Cuando Fernando Septimo llevaba pantalon", "a"));
endTime = new Date();
console.log(endTime - startTime);
console.log(vowell_changer_superbe("Cuando Fernando Septimo llevaba pantalon", "e"));
console.log(vowell_changer_superbe("Cuando Fernando Septimo llevaba pantalon", "i"));
console.log(vowell_changer_superbe("Cuando Fernando Septimo llevaba pantalon", "o"));
console.log(vowell_changer_superbe("Cuando Fernando Septimo llevaba pantalon", "u"));
console.log(vowell_changer_superbe("", "i"));
console.log(vowell_changer_superbe("132q2w42453", "o"));
console.log(vowell_changer_superbe("aaaaaaaaaaaaa", "a"));
console.log(vowell_changer_superbe("aaaaaaaaaaaaa", "e"));
console.log(vowell_changer_superbe("AAA", "a"));