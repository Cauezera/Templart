const connection = require('../database/connection');
const { v4 } = require('uuid');
const { first } = require('../database/connection');
const formidable = require('formidable');
const fs = require('fs');

module.exports = {
    async index(request, response) {
        const users = await connection('Usuario').select("*")
        return response.json(users);
    },

    async getPostOwner(request, response){
        const {id} = request.query;
        const user = await connection('Usuario').first("*").where({id})
        if(user){
            response.json(user.nome);
        }
    }, 

    async createUser(request, response) {

        const {
            email,
            nome,
            senha
        } = request.query;

        const id = v4();

        const user = await connection('Usuario').first("*").where({
            email
        })
        if (user) {
            return response.json({ message: "email ja utilizado." })
        }


        await connection('Usuario').insert({
            id, email, nome, senha
        })

        return response.json({
            id, email, nome, senha
        })
    },

    async login(request, response) {
        const { email, senha, id } = request.query
        const user = await connection('Usuario').first('*').where({
            email
        })
        if (!user) {
            return response.status(406).json({ message: "credenciais incorretas." });
        }
        if (user.senha !== senha) {
            return response.status(406).json({ message: "credenciais incorretas" });
        }
        return response.json(user);
    },

    uplProfPic(req, res, next) {
        const form = formidable({
            uploadDir: __dirname + '/../profPics/',
            keepExtensions: true
        });

        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            res.json({ userId: req.params.userId });
        });

        form.on('file', function (field, file) {
            fs.rename(file.path, form.uploadDir + "/" + req.params.userId, error => { });
        });
    },


    async deleteUserPosts(idUsuário, _){
        const posts = await connection('Arte').select('*').where({idUsuário})

        await connection.delete('posts')
    },

    async deleteAccount(request, response){
        const id = request.params
        const user = await connection('Usuario').first('*').where({id})

        await connection('Usuário').delete(user)
        deleteUserPosts(id)
    }
}
