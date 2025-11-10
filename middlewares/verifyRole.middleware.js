const verifyRole = (roles) => (req, res, next) => {
    if (!roles.includes(req?.user?.role) && !req?.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();
};

export default verifyRole;