

let examples_utils = require("./5_0_examples_utils.js");

function area_circle(radio)
{
    return Math.PI*(radio**2);
}


function super_area_circle(radio)
{
    let area = 0;
    if (examples_utils.is_radio(radio))
    {
        area = Math.PI*(radio**2);
        console.log("It is here: " + area);
    }
    else
    {
        area = 21;
    }
    return area;
}

// function call_prompt()
// {
//     let name = [];
//     for (let i = 0; i < 2; i++) {
//         namedata = prompt("get my name: ");
//         name.push(namedata);
//     }

//     return name;
// }


function calculate_new_iva(price, iva)
{
    let final_price = 0;
    if (iva == 21)
    {
        final_price = price + price*iva/100;
    }
    else{
        final_price = examples_utils.calculate_iva_ten(price);
    }
    return "The final price is " + final_price;
}


function multiply2(x)
{
    return x*2;
}

function divide2(x)
{
    return x/2;
}


function mapWithCb(array, callback)
{
    if (!Array.isArray(array) || typeof callback !== 'function') {
      throw Error();
    }
    return array.map(item => callback(item));
}


module.exports = {
    super_area_circle,
    area_circle,
    calculate_new_iva,
    // call_prompt
};


let suerte = calculate_new_iva(10, 21);
let suerte2 = calculate_new_iva(10, 10);


let new_object = {
    "name": "David",
    "age": 28,
    "city": "Madrid"
}


function* infinite_object_iterator_popping(data_object)
{
    let keys = Object.keys(data_object);

    while(true)
    {
        let data = keys.pop();
        keys.unshift(data);
        yield data;
    }
}


function* infinite_object_iterator_counter(data_object)
{
    let keys = Object.keys(data_object);
    let count = 0;

    while(true)
    {
        let data = keys[count];
        count++;
        if (count == keys.length)
        {
            count = 0;
        }
        yield data;
    }
}

let yepe = infinite_object_iterator_counter(new_object);
yepe.next();
yepe.next();
yepe.next();
yepe.next();

let yepe2 = infinite_object_iterator_popping(new_object);
yepe2.next();
yepe2.next();
yepe2.next();
yepe2.next();