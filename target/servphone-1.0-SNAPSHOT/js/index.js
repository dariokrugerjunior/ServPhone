$(document).ready(async function () {
  const today = new Date(); // cria um objeto de data com a data atual

  const weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const dates = []

  const labels = weekdays.map((day) => {
    const dayNumber = weekdays.indexOf(day);
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + dayNumber);
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    dates.push(date.getTime())
    return `${day} - ${dateString}`;
  });

  window.addEventListener('resize', function() {
    console.log("entrou")
    myChart.update()
  });

  $("header").load(`/${sessionStorage.getItem('location')}/pages/menu/header.html`);
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Em Analise Tecnico",
          data: [await getCountBudget(1, dates[0]),
           await getCountBudget(1, dates[1]),
            await getCountBudget(1, dates[2]),
             await getCountBudget(1, dates[3]),
              await getCountBudget(1, dates[4]),
               await getCountBudget(1, dates[5]),
                await getCountBudget(1, dates[6])],
          backgroundColor: "rgba(224, 99, 187, 0.6)",
        },
        {
          label: "Aguardando Atendente",
          data: [await getCountBudget(2, dates[0]),
           await getCountBudget(2, dates[1]),
            await getCountBudget(2, dates[2]),
             await getCountBudget(2, dates[3]),
              await getCountBudget(2, dates[4]),
               await getCountBudget(2, dates[5]),
                await getCountBudget(2, dates[6])],
          backgroundColor: "rgba(53, 76, 101, 0.6)",
        },
        {
          label: "Aguardando Aviso para o Cliente",
          data: [await getCountBudget(9, dates[0]),
           await getCountBudget(9, dates[1]),
            await getCountBudget(9, dates[2]),
             await getCountBudget(9, dates[3]),
              await getCountBudget(9, dates[4]),
               await getCountBudget(9, dates[5]),
                await getCountBudget(9, dates[6])],
          backgroundColor: "rgba(189, 233, 88, 0.6)",
        },
        {
          label: "Aguardando Peça",
          data: [await getCountBudget(8, dates[0]),
           await getCountBudget(8, dates[1]),
            await getCountBudget(8, dates[2]),
             await getCountBudget(8, dates[3]),
              await getCountBudget(8, dates[4]),
               await getCountBudget(8, dates[5]),
                await getCountBudget(8, dates[6])],
          backgroundColor: "rgba(22, 132, 203, 0.6)",
        },
        {
          label: "Aguardando Manutenção",
          data: [await getCountBudget(4, dates[0]),
           await getCountBudget(4, dates[1]),
            await getCountBudget(4, dates[2]),
             await getCountBudget(4, dates[3]),
              await getCountBudget(4, dates[4]),
               await getCountBudget(4, dates[5]),
                await getCountBudget(4, dates[6])],
          backgroundColor: "rgba(247, 197, 4, 0.6)",
        },
        {
          label: "Aguardando Resposta do Cliente",
          data: [await getCountBudget(3, dates[0]),
           await getCountBudget(3, dates[1]),
            await getCountBudget(3, dates[2]),
             await getCountBudget(3, dates[3]),
              await getCountBudget(3, dates[4]),
               await getCountBudget(3, dates[5]),
                await getCountBudget(3, dates[6])],
          backgroundColor: "rgba(203, 143, 42, 0.6)",
        },
        {
          label: "Aguardando Retirada com Pagamento",
          data: [await getCountBudget(10, dates[0]),
           await getCountBudget(10, dates[1]),
            await getCountBudget(10, dates[2]),
             await getCountBudget(10, dates[3]),
              await getCountBudget(10, dates[4]),
               await getCountBudget(10, dates[5]),
                await getCountBudget(10, dates[6])],
          backgroundColor: "rgba(40, 72, 136, 0.6)",
        },
        {
          label: "Aguardando Retirada do Aparelho",
          data: [await getCountBudget(6, dates[0]),
           await getCountBudget(6, dates[1]),
            await getCountBudget(6, dates[2]),
             await getCountBudget(6, dates[3]),
              await getCountBudget(6, dates[4]),
               await getCountBudget(6, dates[5]),
                await getCountBudget(6, dates[6])],
          backgroundColor: "rgba(85, 185, 234, 0.6)",
        },
        {
          label: "Em Manutenção",
          data: [await getCountBudget(5, dates[0]),
           await getCountBudget(5, dates[1]),
            await getCountBudget(5, dates[2]),
             await getCountBudget(5, dates[3]),
              await getCountBudget(5, dates[4]),
               await getCountBudget(5, dates[5]),
                await getCountBudget(5, dates[6])],
          backgroundColor: "rgba(78, 245, 123, 0.6)",
        },
        {
          label: "Concluido - Aguardando Aviso para Cliente",
          data: [await getCountBudget(13, dates[0]),
           await getCountBudget(13, dates[1]),
            await getCountBudget(13, dates[2]),
             await getCountBudget(13, dates[3]),
              await getCountBudget(13, dates[4]),
               await getCountBudget(13, dates[5]),
                await getCountBudget(13, dates[6])],
          backgroundColor: "rgba(234, 95, 56, 0.6)",
        },
        {
          label: "Concluido/Em Garantia",
          data: [await getCountBudget(11, dates[0]),
           await getCountBudget(11, dates[1]),
            await getCountBudget(11, dates[2]),
             await getCountBudget(11, dates[3]),
              await getCountBudget(11, dates[4]),
               await getCountBudget(11, dates[5]),
                await getCountBudget(11, dates[6])],
          backgroundColor: "rgba(89, 14, 68, 0.6)",
        },
        {
          label: "Orçamento Finalizado",
          data: [await getCountBudget(12, dates[0]),
           await getCountBudget(12, dates[1]),
            await getCountBudget(12, dates[2]),
             await getCountBudget(12, dates[3]),
              await getCountBudget(12, dates[4]),
               await getCountBudget(12, dates[5]),
                await getCountBudget(12, dates[6])],
          backgroundColor: "rgba(153, 97, 207, 0.6)",
        },
        {
          label: "Orçamento Não Realizado",
          data: [await getCountBudget(7, dates[0]),
           await getCountBudget(7, dates[1]),
            await getCountBudget( 7, dates[2]),
             await getCountBudget(7, dates[3]),
              await getCountBudget(7, dates[4]),
               await getCountBudget(7, dates[5]),
                await getCountBudget(7, dates[6])],
          backgroundColor: "rgba(33, 200, 57, 0.6)",
        }
      ],
    },
  });
  myChart.update();
  console.log('chegou aqui')
});



async function getCountBudget(status, date) {
  try {
    const response = await $.ajax({
      type: "GET",
      url: "/servphone_war_exploded/servphone/rest/budget/count",
      data: `status=${status}&time=${date}`
    });
    return response;
  } catch (error) {
    // actionModal("Erro", `Erro ao buscar orçamentos: ${error.responseText}`)
    return 0;
  }
}


