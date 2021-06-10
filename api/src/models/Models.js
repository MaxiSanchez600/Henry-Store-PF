const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  //PRODUCTS Y CATEGORIES
  sequelize.define('products', {
    id_product:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    henry_coin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    percentage_discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    promotion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  //CATEGORIES

  sequelize.define('categories', {
    id_category:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_category: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })


  sequelize.define('subCategories', {
    id_sub_category:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_sub_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })


  sequelize.define('caracteristics', {
    id_caracteristic: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_caracteristic: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  sequelize.define('productCaracteristic', {
    idProductCaracteristic: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value_caracteristic: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  sequelize.define('productCategory', {
    idProductCategory: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  })

  //TAGS

  sequelize.define('tags', {
    id_tag:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_tag: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })

  sequelize.define('productTags', {
    idProductTag: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  })

};



