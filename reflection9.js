function fib(n){
    const f = [0,1];
    // not < n, as that stops just before calculating fib n
    for (let i = 2; i <= n; i = i+1){
        f[i] =  f[i-1] + f[i-2];
    }
    return f[n];
}

function fib_1(n){
    let a = 0;
    let b = 1;
    for (let i = 2; i <= n; i = i + 1){
        b = b + a;
        a = b - a;
    }
    return b;
}