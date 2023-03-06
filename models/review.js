module.exports = (sequelize, DataTypes) => {
    const review = sequelize.define("review",{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                max: 10,
                min: 0
            }
        },
        user_username: {
            type: DataTypes.STRING,
        }
    },{tableName: 'review'});
    return review;
}