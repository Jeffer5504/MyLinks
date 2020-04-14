const Link = require('../models/Link');

module.exports = {
    
    async index(request, response) { //Função para listar links cadastrados.
        const links = await Link.find();

        return response.json(links);
    },

   async store(request,response) { //Função para cadastrar um link.
    
        const {nome, url} = request.body;
    
        let link = await Link.findOne({ url });

        if(!link){

            link = await Link.create({
                nome,
                url,
            });

        }

        return response.json(link);
    },

    async destroy(request,response) { // Função para deletar um link.
        
        const link = Link.deleteOne( {_id: request.params.id}, (err) => {

            if(err) return response.status(400).json({
                error: true,
                message: "Error: Link não foi apagado com sucesso!"
            });
    
            //Retornar mensagem de sucesso quando excluir o registro com sucesso no banco de dados
            return response.json({
                error: false,
                message: "Link apagado com sucesso!"
            });
        });
    }
};
