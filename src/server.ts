/* eslint-disable no-console */
import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";
import { envVar } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";


let server: Server;


const startServer = async () => {
try {
    await mongoose.connect(envVar.DB_URL as string);

    console.log("Connected to DB !!");
    
    server = app.listen(envVar.PORT, ()=>{
        console.log(`Server is listening port ${envVar.PORT}`);
    })
} catch (error) {
    console.log(error);
}
}


(
    async()=>{
        await startServer()
        await seedSuperAdmin()
    }
)()



//Unhandled Rejection error

// process.on("unhandledRejection", (reason, promise)=>{
//     console.log("Unhandled Rejection detected... Server is shutting down", reason);
//     console.log("Unhandled Rejection detected... Promise is", promise);

//     if(server){
//         server.close(()=>{
//             process.exit(1);
//         })
//     };
//     process.exit(1);
// })
process.on("unhandledRejection", (err)=>{
    console.log("Unhandled Rejection detected... Server is shutting down", err);

    if(server){
        server.close(()=>{
            process.exit(1);
        })
    };
    process.exit(1);
})

//uncaught Exception error
process.on("uncaughtException", (err)=>{
    console.log("uncaught Exception detected... Server is shutting down", err);

    if(server){
        server.close(()=>{
            process.exit(1);
        })
    };
    process.exit(1);
})

//Signal termination error(error for manual shutting down by dEployment server ... etc)
process.on("SIGTERM", (err)=>{
    console.log("SIGTERM signal received... Server is shutting down", err);

    if(server){
        server.close(()=>{
            process.exit(1);
        })
    };
    process.exit(1);
})
//testing by manual shutdown
process.on("SIGINT", (err)=>{
    console.log("SIGINT signal received... Server is shutting down", err);

    if(server){
        server.close(()=>{
            process.exit(1);
        })
    };
    process.exit(1);
})

// Promise.reject(new Error("I forgot to cash this promise"))
// throw new Error("I for to handle this local error")


//Create a minimal server.ts for testing - start


// import express from "express";

// const app = express();
// const PORT = 6000;

// app.get("/", (req, res) => {
//   res.send("Hello from minimal server!");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// Create a minimal server.ts for testing - end




