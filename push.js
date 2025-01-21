const fs = require("fs").promises;
const path = require("path");
const { storage } = require("../config/firebase-config"); // Updated to use Firebase config

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");
  const bucket = storage.bucket(); // Access the Firebase Storage bucket

  try {
    const commitDirs = await fs.readdir(commitsPath);
    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);

        const destinationPath = `commits/${commitDir}/${file}`;

        // Create a temporary file to upload to Firebase Storage
        await fs.writeFile(`./temp-${file}`, fileContent);

        // Upload the file to Firebase Storage
        await bucket.upload(`./temp-${file}`, {
          destination: destinationPath,
          metadata: {
            cacheControl: "public, max-age=31536000",
          },
        });
        // Delete the temporary file after upload
        await fs.unlink(`./temp-${file}`);
      }
    }

    console.log("All commits pushed to Firebase Storage.");
  } catch (err) {
    console.error("Error pushing to Firebase Storage:", err);
  }
}

module.exports = { pushRepo };