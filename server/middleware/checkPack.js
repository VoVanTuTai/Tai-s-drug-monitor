module.exports = function checkPack(req, res, next) {
    const { pack } = req.body;

    if (isNaN(pack) || pack <= 0) {
        return res.status(400).send({ error: "Pack must be greater than 0" });
    }
    next();
};

