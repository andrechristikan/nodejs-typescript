import bluebird from 'bluebird';
import mongoose from 'mongoose';

mongoose.Promise = bluebird;
mongoose.connect(config('database.url'), {
    user: config('database.user'),
    pass: config('database.password'),
    poolSize: config('database.poolSize'),
    autoIndex: config('database.autoIndex'),
    serverSelectionTimeoutMS: config(
        'database.serverSelectionTimeoutMS'
    ),
    socketTimeoutMS: config('database.socketTimeoutMS'),
    useNewUrlParser: config('database.useNewUrlParser'),
    useUnifiedTopology: config('database.useUnifiedTopology'),
    useCreateIndex: config('database.useCreateIndex'),
}).then(() => {
    logger.log({level:'info',message:trans('app.db.connected')});
}).catch( err => {
    logger.log({level:'info',message:`${trans('app.db.refuse')} ${err}`});
});


export default {};