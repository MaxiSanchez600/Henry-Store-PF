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

  //PROMOTION

  sequelize.define('kindPromotion', {
    id_kind_promotion:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    promotion:{
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  sequelize.define('productPromotion', {
    id_product_promotion:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date_start:{
      type: DataTypes.STRING,
      allowNull: false
    },
    date_end:{
      type: DataTypes.STRING,
      allowNull: false
    },
    date_register:{
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  //REVIEW

  sequelize.define('reviews', {
    id_review:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score:{
      type:DataTypes.FLOAT,
      allowNull: false
    },
    content:{
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  //USUARIO

  sequelize.define('users', {
    id_user:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
      type:DataTypes.STRING,
      allowNull: true
    },
    last_name:{
      type:DataTypes.STRING,
      allowNull: true
    },
    email:{
      type:DataTypes.STRING,
      allowNull: true
    },
    phone:{
      type:DataTypes.STRING,
      allowNull: true
    },
    user_name:{
      type:DataTypes.STRING,
      allowNull: true
    },
    identification: {
      type:DataTypes.STRING,
      allowNull: true
    },
    nacionality:{
      type:DataTypes.STRING,
      allowNull: true
    }
  })

  sequelize.define('documentType', {
    id_document_type:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_document_type:{
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  //STATUS ROL

  sequelize.define('userStatus', {
    id_status:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
  },
    name_status:{
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  sequelize.define('role', {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false    
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  //Wishlist Favorites

  sequelize.define('favorites', {
    id_favorite: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  })

  sequelize.define('wishlist', {
    id_wishlist: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  })

};



