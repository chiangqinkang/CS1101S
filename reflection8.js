// Qn 1
function make_withdraw(balance, password){
    let i = 0;
    function withdraw(amount, pass) {
        if (i > 2){
            return "account disabled";
        }
        else if (balance >= amount && pass === password) {
            balance = balance - amount;
            i = 0;
            return balance;
        } else if (pass !== password){
            i = i + 1;
            return "wrong password";
        } 
        else {
            return "Insufficient funds";
            }
        }
    return withdraw;
}

const acc = make_withdraw(100, "my_pass");
acc(30, "mys");
acc(30, "mys");
acc(30, "my_pass");
acc(30, "mys");
acc(30, "mys");
acc(30, "my_pass");