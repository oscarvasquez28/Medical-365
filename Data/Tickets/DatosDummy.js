const DatosDummy = [
    {
        nombre: 'Ticket',
        paciente: 12345,
        descripcion: 'Patient has high fever and persistent cough.',
        sintomas: ['Fever', 'Cough'],
        incidencia: 'Fever',
        fechaCreacion: new Date('2023-10-01'),
        fechaCierre: new Date('2023-10-03'),
        comentarios: 'Patient needs immediate attention.'
    },
    {
        nombre: 'Ticket',
        paciente: 67890,
        descripcion: 'Patient reports loss of taste and smell.',
        sintomas: ['Loss of taste', 'Loss of smell'],
        incidencia: 'Fever',
        fechaCreacion: new Date('2023-10-02'),
        fechaCierre: new Date('2023-10-03'),
        comentarios: 'Monitor paciente for further sintomas.'
    },
    {
        nombre: 'Ticket',
        paciente: 54321,
        descripcion: 'Patient complains of fatigue and headache.',
        sintomas: ['Fatigue', 'Headache'],
        incidencia: 'Fever',
        fechaCreacion: new Date('2023-10-03'),
        fechaCierre: new Date('2023-10-03'),
        comentarios: 'Advise rest and hydration.'
    },
    {
        nombre: 'Ticket',
        paciente: 98765,
        descripcion: 'Patient has shortness of breath.',
        sintomas: ['Shortness of breath'],
        incidencia: 'Fever',  
        fechaCreacion: new Date('2023-10-04'),
        fechaCierre: new Date('2023-10-03'),
        comentarios: 'Urgent care required.'
    }
];

export default DatosDummy;