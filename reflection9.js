function memo_fun(fun) {
    let already_run = false;
    let result = undefined;

    function mfun() {
        if (!already_run) {
            result = fun();
            already_run = true;
            return result;
        } else {
            return result;
        }
    }
    return mfun;
}


function stream_map_optimized(f, s) {
  return is_null(s)
    ? null
    : pair(
        f(head(s)),
        memo_fun(() => stream_map_optimized(f, stream_tail(s)))
      );
}

// displays 0
const x = stream_map_optimized(display, enum_stream(0, 10));
// displays 1,2,3
stream_ref(x, 3);
// displays 4,5 as 1,2,3 are already memoized
stream_ref(x, 5);

// function zip_list_of_streams(xs) {
//   const len = length(xs);
//   function zipHelper(xs, counter) {
//     for (let i = 0; i < len; i = i + 1) {
//       if (i === len - 1) {
//         pair(list_ref(xs, i), () => zipHelper(tail(xs), 0));
//       }
//       pair(head(list_ref(xs, i)), () => head(list_ref(xs, i+1));
//     }
//   }
// }

function zip_list_of_streams(ss){
    return pair(head(head(ss)),
        () => zip_list_of_streams(
                append(tail(ss),
                    list(stream_tail(head(ss))))));
}

function partial_sums(s) {
    function add_streams(s1, s2) {
        return is_null(s1)
            ? s2
            : is_null(s2)
            ? s1
            : pair(head(s1) + head(s2),
                   () => add_streams(stream_tail(s1), 
                                     stream_tail(s2)));
        }
    return pair(head(s), () => add_streams(stream_tail(s),
                            partial_sums(s)));
}