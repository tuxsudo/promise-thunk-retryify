function initializeArray(length) {
    return Array.apply(null, Array(length) )
}

export default function(retries = 1, promiseThunk) {
    return () => initializeArray( retries )
        .reduce(
            (l,c) => l.catch( promiseThunk ),
            promiseThunk()
        );
}
