const createIssue=(req,res)=>{
    res.send("issue created");
}

const updateIssue=(req,res)=>{
    res.send("Issue Updated");
}

const deleteIssue=(req,res)=>{
    res.send("Issue Deleted");
}

const getAllIssues=(req,res)=>{
    res.send("All issues fetched");
};

const getIssueById=(req,res)=>{
    res.send("All issue Fetched");
};


module.exports={
    createIssue,
    updateIssue,
    deleteIssue,
    getAllIssues,
    getIssueById,
}
