const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(()=>{
    console.log("connection sccesssfull");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}


// creating  order schema
const orderSchema = new Schema({
  item : String,
  price : Number
});

// creating customer schema
const customerSchema = new Schema ({
    name : String,
    orders : [
        {
            type : Schema.Types.ObjectId,       // to store object id of order
            ref : "Order"                       // refering order model
        }
    ]
})

const Order = mongoose.model("Order", orderSchema); // creating model
const Customer = mongoose.model("Customer", customerSchema); // creating model


// inserting data in customer collection
const addCustomers = async () => {
    // let cust1 = new Customer({
    //     name : "rahul",
    // })
    // let order1 = await Order.findOne({item : "pizza"});
    // let order2 = await Order.findOne({item  : "samosa"});

    // cust1.orders.push(order1);
    // cust1.orders.push(order2);

    // let res = await cust1.save();
    // console.log(res);

    let res = await Customer.find({}).populate("orders"); // populating "orders" field with order details, order is the field in customer schema
    console.log(res[0].orders[0]);
};
addCustomers();




// // inserting data in order collection
// const addOrders = async () => {
//     let res = await Order.insertMany( [
//         { item : "samosa", price : 20 },
//         { item : "pizza", price : 100 },
//         { item : "burger", price : 80 }
//     ]);
//     console.log(res);
// };
// addOrders();