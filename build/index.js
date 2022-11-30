"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const product_1 = __importDefault(require("./Routes/product"));
const order_1 = __importDefault(require("./Routes/order"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./Routes/user"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = 5446;
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/product', product_1.default);
app.use('/order', order_1.default);
app.use('/user', user_1.default);
// const database = (module.exports = () => {
//     const connectionParams = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     };
//     try {
//         mongoose.connect(
//  "mongodb+srv://Mines4:Longinus4@cluster0.03prske.mongodb.net/?retryWrites=true&w=majority", () => {
//             // useMongoClient: true//})
//             console.log('connected to DB')
//         })
//     } 
//     catch (err) {
//         console.log(err)
//     }
// });
// database()
const database = (module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    try {
        mongoose_1.default.connect('mongodb+srv://Mines4:Longinus4@cluster0.03prske.mongodb.net/?retryWrites=true&w=majority');
        console.log('database connected');
    }
    catch (err) {
        console.log(err);
    }
});
database();
app.get('/', (req, res) => {
    res.send('get req made');
});
app.post('/', (req, res) => {
    res.send('post made');
});
app.listen(port, () => {
    console.log(`app is live on http://localhost:${port}`);
});
