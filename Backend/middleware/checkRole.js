
export const checkFarmer = (req, res, next) => {
    if (!req.user || req.user.role !== "farmer") {
        return res.status(403).json({
            success: false,
            message: "Only farmers can add land"
        });
    }
    next();
};