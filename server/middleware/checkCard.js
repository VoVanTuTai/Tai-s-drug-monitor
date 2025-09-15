module.exports = function checkCard(req, res, next) {
    const { card } = req.body;

    if (isNaN(card) || card <= 1000) {
        return res.status(400).send({ error: "Card must be greater than 1000" });
    }
    next();
};

