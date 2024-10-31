
class Person {
    constructor(name, telephone, email, money)
    {
        this.name = name;
        this.telephone = telephone;
        this.email = email;
        this.money = money
    }

    purchase_parking_pass()
    {
        this.money -= 20;
    }

    give_money()
    {
        this.money -= 20;
        return 20;
    }
}


class Student extends Person
{
    constructor(name, telephone, email, money, student_id, average_mark)
    {
        super(name, telephone, email, money);
        this.student_id = student_id;
        this.average_mark = average_mark;
    }

    is_eligible_to_enroll()
    {
        let is_eligible = false;
        if (this.average_mark > 5)
        {
            is_eligible = true;
        }
        return is_eligible;
    }

    give_money()
    {
        return 0;
    }
}


function* power_base(base)
{
    let initial_value = 1;
    while (true)
    {
        initial_value *= base;
        yield initial_value;

        if (initial_value == 64)
        {
            return initial_value;
        }
    }
}