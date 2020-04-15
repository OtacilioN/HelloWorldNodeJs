const http = require("http");
const contador = require("./contador");
const porta = 3000;
const ip = "localhost";

const server = http.createServer((requisicao, resultado) => {
  console.log("Opa, recebi uma requisição!");

  // Bloco do post
  if (requisicao.method == "POST") {
    // Corpo da requisição, ou seja os dados que foram enviados
    var body = ""; // Inicio um body vazio

    // "quando o evento" de "data" acontecer execute a arrow function
    requisicao.on("data", (data) => {
      // Processador de evento
      // Pega o dado recebido e faça um parse
      // O parse transforma o dado que chega como "string" em objeto JavaScript (dado)
      body = JSON.parse(data); // Atribua o valor parseado, ou seja o dado, a variavel body
      // A partir daqui, o body vai ter um objeto JavaScript com o dado que foi enviado
    });

    //   Criamos uma rota de soma
    if (requisicao.url == "/soma") {
      requisicao.on("end", () => {
        resultado.writeHead(200, {
          "Content-Type": "aplication/json",
        });
        resultado.end(JSON.stringify(body.a + body.b));
      });
    }

    //   Criamos uma rota de contador
    if (requisicao.url == "/contador") {
      requisicao.on("end", () => {
        resultado.writeHead(200, {
          "Content-Type": "aplication/json",
        });
        resultado.end(JSON.stringify(contador(body.limite)));
      });
    }

    if (requisicao.url == "/divisao") {
      requisicao.on("end", () => {
        resultado.writeHead(200, {
          "Content-Type": "aplication/json",
        });
        resultado.end(JSON.stringify(body.numerador / body.denominador));
      });
    }

    // Se foi um post na rota "espelho"
    if (requisicao.url == "/espelho") {
      // "quando o evento" de "end", ou seja a finalização do processamento, execute a arrow function
      requisicao.on("end", () => {
        // Escreva no cabeçalho (head) um 200, e o conteúdo que irei devolver é um aplication/json
        resultado.writeHead(200, {
          "Content-Type": "aplication/json",
        });
        // O dado que foi enviado está em body, body é um objeto JavaScript
        // Eu preciso transformar de objeto pra String
        // JSON.stringfy que transforma de Objeto pra string
        resultado.end(JSON.stringify(body)); // Diga que o próprio dado recebido em string
      });
    }
  }

  // Bloco do GET
  else {
    if (requisicao.method == "GET") {
      console.log("Foi um get");
      if (requisicao.url == "/") {
        resultado.end("<h1>Bem vindo ao servidor!</h1>");
      }
      if (requisicao.url == "/easteregg") {
        resultado.end("<h1>Perdi!</h1>");
      } else {
        resultado.end("Rota indisponivel");
      }
    }
  }
});

server.listen(porta, ip, () => {
  console.log("Estou escutando a porta", porta, " no ip: ", ip);
});

// Lembrar de derrubar o servidor com control C e subir de novo com node index.js
