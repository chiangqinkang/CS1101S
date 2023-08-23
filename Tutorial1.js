// Qn 1

function error(){
    return display("error");
}

function biggie_size(num){
    return num <= 4 ? num + 4 : error();
    // return num + 4;
}

/*Qn 2*/
function unbiggie_size(num){
    return num > 4 ? num - 4 : error();
    // return num - 4;
}

// Qn 3
function is_biggie_size(num){
    return num > 4;
}

// Qn 4
function combo_price(num){
    function biggie_price(price){ 
        return price + 0.5;
    }
    return num > 4
        ? biggie_price((num - 4) * 1.17)
        : (num) * (1.17);
    // return is_biggie_size(num) ? biggie_price(unbiggie_size(num) * 1.17) : (num) * (1.17);
    // return is_biggie_size(num)
        // ? 0.5 + (1.17 * unbiggie_size(num))
        // : 1.17 * num;
}

// Qn 5
function empty(){
    return 0;
}

//Qn 6
function add(order, combo){
    // return stringify(order) + stringify(combo);
    return order * 10 + combo;

}

// QN 7
function last_combo(order){
    return order % 10;
}

// Qn 8
function other_combos(order){
    const num = order - last_combo(order);
    return num / 10;
    // math_floor does a round down -> 321 / 10 = 32
    // math_ceil
    // return math_floor(order / 10);
}



