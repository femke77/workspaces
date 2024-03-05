const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const uuid = require("../utils/utils.js");

class Workspace extends Model {}

Workspace.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    join_code: {
      type: DataTypes.STRING,
      defaultValue: function () {
        return uuid();
      },
    },
   
  },
  { 
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "workspace",
  }
);

module.exports = Workspace;
