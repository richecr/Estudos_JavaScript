const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

// gerar o hash do password antes de salvar.
UserSchema.pre('save', function (next) {
    const user = this;
  
    if (!user.isModified('password')) { return next() };
  
    const hash = bcrypt.hashSync(user.password);
  
    // trocando o password pelo hash.
    user.password = hash;
    next();
  })

  UserSchema.methods.comparePassword = function(password){
      const user = this;
      return bcrypt.compareSync(password, user.password);
  }

  module.exports = mongoose.model('User', UserSchema);