function insert_cmp(x, xs, cmp){
    return is_null(xs)
        ? list(x)
        : cmp(x, head(xs))
        ? pair(x, xs)
        : pair(head(xs), insert_cmp(x, tail(xs), cmp));
}
function insertion_sort_cmp(xs, cmp){
    return is_null(xs)
        ? xs
        : insert_cmp(head(xs),
        insertion_sort_cmp(tail(xs), cmp), 
        cmp);
}

const xs = list(6, 3, 8, 5, 1, 9, 6, 4, 2 ,7);


// qn 1a
// insertion_sort_cmp(xs, (x,y) => x <= y);
// qn 1b
// insertion_sort_cmp(xs, (x,y) => x >= y);
// qn 1c
// insertion_sort_cmp(xs, (x,y) => false);
// qn 1d
function is_even(x){
    return x % 2 === 0;
}
function dHelper(x, y){
    if (is_even(x) && is_even(y)){
        return x <= y;
    } else if (!is_even(x) && !is_even(y)){
        return x > y;
    } else if (is_even(x) && !is_even(y)){
        return true;
    } else {
      return false;  
    }
}
insertion_sort_cmp(xs, dHelper);

// insertion_sort_cmp(xs, (x,y) => x % 2 === 0 ? x < y : x > y);
// qn 2a
// O(n), theta(n), omega(1)
// qn 2b
// O(n^2), theta(n), omega(1)
 