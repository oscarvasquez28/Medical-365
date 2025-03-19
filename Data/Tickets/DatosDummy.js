const DatosDummy = [
    {
        paciente: 12345,
        descripcion: 'Patient has high fever and persistent cough.',
        sintomas: ['Fever', 'Cough'],
        incidencia: 'Fever',
        riesgo: 'High',
        fechaCreacion: new Date('2023-10-01'),
        fechaCierre: new Date('2023-10-03'),
        resultado: 'COVID-19 positive',
        comentarios: 'Patient needs immediate attention.'
    },
    {
        paciente: 67890,
        descripcion: 'Patient reports loss of taste and smell.',
        sintomas: ['Loss of taste', 'Loss of smell'],
        incidencia: 'Fever',
        riesgo: 'Medium',
        fechaCreacion: new Date('2023-10-02'),
        fechaCierre: new Date('2023-10-03'),
        resultado: 'COVID-19 positive',
        comentarios: 'Monitor paciente for further sintomas.'
    },
    {
        paciente: 54321,
        descripcion: 'Patient complains of fatigue and headache.',
        sintomas: ['Fatigue', 'Headache'],
        incidencia: 'Fever',
        riesgo: 'Low',
        fechaCreacion: new Date('2023-10-03'),
        fechaCierre: new Date('2023-10-03'),
        resultado: 'COVID-19 positive',
        comentarios: 'Advise rest and hydration.'
    },
    {
        paciente: 98765,
        descripcion: 'Patient has shortness of breath.',
        sintomas: ['Shortness of breath'],
        incidencia: 'Fever',  
        riesgo: 'High',
        fechaCreacion: new Date('2023-10-04'),
        fechaCierre: new Date('2023-10-03'),
        resultado: 'COVID-19 positive',
        comentarios: 'Urgent care required.'
    }
];

export default DatosDummy;