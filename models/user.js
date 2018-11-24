module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    }
  });

  //Associate with Group
  User.associate = function(models) {
    User.belongsTo(models.Group, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  //Associate with Role
  User.associate = function(models) {
    User.belongsTo(models.Role, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  //Associate with Form
  User.associate = function(models) {
    User.hasMany(models.Form);
  };

  return User;
};
