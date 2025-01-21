// used for file system
const fs=require("fs").promises;
// used for specifying path
const path=require("path");

// function for add File
async function addRepo(filePath){
    // repoPath repository ke andr apnaGit naam ka hidden folder hai hi
    const repoPath=path.resolve(process.cwd(),".apnaGit");
    // uske andr ek stagingPath ka bhi folder bn jayega
    const stagingPath=path.join(repoPath,"staging");

    try{
        // staging Path ke liye subFolders are true
        await fs.mkdir(stagingPath,{recursive:true});
        // Arguments se fileName fetch kia hai
        const fileName=path.basename(filePath);
        // usi same file Name ki ek copy bna di hai inside staging Folder jo ki repository initialised ke andr hai 
        await fs.copyFile(filePath,path.join(stagingPath,fileName));
        // success message
        console.log(`File ${fileName} added to staging area`);
    }
    catch(err){
        // In case of error handling
        console.error("Error in adding File",err);
    }
};

module.exports={addRepo}; // export krdia module ko