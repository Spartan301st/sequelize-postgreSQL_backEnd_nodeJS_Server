import {DataTypes, Model, Optional, Sequelize} from "sequelize";

export interface UserAttributes {
    id: string;
    userName: string;
    email: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}


    export class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: string;
    public userName!: string;
    public email!: string;


    public static initializeModel(sequelize: Sequelize) {
        User.init({
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                },
                userName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            }, {
                modelName: 'users',
                paranoid: true,
                sequelize
            }
        )
    }
}