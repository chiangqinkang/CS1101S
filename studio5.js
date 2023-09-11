function every_second(lst) {
    return (is_null(lst) || is_null(tail(lst)))
        ? null
        : pair(head(tail(lst)), every_second(tail(tail(lst))));
}

// ["x", ["y", ["z", null]]]
every_second(list("a", "x", "b", "y", "c", "z", "d"));
every_second(list(1, 2, 3, 4));

function every_second_iter(lst) {
    function helper(xs, result) {
        return (is_null(xs) || is_null(tail(xs)))
            ? reverse(result)
            : helper(tail(tail(xs)), pair(head(tail(xs)), result));
    }
    return helper(lst, null);
}
every_second_iter(list("a", "x", "b", "y", "c", "z", "d"));
// every_second_iter(list(1, 2, 3, 4));

// recursive approach
function sums(xs) {
    // iterative
    function addHelper(lst, sum){
        return is_null(lst)
            ? sum
            : addHelper(tail(lst), sum + head(lst));
    }
    
    // recursive
    function every_odd(xs){
        return is_null(xs)
            ? null
            : is_null(tail(xs))
            ? pair(head(xs), null)
            : pair(head(xs), every_odd(tail(tail(xs))));
    }
    
    const even_sum = addHelper(every_odd(xs), 0);
    const odd_sum = addHelper(every_second(xs), 0);
    
    // return list(even_sum, odd_sum);
    return pair(even_sum, pair(odd_sum, null));
}

function sums_recur(xs) {
    if (is_null(xs)) {
        return list(0, 0);
    } else if (is_null(tail(xs))) {
        return list(head(xs), 0);
    } else {
        const wish = sums(tail(tail(xs)));
        return list(head(xs) + head(wish), head(tail(xs)) + head(tail(wish)));
    }
}


function sums_iter(xs) {
    function helper(lst, sum_even, sum_odd, num) {
        return is_null(lst)
            ? list(sum_even, sum_odd) // result
            : num % 2 === 0 // check for even or odd
            ? helper(tail(lst), sum_even + head(lst), sum_odd, num + 1)
            : helper(tail(lst), sum_even, sum_odd + head(lst), num + 1);
    }
    
    return helper(lst, 0, 0, 0);
    
    // function helper(lst, sum_even, sum_odd, even_rank) {
    //     return is_null(lst)
    //         ? list(sum_even, sum_odd) // result
    //         : even_rank // check for even or odd
    //         ? helper(tail(lst), sum_even + head(lst), sum_odd, false)
    //         : helper(tail(lst), sum_even, sum_odd + head(lst), true);
    // }
    
    // return helper(lst, 0, 0, true);
}


// // [9, [6, null]]
// sums(list(1, 2, 3, 4, 5));