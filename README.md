# promise-thunk-retryify

takes any function that returns a promise and will retry it n number of tries or until successful

```
import retryify from 'promise-thunk-retryify';

// a pretent promise-based client library to some unreliable API (for instance)
import sketchyAPI from '/path/to/unreliable/data/service.js';

let try5times = retryify(4, sketchyAPI.bind(null, {id: 1}));

try5times()
    .then( doSomethingWithData )
    .catch( sorryItFailed )
```

## API

### `retrify(n, promiseThunk)`

_(int, () => Promise ) => () => Promise_

where:

* `n` number of retry attempts
* `promiseThunk`: a function that when invoked (without arguments) returns a promise.

returns a function which when invoked (without arguments) returns a Promise
