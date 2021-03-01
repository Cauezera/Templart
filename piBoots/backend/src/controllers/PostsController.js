const connection = require('../database/connection');
const { v4 } = require('uuid');
const { first } = require('../database/connection');
const formidable = require('formidable');
const mkdirp = require('mkdirp')
const fs = require('fs');
const express = require('express');
const path = require ('path')

module.exports = {
    async index(request, response) {
        const {limit, page} = request.query;
        const newPage = parseInt(page) * parseInt(limit)
        const posts = await connection('Arte').select("*").limit(limit).offset(newPage)
        return response.json(posts);
    },

    async profPosts(request, response){
        const {idUsuário, limit, page} = request.query;
        const newPage = parseInt(page) * parseInt(limit)
        const posts = await connection('Arte').select("*").where({idUsuário}).limit(limit).offset(newPage)
        return response.json(posts)
    },

    async postArt(request, response) {
        const {
            nome,
            descricao,
        } = request.query;

        const id = v4();
        const idUsuário = request.params.userId;
        const data = new Date()
        const month =  data.getMonth() + 1
        const data_publicacao = data.getDate() + "/" + month + "/" + data.getFullYear();
        const curtidas = 0
        
        await connection('Arte').insert({
            id, nome, descricao, idUsuário, data_publicacao, curtidas
        })
        return response.json({
            id,
            nome, descricao, idUsuário, data_publicacao, curtidas
        })
    },

    uplArt(req, res, next) {
        const path = __dirname + '/../uploads/' + req.params.postId;
        mkdirp(path).then(() => {
            const form = formidable({
                multiples: true,
                uploadDir: path,
                keepExtensions: true
            });

            form.parse(req, (err, fields, files) => {
                if (err) {
                    next(err);
                    return;
                }
                res.json({ fields, files });
            });

            form.on('file', function (field, file) {
                //rename the incoming file to the file's name
                fs.rename(file.path, form.uploadDir + "/" + field, error => { });
            });
            // await fs.promises.rename("../uploads/" + req.params.userId + "/inputArt", "../uploads/" + req.params.userId + "/inputArt.png");
        });
    },

    async getUploadThumb(request, response){
        const id = request.params.postId 
        response.sendFile(path.resolve(__dirname, `..` , `uploads` , id , `inputThumb`))

    }
}
