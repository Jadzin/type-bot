
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbPath = path.join(__dirname, 'data', 'usuarios.json');
const senhaAcesso = "bucetinharosa01";

app.post('/api/salvar', (req, res) => {
  const dados = req.body;
  dados.dataHora = new Date().toISOString();

  let usuarios = [];
  if (fs.existsSync(dbPath)) {
    const raw = fs.readFileSync(dbPath);
    usuarios = JSON.parse(raw);
  }

  usuarios.push(dados);
  fs.writeFileSync(dbPath, JSON.stringify(usuarios, null, 2));
  res.json({ status: "ok" });
});

app.get('/usuarios', (req, res) => {
  if (req.query.senha !== senhaAcesso) {
    return res.status(401).send("Acesso negado.");
  }

  if (!fs.existsSync(dbPath)) {
    return res.send("<h1>Nenhum dado registrado ainda.</h1>");
  }

  const dados = JSON.parse(fs.readFileSync(dbPath));
  let html = '<h1>Usuários Registrados</h1><table border="1" cellpadding="5"><tr><th>Nome</th><th>Signo</th><th>UTMs</th><th>Xcod</th><th>Data/Hora</th></tr>';
  dados.forEach(user => {
    html += `<tr>
      <td>${user.nome || ''}</td>
      <td>${user.signo || ''}</td>
      <td>
        source: ${user.utm_source || ''}<br>
        campaign: ${user.utm_campaign || ''}<br>
        medium: ${user.utm_medium || ''}<br>
        term: ${user.utm_term || ''}<br>
        content: ${user.utm_content || ''}
      </td>
      <td>${user.xcod || ''}</td>
      <td>${user.dataHora}</td>
    </tr>`;
  });
  html += '</table>';
  res.send(html);
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
