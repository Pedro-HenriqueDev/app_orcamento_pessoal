class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this){
            if(this[i] == undefined || this[i] == null || this[i] == '') {
                return false
            }
            
        }
        return true
    }
}
class Bd {
    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }
    recuperarTodosRegistros() {
        let id = localStorage.getItem('id')

        let despesas = Array()

        //recuperar todas despesas
        for(let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa === null){
                continue
            }
            despesa.id = i
            despesas.push(despesa)
        }
        return despesas
    }
    pesquisar(despesa) {

        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        
        console.log(despesa)
        console.log(despesasFiltradas)

        if(despesa.ano != '') {
            console.log('Filtro de Ano:')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
            // O filter não atua sobre o Array original
        }
        if(despesa.mes != '') {
            console.log('Filtro de Mes:')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
            // O filter não atua sobre o Array original
        }
        if(despesa.dia != '') {
            console.log('Filtro de dia:')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
            // O filter não atua sobre o Array original
        }
        if(despesa.tipo != '') {
            console.log('Filtro de tipo:')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
            // O filter não atua sobre o Array original
        }
        if(despesa.descricao != '') {
            console.log('Filtro de desc:')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
            // O filter não atua sobre o Array original
        }
        if(despesa.valor != '') {
            console.log('Filtro de valor:')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
            // O filter não atua sobre o Array original
        }
         return despesasFiltradas
    }
    remover(id) {
        localStorage.removeItem(id)
    }
    
}
let bd = new Bd()

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa
    (ano.value, 
    mes.value, 
    dia.value, 
    tipo.value, 
    descricao.value, 
    valor.value)
    
    if(despesa.validarDados()) {
        bd.gravar(despesa)

        
        document.getElementById('title-modal').innerHTML = 'Registro feito com Sucesso!'
        document.getElementById('modal-titulo-div').className = 'modal-header text-success'
        document.getElementById('modal-conteudo').innerHTML = 'Sucesso na gravação'
        document.getElementById('modal-btn').innerHTML = 'Voltar'
        document.getElementById('modal-btn').className = 'btn-success'

        $('#registroGravacao').modal('show')
        
            ano = document.getElementById('ano').value = ''
            mes = document.getElementById('mes').value = ''
            dia = document.getElementById('dia').value = ''
            tipo = document.getElementById('tipo').value = ''
            descricao = document.getElementById('descricao').value = ''
            valor = document.getElementById('valor').value = ''
        
    } else {

        document.getElementById('title-modal').innerHTML = 'Erro na inclusão do Registro'
        document.getElementById('modal-titulo-div').className = 'modal-header text-danger'
        document.getElementById('modal-conteudo').innerHTML = 'Erro na gravação'
        document.getElementById('modal-btn').innerHTML = 'Voltar e continuar'
        document.getElementById('modal-btn').className = 'btn-danger'

        $('#registroGravacao').modal('show')
    }

    
}

function carregarListaDespesas(despesas = Array(), filtro = false) {
    
    if(despesas.length == 0 && filtro == false) {
    despesas = bd.recuperarTodosRegistros() 
}

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''
    despesas.forEach(function(d) {
        
        let linha = listaDespesas.insertRow()

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        switch(d.tipo) {
            case '1':
                d.tipo = 'Alimentação'
                break
            case '2':
                    d.tipo = 'Educação'
                break
            case '3':
                    d.tipo = 'lazer'
                break
            case '4':
                d.tipo = 'Educação'
                break
            case '5': 
                d.tipo = 'Saúde'
                break
            case '5': 
                d.tipo = 'Transporte'
                break
            }
        linha.insertCell(1).innerHTML = `${d.tipo}`
        linha.insertCell(2).innerHTML = `${d.descricao}`
        linha.insertCell(3).innerHTML = `${d.valor}`

        // botão de exclusão

        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa${d.id}`
        btn.onclick = function() {
            let id = this.id.replace('id_despesa', '')
            bd.remover(id)

            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    this.carregarListaDespesas(despesas, true)

}