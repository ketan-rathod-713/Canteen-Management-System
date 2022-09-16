module.exports = {
  dev : {
  database: "mongodb://localhost:27017/CanteenItems", // for local development
  },
  
  prod: {
    database: process.env.DATABASE,
    },
};
