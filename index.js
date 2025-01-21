const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const cors=require("cors");
const http=require("http");
const bodyParser=require("body-parser");
const {Server}=require("socket.io");
const mainRouter=require("./routes/main.router");


// Yargs ek package hai inside npm jo terminals ki commands ko read and write krta hai or unke parametrs ko manipulate krta hai
 const yargs=require("yargs"); // to require yargs

// hideBin is a function inside yargs helpers jiski help se commands ko read kia jata hai including space wali commands bhi
const {hideBin}=require('yargs/helpers');

// controllers folders se saari component ki functionality modules mein divide krke baar baari call kr rhe hai 
// This is for init Repository based
const {initRepo}=require("./controllers/init.js");
// This is for add note based
const {addRepo}=require("./controllers/add.js");
// This is for commit note based
const {commitRepo}=require("./controllers/commit.js");
// This is for pull note based
const {pullRepo}=require("./controllers/pull.js");
// This is for push note based
const {pushRepo}=require("./controllers/push.js");
// This is for revert changes note based
const {revertRepo}=require("./controllers/revert.js");

dotenv.config();

// yargs ke andr hideBin method ko call kia jo ek list ki tarah commands ko check and execute krta hai unke respective calls methods pr 
yargs(hideBin(process.argv))
// init kia hai repository ko or .command ke andr 4 parameters aatein hain 
// command name 
// command description ki vo kya krega
// command description ki working
// command ke liye respective component ki working ko call krna
// .command ke andr saari commands likhi hai baari baari basically hm bs 6 command hi implement kr rhe isi trh se or baaki command bhi implements ki ja skti hai 
// comand ke andr commas se sepearated nahi hote bs command functionality dete jao baari baari and last mein demandCommand ka mtlb hai null command possible nahi hai atleast ek command toh honi hi chahiye
.command("chlao","Starts a new Server",{},chlaoServer) 
.command("init","Initialised a new Repository",{},initRepo)
.command("add <file>","Add a file to Repository",(yargs)=>{
    describe:"File added to staging area"
    type:"String"
},(argv)=>{
    addRepo(argv.file);
})
.command("commit <message>","Commit the staged file",(yargs)=>{
    yargs.positional("message",{
        describe:"Commit Message",
        type:"String"
    })
},(argv)=>{
    commitRepo(argv.message);
})
.command("push","Push commit to S3",{},pushRepo)
.command("pull","pull command from S3",{},pullRepo)
.command("revert <commitID>", "Revert to a specific commit", (yargs) => {
    yargs.positional("commitID", {
        describe: "Commit ID to revert to",
        type: "string"
    });
}, (argv) => {
    revertRepo(argv.commitID);
})
.demandCommand(1,"You need atleast one command").help().argv;


function chlaoServer(){
    // console.log("Congrats, Server Chla dia gya hai !!!");
    const app=express();
    const PORT=process.env.PORT||3000;
    app.use(bodyParser.json());
    app.use(express.json());
    const mongoURI=process.env.MONGO_URL;

    mongoose.connect(mongoURI).then(()=>{
        console.log("MongoDB Connected ")
    }).catch((err)=>{
        console.log("Unable to connect to Database MongoDB");
    });

    // Allowing request from all sources
    app.use(cors({origin:"*"}));
    app.use("/",mainRouter);
  
    let user="test";
    const httpServer=http.createServer(app);
    const io=new Server(httpServer,{
        cors:{
            origin:"*",
            methods:["GET","POST"],

        }
    })
    io.on("connection",(socket)=>{
        socket.on("joinRoom",(userID)=>{
            user=userID;
            console.log("====");
            console.log(user);
            console.log("====");
            socket.join(userID);
        });
    })

    const db=mongoose.connection;

    db.once("open",async()=>{
        console.log("CRUD Operations called");
    })
// Iske baad hmne teen teen folder bnaye hai routes and controllers ke andr user repository and issue name se to hadle the routing in order like user nahi hoga toh repo nahi bnegi reop nahi bnegi toh issue nahi bnenge isliye hrr kisi ke liye unka controller bnaya hai or unke router pr jis bhi method pr request jaegi main router uski redirect kr dega unke method pr 
// Iske baad teen package install kiye jsonwebtoken mongodb and bcrypt.js for session data and hashing
    httpServer.listen(PORT,()=>{
        console.log(`Server is running on PORT ${PORT}`);
    });

}