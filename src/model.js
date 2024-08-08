import { Model, DataTypes } from 'sequelize'
import util from 'util'
import connectToDB from './db.js'
import {} from 'dotenv/config'

export const db = await connectToDB(process.env.CON)

export class User extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}
export class Expense extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}
export class ExType extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}
export class Income extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}
export class InType extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}
export class Card extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}
export class Account extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      modelName: 'user',
      sequelize: db,
    }
)

Expense.init(
    {
      exId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      exAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      modelName: 'expense',
      sequelize: db,
    }
)

ExType.init(
    {
      exTypeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      exTypeName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      modelName: 'extype',
      sequelize: db,
    }
)

Income.init(
    {
      incomeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      incomeAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      modelName: 'income',
      sequelize: db,
    }
)

InType.init(
    {
      inTypeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      inTypeName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      modelName: 'intype',
      sequelize: db,
    }
)

Card.init(
    {
      cardId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cardName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cardBank: {
        type: DataTypes.STRING,
        allowNull: false
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      modelName: 'card',
      sequelize: db,
    }
)

Account.init(
    {
      acctId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      acctName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      acctAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      modelName: 'account',
      sequelize: db,
    }
)

User.hasMany(Expense, {foreignKey: 'userId'})
Expense.belongsTo(User, {foreignKey: 'userId'})

User.hasMany(Income, {foreignKey: 'userId'})
Income.belongsTo(User, {foreignKey: 'userId'})

User.hasMany(Card, {foreignKey: 'userId'})
Card.belongsTo(User, {foreignKey: 'userId'})

User.hasMany(Account, {foreignKey: 'userId'})
Account.belongsTo(User, {foreignKey: 'userId'})

Card.hasMany(Expense, {foreignKey: 'cardId'})
Expense.belongsTo(Card, {foreignKey: 'cardId'})

ExType.hasMany(Expense, {foreignKey: 'exTypeId'})
Expense.belongsTo(ExType, {foreignKey: 'exTypeId'})

InType.hasMany(Income, {foreignKey: 'inTypeId'})
Income.belongsTo(InType, {foreignKey: 'inTypeId'})