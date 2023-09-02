const apiUrl = 'https://mindicador.cl/api/';
const boton = document.querySelector('#consultar');
const select = document.querySelector('#seleccionar-tipo');
const agregarValor = document.querySelector('#digitar')

async function getMoneda() {
    const res = await fetch(apiUrl);
    const monedaValores = await res.json();
    return monedaValores;
}

async function modificandoSelect() {
    try {
        const api = await getMoneda();
        const apiKeys = Object.keys(api);
        const unidades = apiKeys.slice(3);
        console.log(unidades)
        let template = '';
        unidades.forEach((unidad) => {
            template += `
            <option value='${unidad}'>${api[unidad].codigo}</option>
            `;
        });
        select.innerHTML = template;
    }
    catch(error){
        alert(error)
    }
}

modificandoSelect();

async function consultar() {
    try {
        const crear = document.querySelector('#resultado');
        const api = await getMoneda();
        const promises = Object.keys(api).map(async (unidad) => {
        if (select.value === api[unidad].codigo && agregarValor.value === '') {
            return `<p>${api[unidad].valor}</p>`;
        } else if (select.value === api[unidad].codigo){
            return `<p>${(agregarValor.value / api[unidad].valor).toFixed(2)}</p>`;
        }
    });
    const resultados = await Promise.all(promises);
    const html = resultados.join('');
    crear.innerHTML = html;
    }
    catch(error){
        alert(error)
    }
};

