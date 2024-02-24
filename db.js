const mongoose = require('mongoose');

//url of our mongodb data 
const mongoURI = 'mongodb://avatargrsingh98:MongoDB982@ac-ctwbfzm-shard-00-00.bptn2sk.mongodb.net:27017,ac-ctwbfzm-shard-00-01.bptn2sk.mongodb.net:27017,ac-ctwbfzm-shard-00-02.bptn2sk.mongodb.net:27017/tastyTable?ssl=true&replicaSet=atlas-hwlaxc-shard-0&authSource=admin&retryWrites=true&w=majority'       //2.20.10 version
// const mongoURI ='mongodb+srv://avatargrsingh98:MongoDB982@cluster0.bptn2sk.mongodb.net/tastyTable?retryWrites=true&w=majority'; 

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => { //connect with mongodb
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");  //stored to collection data into fetch_data
            fetched_data.find({}).toArray(async function (err, data) {   //if Curly braces is empty that means find the all data 
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(async function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })

            })
        }
    });
}

module.exports = mongoDB;


// const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://avatargrsingh98:MongoDB982@cluster0.bptn2sk.mongodb.net/tastyTable?retryWrites=true&w=majority';

// const mongoDB = async () => {
//     try {
//         await mongoose.connect(mongoURI, { useNewUrlParser: true });
//         console.log("Connected to MongoDB");

//         const fetched_data = await mongoose.connection.db.collection("food_items");
//         const data = await fetched_data.find({}).toArray();
//         console.log(data);
//     } catch (error) {
//         console.log("Error connecting to MongoDB:", error);
//     }
// };

// module.exports = mongoDB;