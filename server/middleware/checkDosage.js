module.exports = function checkDosage(req, res, next) {
    const { dosage } = req.body;
    const dosagePattern = /^\d{2}-morning,\d{2}-afternoon,\d{2}-night$/;

    if (!dosagePattern.test(dosage)) {
        return res.status(400).send({ 
            error: "Dosage must follow format: XX-morning,XX-afternoon,XX-night" 
        });
    }
    next();
};

