'use strict';
const {
  Model,
  Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static addTodos({title,dueDate}){
      return this.create({title: title, dueDate: dueDate, completed: false});
    }
    static getTodos(){
      return this.findAll();
    }
    markAsCompleted() {
      return this.update({completed: true});
    }
    static async getOverdueTodos(){
      try{
        const OverdueTodos =await Todo.findAll({
          where: {
            dueDate:{
              [Op.lt]: new Date(),
            },
          },
        });
        return OverdueTodos;
      }catch(error) {
        console.error('Error!!!',error);
        throw error;
      }
    }
    static async getdueTodayTodos(){
      try{
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const DueTodayTodos =await Todo.findAll({
          where: {
            dueDate:{
              [Op.between]:[today, tomorrow],
            },
          },
        });
        return DueTodayTodos;
      }catch(error) {
        console.error('Error!!!',error);
        throw error;
      }
    }
    static async getdueLaterTodos(){
      try{
        const DueLaterTodos =await Todo.findAll({
          where: {
            dueDate:{
              [Op.gt]: new Date(),
            },
          },
        });
        return DueLaterTodos;
      }catch(error) {
        console.error('Error!!!',error);
        throw error;
      }
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};
