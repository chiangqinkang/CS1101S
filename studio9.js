/*
// The incorrect version
function count_pairs(x) {
    if (!is_pair(x)) {
        return 0;
    } else {
        return 1 + count_pairs(head(x)) + count_pairs(tail(x));
    }
}
*/

function count_pairs(x) {
    let pairlist = null;
    
    function pairChecker(y) {
        if (!is_pair(y)){
            return undefined;
        } else if (!is_null(member(y, pairlist))) {
            return undefined;
        } else {
            pairlist = append(pairlist, list(y));
            pairChecker(head(y));
            pairChecker(tail(y));
        }
    }
    
    pairChecker(x);
    return length(pairlist);
}

const three = list(1, 2, 3);
display(count_pairs(three));

const four_a = pair(null, null);
const four_b = pair(four_a, four_a);
const four = pair(four_b, null);
display(count_pairs(four));

const seven_a = pair(null, null);
const seven_b = pair(seven_a, seven_a);
const seven = pair(seven_b, seven_b);
display(count_pairs(seven));

const loop = list(1, 2, 3);
set_tail(tail(tail(loop)), loop);
display(count_pairs(loop));
