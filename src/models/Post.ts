import {DataTypes, Model, Optional, Sequelize} from "sequelize";
import {Account} from "./Account";

// a model to be used in any case except during the creation phase, as id is generated auto
export interface PostAttributes {
    id: string,
    title: string,
    body: string,
    accountId: string
}
// used during the creation, indicating that id is optional
export interface PostCreationAttributes extends Optional<PostAttributes, "id"> {
}

export class Post extends Model<PostAttributes, PostCreationAttributes> {
    public id!: string;
    public title!:string;
    public body!:string;
    public accountId!: string;

    public static initializeModel(sequelize: Sequelize){
        Post.init({
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            body: {
                type: DataTypes.STRING,
                allowNull: false
            },
            accountId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: Account,
                    key: 'id'
                }
            }
        }, {
            modelName: 'posts',
            paranoid: true,
            sequelize
        })
    }
}


