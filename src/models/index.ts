import {Sequelize} from "sequelize";
import {User} from "./User";
import {Account} from "./Account";
import {Post} from "./Post";

export const sequelize = new Sequelize(
    'sequelize_intro',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        dialect: 'postgres',
        define: {
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            deletedAt: 'deletedAt',
        }
    }
);

// we should initialize all the models we create
User.initializeModel(sequelize);
Account.initializeModel(sequelize);
Post.initializeModel(sequelize);