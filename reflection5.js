// Task 4

function get_dtmf_frequencies(number) {
    const numbers = list(pair(941, 1336), pair(697, 1209), pair(697,1336),
    pair(697, 1477), pair(770, 1209), pair(770, 1336), pair(770, 1477),
    pair(852, 1209), pair(852, 1336), pair(852, 1477));
    const symbols = list(pair(941, 1209), pair(941, 1477));
    const letters = list(pair(697, 1633), pair(770, 1633), pair(852, 1633),
    pair(941, 1633));
    if (number <= 9){
        return list_ref(numbers, number);
    }
    else if (number > 9 && number < 12){
        return list_ref(symbols, number - 10);
    }
    else if (number >= 12 && number <= 15){
        return list_ref(letters, number-12);
    }
    else {
        return null;
    }
}

function make_dtmf_tone(frequency_pair) {
    const first_sine = sine_sound(head(frequency_pair), 0.5);
    const second_sine = sine_sound((tail(frequency_pair)), 0.5);
    return simultaneously(list(first_sine, second_sine));
}

function dial(list_of_digits) {
    function dial_individual(digit){
        return make_dtmf_tone(get_dtmf_frequencies(digit));
    }
    return is_null(tail(list_of_digits))
        ? dial_individual(head(list_of_digits))
        : consecutively(list((dial_individual(head(list_of_digits))), 
        dial(tail(list_of_digits))));
}

function dial_all(list_of_numbers) {
    const avoid = list(1,8,0,0,5,2,1,1,9,8,0);
    const filtered_lists = filter(x => !(equal(x, avoid)), 
    list_of_numbers);
    filtered_lists
    return consecutively(map(dial, filtered_lists));

}
// Test
play(dial_all(
       list(
         list(1,8,0,0,5,2,1,1,9,8,0),  // not played!!!
         list(6,2,3,5,8,5,7,7),
         list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1))
        ));