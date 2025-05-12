// DOM Elements
const navLinks = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('.section');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');
const addPatientBtn = document.getElementById('addPatientBtn');
const addDoctorBtn = document.getElementById('addDoctorBtn');
const addAppointmentBtn = document.getElementById('addAppointmentBtn');
const recordForm = document.getElementById('recordForm');
const modalTitle = document.getElementById('modalTitle');

// Sample data (in a real application, this would come from a backend)
let patients = [
    { id: 1, name: 'John Doe', age: 45, gender: 'Male', contact: '555-0123' },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', contact: '555-0124' }
];

let doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology', contact: '555-0125', status: 'Available' },
    { id: 2, name: 'Dr. Michael Brown', specialization: 'Neurology', contact: '555-0126', status: 'Busy' }
];

let appointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', date: '2024-03-20', time: '10:00 AM', status: 'Scheduled' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Michael Brown', date: '2024-03-21', time: '2:30 PM', status: 'Completed' }
];

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        // Add active class to clicked link and corresponding section
        link.classList.add('active');
        const sectionId = link.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
    });
});

// Modal handling
function openModal(title, type) {
    modalTitle.textContent = title;
    modal.style.display = 'block';
    
    // Clear previous form
    recordForm.innerHTML = '';
    
    // Create form fields based on type
    switch(type) {
        case 'patient':
            createPatientForm();
            break;
        case 'doctor':
            createDoctorForm();
            break;
        case 'appointment':
            createAppointmentForm();
            break;
    }
}

function closeModalHandler() {
    modal.style.display = 'none';
}

closeModal.addEventListener('click', closeModalHandler);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalHandler();
    }
});

// Form creation functions
function createPatientForm() {
    const fields = [
        { name: 'name', label: 'Full Name', type: 'text' },
        { name: 'age', label: 'Age', type: 'number' },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
        { name: 'contact', label: 'Contact Number', type: 'tel' }
    ];
    
    createFormFields(fields);
    recordForm.addEventListener('submit', handlePatientSubmit);
}

function createDoctorForm() {
    const fields = [
        { name: 'name', label: 'Full Name', type: 'text' },
        { name: 'specialization', label: 'Specialization', type: 'text' },
        { name: 'contact', label: 'Contact Number', type: 'tel' },
        { name: 'status', label: 'Status', type: 'select', options: ['Available', 'Busy', 'On Leave'] }
    ];
    
    createFormFields(fields);
    recordForm.addEventListener('submit', handleDoctorSubmit);
}

function createAppointmentForm() {
    const fields = [
        { name: 'patient', label: 'Patient', type: 'select', options: patients.map(p => p.name) },
        { name: 'doctor', label: 'Doctor', type: 'select', options: doctors.map(d => d.name) },
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'time', label: 'Time', type: 'time' },
        { name: 'status', label: 'Status', type: 'select', options: ['Scheduled', 'Completed', 'Cancelled'] }
    ];
    
    createFormFields(fields);
    recordForm.addEventListener('submit', handleAppointmentSubmit);
}

function createFormFields(fields) {
    fields.forEach(field => {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.textContent = field.label;
        
        let input;
        if (field.type === 'select') {
            input = document.createElement('select');
            field.options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                input.appendChild(opt);
            });
        } else {
            input = document.createElement('input');
            input.type = field.type;
        }
        
        input.name = field.name;
        input.required = true;
        
        div.appendChild(label);
        div.appendChild(input);
        recordForm.appendChild(div);
    });
    
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn-primary';
    submitBtn.textContent = 'Submit';
    recordForm.appendChild(submitBtn);
}

// Form submission handlers
function handlePatientSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPatient = {
        id: patients.length + 1,
        name: formData.get('name'),
        age: formData.get('age'),
        gender: formData.get('gender'),
        contact: formData.get('contact')
    };
    
    patients.push(newPatient);
    updatePatientsTable();
    closeModalHandler();
}

function handleDoctorSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDoctor = {
        id: doctors.length + 1,
        name: formData.get('name'),
        specialization: formData.get('specialization'),
        contact: formData.get('contact'),
        status: formData.get('status')
    };
    
    doctors.push(newDoctor);
    updateDoctorsTable();
    closeModalHandler();
}

function handleAppointmentSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAppointment = {
        id: appointments.length + 1,
        patient: formData.get('patient'),
        doctor: formData.get('doctor'),
        date: formData.get('date'),
        time: formData.get('time'),
        status: formData.get('status')
    };
    
    appointments.push(newAppointment);
    updateAppointmentsTable();
    closeModalHandler();
}

// Table update functions
function updatePatientsTable() {
    const tbody = document.querySelector('#patientsTable tbody');
    tbody.innerHTML = '';
    
    patients.forEach(patient => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.contact}</td>
            <td>
                <button class="btn-primary" onclick="editRecord('patient', ${patient.id})">Edit</button>
                <button class="btn-primary" onclick="deleteRecord('patient', ${patient.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function updateDoctorsTable() {
    const tbody = document.querySelector('#doctorsTable tbody');
    tbody.innerHTML = '';
    
    doctors.forEach(doctor => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td>${doctor.contact}</td>
            <td>${doctor.status}</td>
            <td>
                <button class="btn-primary" onclick="editRecord('doctor', ${doctor.id})">Edit</button>
                <button class="btn-primary" onclick="deleteRecord('doctor', ${doctor.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function updateAppointmentsTable() {
    const tbody = document.querySelector('#appointmentsTable tbody');
    tbody.innerHTML = '';
    
    appointments.forEach(appointment => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${appointment.id}</td>
            <td>${appointment.patient}</td>
            <td>${appointment.doctor}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td>${appointment.status}</td>
            <td>
                <button class="btn-primary" onclick="editRecord('appointment', ${appointment.id})">Edit</button>
                <button class="btn-primary" onclick="deleteRecord('appointment', ${appointment.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Edit and Delete functions
function editRecord(type, id) {
    let record;
    switch(type) {
        case 'patient':
            record = patients.find(p => p.id === id);
            openModal('Edit Patient', 'patient');
            break;
        case 'doctor':
            record = doctors.find(d => d.id === id);
            openModal('Edit Doctor', 'doctor');
            break;
        case 'appointment':
            record = appointments.find(a => a.id === id);
            openModal('Edit Appointment', 'appointment');
            break;
    }
    
    // Fill form with record data
    if (record) {
        Object.keys(record).forEach(key => {
            const input = recordForm.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = record[key];
            }
        });
    }
}

function deleteRecord(type, id) {
    if (confirm('Are you sure you want to delete this record?')) {
        switch(type) {
            case 'patient':
                patients = patients.filter(p => p.id !== id);
                updatePatientsTable();
                break;
            case 'doctor':
                doctors = doctors.filter(d => d.id !== id);
                updateDoctorsTable();
                break;
            case 'appointment':
                appointments = appointments.filter(a => a.id !== id);
                updateAppointmentsTable();
                break;
        }
    }
}

// Event listeners for add buttons
addPatientBtn.addEventListener('click', () => openModal('Add New Patient', 'patient'));
addDoctorBtn.addEventListener('click', () => openModal('Add New Doctor', 'doctor'));
addAppointmentBtn.addEventListener('click', () => openModal('Add New Appointment', 'appointment'));

// Initialize tables
updatePatientsTable();
updateDoctorsTable();
updateAppointmentsTable(); 