module.exports = {
  dev : {
  database: "mongodb+srv://admin-ketan:Ketan@cluster0.odeen.mongodb.net/CanteenItems", // for local development
  },
  
  prod: {
    database: process.env.DATABASE,
    },
};
