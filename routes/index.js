var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    var page = 2;
    var last_page = 2;

    (function loop() {
        if (page <= last_page) {
            request.get('http://globoesporte.globo.com/servico/esportes_campeonato/responsivo/widget-uuid/1fa965ca-e21b-4bca-ac5c-bbc97' +
                '41f2c3d/fases/fase-unica-seriea-2017/rodada/'+page+'/jogos.html', function (err, response, body) {
                if(!err && response.statusCode == 200){
                    var $ = cheerio.load(body);
                    var items = $('.lista-de-jogos-item');

                    $(items).each(function (index, element) {
                        var info = $(element).find('.placar-jogo-informacoes').text();
                        var estadio = $(element).find('.placar-jogo-informacoes-local').text();
                        info = info.split(estadio);
                        var data = info[0].trim().split(' ');
                        data = data[1].split('/').reverse().join("-");

                        var mandante = {};
                        var visitante = {};

                        mandante.sigla = $(element).find('.placar-jogo-equipes-mandante > .placar-jogo-equipes-sigla').text();
                        mandante.nome = $(element).find('.placar-jogo-equipes-mandante > .placar-jogo-equipes-nome').text();
                        mandante.placar = $(element).find('.placar-jogo-equipes-placar-mandante').text();
                        visitante.sigla = $(element).find('.placar-jogo-equipes-visitante > .placar-jogo-equipes-sigla').text();
                        visitante.nome = $(element).find('.placar-jogo-equipes-visitante > .placar-jogo-equipes-nome').text();
                        visitante.placar = $(element).find('.placar-jogo-equipes-placar-visitante').text();

                        switch (mandante.nome) {
                            case 'Flamengo':
                                mandante.nome = 1;
                                break;
                            case 'Atlético-PR':
                                mandante.nome = 2;
                                break;
                            case 'Atlético-MG':
                                mandante.nome = 3;
                                break;
                            case 'Botafogo':
                                mandante.nome = 4;
                                break;
                            case 'Corinthians':
                                mandante.nome = 5;
                                break;
                            case 'Coritiba':
                               mandante.nome = 6;
                                break;
                            case 'Cruzeiro':
                                mandante.nome = 7;
                                break;
                            case 'Sport':
                                mandante.nome = 8;
                                break;
                            case 'Fluminense':
                                mandante.nome = 9;
                                break;
                            case 'Grêmio':
                                mandante.nome = 10;
                                break;
                            case 'Chapecoense':
                                mandante.nome = 11;
                                break;
                            case 'Palmeiras':
                                mandante.nome = 12;
                                break;
                            case 'Ponte Preta':
                                mandante.nome = 13;
                                break;
                            case 'Vitória':
                                mandante.nome = 14;
                                break;
                            case 'Santos':
                                mandante.nome = 15;
                                break;
                            case 'São Paulo':
                                mandante.nome = 16;
                                break;
                            case 'Atlético-GO':
                                mandante.nome = 17;
                                break;
                            case 'Avaí':
                                mandante.nome = 18;
                                break;
                            case 'Bahia':
                                mandante.nome = 19;
                                break;
                            case 'Vasco':
                                mandante.nome = 20;
                                break;
                        }

                        switch (visitante.nome) {
                            case 'Flamengo':
                                visitante.nome = 1;
                                break;
                            case 'Atlético-PR':
                                visitante.nome = 2;
                                break;
                            case 'Atlético-MG':
                                visitante.nome = 3;
                                break;
                            case 'Botafogo':
                                visitante.nome = 4;
                                break;
                            case 'Corinthians':
                                visitante.nome = 5;
                                break;
                            case 'Coritiba':
                                visitante.nome = 6;
                                break;
                            case 'Cruzeiro':
                                visitante.nome = 7;
                                break;
                            case 'Sport':
                                visitante.nome = 8;
                                break;
                            case 'Fluminense':
                                visitante.nome = 9;
                                break;
                            case 'Grêmio':
                                visitante.nome = 10;
                                break;
                            case 'Chapecoense':
                                visitante.nome = 11;
                                break;
                            case 'Palmeiras':
                                visitante.nome = 12;
                                break;
                            case 'Ponte Preta':
                                visitante.nome = 13;
                                break;
                            case 'Vitória':
                                visitante.nome = 14;
                                break;
                            case 'Santos':
                                visitante.nome = 15;
                                break;
                            case 'São Paulo':
                                visitante.nome = 16;
                                break;
                            case 'Atlético-GO':
                                visitante.nome = 17;
                                break;
                            case 'Avaí':
                                visitante.nome = 18;
                                break;
                            case 'Bahia':
                                visitante.nome = 19;
                                break;
                            case 'Vasco':
                                visitante.nome = 20;
                                break;
                        }

                        fs.appendFile('query.txt',
                            "(1, "+page+", '"+data+' '+info[1].trim()+":00', "+mandante.nome+", "+mandante.placar+", "+visitante.placar+", "+visitante.nome+"), \n"
                        );
                    });
                }

                page++;
                loop();
            });
        }
    }());
    res.json({ success: true });
});

module.exports = router;
