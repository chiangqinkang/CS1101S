function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}
const A = pair(1, () => scale_stream(2, A));
// returns result of (2^x-1 series)

function mul_streams(a,b) {
    return pair(head(a) * head(b),
        () => mul_streams(stream_tail(a), stream_tail(b)));
}
// const B = pair(1, () => mul_streams(B, integers));
// gives (1*1, 1*2, 2*3, ...

// alt_ones
const ones = pair(1, () => ones);
const alternating_ones = pair(1, () => pair(-1, () => alternating_ones));
// const alt_ones = scale_stream(-1, () => alt_ones);

function addStreams(s1, s2){
    return pair(head(s1) + head(s2),
        addStreams(stream_tail(s1), stream_tail(s2)));
}

addStreams(scale_stream(-1, alternating_ones), alternating_ones);