export const handleRegister  = (req, res, db, bcrypt) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password)
    {
        return res.status(400).json('incorrect form submission')
    }
    let hashedpassword = '';
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in the database
            db.transaction(trx => {
                trx.insert({
                    hash: hash,
                    email: email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            email: loginEmail[0].email,
                            name: name,
                            joined: new Date()
                        })
                        .then(user => {console.log(user[0], "user"); return res.json(user[0])});
                }).then(trx.commit)
                .catch(trx.rollback)
            }).catch(err => res.status(400).json('unable to register'))
           
        });
    })
}