import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import session from 'express-session';

class Database {
    public create(): void {
        mongoose
            .connect(config('database.url'), {
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
            })
            .then(() => {
                logger.log({
                    level: 'info',
                    message: language('_core.app.db.connected'),
                });
            })
            .catch((err) => {
                logger.log({
                    level: 'info',
                    message: `${language('_core.app.db.refuse')} ${err}`,
                });
            });

        if (env('ENV') === 'debug') {
            mongoose.set('debug', true);
        }
    }

    public databaseSession(): object {
        // Database
        const MongoStore = connectMongo(session);
        const sessionMongoStoreSetting: object = {
            store: new MongoStore({
                url: config('database.url'),
                autoReconnect: true,
            }),
        };
        return sessionMongoStoreSetting;
    }
}

export default Database;
