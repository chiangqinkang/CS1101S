// Qn 1
function make_withdraw(balance, password){
    function withdraw(amount, pass) {
        if (balance >= amount && pass === password) {
            balance = balance - amount;
            return balance;
        } else if (pass !== password){
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