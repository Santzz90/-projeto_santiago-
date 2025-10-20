

const express = require('express');
const path = require('path'); 
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/calcular', (req, res) => {
    
    const { nomeAluno, nota1, nota2 } = req.body;

    
    const n1 = parseFloat(nota1);
    const n2 = parseFloat(nota2);

    
    if (isNaN(n1) || isNaN(n2) || n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10) {
        return res.status(400).send('Por favor, insira notas válidas entre 0 e 10.');
    }

    const media = (n1 + n2) / 2;

    
    let situacao = '';
    if (media >= 6) {
        situacao = 'Aprovado';
    } else if (media >= 2 && media < 6) {
        situacao = 'Exame Final';
    } else {
        situacao = 'Reprovado';
    }

    
    const resultado = {
        nome: nomeAluno,
        nota1: n1,
        nota2: n2,
        media: media.toFixed(2),
        situacao: situacao
    };

   
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Resultado da Média</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <div class="container">
                <h1>Resultado da Média do Aluno</h1>
                <p><strong>Nome do Aluno:</strong> ${resultado.nome}</p>
                <p><strong>Nota do 1º Bimestre:</strong> ${resultado.nota1}</p>
                <p><strong>Nota do 2º Bimestre:</strong> ${resultado.nota2}</p>
                <p><strong>Média:</strong> <span class="media">${resultado.media}</span></p>
                <p><strong>Situação:</strong> <span class="situacao ${resultado.situacao.toLowerCase().replace(' ', '-')}}">${resultado.situacao}</span></p>
                <br>
                <a href="/">Calcular outra média</a>
            </div>
        </body>
        </html>
    `);
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Acesse o formulário em http://localhost:${port}`);
});