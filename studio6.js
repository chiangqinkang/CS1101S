// // import { accumulate, map } from "lists";
// function my_map(f, xs) {
//     return accumulate(f, null, xs);
// }

// my_map(x => x+5, list(1,2,3));

// function remove_duplicates(lst) {
//     function checkDuplicate(item, dupelist){
//         if (dupelist === is_null){
//             const dupe_list = append(list(item), dupelist);
//             return true;
//         }
//         else if (item === head(dupelist)){
//             return false;
            
//         }
//         else {
//             checkDuplicate(item, tail(dupelist));
//         }
//     }
//     return filter(checkDuplicate);
// }

function makeup_amount(x, coins) {
    if (x === 0) {
        return list(null);
    } else if ((x < 0) || is_null(coins)) {
        return null;
    }
    else {
        if (is_null(tail(coins))){
            return append(list(null), coins);
        }
        else {
            const combi_A = append(list(head(tail(coins))), 
            list(makeup_amount(x, tail(coins))));
            const combi_B = append(list(head((coins))),
            list(makeup_amount(x - head(coins), tail(coins))));
            const combi_C = append(list(head(coins)),
            makeup_amount(x, coins));
        return append(combi_A, combi_C);
    }
}
}

makeup_amount(22, list(1, 10, 5, 20, 1, 5, 1, 50));