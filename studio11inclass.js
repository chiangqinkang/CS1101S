// function add_streams(s1, s2) { return is_null(s1)

// ? s2
// : is_null(s2)
//     ? s1
//     : pair(head(s1) + head(s2),
//           () => add_streams(stream_tail(s1),
//                              stream_tail(s2)));
//                              }

// function scale_stream(c, stream) {
//     return stream_map(x => c * x, stream);
// }

// // alt-ones

// // function declaration
// function alt_ones() {
//     return pair(1, 
//                 () => pair(-1, 
//                             () => alt_ones()));
// }
// // declare as a constant
// const alternating_ones = pair(1, () => pair(-1, () => alternating_ones));

// const alt_ones2 = pair(1, () => stream_map(x => -x, alt_ones2));
// const alt_ones3 = pair(1, () => scale_stream(-1, alt_ones3));

// // zeros
// function zeros() {
//     return scale_stream(0, alt_ones());
// }

// function zeros2() {
//     return stream_map(x => 0, alt_ones3);
// }

// function zeros3() {
//     return add_streams(alt_ones3, stream_tail(alt_ones3));
// }

// // s1
// // const s1 = ones_stream
// // const s1 = stream_map(x => 1, ...)
// const s1 = fun_to_series(x => 1);

// // s2
// const s2 = fun_to_series(x => x + 1);
// const ones = pair(1, () => ones);
// const s2 = pair(1, () => add_streams(ones, s2));

// in-class sheet
// (a)
/*
pair(1, 2), pair(1, 3), pair(1, 4), pair(1, 5),
pair(2, 3), pair(2, 4), pair(2, 5),
pair(3, 4), pair(4, 5),
pair(4, 5)
*/

/*
stream_pairs produces a stream containing all pairs (p1, p2) where p1 occurs
before p2 in the given finite stream.

stream_pairs works by "wishful thinking".
We assume that stream_pairs produces the stream of pairs from the tail of the
given stream. What is missing are those pairs that start with the first element
p1 of the given stream. Therefore stream_pairs returns the result of appending
the stream of those pairs to the stream of pairs from the tail. The first
stream is the result of a call of stream_map to the tail, where each element p2
of the tail becomes the pair containing p1 and the respective p2.
*/

// (c)
/*
Program runs forever.
stream_pairs calls itself recursively in the second argument of stream_append.
The argument is the tail of the given strea,.
If the given stream is infinite, this results in an infinite loop.
*/

// (d)
/*
stream_append_pickle expects its second argument to be wrapped in a nullary
function. Thus, the caller function stream_pairs2 passes the recursive call
inside a nullary function as second argument to stream_append_pickle. The
nullary function will be activated when we reach the empty list at the end of
the first argument list.
*/

// (e)
function interleave_stream_append(s1, s2) {
    // return pair(head(s1), 
    //         () => pair(head(s2), 
    //             () => interleave_stream_append(stream_tail(s1), stream_tail(s2))));
    return is_null(s1)
        ? s2
        : pair(head(s1), () => interleave_stream_append(s2, stream_tail(s1)));
}



const ones = pair(1, () => ones);
const integers = pair(1, () => stream_map(x => x + 1, integers));

const ss = interleave_stream_append(ones, integers);


// eval_stream(ss, 20);

/*
[ [1, 2],
[ [1, 3],
[ [2, 3],
[ [1, 4],
[ [2, 4],
[ [1, 5],
[ [3, 4],
[ [1, 6],
[ [2, 5],
[ [1, 7],
[ [3, 5],
[ [1, 8],
[ [2, 6],
[[1, 9], [[4, 5], [[1, 10]
*/

const stream_append_pickle = stream_append;
function stream_pairs2(s) {
    return is_null(s)
        ? null
        : stream_append_pickle(
            stream_map(
                sn => pair(head(s), sn),
                stream_tail(s)),
            () => stream_pairs2(stream_tail(s)));
}

function stream_pairs3(s) {
    return is_null(s)
        ? null
        : pair(pair(head(s), head(stream_tail(s))),
            () => interleave_stream_append(
                stream_map(
                    sn => pair(head(s), sn),
                    stream_tail(stream_tail(s))),
                stream_pairs3(stream_tail(s))));
}

const s2 = stream_pairs3(integers);

eval_stream(s2, 20);
/*
[ 1, [ 1,
[ 1, [ 2,
[ 1, [3,
[1, [4, 
[1, [5, 
[1, [6, 
[1, [7, 
[1, [8, 
[1, [9, 
[1, [10, null]]]]]]]]]]]]]]]]]]]]

*/





























