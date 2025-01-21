// for creating files we use fileSystem fs along with promises 
const fs = require("fs").promises;
// Path used for specifying directory
const path = require("path");
// uuid for unique named all commits repos
const { v4: uuidv4 } = require("uuid"); 

async function commitRepo(message) {
    // Repoitory ka path lia
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    // staged directory path
    const stagedPath = path.join(repoPath, "staging");
    // commit Directory path
    const commitPath = path.join(repoPath, "commits");

    try {
        // make a unique id
        const commitID = uuidv4();
        // make a commitDirectory inside commit path named commitId ke name se folder bnao commitPath pr 
        const commitDir = path.join(commitPath, commitID);
        // commitFolder bnaya hai commit path pr recursive true means or bhi folders subfolders bn skte hai iske andr
        await fs.mkdir(commitDir, { recursive: true });

        // Await the readdir function to get an array of files
        // saari files staged areas se read krke laega
        const files = await fs.readdir(stagedPath);
        // baari baari saari files from staging area ko commit krega inside commit folder
        for (const file of files) {
            // laane ke liye file ko baari baari copy kia or uski ek duplicate file bnakr commit ri folders mein
            await fs.copyFile(path.join(stagedPath, file), path.join(commitDir, file));
        }
        // commit message dene ke liye ek writeFile kri
        await fs.writeFile(path.join(commitDir, "commit.json"), JSON.stringify({ message: message, date: new Date().toISOString() }));
        // success message
        console.log(`Commit ${commitID} created with message: ${message}`);
    } catch (err) {
        // to handle error cases
        console.error("Error in committing changes", err);
    }
}

module.exports = { commitRepo }; // module ko export kr dia
