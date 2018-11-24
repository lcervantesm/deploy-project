module.exports = function(sequelize, DataTypes) {
  var Form = sequelize.define("Form", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    form_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  //Associate with User
  Form.associate = function(models) {
    Form.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  //Associate with Group
  Form.associate = function(models) {
    Form.belongsTo(models.Group, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Form;
};
