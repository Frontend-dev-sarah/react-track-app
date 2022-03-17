const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
})

//the function in the 2nd arg is called before 'save'
//using function() instead of ()=> : `this`refer to the `function{the `user` to be saved}`, not the `context of file `
userSchema.pre('save', function(next){
    const user = this;
    if (!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    });
})
userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve, reject ) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err)
            }
            if (!isMatch){
                return reject(false);
            } else
            return resolve(true);
        });
    });
}
mongoose.model('User', userSchema)