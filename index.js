const express = require('express')
const sqlite3 = require('sqlite3')
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

const db = new sqlite3.Database('./SQL1/base.db', (err) => {
    if (err) {
        console.log("Erro ao abrir base de dados " + err.message);
    } else {
        console.log("Conectado com o Banco de Dados")
    }
})

//----- Verbos pra produtos -----//
app.post("/clientes", (req, res, next) => {
    console.log(req.body.id_func)
    db.run("INSERT INTO CLIENTES (NOME_CLIENTE, CPF_CLIENTE) VALUES(?,?)",
    [req.body.nome, req.body.cpf],
    function(err, result){
        if(err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.status(201).json({
            "ID": this.lastID
        })
    })
})
app.get("/clientes", (req, res, next) => {
    db.all("SELECT * FROM CLIENTES", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ rows });
    });
});
app.get("/clientes/:id", (req, res, next) => {
    const id = req.params.id 
    db.all(`SELECT * FROM clientes WHERE id_cliente = ${id}`, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ rows });
    });
});

//----- Verbos pra produtos -----//
app.post("/produtos", (req, res, next) => {
    console.log(req.body.id_func)
    db.run("INSERT INTO PRODUTOS (NOME_PRODUTO, PRECO_PRODUTO) VALUES(?,?)",
    [req.body.nome, req.body.preco],
    function(err, result){
        if(err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.status(201).json({
            "ID": this.lastID
        })
    })
})
app.get("/produtos", (req, res, next) => {
    db.all("SELECT * FROM PRODUTOS", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ rows });
    });
});
app.get("/produtos/:id", (req, res, next) => {
    const id = req.params.id 
    db.all(`SELECT * FROM PRODUTOS WHERE ID_PRODUTO = ${id}`, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ rows });
    });
});


//----- Verbos pra vendas -----//
app.post("/vendas", (req, res, next) => {
    console.log(req.body.id_func)
    db.run("INSERT INTO VENDAS (ID_CLIENTE, ID_PRODUTO, QUANTIDADE_PRODUTO, VALOR_VENDA) VALUES(?,?,?,?)",
    [req.body.id_cliente, req.body.id_produto, req.body.quantidade, req.body.valor],
    function(err, result){
        if(err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.status(201).json({
            "ID": this.lastID
        })
    })
})
app.get("/vendas", (req, res, next) => {
    db.all("SELECT * FROM VENDAS", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ rows });
    });
});
app.get("/vendas/:id", (req, res, next) => {
    const id = req.params.id 
    db.all(`SELECT * FROM VENDAS WHERE ID_VENDA = ${id}`, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ rows });
    });
});



app.listen(port, () => {
    console.log('Servidor sendo excutado na porta: ', port)
})