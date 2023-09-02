/*Profesor Raul: me rompi la cabeza tratando de hacer el grafico pero no
logré a dar con el resultado que querian.Subiré la prueba solo por cumplir el plazo,
pero seguiré intentando dar con lo solicitado, si en el peor de los casos no logro
dar con la solucion, prefiero que me evalúe tal y como esta la prueba.
de ante mano, muchas gracias*/

const apiUrlValor = 'https://mindicador.cl/api/';

async function getValorMoneda() {
    try {
        const res = await fetch(apiUrlValor);
        const valores = await res.json();
        return valores;
    } catch (error) {
        console.error('Error al obtener los valores de moneda:', error);
        throw error;
    }
}

function preparandoGrafica(valores) {
    const grafica = 'line';
    const tipoDeValores = Object.values(valores).map((valor) => {
        return valor.fecha;
    });
    console.log(tipoDeValores);
    const titulo = 'Valores';
    const color = 'red';
    const valoresMoneda = Object.values(valores).map((valor) => {
        const valorUnidad = valor.valor;
        return valorUnidad;
    });

    const config = {
        type: grafica,
        data: {
            labels: tipoDeValores,
            datasets: [
                {
                    label: titulo,
                    backgroundColor: color,
                    data: valoresMoneda
                }
            ]
        }
    };
    return config;
}

async function renderGrafica() {
    try {
        const valores = await getValorMoneda();
        const config = preparandoGrafica(valores);
        const chartDOM = document.getElementById("myChart");
        new Chart(chartDOM, config);
    } catch (error) {
        console.log('Error al renderizar la gráfica:', error);
    }
}

renderGrafica();
