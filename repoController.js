const createRepository=(req,res)=>{
    res.send("Repository Created");
};

const getAllRepositories=(req,res)=>{
    res.send("All Repositories Fetched");
};

const fetchRepositoryById=(req,res)=>{
    res.send("Repo Details fetched");
};

const fetchRepositoryByName=(req,res)=>{
    res.send("Repository details feteched by name");
};

const fetchRepositoryForCurrentUser=(req,res)=>{
    res.send("Repo for this logged in user");
};

const updateRepositoryById=(req,res)=>{
    res.send("Repo Updated");
}

const deleteRepositoryById=(req,res)=>{
    res.send("Repository deleted");
}

const toggleVisibilityById=(req,res)=>{
    res.send("Repo Toggled");
}

module.exports={
    createRepository,
    getAllRepositories,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryById,
    deleteRepositoryById,
    toggleVisibilityById
}
