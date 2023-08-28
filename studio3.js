import { stack, circle, square, blank, ribbon, beside, stack_frac, beside_frac, show } from "rune";

// Q1
function moony_1(rune){
    return stack(
        beside(circle, blank),
        beside(square, rune));
}
// show(moony_1(ribbon));

// Q2
function moony_2(n){
    return n === 0
        ? circle
        // : stack(beside(circle, blank), beside(square, moony_2(n-1)));
        : moony_1(moony_2(n-1));
}

// show(moony_2(5));

// Q3
function moony(n){
    return n === 1 
        ? circle
        : beside_frac(1/n,
            stack_frac(1/n, circle, square),
            stack_frac(1/n, blank, moony(n-1)));
            
    return n === 1
        ? circle
        : stack_frac(1/n,
            beside_frac(1/n, circle, blank),
            beside_frac(1/n, square, moony_3(n-1)));
}

// show(moony(5));

function moony_3(n){
    // return n === 1 
    //     ? circle
    //     : beside(
    //         stack_frac(1/n, circle, square),
    //         stack_frac(1/n, blank, moony_3(n-1)));
}
show(moony_3(5));

// Q4
/*The solutions give rise to a recursive process due to the presence of
the deferred operations in the calling function. */

/* In this case, the size of the problem is the number of steps that is required 
for the function to execute. So the orders of growth is linear, O(n) */
