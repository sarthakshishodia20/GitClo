const fs = require("fs").promises;
const path = require("path");
const { storage } = require("../config/firebase-config");

async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    // Get a reference to the "commits/" folder
    const bucket = storage.bucket();
    const [files] = await bucket.getFiles({ prefix: "commits/" });

    for (const file of files) {
      const filePath = path.join(repoPath, file.name);
      const commitDir = path.dirname(filePath);

      // Create directory if it doesn't exist
      await fs.mkdir(commitDir, { recursive: true });

      // Download file to the local path
      await file.download({ destination: filePath });

      console.log(`...${file.name}`);
    }

    console.log("All commits pulled from Firebase Storage.");
  } catch (err) {
    console.error("Unable to pull:", err);
  }
}

module.exports = { pullRepo };