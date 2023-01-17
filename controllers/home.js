const OvertimeClaim = require('../models/OvertimeClaim');

exports.list = async (req, res) => {
    console.log(req.session);
    try {
        
        const totalOvertimeClaims = await OvertimeClaim.find({}).count();
        const employeeCountSummary = employeeCountSummaryRef.map(t => ({ name: t._id, total: t.total }));
        res.render("index", { employeeCountSummary: employeeCountSummary, totalOvertimClaims: totalOvertimeClaims, totalEmployees: employeeCountSummary.length });

    } catch (e) {
        console.log(e);
        res.status(404).send({
            message: `error rendering page`,
        });
    }
}