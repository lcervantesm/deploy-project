module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define("Group", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    group_name: {
      type: DataTypes.STRING
    },
    group_logo: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  });

  //Associate with Form; if admin decides to delete the account, delete all associated forms.
  Group.associate = function(models) {
    Group.hasMany(models.Form, {
      onDelete: "cascade"
    });
  };

  //Associate with User; if admin decides to delete the account, delete all associated users.
  Group.associate = function(models) {
    Group.hasMany(models.User, {
      onDelete: "cascade"
    });
  };

  return Group;
};
