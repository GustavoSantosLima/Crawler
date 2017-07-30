// var express = require('express');
// var router = express.Router();
// var request = require('request');
// var cheerio = require('cheerio');
// var mongo = require('mongoose');
//
// mongo.connect("mongodb://localhost:27017/Jogos");
// var colecao = mongo.model('jogos', {
//     info: {
//         rodada: String,
//         data: String,
//         horario: String,
//         estadio: String
//     },
//     mandante: {
//         sigla: String,
//         nome: String,
//         placar: String
//     },
//     visitante: {
//         sigla: String,
//         nome: String,
//         placar: String
//     }
// });
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//     var page = 1;
//     var last_page = 38;
//
//     (function loop() {
//         if (page <= last_page) {
//             request.get('http://globoesporte.globo.com/servico/esportes_campeonato/responsivo/widget-uuid/1fa965ca-e21b-4bca-ac5c-bbc97' +
//                 '41f2c3d/fases/fase-unica-seriea-2017/rodada/'+page+'/jogos.html', function (err, response, body) {
//                 if(!err && response.statusCode == 200){
//                     var $ = cheerio.load(body);
//                     var items = $('.lista-de-jogos-item');
//
//                     $(items).each(function (index, element) {
//                         var info = $(element).find('.placar-jogo-informacoes').text();
//                         var estadio = $(element).find('.placar-jogo-informacoes-local').text();
//                         info = info.split(estadio);
//
//                         var row = new colecao();
//
//                         row.info.rodada = page;
//                         row.info.data = info[0].trim();
//                         row.info.horario = info[1].trim();
//                         row.info.estadio = estadio;
//                         row.mandante.sigla = $(element).find('.placar-jogo-equipes-mandante > .placar-jogo-equipes-sigla').text();
//                         row.mandante.nome = $(element).find('.placar-jogo-equipes-mandante > .placar-jogo-equipes-nome').text();
//                         row.mandante.placar = $(element).find('.placar-jogo-equipes-placar-mandante').text();
//                         row.visitante.sigla = $(element).find('.placar-jogo-equipes-visitante > .placar-jogo-equipes-sigla').text();
//                         row.visitante.nome = $(element).find('.placar-jogo-equipes-visitante > .placar-jogo-equipes-nome').text();
//                         row.visitante.placar = $(element).find('.placar-jogo-equipes-placar-visitante').text();
//
//                         row.save();
//                     });
//                 }
//
//                 page++;
//                 loop();
//             });
//         }
//     }());
//     res.json({ success: true });
// });
//
// module.exports = router;
