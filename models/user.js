module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {}
        },
    }, {tableName: 'user'})
    return user;
}
