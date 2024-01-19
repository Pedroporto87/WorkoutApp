const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const  UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
})

/*alunoSchema.statics.login = async function (name, email, password) {
    if(!name || !email || !password) {
        throw Error('Todos os campos devem ser preenchidos')
    }
    if(!email|| !!password){
        throw Error('Seus dados não conferem')
    }
    const aluno = await this.findOne({ email })
    if(!aluno){
        throw Error('Email não encontrado')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Senha incorreta')
    }

    const match = await bcrypt.compare(password, aluno.password)

    if(!match) {
        throw Error('Senha incorreta')
    }
    return aluno
}

alunoSchema.statics.signup = async function (name, email, password) {

    const exists = await this.findOne({ email })

    if(!name || !email || !password) {
        throw Error('Todos os campos devem ser preenchidos')
    }
    if(!validator.isEmail(email)) {
        throw Error('Esse email não é valido')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Por favor, insira uma senha mais forte')
    }

    if(exists){
        throw Error('Email já utilizado')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hash})

    return user
}*/

module.exports = mongoose.model('User', UserSchema)