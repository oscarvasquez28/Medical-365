import Context from './TEST_CONNECTION.js';
import express from 'express';

const app = express();
const port = 3000;

const context = new Context();


// CRUD for Colaborador
app.get('/colaborador', (req, res) => {
    context.Connection.model('Colaborador').find({}, (err, colaboradores) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(colaboradores);
        }
    });
    res.send('');
});

app.get('/colaborador/:id', (req, res) => {
    context.Connection.model('Colaborador').findById(req.params.id, (err, colaborador) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(colaborador);
        }
    });
});

app.get('/colaborador/:id&:name', (req, res) => {
    context.Connection.model('Colaborador').find({ id: req.params.id, name: req.params.name }, (err, colaborador) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(colaborador);
        }
    });
});

app.put('/colaborador/:id', (req, res) => {
    context.Connection.model('Colaborador').findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, colaborador) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(colaborador);
        }
    });
});

app.post('/colaborador', (req, res) => {
    context.Connection.model('Colaborador').create(req.body, (err, colaborador) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(colaborador);
        }
    });
});

app.delete('/colaborador/:id', (req, res) => {
    context.Connection.model('Colaborador').findByIdAndDelete(req.params.id, (err, colaborador) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(204).send('');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});