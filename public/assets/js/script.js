let step = 0;
let lastResponse = "";
let vars = window.vars || {};

// Pega nome e signo da URL
const params = new URLSearchParams(window.location.search);
vars.nome = params.get("nome") || "você";
vars.signo = params.get("signo") || "seu signo";
vars["data de nascimento"] = "";
vars["nome_dele"] = "";
vars["localizacao"] = location.city;
// Coleta de UTM e xcod
vars["utm_source"]   = params.get("utm_source")   || "";
vars["utm_medium"]   = params.get("utm_medium")   || "";
vars["utm_campaign"] = params.get("utm_campaign") || "";
vars["utm_content"]  = params.get("utm_content")  || "";
vars["utm_term"]     = params.get("utm_term")     || "";
vars["xcod"]         = params.get("xcod")         || "";

const quizSteps = [
  { type: "wait", time: 2000 },
  { type: "text", content: "⏳ Iniciando a leitura de {{nome}}..." },
  { type: "wait", time: 2000 },
  { type: "text", content: "SEJA BEM-VINDA 🙏🍀" },
  { type: "wait", time: 2000 },
  { type: "text", content: "Olá, sou o Mestre Zion..." },
  { type: "wait", time: 3000 },
  { type: "text", content: "{{nome}}, vou te explicar como funciona..." },
  { type: "audio", content: "assets/audio/audio1.mp3", waitAfter: 5000 },
  { type: "wait", time: 2000 },
  { type: "audio", content: "assets/audio/audio2.mp3", waitAfter: 5000 },
  { type: "wait", time: 2000 },
  { type: "text", content: "O meu retrato tem uma **precisão de até 98%**… muitas pessoas ficam **emocionadas** ao receber o desenho…" },
  { type: "wait", time: 2000 },
  { type: "text", content: "Então prepare-se, porque já já vou começar o seu!" },
  { type: "wait", time: 2000 },
  { type: "text", content: "Podemos começar?" },
  { type: "input", inputType: "text", id: "inicioConfirmado", content: "Digite SIM para continuar" },
  { type: "wait", time: 2000 },
  { type: "text", content: "Vi que você é do signo de {{signo}}, correto?" },
  { type: "wait", time: 2000 },
  { type: "text", content: "Qual sua data de nascimento completa?" },
  { type: "input", inputType: "text", id: "dataNascimentoCompleta", content: "Digite sua data de nascimento" },
  { type: "wait", time: 2000 },
  { type: "text", content: "E por último… como andam os seus relacionamentos?" },
  {
    type: "buttons",
    options: [
      "Estou em um relacionamento sério",
      "Não estou com ninguém",
      "Estou conhecendo alguém"
    ],
    id: "relacionamentoStatus"
  }
];

const fluxoSolteiro = [
  { type: "text", content: "Então você está sem ninguém?" },
  { type: "wait", time: 2000 },
  { type: "text", content: "É muito raro encontrar alguém do signo de {{signo}} solteiro(a), sinto que você tem um coração tão bom...." },
  { type: "audio", content: "assets/audio/audio3.mp3", waitAfter: 8000 },
  { type: "text", content: "Vocês terão uma conexão imediata... vai parecer que se conhecem faz tempo!" },
  { type: "wait", time: 2000 },
  { type: "text", content: "Um dia essas clientes também estavam onde você está, conversando comigo..." },
  { type: "wait", time: 2000 },
  { type: "text", content: "E depois de algum tempo, me enviaram essas fotos 👇" },
  { type: "image", content: "assets/images/depoimento1.webp" },
  { type: "wait", time: 1000 },
  { type: "image", content: "assets/images/depoimento2.webp" },
  { type: "wait", time: 1000 },
  { type: "image", content: "assets/images/depoimento3.webp" },
  { type: "wait", time: 2000 },
  { type: "text", content: "Posso começar a desenhar a Sua Alma Gêmea?" },
  { type: "input", inputType: "text", id: "iniciarDesenho", content: "Digite SIM para confirmar" },
  { type: "wait", time: 2000 },
  { type: "text", content: "{{nome}}, do signo de {{signo}}" },
  { type: "wait", time: 2000 },
  { type: "text", content: "Nasceu em {{data de nascimento}}" },
  { type: "wait", time: 2000 },
  { type: "text", content: "Estou com seu mapa astral aberto…" },
  { type: "wait", time: 2000 },
  { type: "text", content: "Estou visualizando muitas informações importantes..." },
  { type: "wait", time: 2000 },
  { type: "text", content: "Vi que sua alma gêmea se encontra em {{localizacao}}!" },
  { type: "audio", content: "assets/audio/audio4.mp3", waitAfter: 13000 },
  { type: "text", content: "{{nome}}, preste muita atenção!" },
  { type: "audio", content: "assets/audio/audio5.mp3", waitAfter: 8000 },
  {
    type: "text",
    content: "E pensando ainda mais em te ajudar, vou te dar GRATUITAMENTE uma leitura completa em PDF..." },
    { type: "wait", time: 2000 },
    { type: "text", content: `❤️‍🔥 Personalidade completa dele...<br><br>❤️‍🔥 Quando e onde você irá encontrar ele?<br><br>❤️‍🔥 Onde ele mora?<br><br>❤️‍🔥 Truque simples para vc ficar na mente dele quando encontrar ele!<br><br>❤️‍🔥 Como fazer com que ele veja VOCÊ como a mulher mais importante da vida dele!`
  },
  {
    type: "button-link",
    content: "TOQUE AQUI PARA VER SUA ALMA GÊMEA",
    href: "https://payment.ticto.app/OEB080D30?utm_source=FB&utm_campaign={{campaign.name}}|{{campaign.id}}&utm_medium={{adset.name}}|{{adset.id}}&utm_content={{ad.name}}|{{ad.id}}&utm_term={{placement}}"
  }
];

function injectBranch(response) {
  const branch = [
    { type: "text", content: "Fico feliz que as coisas estejam dando certo para você" },
    { type: "wait", time: 2000 },
    { type: "input", inputType: "text", id: "nomeParceiro", content: "Qual o primeiro nome dele?" },
    { type: "audio", content: "assets/audio/audio1p2.mp3", waitAfter: 6000 },
    { type: "text", content: "Veja o depoimento de 3 das milhares de clientes que receberam o desenho idêntico ao parceiro..." },
    { type: "wait", time: 2000 },
    { type: "image", content: "assets/images/depoimento1.webp" },
    { type: "wait", time: 2000 },
    { type: "image", content: "assets/images/depoimento2.webp" },
    { type: "wait", time: 2000 },
    { type: "image", content: "assets/images/depoimento3.webp" },
    { type: "wait", time: 2000 },
    { type: "input", inputType: "text", id: "confirmarDesenhoFinal", content: "Posso começar a desenhar a Sua Alma Gêmea?" },
    { type: "text", content: "{{nome}}, do signo de {{signo}}" },
    { type: "wait", time: 2000 },
    { type: "text", content: "Nasceu em {{data de nascimento}}" },
    { type: "wait", time: 2000 },
    { type: "text", content: "Estou com seu mapa astral aberto…" },
    { type: "wait", time: 2000 },
    { type: "text", content: "Estou visualizando muitas informações importantes..." },
    { type: "wait", time: 2000 },
    { type: "text", content: "Vi que sua alma gêmea se encontra em {{localizacao}}!" },
    { type: "wait", time: 2000 },
    { type: "audio", content: "assets/audio/audio2p2.mp3", waitAfter: 14000 },
    { type: "text", content: "{{nome}}, preste muita atenção!" },
    { type: "wait", time: 2000 },
    { type: "audio", content: "assets/audio/audio5.mp3", waitAfter: 8000 },
    {
      type: "text",
      content: "E pensando ainda mais em te ajudar, vou te dar GRATUITAMENTE uma leitura completa em PDF..."},
    { type: "text", content: `❤️‍🔥 Os desejos que {{nome_dele}} tem muita vontade de fazer (e como realizá-los)!<br><br>❤️‍🔥 Truque simples para vc ficar na mente dele quando vocês estiverem separados!<br><br>❤️‍🔥 A ÚNICA coisa que vai manter o relacionamento de vocês a longo prazo!<br><br>❤️‍🔥 Como fazer com que ele veja VOCÊ como a mulher mais importante da vida dele!`
    },
    { type: "wait", time: 1000 },
    
    {
      type: "button-link",
      content: "TOQUE AQUI PARA VER SUA ALMA GÊMEA",
      href: "https://payment.ticto.app/OEB080D30?utm_source=FB&utm_campaign={{campaign.name}}|{{campaign.id}}&utm_medium={{adset.name}}|{{adset.id}}&utm_content={{ad.name}}|{{ad.id}}&utm_term={{placement}}"
    }
  ];
  quizSteps.splice(step, 0, ...branch);
}

document.addEventListener("DOMContentLoaded", () => {
  nextStep();
});

function nextStep() {
  const container = document.getElementById("quiz-step");
  const statusHeader = document.querySelector(".status");
  if (step >= quizSteps.length) return;
  const current = quizSteps[step];

  if (current.type === "wait") {
    setTimeout(() => { step++; nextStep(); }, current.time);
    return;
  }

  statusHeader.innerText = "digitando...";
  showTypingBubble();
  let waitTime = current.waitAfter || 1500;
  setTimeout(() => {
    removeTypingBubble();
    statusHeader.innerText = "online";

    if (current.type === "text") {
      container.appendChild(createMessage(replaceVars(current.content), "host"));
      step++;
      scrollToBottom();
      setTimeout(nextStep, 1000);
    }

    if (current.type === "audio") {
      const audioPlayer = createAudioPlayer(current.content);
      container.appendChild(audioPlayer);
      step++;
      scrollToBottom();
      setTimeout(nextStep, current.waitAfter || 5000);
    }

    if (current.type === "image") {
      const img = document.createElement("img");
      img.src = current.content;
      img.className = "message";
      container.appendChild(img);
      step++;
      scrollToBottom();
      setTimeout(nextStep, 1000);
    }

    if (current.type === "input") {
      const label = createMessage(replaceVars(current.content), "host");
      container.appendChild(label);
      scrollToBottom();

      const inputArea = document.createElement("div");
      inputArea.className = "input-area";

      const input = document.createElement("input");
      input.type = current.inputType;
      input.placeholder = "Digite aqui";
      input.id = current.id;

      const btn = document.createElement("button");
      btn.className = "send-btn";
      btn.textContent = "ENVIAR";
      btn.onclick = () => {
        if (input.value.trim()) {
          const response = input.value.trim();
          lastResponse = response;
          container.appendChild(createMessage(response, "guest", true));
          inputArea.remove();

          // salvar campos
          if (current.id === "dataNascimentoCompleta") vars["data de nascimento"] = response;
          if (current.id === "nomeParceiro") vars["nome_dele"] = response;
          if (current.id === "inicioConfirmado") vars["inicio"] = response;
          if (current.id === "iniciarDesenho") vars["desenho"] = response;

          step++;
          nextStep();
        }
      };

      inputArea.appendChild(input);
      inputArea.appendChild(btn);
      container.appendChild(inputArea);
      scrollToBottom();
    }

    if (current.type === "buttons") {
      const wrap = document.createElement("div");
      wrap.className = "input-area multiple";
      current.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "send-btn";
        btn.textContent = opt;
        btn.onclick = () => {
          container.appendChild(createMessage(opt, "guest", true));
          wrap.remove();
          lastResponse = opt;
          step++;
          if (opt === "Não estou com ninguém") {
            quizSteps.splice(step, 0, ...fluxoSolteiro);
          } else {
            injectBranch(opt);
          }
          nextStep();
        };
        wrap.appendChild(btn);
      });
      container.appendChild(wrap);
      scrollToBottom();
    }

    if (current.type === "button-link") {
      const wrap = document.createElement("div");
      wrap.className = "input-area button-only";

      const btn = document.createElement("button");
      btn.className = "send-btn";
      btn.textContent = replaceVars(current.content);
      btn.onclick = () => {
        const url = new URL(current.href);
        if (vars["utm_source"])   url.searchParams.set("utm_source", vars["utm_source"]);
        if (vars["utm_medium"])   url.searchParams.set("utm_medium", vars["utm_medium"]);
        if (vars["utm_campaign"]) url.searchParams.set("utm_campaign", vars["utm_campaign"]);
        if (vars["utm_content"])  url.searchParams.set("utm_content", vars["utm_content"]);
        if (vars["utm_term"])     url.searchParams.set("utm_term", vars["utm_term"]);
        if (vars["xcod"])         url.searchParams.set("xcod", vars["xcod"]);
        
        window.location.href = url.toString();
      };

      wrap.appendChild(btn);
      container.appendChild(wrap);
      scrollToBottom();
    }
  }, waitTime);
}

function replaceVars(text) {
  return text.replace(/{{(.*?)}}/g, (_, key) => vars[key.trim()] || "");
}

function createMessage(content, role, addMeta = false) {
  const msg = document.createElement("div");
  msg.className = `message ${role}`;
  const text = document.createElement("div");
  text.className = "text-content";
  text.innerHTML = formatText(content);
  msg.appendChild(text);
  if (addMeta) {
    const meta = document.createElement("div");
    meta.className = "meta-info";
    const h = new Date().getHours().toString().padStart(2, '0');
    const m = new Date().getMinutes().toString().padStart(2, '0');
    meta.innerHTML = `<span class="hora">${h}:${m}</span>
      <div class="checks">
        <svg viewBox="0 0 24 24"><path d="M1.5 13L6 17.5L22 2" stroke="#34B7F1" stroke-width="2" fill="none"/></svg>
        <svg viewBox="0 0 24 24"><path d="M7 13L12 18L22 7" stroke="#34B7F1" stroke-width="2" fill="none"/></svg>
      </div>`;
    msg.appendChild(meta);
  }
  return msg;
}

function scrollToBottom() {
  setTimeout(() => {
    const el = document.getElementById("quiz-container");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, 50); // pequeno delay pra garantir que o DOM atualizou
}

function showTypingBubble() {
  const container = document.getElementById("quiz-step");
  const typing = document.createElement("div");
  typing.className = "typing-bubble";
  typing.id = "typing-bubble";
  typing.innerHTML = "<div class='dot'></div><div class='dot'></div><div class='dot'></div>";
  container.appendChild(typing);
  scrollToBottom();
}

function removeTypingBubble() {
  const typing = document.getElementById("typing-bubble");
  if (typing) typing.remove();
}

function formatText(text) {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

function createAudioPlayer(src) {
  const wrapper = document.createElement("div");
  wrapper.className = "audio-player";

  wrapper.innerHTML = `
    <div class="left">
      <button class="play-btn">▶</button>
      <div class="waveform">${"<span></span>".repeat(10)}</div>
      <div class="duration">0:00</div>
    </div>
    <div class="right">
      <div class="avatar-container">
        <img src="assets/images/avatar-mestre-zion.png" class="avatar">
        <div class="mic-icon">🎙️</div>
      </div>
      <div class="timestamp">${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}</div>
    </div>`;

  const button = wrapper.querySelector(".play-btn");
  const waveform = wrapper.querySelector(".waveform");
  const duration = wrapper.querySelector(".duration");
  const statusHeader = document.querySelector(".status");
  const audio = new Audio(src);
  let playing = false;

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60).toString().padStart(2, "0")}`;
  });

  button.addEventListener("click", () => {
    if (!playing) {
      audio.play();
      playing = true;
      button.textContent = "⏸";
      waveform.querySelectorAll("span").forEach(s => s.style.animationPlayState = "running");
      statusHeader.innerText = "gravando áudio...";
    } else {
      audio.pause();
      playing = false;
      button.textContent = "▶";
      waveform.querySelectorAll("span").forEach(s => s.style.animationPlayState = "paused");
      statusHeader.innerText = "online";
    }
  });

  audio.addEventListener("ended", () => {
    playing = false;
    button.textContent = "▶";
    waveform.querySelectorAll("span").forEach(s => s.style.animationPlayState = "paused");
    audio.currentTime = 0;
    statusHeader.innerText = "online";
  });

  return wrapper;
}
