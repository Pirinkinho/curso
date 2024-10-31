

function get_length_last_word(data)
{
    let trim_data = data.trim();
    let array_words = trim_data.split(" ");
    let len_array_words = array_words.length
    let last_word = array_words[len_array_words-1]
    return last_word.length
}

console.assert(5 === get_length_last_word(" hola mundo"));
console.assert(9 === get_length_last_word(" holamundo "));
console.assert(2 === get_length_last_word("h ola mun do"));
console.assert(1 === get_length_last_word("h s s a  a a  s s s"));
console.assert(4 === get_length_last_word("                     yepe                    "));
console.assert(0 === get_length_last_word(""));
console.assert(6 === get_length_last_word("         ** ñññ 123124"));


function get_length_last_word_basic(data)
{

    let last_word_count = 0;
    let aux_word_count = 0;

    for(let i = 0; i < data.length; i++)
    {
        let character = data[i];
        if (character == " ")
        {
            if (aux_word_count != 0)
            {
                last_word_count = aux_word_count;
            }
            aux_word_count= 0;
        }
        else
        {
            aux_word_count++;
        }
    }

    if (aux_word_count != 0)
    {
        last_word_count = aux_word_count;
    }

    return last_word_count;
}

console.assert(5 === get_length_last_word_basic(" hola mundo"));
console.assert(9 === get_length_last_word_basic(" holamundo "));
console.assert(2 === get_length_last_word_basic("h ola mun do"));
console.assert(1 === get_length_last_word_basic("h s s a  a a  s s s"));
console.assert(4 === get_length_last_word_basic("                     yepe                    "));
console.assert(0 === get_length_last_word_basic(""));
console.assert(6 === get_length_last_word_basic("         ** ñññ 123124"));


console.assert(get_length_last_word(" hola mundo") === get_length_last_word_basic(" hola mundo"));
console.assert(get_length_last_word(" holamundo ") === get_length_last_word_basic(" holamundo "));
console.assert(get_length_last_word("h ola mun do") === get_length_last_word_basic("h ola mun do"));
console.assert(get_length_last_word("h s s a  a a  s s s") === get_length_last_word_basic("h s s a  a a  s s s"));
console.assert(get_length_last_word("                     yepe                    ") === get_length_last_word_basic("                     yepe                    "));
console.assert(get_length_last_word("") === get_length_last_word_basic(""));
console.assert(get_length_last_word("         ** ñññ 123124") === get_length_last_word_basic("         ** ñññ 123124"));


console.log("Animo equipo!")