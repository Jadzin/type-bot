
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbPath = path.join(__dirname, 'data', 'usuarios.json');
const senhaAcesso = "bucetinharosa01";

// Salvar dados recebidos
app.post('/api/salvar', (req, res) => {
  const dados = req.body;
  dados.dataHora = new Date().toISOString();

  const dir = path.join(__dirname, 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  let usuarios = [];
  if (fs.existsSync(dbPath)) {
    usuarios = JSON.parse(fs.readFileSync(dbPath));
  }

  usuarios.push(dados);
  fs.writeFileSync(dbPath, JSON.stringify(usuarios, null, 2));
  res.json({ status: "ok" });
});

// Página de visualização dos dados
app.get('/usuarios', (req, res) => {
  if (req.query.senha !== senhaAcesso) {
    return res.status(401).send("Acesso negado.");
  }

  if (!fs.existsSync(dbPath)) {
    return res.send("<h1>Nenhum dado registrado ainda.</h1>");
  }

  const dados = JSON.parse(fs.readFileSync(dbPath));
  const formatarData = iso => {
    const d = new Date(iso);
    return d.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  };

  let html = `
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Usuários Registrados</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
        th { background-color: #f3f3f3; }
        tr:nth-child(even) { background-color: #fafafa; }
      </style>
    </head>
    <body>
      <h1>Usuários Registrados</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Signo</th>
            <th>UTMs</th>
            <th>Xcod</th>
            <th>Data/Hora</th>
          </tr>
        </thead>
        <tbody>`;

  for (const user of dados) {
    html += `
      <tr>
        <td>${user.nome || ""}</td>
        <td>${user.signo || ""}</td>
        <td>
          source: ${user.utm_source || ""}<br>
          campaign: ${user.utm_campaign || ""}<br>
          medium: ${user.utm_medium || ""}<br>
          term: ${user.utm_term || ""}<br>
          content: ${user.utm_content || ""}
        </td>
        <td>${user.xcod || ""}</td>
        <td>${formatarData(user.dataHora)}</td>
      </tr>`;
  }

  html += `
        </tbody>
      </table>
    </body>
  </html>`;

  res.send(html);
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
