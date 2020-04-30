import bluebird from 'bluebird';
import mongoose from 'mongoose';

mongoose.Promise = bluebird;
mongoose.connect(config('database.url'), {
    user: config('database.user'),
    pass: config('database.password'),
    poolSize: config('database.pool-size'),
    autoIndex: config('database.auto-index'),
    serverSelectionTimeoutMS: config(
        'database.server-selection-timeout-ms'
    ),
    socketTimeoutMS: config('database.socket-timeout-ms'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log(trans('app.db.connected'));
}).catch( err => {
    console.log(trans('app.db.refuse') + err);
});


export default {};