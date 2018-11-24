module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  //Associate with Users
  Role.associate = function(models) {
    Role.hasMany(models.User);
  };

  return Role;
};
