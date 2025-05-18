// routes/indicatorRoutes.js
import express from 'express';
import Indicador from '../../Data/Indicadores/Esquema.js'; // Importa el modelo Indicador
import Ticket from '../../Data/Tickets/Esquema.js'; // Importa el modelo Ticket
import Citas from '../../Data/Citas/Esquema.js'; // Importa el modelo Appointment 
import Colaborador from '../../Data/Colaboradores/Esquema.js';

// routes/indicatorRoutes.js
const router = express.Router();
const indicador = new Indicador();
const ticket = new Ticket();
const cita = new Citas();
const colaborador = new Colaborador();

// Ruta para obtener todos los indicadores
router.get('/tickets', async (req, res) => {
    try {
        const tickets = await ticket.model.find();

        const indicadores = {
            'totalTickets': tickets.length,
            'cerrados': {
                'id': 0,
                'value': tickets.filter(ticket => ticket.estatus === 'Cerrado').length,
                'label': 'Cerrados'
            },
            'pendientes': {
                'id': 1,
                'value': tickets.filter(ticket => ticket.estatus === 'Pendiente').length,
                'label': 'Pendientes'
            },
            'cancelados': {
                'id': 2,
                'value': tickets.filter(ticket => ticket.estatus === 'Cancelado').length,
                'label': 'Cancelados'
            },
            'urgentes': {
                'id': 3,
                'value': tickets.filter(ticket => ticket.riesgo === 'Alto').length,
                'label': 'Urgentes'
            }
        };

        // Obtiene todos los indicadores
        res.status(200).json(indicadores);

    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los indicadores', error: err });
    }
});

router.get('/tickets/month', async (req, res) => {
    try {
        const tickets = await ticket.model.find();
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        const ticketsPorMes = meses.map((_, mes) => {
            const ticketsDelMes = tickets.filter(ticket => new Date(ticket.fechaCreacion).getMonth() === mes);
            if (ticketsDelMes.length !== 0) {
                return {
                    mes: meses[mes],
                    cantidad: ticketsDelMes.length,
                };
            }
            else return
        });

        const filteredTicketsPorMes = ticketsPorMes.filter(ticket => ticket !== undefined);

        res.status(200).json(filteredTicketsPorMes);

    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los indicadores', error: err });
    }
});

router.get('/tickets/:id', async (req, res) => {
    try {

        const id = req.params.id;

        const tickets = await ticket.model.find({ paciente: id });
        
        const indicadores = {
                'totalTickets': tickets.length,
                'cerrados': {
                    'id': 0,
                    'value': tickets.filter(ticket => ticket.estatus === 'Pendiente').length,
                    'label': 'Pendiente'
                },
                'pendientes': {
                    'id': 1,
                    'value': tickets.filter(ticket => ticket.estatus === 'Cerrado').length,
                    'label': 'Cerrado'
                },
                'cancelados': {
                    'id': 2,
                    'value': tickets.filter(ticket => ticket.estatus === 'Cancelado').length,
                    'label': 'Cancelado'
                },

            };      

        // Obtiene todos los indicadores
        res.status(200).json(indicadores);

    } catch (err) {
        res.status(400).json({ message: 'Error al obtener el ticket', error: err });
    }
});

// Ruta para obtener todos los indicadores
router.get('/appointments/month', async (req, res) => {

    try {

        const citas = await cita.model.find();
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        const citaPorMes = meses.map((_, mes) => {
            const citaDelMes = citas.filter(cita => new Date(cita.fechaCita).getMonth() === mes);
            if (citaDelMes.length !== 0) {
                return {
                    mes: meses[mes],
                    cantidad: citaDelMes.length,
                };
            }
            else return
        });

        const filteredCitasPorMes = citaPorMes.filter(cita => cita !== undefined);

        res.status(200).json(filteredCitasPorMes);

    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los indicadores de citas', error: err});
    }
});

router.get('/collaborators', async (req, res) => {

    try {
        const colaboradores = await colaborador.model.find();

        const indicadores = {
            'totalColaboradores': colaboradores.length,
            'inactivo': {
                'id': 0,
                'value': colaboradores.filter(colaborador => colaborador.estatus === 'Inactivo').length,
                'label': 'Inactivos'
            },
            'activo': {
                'id': 1,
                'value': colaboradores.filter(colaborador => colaborador.estatus === 'Activo').length,
                'label': 'Activos'
            },
            'suspendido': {
                'id': 2,
                'value': colaboradores.filter(colaborador => colaborador.estatus === 'Suspendido').length,
                'label': 'Suspendidos'
            },
        };

        // Obtiene todos los indicadores
        res.status(200).json(indicadores);

    } catch (err) {
        res.status(400).json({ message: 'Error al obtener los indicadores de citas', error: err});
    }
});

// Ruta para obtener un indicador por ID
router.get('/:id', async (req, res) => {
    try {
        const indicador = await indicador.model.findById(req.params.id); // Busca un indicador por ID
        if (!indicador) {
            return res.status(404).json({ message: 'Indicador no encontrado' });
        }
        res.status(200).json(indicador);
    } catch (err) {
        res.status(400).json({ message: 'Error al obtener el indicador', error: err });
    }
});

// Ruta para crear un nuevo indicador
router.post('/', async (req, res) => {
    try {
        const { id, descripcion } = req.body;

        // Crea un nuevo indicador
        const newIndicador = new indicador.model({
            id,
            descripcion,
        });

        // Guarda el indicador en la base de datos
        await newIndicador.save();
        res.status(201).json({ message: 'Indicador creado con éxito', indicador: newIndicador });
    } catch (err) {
        res.status(400).json({ message: 'Error al crear el indicador', error: err });
    }
});

// Ruta para actualizar un indicador por ID
router.put('/:id', async (req, res) => {
    try {
        const updatedIndicador = await indicador.model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Devuelve el documento actualizado
        );
        if (!updatedIndicador) {
            return res.status(404).json({ message: 'Indicador no encontrado' });
        }
        res.status(200).json({ message: 'Indicador actualizado', indicador: updatedIndicador });
    } catch (err) {
        res.status(400).json({ message: 'Error al actualizar el indicador', error: err });
    }
});

// Ruta para eliminar un indicador por ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedIndicador = await indicador.model.findByIdAndDelete(req.params.id);
        if (!deletedIndicador) {
            return res.status(404).json({ message: 'Indicador no encontrado' });
        }
        res.status(200).json({ message: 'Indicador eliminado', indicador: deletedIndicador });
    } catch (err) {
        res.status(400).json({ message: 'Error al eliminar el indicador', error: err });
    }
});

export default router;

