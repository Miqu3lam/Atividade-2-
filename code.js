async function buscarcidades(sigla) {
    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar cidades');
        }

        const municipios = await response.json();
        return municipios;
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
}

function mostrarcidade(cidades) {
    const cidadesElement = document.getElementById("Cidades");
    cidadesElement.innerHTML = ''; 
    
    cidades.forEach(cidade => {
        const li = document.createElement("li");
        li.textContent = cidade.nome;
        cidadesElement.appendChild(li);
    });
}


async function carregarCidades(sigla) {
    const cidades = await buscarcidades(sigla);
    mostrarcidade(cidades);
}

document.getElementById("btn").addEventListener("click", function() {
    const siglaEstado = document.getElementById("pegar").value.toUpperCase(); 
    carregarCidades(siglaEstado);
})
