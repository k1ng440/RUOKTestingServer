exports = function (req, res, next) {
    req.checkBody('firstName', 'Please provide valid first name').notEmpty();
    req.checkBody('lastName', 'Please provide valid last name').notEmpty();
    req.checkBody('email', 'Please provide valid email').notEmpty();

    next();
}