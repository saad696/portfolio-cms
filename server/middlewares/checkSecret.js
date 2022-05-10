module.exports = (req, res, next) => {
    console.log(req.headers.authorization)
    if (req.headers.authorization !== '4990914480') {
        return res.redirect('/');
    }
    next();
};
