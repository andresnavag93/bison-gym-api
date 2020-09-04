'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plugin = sequelize.define(
    'Plugin',
    {
      typeId: {
        allowNull: false,
        field: 'type_id',
        type: DataTypes.INTEGER,
        references: {
          model: 'attributes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      isDelete: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
        field: 'is_delete'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    },
    {
      tableName: 'plugins'
    }
  );
  Plugin.associate = function(models) {
    Plugin.belongsTo(models.Attribute, {
      as: 'type',
      foreignKey: 'typeId'
    });
    Plugin.hasMany(models.GymsPlugin, {
      as: 'gymsPlugins',
      foreignKey: 'pluginId'
    });
  };
  return Plugin;
};
