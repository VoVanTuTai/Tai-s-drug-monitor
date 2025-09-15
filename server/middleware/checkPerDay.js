module.exports = function checkPerDay(req, res, next) {
    const { perDay } = req.body;

    if (isNaN(perDay) || perDay <= 0 || perDay >= 90) {
        return res.status(400).send({ error: "PerDay must be between 1 and 89" });
    }
    next();
};
