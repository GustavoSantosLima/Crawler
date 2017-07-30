var express = require('express');
var router = express.Router();
var moment = require('moment');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    var page = 1;
    var last_page = 38;

    (function loop() {
        if (page <= last_page) {
            request.get('http://globoesporte.globo.com/servico/esportes_campeonato/responsivo/widget-uuid/' +
                '1fa965ca-e21b-4bca-ac5c-bbc9741f2c3d/fases/fase-unica-seriea-2017/rodada/'+page+'/jogos.html',
                function (err, response, body) {
                if(!err && response.statusCode == 200){
                    var $ = cheerio.load(body);
                    var items = $('.lista-de-jogos-item');

                    $(items).each(function (index, element) {
                        var info = $(element).find('.placar-jogo-informacoes').text();
                        var estadio = $(element).find('.placar-jogo-informacoes-local').text();
                        info = info.split(' ');
                        var len = info.length;
                        if(/^([0-9][0-9]:[0-9][0-9])$/.test(info[len-1])){
                            var datajogo = info[1].split('/').reverse().join("-") + ' ' + info[len-1];
                        } else {
                            var datajogo = info[1].split('/').reverse().join("-");
                        }

                        var mandante = {};
                        var visitante = {};
                        var created_at = moment().format("YYYY-MM-DD HH:mm:ss");

                        mandante.sigla = $(element).find('.placar-jogo-equipes-mandante > .placar-jogo-equipes-sigla').text();
                        mandante.nome = $(element).find('.placar-jogo-equipes-mandante > .placar-jogo-equipes-nome').text();
                        mandante.placar = $(element).find('.placar-jogo-equipes-placar-mandante').text();
                        visitante.sigla = $(element).find('.placar-jogo-equipes-visitante > .placar-jogo-equipes-sigla').text();
                        visitante.nome = $(element).find('.placar-jogo-equipes-visitante > .placar-jogo-equipes-nome').text();
                        visitante.placar = $(element).find('.placar-jogo-equipes-placar-visitante').text();

                        if(mandante.placar.length == 0){
                            mandante.placar = null;
                        }

                        if(visitante.placar.length == 0){
                            visitante.placar = null;
                        }

                        switch (mandante.nome) {
                            case 'Flamengo':
                                mandante.nome = 102;
                                break;
                            case 'Atlético-PR':
                                mandante.nome = 22;
                                break;
                            case 'Atlético-MG':
                                mandante.nome = 12;
                                break;
                            case 'Botafogo':
                                mandante.nome = 52;
                                break;
                            case 'Corinthians':
                                mandante.nome = 72;
                                break;
                            case 'Coritiba':
                               mandante.nome = 82;
                                break;
                            case 'Cruzeiro':
                                mandante.nome = 92;
                                break;
                            case 'Sport':
                                mandante.nome = 172;
                                break;
                            case 'Fluminense':
                                mandante.nome = 112;
                                break;
                            case 'Grêmio':
                                mandante.nome = 122;
                                break;
                            case 'Chapecoense':
                                mandante.nome = 62;
                                break;
                            case 'Palmeiras':
                                mandante.nome = 132;
                                break;
                            case 'Ponte Preta':
                                mandante.nome = 142;
                                break;
                            case 'Vitória':
                                mandante.nome = 192;
                                break;
                            case 'Santos':
                                mandante.nome = 152;
                                break;
                            case 'São Paulo':
                                mandante.nome = 162;
                                break;
                            case 'Atlético-GO':
                                mandante.nome = 2;
                                break;
                            case 'Avaí':
                                mandante.nome = 32;
                                break;
                            case 'Bahia':
                                mandante.nome = 42;
                                break;
                            case 'Vasco':
                                mandante.nome = 182;
                                break;
                        }

                        switch (visitante.nome) {
                            case 'Flamengo':
                                visitante.nome = 102;
                                break;
                            case 'Atlético-PR':
                                visitante.nome = 22;
                                break;
                            case 'Atlético-MG':
                                visitante.nome = 12;
                                break;
                            case 'Botafogo':
                                visitante.nome = 52;
                                break;
                            case 'Corinthians':
                                visitante.nome = 72;
                                break;
                            case 'Coritiba':
                                visitante.nome = 82;
                                break;
                            case 'Cruzeiro':
                                visitante.nome = 92;
                                break;
                            case 'Sport':
                                visitante.nome = 172;
                                break;
                            case 'Fluminense':
                                visitante.nome = 112;
                                break;
                            case 'Grêmio':
                                visitante.nome = 122;
                                break;
                            case 'Chapecoense':
                                visitante.nome = 62;
                                break;
                            case 'Palmeiras':
                                visitante.nome = 132;
                                break;
                            case 'Ponte Preta':
                                visitante.nome = 142;
                                break;
                            case 'Vitória':
                                visitante.nome = 192;
                                break;
                            case 'Santos':
                                visitante.nome = 152;
                                break;
                            case 'São Paulo':
                                visitante.nome = 162;
                                break;
                            case 'Atlético-GO':
                                visitante.nome = 2;
                                break;
                            case 'Avaí':
                                visitante.nome = 32;
                                break;
                            case 'Bahia':
                                visitante.nome = 42;
                                break;
                            case 'Vasco':
                                visitante.nome = 182;
                                break;
                        }

                        fs.appendFile('query.txt',
                            "(2, "+page+", '"+datajogo+"', "+mandante.nome+", "+mandante.placar+", "+visitante.placar+", "+visitante.nome+", '"+created_at+"', '"+created_at+"'), \n"
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
