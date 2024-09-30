const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
        // if (req.isAuthenticated() && req.user.role === 'admin') {
        //             return next();
        //         }
        // else{
        //     res.redirect('/auth/login')
        // }
    }
 
        res.redirect('/auth/login')
 
   
};



// const iseachAuthenticated = (req, res, next) => {
//     if (req.isteachAuthenticated()) {
//         if (req.isteachAuthenticated() && req.user.role === 'admin') {
//                     return next();
//                 }
//         else{
//             res.redirect('/auth/login')
//         }
//     }
//     res.redirect('/auth/login')
// };
// module.exports = isteachAuthenticated



// const ensureAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next()
//     }
//     res.redirect('/auth/login')
// };

const ensureAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    res.status(403).send('Access denied: Admins only.')
};


const ensureTeacher = (req, res, next) => {
 
    if (req.isAuthenticated() && req.user.role === 'teacher') {
        return next();
    }
    res.status(403).send('Access denied: Teachers only.');
};

module.exports = { isAuthenticated ,ensureAdmin, ensureTeacher };
