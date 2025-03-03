const DummyData = [
    {
        patient: 12345,
        description: 'Patient has high fever and persistent cough.',
        symptoms: ['Fever', 'Cough'],
        typeIncident: 'Fever',
        risk: 'High',
        creationDate: new Date('2023-10-01'),
        comments: 'Patient needs immediate attention.'
    },
    {
        patient: 67890,
        description: 'Patient reports loss of taste and smell.',
        symptoms: ['Loss of taste', 'Loss of smell'],
        typeIncident: 'Fever',
        risk: 'Medium',
        creationDate: new Date('2023-10-02'),
        comments: 'Monitor patient for further symptoms.'
    },
    {
        patient: 54321,
        description: 'Patient complains of fatigue and headache.',
        symptoms: ['Fatigue', 'Headache'],
        typeIncident: 'Fever',
        risk: 'Low',
        creationDate: new Date('2023-10-03'),
        comments: 'Advise rest and hydration.'
    },
    {
        patient: 98765,
        description: 'Patient has shortness of breath.',
        symptoms: ['Shortness of breath'],
        typeIncident: 'Fever',  
        risk: 'High',
        creationDate: new Date('2023-10-04'),
        comments: 'Urgent care required.'
    }
];

export default DummyData;