const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  //PRODUCTS Y CATEGORIES
  sequelize.define('Product', {
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

  sequelize.define('Category', {
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


  sequelize.define('SubCategory', {
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


  sequelize.define('Caracteristic', {
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

  sequelize.define('ProductCaracteristic', {
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

  sequelize.define('ProductCategory', {
    idProductCategory: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  })

  //TAGS

  sequelize.define('Tag', {
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

  sequelize.define('ProductTag', {
    idProductTag: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  })

  //PROMOTION

  sequelize.define('KindPromotion', {
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

  sequelize.define('ProductPromotion', {
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

  sequelize.define('Review', {
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

  sequelize.define('User', {
    id_user:{
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
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
      allowNull: true,
      unique: true,
    },
    phone:{
      type:DataTypes.STRING,
      allowNull: true
    },
    username:{
      type:DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    identification: {
      type:DataTypes.STRING,
      allowNull: true
    },
    image:{
      type:DataTypes.STRING,
      allowNull: true
    }
  })

  //DOCUMENT TYPE
  
  sequelize.define('DocumentType', {
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

  sequelize.define('UserStatus', {
    id_status:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true
  },
    name_status:{
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  sequelize.define('Role', {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true   
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  //Wishlist Favorites

  sequelize.define('Favorite', {
    id_favorite: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  })

  sequelize.define('Wishlist', {
    id_wishlist: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  })

  //Users Pic
  sequelize.define('Image', {
    id_image: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_image:{
      type: DataTypes.STRING,
      allowNull: false
    }
  })


  //Nacionalidades
  sequelize.define('Nacionality', {
    id_nacionality: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name_nacionality: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
};



