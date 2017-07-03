var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
    var rodada = 1;
    var jogos = [];
    var optionals = {
        url: 'http://globoesporte.globo.com/servico/esportes_campeonato/responsivo/widget-uuid/1fa965ca-e21b-4bca-ac5c-bbc9741f2c3d/fases/fase-unica-seriea-2017/rodada/'+ rodada +'/jogos.html',
        method: 'GET'
    };

    request(optionals, function (err, response, body) {
        if(err || response.statusCode != 200) return;

        var $ = cheerio.load(body);
        var items = $('.lista-de-jogos-item');

        $(items).each(function (index, element) {
            var info = $(element).find('.placar-jogo-informacoes').text();
            var estadio = $(element).find('.placar-jogo-informacoes-local').text();
            info = info.split(estadio);

            jogos.push({
                jogo: {
                    info: {
                        data: info[0].trim(),
                        horario: info[1].trim(),
                        estadio: estadio
                    },
                    mandante: {
                        sigla: $(element).find('.placar-jogo-equipes-mandante > .placar-jogo-equipes-sigla').text(),
                        nome: $(element).find('.placar-jogo-equipes-mandante > .placar-jogo-equipes-nome').text(),
                        placar: $(element).find('.placar-jogo-equipes-placar-mandante').text()
                    },
                    visitante: {
                        sigla: $(element).find('.placar-jogo-equipes-visitante > .placar-jogo-equipes-sigla').text(),
                        nome: $(element).find('.placar-jogo-equipes-visitante > .placar-jogo-equipes-nome').text(),
                        placar: $(element).find('.placar-jogo-equipes-placar-visitante').text()
                    }
                }
            });
        });

        res.status(200).json(jogos);
    });
});

module.exports = router;
