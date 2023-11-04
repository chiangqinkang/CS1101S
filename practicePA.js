// EXTRA PRACTICAL ASSESSMENT
// QUESTION PAPER

/* PREDECLARED FUNCTIONS. DO NOT REMOVE THIS LINE */                                                                                                                function string_to_list(s) {function helper(pos) {return char_at(s, pos) === undefined? null: pair(char_at(s, pos), helper(pos + 1));}return helper(0);}function list_to_string(xs) {function helper(xs, result) {return is_null(xs)? result: helper(tail(xs), result + head(xs));}return helper(xs, "");}function string_length(s) {function helper(pos) {return char_at(s, pos) === undefined? pos: helper(pos + 1);}return helper(0);}function nth_term(sequence, n) {return stream_ref(sequence, n - 1);}



// TASK 1A: REFLECTING A STRING

function self_reflect(s) {
    const reflected = reverse(string_to_list(s));
    return list_to_string(append(string_to_list(s), reflected));
}


// TASK 1B: CHECK FOR PALINDROMES

function is_palindrome(s) {
     const str_len = string_length(s);
     const mid_pt = math_floor(str_len/2);
     const s_list = string_to_list(s);
     let boolhelper = true;
     for (let i = 0; i < mid_pt; i = i + 1){
         if (char_at(s, i) !== char_at(s, str_len - i - 1)){
             return false;
         }
     }
     return true;
}

// TASK 1C: GENERATE PALINDROMES

function generate_palindrome(x) {
    function permutations(ys) {
            return is_null(ys)
                ? list(null)
                : accumulate(append, null,
                    map(x => map(p => pair(x, p),
                                 permutations(remove(x, ys))),
                        ys));
        }
    function remove_duplicates(xs) {
        return is_null(xs) 
              ? null
              : pair(head(xs), 
                      remove_duplicates(filter(p => !equal(p, head(xs)), 
                                        tail(xs))));
    }
	
    function is_palindrome_list(xs) {
        return equal(xs, reverse(xs));
    }
    
    const xs = string_to_list(x);
    const words = permutations(xs);
    return map(list_to_string, remove_duplicates(filter(is_palindrome_list, words)));    
}


// TASK 2A: ARITHMETIC SEQUENCE

function arithmetic_sequence(a, d) {
    return pair(a, () => arithmetic_sequence(a+d, d));
}

// TASK 2B: GEOMETRIC SEQUENCE

function geometric_sequence(a, r) {
    return pair(a, () => geometric_sequence(a*r, r));
}


// TASK 2C: RECURRENCE RELATION

function recurrence(t1, t2, f) {
    return pair(t1, () => recurrence(t2, f(t1,t2), f));
}


// TASK 2D: ZIP SEQUENCES

function zip_sequences(xs) {
    if (is_null(xs)) {
	return null;
    } else {
        const seq = head(xs);
        return pair(head(seq), () => zip_sequences(append(tail(xs), list(stream_tail(seq)))));
    }
}


// TASK 2E: SUM OF SEQUENCES

function sum_sequences(xs) {
    function add_stream(s1, s2) {
        return is_null(s1)
               ? s2
               : is_null(s2)
               ? s1
               : pair(head(s1) + head(s2), () => add_stream(stream_tail(s1), stream_tail(s2)));
    }
    return accumulate(add_stream, null, xs);
}


// TASK 3: TRAVERSE MATRIX DIAGONALLY

function traverse_diagonally(M) {
//     const mat_rows = array_length(M);
//     const mat_cols = array_length(M[0]);
//     function checkPos(row,col){
//         if (row < 0 || col < 0 || row > mat_rows || col > mat_cols){
//             return false;
//         } else {
//             return true;
//         }
//     }
//     // pos is a pair, state denotes going up or down diagonally
//     function traverseHelper(mat, state, pos){
//         // row pos
//         const row_pos = head(pos);
//         const col_pos = tail(pos);
//         if (row_pos === array_length(mat) && col_pos === array_length(mat)){
//           return null;  
//         } else if (state === "up" && checkPos(row_pos, col_pos)){
//                 return pair(mat[row_pos][col_pos],
//                     traverseHelper(mat, state, pair(row_pos+1, col_pos+1)));
//             } else if (state === "up" && !checkPos(row_pos, col_pos)) {
//                 return traverseHelper(mat, "down", pos);
//             } else if (state === "down" && checkPos(row_pos, col_pos)) {
//                 return pair(mat[row_pos][col_pos],
//                         traverseHelper(mat, state, pair(row_pos-1, col_pos-1)));
//         }  else if (state === "down" && !checkPos(row_pos, col_pos)) {
//                 return traverseHelper(mat, "up", pos);
//         }
//     }
//     return traverseHelper(M, "up", pair(0,0));
// }
    
    const len = array_length(M);
    const times = len * 2 - 1;
    
    function transpose_even(M) {
        function swap(r1, c1, r2, c2) {
            let temp = M[r1][c1];
            M[r1][c1] = M[r2][c2];
            M[r2][c2] = temp;
        }
        for (let i = 0; i < len; i = i + 1) {
            for (let j = i + 1; j < len; j = j + 1) {
                if ((i + j) % 2 === 1) {
                    swap(i, j, j, i);
                }
            }
        }
    }
    
    let lst = list();
    
    transpose_even(M);
    
    function travel(i, j) {
        if (i >= 0 && j < len) {
            if (M[i] === undefined || M[i][j] === undefined) {
                travel(i - 1, j + 1);
            } else {
                lst = append(lst, list(M[i][j]));
                travel(i - 1, j + 1);
            }
        }
    }
    
    for (let t = 0; t < times; t = t + 1) {
        travel(t, 0);
    }
    
    return lst;
}

// TASK 4: FASTEST TO WIN

function find_shortest_path(M) {
    // const numRows = array_length(M);
    // const numCols = array_length(M[0]);
    // function shortestHelper(row, col){
    //     const current = M[row][col];
    //     const right = col > numCols ? shortestHelper(row, col + 1) : 0;
    //     const down = row > numRows ? shortestHelper(row + 1, col) : 0;
    //     return current + math_min(down, right);
    // }
    // return shortestHelper(0,0);
    
    const rows = array_length(M);
    const cols = array_length(M[0]);
    for (let i = rows - 1; i >= 0; i = i - 1) {
        for (let j = cols - 1; j >= 0; j = j - 1) {
            let down = null;
            let right = null;
            if (M[i + 1] !== undefined) {
                down = M[i + 1][j];
            } 
            if (M[i][j + 1] !== undefined) {
                right = M[i][j + 1];
            }
            M[i][j] = is_null(down)
                      ? (is_null(right)) ? M[i][j] : M[i][j] + right
                      : (is_null(right)) ? M[i][j] + down : M[i][j] + math_min(down, right);
        }
    }
    return M[0][0];
}




// TEST CASES ------------------------------------------------------------------

function test1A() {
    
    function util1() {
        if (self_reflect("simba") === "simbaabmis") {
            display("TEST 1A - 1: PASS [Normal input]");
        } else {
            display("TEST 1A - 1: FAIL [Normal input]");
        }
    }
    
    function util2() {
        if (self_reflect("") === "") {
            display("TEST 1A - 2: PASS [Empty String]");
        } else {
            display("TEST 1A - 2: FAIL [Empty String]");
        }
    }
    
    function util3() {
        if (self_reflect("Metacircular Evaluator") === "Metacircular EvaluatorrotaulavE ralucricateM") {
            display("TEST 1A - 3: PASS [Case-sensitive Input]");
        } else {
            display("TEST 1A - 3: FAIL [Case-sensitive Input]");
        }
    }
    
    util1();
    util2();
    util3();
}

function test1B() {
    
    function util1() {
        if (is_palindrome("simis") === true) {
            display("TEST 1B - 1: PASS [Odd Length Palindrome]");
        } else {
            display("TEST 1B - 1: FAIL [Odd Length Palindrome]");
        }
    }
    
    function util2() {
        if (is_palindrome("abccba") === true) {
            display("TEST 1B - 2: PASS [Even Length Palindrome]");
        } else {
            display("TEST 1B - 2: FAIL [Even Length Palindrome]");
        }
    }
    
    function util3() {
        if (is_palindrome("simba") === false) {
            display("TEST 1B - 3: PASS [Odd Length Non-Palindrome]");
        } else {
            display("TEST 1B - 3: FAIL [Odd Length Non-Palindrome]");
        }
    }
    
    function util4() {
        if (is_palindrome("simb") === false) {
            display("TEST 1B - 4: PASS [Even Length Non-Palindrome]");
        } else {
            display("TEST 1B - 4: FAIL [Even Length Non-Palindrome]");
        }
    }
    
    function util5() {
        if (is_palindrome("") === true) {
            display("TEST 1B - 5: PASS [Empty String]");
        } else {
            display("TEST 1B - 5: FAIL [Empty String]");
        }
    }
    
    function util6() {
        if (is_palindrome("a") === true) {
            display("TEST 1B - 6: PASS [Single Length String]");
        } else {
            display("TEST 1B - 6: FAIL [Single Length String]");
        }
    }
    
    util1();
    util2();
    util3();
    util4();
    util5();
    util6();
}

function test1C() {
    
    function util1() {
        if (equal(generate_palindrome("caabb"), list("abcba", "bacab"))) {
            display("TEST 1C - 1: PASS [Public Test Case: \"caabb\"]");
        } else {
            display("TEST 1C - 1: FAIL [Public Test Case: \"caabb\"]");
        }
    } 
    
    function util2() {
        if (is_null(generate_palindrome("jason"))) {
            display("TEST 1C - 2: PASS [Public Test Case: \"jason\"]");
        } else {
            display("TEST 1C - 2: FAIL [Public Test Case: \"jason\"]");
        }
    }
    
    function util3() {
        if (equal(generate_palindrome("a"), list("a"))) {
            display("TEST 1C - 3: PASS [String of length 1]");
        } else {
            display("TEST 1C - 3: FAIL [String of length 1]");
        }
    }
    
    function util4() {
        if (equal(generate_palindrome("aaaaaa"), list("aaaaaa"))) {
            display("TEST 1C - 4: PASS [Secret Test Case]");
        } else {
            display("TEST 1C - 4: FAIL [Secret Test Case]");
        }
    }
    
    util1();
    util2();
    util3();
    util4();
}

function test2A() {
    
    function util1() {
        const s = arithmetic_sequence(1, 1);
        if (is_pair(s) && equal(eval_stream(s, 5), list(1, 2, 3, 4, 5))) {
            display("TEST 2A - 1: PASS [Sequence of Integers]");
        } else {
            display("TEST 2A - 1: FAIL [Sequence of Integers]");
        }
    }
    
    function util2() {
        const s = arithmetic_sequence(1, 0);
        if (is_pair(s) && equal(eval_stream(s, 5), list(1, 1, 1, 1, 1))) {
            display("TEST 2A - 2: PASS [Sequence of Ones]");
        } else {
            display("TEST 2A - 2: FAIL [Sequence of Ones]");
        }
    }
    
    function util3() {
        const s = arithmetic_sequence(5, 0.5);
        if (is_pair(s) && equal(eval_stream(s, 5), list(5, 5.5, 6, 6.5, 7))) {
            display("TEST 2A - 3: PASS [Sequence of Rational Numbers]");
        } else {
            display("TEST 2A - 3: FAIL [Sequence of Rational Numbers]");
        }
    }
    
    function util4() {
        const s = arithmetic_sequence(-5, -1);
        if (is_pair(s) && equal(eval_stream(s, 5), list(-5, -6, -7, -8, -9))) {
            display("TEST 2A - 4: PASS [Sequence of Negative Numbers]");
        } else {
            display("TEST 2A - 4: FAIL [Sequence of Negative Numbers]");
        }
    }
    
    function util5() {
        const s = arithmetic_sequence(-5, -1);
        if (is_pair(s) && is_function(tail(s))) {
            display("TEST 2A - 5: PASS [Sequence uses streams]");
        } else {
            display("TEST 2A - 5: FAIL [Sequence should use streams]");
        }
    }
    
    util1();
    util2();
    util3();
    util4();
    util5();
}

function test2B() {
    
    function util1() {
        const s = geometric_sequence(1, 2);
        if (is_pair(s) && equal(eval_stream(s, 5), list(1, 2, 4, 8, 16))) {
            display("TEST 2B - 1: PASS [Powers of 2]");
        } else {
            display("TEST 2B - 1: FAIL [Powers of 2]");
        }
    }
    
    function util2() {
        const s = geometric_sequence(1, 1);
        if (is_pair(s) && equal(eval_stream(s, 5), list(1, 1, 1, 1, 1))) {
            display("TEST 2B - 2: PASS [Sequence of Ones]");
        } else {
            display("TEST 2B - 2: FAIL [Sequence of Ones]");
        }
    }
    
    function util3() {
        const s = geometric_sequence(1, 0.5);
        if (is_pair(s) && equal(eval_stream(s, 5), list(1, 0.5, 0.25, 0.125, 0.0625))) {
            display("TEST 2B - 3: PASS [Sequence of Rational Numbers]");
        } else {
            display("TEST 2B - 3: FAIL [Sequence of Rational Numbers]");
        }
    }
    
    function util4() {
        const s = geometric_sequence(-5, -1);
        if (is_pair(s) && equal(eval_stream(s, 5), list(-5, 5, -5, 5, -5))) {
            display("TEST 2B - 4: PASS [Sequence of Negative Numbers]");
        } else {
            display("TEST 2B - 4: FAIL [Sequence of Negative Numbers]");
        }
    }
    
    function util5() {
        const s = geometric_sequence(1, 2);
        if (is_pair(s) && is_function(tail(s))) {
            display("TEST 2B - 5: PASS [Sequence uses streams]");
        } else {
            display("TEST 2B - 5: FAIL [Sequence should use streams]");
        }
    }
    
    util1();
    util2();
    util3();
    util4();
    util5();
}

function test2C() {
    
    function util1() {
        const s = recurrence(1, 1, (a, b) => a + b);
        if (is_pair(s) && equal(eval_stream(s, 5), list(1, 1, 2, 3, 5))) {
            display("TEST 2C - 1: PASS [Normal Recurrence]");
        } else {
            display("TEST 2C - 1: FAIL [Normal Recurrence]");
        }
    }
    
    function util2() {
        const s = recurrence(1, 3, (a, b) => 2 * a + b);
        if (is_pair(s) && equal(eval_stream(s, 5), list(1, 3, 5, 11, 21))) {
            display("TEST 2C - 2: PASS [Correct Order of Parameters]");
        } else {
            display("TEST 2C - 2: FAIL [Correct Order of Parameters]");
        }
    }
    
    function util3() {
        const s = recurrence(1, 0.5, (a, b) => a + b);
        if (is_pair(s) && equal(eval_stream(s, 5), list(1, 0.5, 1.5, 2, 3.5))) {
            display("TEST 2C - 3: PASS [Sequence of Rational Numbers]");
        } else {
            display("TEST 2C - 3: FAIL [Sequence of Rational Numbers]");
        }
    }
    
    function util4() {
        const s = recurrence(1, -1, (a, b) => a + b);
        if (is_pair(s) && equal(eval_stream(s, 5), list(1, -1, 0, -1, -1))) {
            display("TEST 2C - 4: PASS [Sequence of Negative Numbers]");
        } else {
            display("TEST 2C - 4: FAIL [Sequence of Negative Numbers]");
        }
    }
    
    function util5() {
        const s = recurrence(1, 2, (a, b) => a);
        if (is_pair(s) && is_function(tail(s))) {
            display("TEST 2C - 5: PASS [Sequence uses streams]");
        } else {
            display("TEST 2C - 5: FAIL [Sequence should use streams]");
        }
    }
    
    util1();
    util2();
    util3();
    util4();
    util5();
}

function test2D() {
    
    function dummy_sequences(a, b) {
        return pair(a, () => dummy_sequences(a + b, b));
    }
    
    const a = dummy_sequences(0, 1);
    const b = dummy_sequences(10, 1);
    const c = dummy_sequences(100, 1);
    
    function util1() {
        const s = zip_sequences(list(a, b, c));
        if (is_pair(s) && equal(eval_stream(s, 15), list(0, 10, 100, 1, 11, 101, 2, 12, 102, 3, 13, 103, 4, 14, 104))) {
            display("TEST 2D - 1: PASS [List of Sequences]");
        } else {
            display("TEST 2D - 1: FAIL [List of Sequences]");
        }
    }
    
    function util2() {
        const s = zip_sequences(list(a));
        if (is_pair(s) && equal(eval_stream(s, 5), list(0, 1, 2, 3, 4))) {
            display("TEST 2D - 2: PASS [Single Sequence in List]");
        } else {
            display("TEST 2D - 2: FAIL [Single Sequence in List]");
        }
    }
    
    function util3() {
        const s = zip_sequences(null);
        if (equal(s, null)) {
            display("TEST 2D - 3: PASS [Empty List]");
        } else {
            display("TEST 2D - 3: FAIL [Empty List]");
        }
    }
    
    util1();
    util2();
    util3();
}

function test2E() {
    
    function dummy_sequences(a, b) {
        return pair(a, () => dummy_sequences(a + b, b));
    }
    
    const a = dummy_sequences(0, 1);
    const b = dummy_sequences(10, 1);
    const c = dummy_sequences(100, 1);
    
    function util1() {
        const s = sum_sequences(list(a, b, c));
        if (is_pair(s) && equal(eval_stream(s, 5), list(110, 113, 116, 119, 122))) {
            display("TEST 2E - 1: PASS [List of Sequences]");
        } else {
            display("TEST 2E - 1: FAIL [List of Sequences]");
        }
    }
    
    function util2() {
        const s = sum_sequences(list(a));
        if (is_pair(s) && equal(eval_stream(s, 5), eval_stream(a, 5))) {
            display("TEST 2E - 2: PASS [Single Sequence in List]");
        } else {
            display("TEST 2E - 2: FAIL [Single Sequence in List]");
        }
    }
    
    function util3() {
        const s = sum_sequences(null);
        if (equal(s, null)) {
            display("TEST 2E - 3: PASS [Empty List]");
        } else {
            display("TEST 2E - 3: FAIL [Empty List]");
        }
    }
    
    util1();
    util2();
    util3();
}

function test3() {
    
    function util1() {
        const M = [[1,2,3],[4,5,6],[7,8,9]];
        const lst = traverse_diagonally(M);
        if (is_list(lst) && equal(lst, list(1, 2, 4, 7, 5, 3, 6, 8, 9))) {
            display("TEST 3 - 1: PASS [Public Test Case]");   
        } else {
            display("TEST 3 - 1: FAIL [Public Test Case]");
        }
    }
    
    function util2() {
        const M = [[1]];
        const lst = traverse_diagonally(M);
        if (is_list(lst) && equal(lst, list(1))) {
            display("TEST 3 - 2: PASS [Single Array Element]");
        } else {
            display("TEST 3 - 2: FAIL [Single Array Element]");
        }
    }
    
    function util3() {
        const M = [];
        if (is_null(traverse_diagonally(M))) {
            display("TEST 3 - 3: PASS [Empty Array]");
        } else {
            display("TEST 3 - 3: FAIL [Empty Array]");
        }
    }
    
    util1();
    util2();
    util3();
}

function test4() {
    
    function util1() {
        const rooms = [[1, 2, 3, 4], 
					     [5, 0, 7, 7], 
					     [9, 0, 1, 0], 
							 [5, 1, 7, 0], 
							 [6, 1, 1, 1]];
		const path = find_shortest_path(rooms);
		if (is_number(path) && path === 5) {
		    display("TEST 4 - 1: PASS [Public Test Case]");
		} else {
		    display("TEST 4 - 1: FAIL [Public Test Case]");
		}
    }
    
    function util2() {
        const rooms = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
		const path = find_shortest_path(rooms);
		if (is_number(path) && path === 5) {
		    display("TEST 4 - 2: PASS [Same Rooms Time]");
		} else {
		    display("TEST 4 - 2: FAIL [Same Rooms Time]");
		}
    }
    
    function util3() {
        const rooms = [[0, 0, 0, 0], [0, 0, 0, 0]];
		const path = find_shortest_path(rooms);
		if (is_number(path) && path === 0) {
		    display("TEST 4 - 3: PASS [Zero Matrix]");
		} else {
		    display("TEST 4 - 3: FAIL [Zero Matrix]");
		}
    }
    
    function util4() {
        const rooms = [[1]];
		const path = find_shortest_path(rooms);
		if (is_number(path) && path === 1) {
		    display("TEST 4 - 4: PASS [Single Element Array]");
		} else {
		    display("TEST 4 - 4: FAIL [Single Element Array]");
		}
    }
    
    util1();
    util2();
    util3();
    util4();
}

function test1() {
    test1A();
    test1B();
    test1C();
}

function test2() {
    test2A();
    test2B();
    test2C();
    test2D();
    test2E();
}

function test() {
    test1();
    test2();
    test3();
    test4();
}

test4();