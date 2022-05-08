module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hour: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minute: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Posts;
};

/*mood: {
  type: DataTypes.STRING,
  allowNull: false,
},*/
