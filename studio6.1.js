// function remove_duplicates(lst){ 
//     return accumulate((x, y) => is_null(member(x, y))
//         ? pair(x, y)
//         : , null, lst);
// }

// remove_duplicates(list(1, 2, 3, 4, 4, 3, 2, 1, 2));


function subsets(xs){
    if (is_null(xs)) {
        return null;
    }
    else {
    // // not using first element at all
    // const not_using_first_all = subsets(tail(xs));
    
    // // not using first element for rest
    // const not_using_first_rest = append(list(head(xs)), subsets(tail(xs)));
    
    // // using first element
    // const first_ele = list(head(xs));
    
    
    // case 1: using first ele
    const first = list(head(xs), subsets);
    
    // case 2: not using first ele
    
    // case 3: end of subset
    
    return append(not_using_first_rest, first_ele);
    }
}

subsets(list(1, 2, 3));
 
function permutations(s) {
    return is_null(s)
        ? list(null)
        : accumulate(
            append,
            null,
            map(x =>
                map(p => pair(x, p), permutations(remove(x, s)))
                ,s)
            );
}

permutations(list(1, 2, 3));
 
 