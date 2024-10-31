

function is_radio(radio)
{
    let output = true;
    if (radio == 0)
    {
        output = false;
    }
    return output;
}

function calculate_iva_ten(price)
{
    let final_price = 0;
    final_price = price + price*0.1;
    return final_price;
}


module.exports = {
    is_radio,
    calculate_iva_ten
};