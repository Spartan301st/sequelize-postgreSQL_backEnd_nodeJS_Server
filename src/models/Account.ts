import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {User} from "./User";

// a model to be used in any case except during the creation phase, as id is generated auto
export interface AccountAttributes {
    id: string,
    accountName: string,
    userId: string
}
// used during the creation, indicating that id is optional
export interface AccountCreationAttributes extends Optional<AccountAttributes, "id"> {
}

export class Account extends Model<AccountAttributes, AccountCreationAttributes> {
    public id!: string;
    public accountName!:string;
    public userId!: string;

    public static initializeModel(sequelize: Sequelize){
        Account.init({
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            accountName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: User,
                    key: 'id'
                }
            }
        }, {
            modelName: 'accounts',
            paranoid: true,
            sequelize
        })
    }
}


