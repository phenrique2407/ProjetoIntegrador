// Função para atualizar os indicadores do dashboard
function updateDashboard() {
  const cards = document.querySelectorAll(".req-card");
  const total = cards.length;

  if (total === 0) return;

  let concluidos = 0;
  let rf = 0;
  let rnf = 0;

  cards.forEach((card) => {
    const tags = card.querySelectorAll(".tag");

    tags.forEach((tag) => {
      const text = tag.textContent.trim().toUpperCase();
      if (text === "RF") rf++;
      if (text === "RNF") rnf++;
      if (text === "CONCLUÍDO") concluidos++;
    });
  });

  // 1. Atualizar Barra de Progresso
  const porcentagem = Math.round((concluidos / total) * 100);
  const progressFill = document.querySelector(".progress-fill");

  if (progressFill) {
    progressFill.style.width = `${porcentagem}%`;
    progressFill.textContent = `${porcentagem}%`;
  }

  // 2. Atualizar Gráfico
  initChart(rf, rnf);
}

let myChart = null;
function initChart(rf, rnf) {
  const ctx = document.getElementById("requirementsChart");
  if (!ctx) return;

  if (myChart) myChart.destroy();

  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Funcionais", "Não Funcionais"],
      datasets: [
        {
          data: [rf, rnf],
          backgroundColor: ["#10b981", "#ef4444"],
          borderColor: "#1e1e1e",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
    },
  });
}

// Controle de Modais
function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Configurações Iniciais
document.addEventListener("DOMContentLoaded", () => {
  updateDashboard();

  // Lógica dos botões Toggle (Seletores)
  document.querySelectorAll(".group-item").forEach((button) => {
    button.addEventListener("click", function () {
      const group = this.parentElement;
      group
        .querySelectorAll(".group-item")
        .forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Fechar modal ao clicar fora
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(e.target.id);
    }
  });
});

/* const cardList = document.getElementById("cardList");

function createCard(data) {
  data.forEach((card) => {
    let cardHtml;
    cardHtml.innerHtml = `
        <div>${card.nome}</div>
        `;
    cardList.appendChild(card);
  });
} */