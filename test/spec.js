import test from 'tape';
import retryify from '../index';





test('Promise Thunk Retryify', async t => {

    t.plan(9);

    t.ok(typeof retryify === "function", 'exports a function');
    t.equal(2, retryify.length, 'function expects two arguments');
    t.throws(retryify(-1, d=>d ), 'throws when first argument not a positive integer');
    t.throws(retryify(3, 3), 'throws when second argument not a function');
    t.throws(retryify(3, d=>d), 'second argument, when invoked, should return a Promise');

    // don't retry
    retryify(0, worksAfterNtimesFactory(2) )()
        //zero retries means 1 try
        .catch( i => t.equal(i, 1, 'passing 0 retries yields 1 execution attempt') );


    // retry 10 times
    retryify(9, worksAfterNtimesFactory(10) )()
        .then( i => t.equal(i, 10, 'retries up to n times until it succeeds') );


    // retry 10 times
    retryify(10, worksAfterNtimesFactory(20) )()
        // retrying 10 times mean 11 attempts
        .catch( i => t.equal(i, 11, 'stops after n times if not successful') );


    // retry up to 10 times
    retryify(10, worksAfterNtimesFactory(2) )()
        // try up to 10 times
        .then( i => t.equal(i, 2, 'will stop retrying after when operation succeeds') )









})


function worksAfterNtimesFactory(n) {
    let i = 0;

    return () => new Promise( (resolve, reject)=>(
        setTimeout( () => (++i >= n ? resolve(i):reject(i)), 100 )
    ));

}
