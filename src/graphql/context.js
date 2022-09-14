const context = async ({ req }) => {
    const user = req.auth ? req.auth : null;
    return { user };
};

export default context;
