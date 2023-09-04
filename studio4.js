function square(x){
    return x * x;
}

function fast_expt(b, n) {
    function fast_expt_iter(b, n, product) {
    return n === 0
        ? product
        : n % 2 === 0
        ? fast_expt_iter(b * b, n/2, product))
        : fast_expt_iter(b, n-1, b * product);
    }
    return fast_expt_iter(b, n, 1);
}

fast_expt(3, 4);