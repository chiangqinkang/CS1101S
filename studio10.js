/*
function bubblesort_array(A) {
    const len = array_length(A);
    for (let i = len - 1; i >= 1; i = i - 1) {
        for (let j = 0; j < i; j = j + 1) {
            if (A[j] > A[j + 1]) {
                const temp = A[j];
                A[j] = A[j + 1];
                A[j + 1] = temp;
            }
        }
    }
}

const AA = [3, 5, 2, 4, 1];
bubblesort_array(AA);
AA;
// time complexity: Theta(n^2)

*/
//Viswa
// function bubblesort_list(L) {
//     const len = length(L);
//     for(let i = len - 1; i >= 1; i = i - 1) {
//         let curr = L;
//         for(let j = 0; j < i; j = j + 1) {
//             if (head(curr) > head(tail(curr))) {
//                 const temp = head(curr);
//                 set_head(curr, head(tail(curr)));
//                 set_head(tail(curr), temp);
//             }
//             curr = tail(curr);
//         }
//     }
// }

/*
function bubblesort_list(L) {
    for (let i = 0; i < length(L); i = i + 1) {
        if (is_null(L) || is_null(tail(L))) {
            return null;
        } else if (head(L) > head(tail(L))) {
            const temp = head(L);
            set_head(L, head(tail(L)));
            set_head(tail(L), temp);
        }
        bubblesort_list(tail(L));
    }
}


const LL = list(3, 5, 2, 4, 1);
bubblesort_list(LL);
LL; // should show [1, [2, [3, [4, [5, null]]]]]
*/

const mem = [];

function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

function first_denomination(kinds_of_coins) {
    return kinds_of_coins === 1 ?   5 :
           kinds_of_coins === 2 ?  10 :
           kinds_of_coins === 3 ?  20 :
           kinds_of_coins === 4 ?  50 :
           kinds_of_coins === 5 ? 100 : 0;
}

// The non-memoized version.
function cc(amount, kinds_of_coins) {
    return amount === 0
           ? 1
           : amount < 0 || kinds_of_coins === 0
           ? 0
           : cc(amount, kinds_of_coins - 1)
             +
             cc(amount - first_denomination(kinds_of_coins),
                kinds_of_coins);
}

cc(25, 5);
// The memoized version.
// n is the amount in cents, and k is the number of denominations.
function mcc(n, k) {
    if (n >= 0 && read(n,k) !== undefined){
        return read(n,k);
    } else {
        const result = n === 0
            ? 1
            : n < 0 || k === 0
            ? 0
            : mcc(n, k-1)
            +
            mcc(n - first_denomination(k), k);
    if (n >= 0 && k >= 0){
        write(n, k, result);
    }
    return result;
    }
}

// mcc(365, 5);  
// Expected result: 1730
















