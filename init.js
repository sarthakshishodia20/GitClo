// fs stands for file system ye ek trh ka method hai jo file creation or folder creation mein kaam aata hai 

const fs=require("fs").promises;

// Path ko check krta hai current working cirectory ka path  ya hai ?
const path=require("path");

// A method to initiRepo
async function initRepo(){
    // ek hidden folder bnao inside the path of current working directory stored in process jiska name hoga ".apnaGit"
    const repoPath=path.resolve(process.cwd(),".apnaGit");
    // ek hidden folder bnao repoPath ke andr jiska name hoga commits
    const commitsPath=path.resolve(repoPath,"commits");

// Kyuki file making is a time consuming process isliye yahan pr await lgaya hai or hmesha await wale functions try catch ke saath aate hai 
    try{
        // fs.mkdir means ek folder bnao inside repoPath recursive true means iske andr or subfolers allowed hai
        await fs.mkdir(repoPath,{recursive:true});
        // Same for commits PAth
        await fs.mkdir(commitsPath,{recursive:true});
        // To write into a file 
        await fs.writeFile(
            path.join(repoPath,"config.json"),
            JSON.stringify({bucket:process.env.S3_BUCKET}),
        );
        // success message
        console.log("Repository Initialised");
    }
    catch(err){
        // In case of error handling
        console.error("Error in initialising Repository",err);
    }
}
module.exports={initRepo}; // module ko export krna 