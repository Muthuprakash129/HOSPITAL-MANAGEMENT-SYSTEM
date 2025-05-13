// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links li');
    const mainContent = document.querySelector('.main-content');
    const headerTitle = document.querySelector('header h1');

    // Sample data for different sections
    const sectionData = {
        dashboard: {
            title: 'Dashboard',
            content: `
                <div class="stats-container">
                    <div class="stat-card">
                        <i class="fas fa-user-injured"></i>
                        <div class="stat-info">
                            <h3>Total Patients</h3>
                            <p>1,234</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-md"></i>
                        <div class="stat-info">
                            <h3>Doctors</h3>
                            <p>45</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-calendar-check"></i>
                        <div class="stat-info">
                            <h3>Appointments</h3>
                            <p>89</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-hospital-alt"></i>
                        <div class="stat-info">
                            <h3>Departments</h3>
                            <p>12</p>
                        </div>
                    </div>
                </div>
                <div class="recent-activity">
                    <h2>Recent Activity</h2>
                    <div class="activity-list">
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-user-plus"></i>
                            </div>
                            <div class="activity-details">
                                <h4>New Patient Registration</h4>
                                <p>John Doe registered as a new patient</p>
                                <span class="time">2 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        patients: {
            title: 'Patients',
            content: `
                <div class="section-header">
                    <h2>Patient Management</h2>
                    <button class="add-btn"><i class="fas fa-plus"></i> Add New Patient</button>
                </div>
                <div class="search-bar">
                    <input type="text" placeholder="Search patients...">
                    <i class="fas fa-search"></i>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Contact</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>P001</td>
                                <td>John Doe</td>
                                <td>45</td>
                                <td>Male</td>
                                <td>+1 234-567-8900</td>
                                <td>
                                    <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                                    <button class="action-btn delete"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        doctors: {
            title: 'Doctors',
            content: `
                <div class="section-header">
                    <h2>Doctor Management</h2>
                    <button class="add-btn"><i class="fas fa-plus"></i> Add New Doctor</button>
                </div>
                <div class="search-bar">
                    <input type="text" placeholder="Search doctors...">
                    <i class="fas fa-search"></i>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Specialization</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>D001</td>
                                <td>Dr. Smith</td>
                                <td>Cardiology</td>
                                <td>+1 234-567-8901</td>
                                <td><span class="status active">Active</span></td>
                                <td>
                                    <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                                    <button class="action-btn delete"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        appointments: {
            title: 'Appointments',
            content: `
                <div class="section-header">
                    <h2>Appointment Management</h2>
                    <button class="add-btn"><i class="fas fa-plus"></i> Schedule Appointment</button>
                </div>
                <div class="search-bar">
                    <input type="text" placeholder="Search appointments...">
                    <i class="fas fa-search"></i>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Patient</th>
                                <th>Doctor</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>A001</td>
                                <td>John Doe</td>
                                <td>Dr. Smith</td>
                                <td>2024-03-20</td>
                                <td>10:00 AM</td>
                                <td><span class="status scheduled">Scheduled</span></td>
                                <td>
                                    <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                                    <button class="action-btn delete"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
        },
        departments: {
            title: 'Departments',
            content: `
                <div class="section-header">
                    <h2>Department Management</h2>
                    <button class="add-btn"><i class="fas fa-plus"></i> Add New Department</button>
                </div>
                <div class="search-bar">
                    <input type="text" placeholder="Search departments...">
                    <i class="fas fa-search"></i>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Head</th>
                                <th>Staff Count</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>DPT001</td>
                                <td>Cardiology</td>
                                <td>Dr. Smith</td>
                                <td>15</td>
                                <td><span class="status active">Active</span></td>
                                <td>
                                    <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                                    <button class="action-btn delete"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
        }
    };

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Get the page name from data-page attribute
            const page = this.getAttribute('data-page');

            // Update header title
            headerTitle.textContent = sectionData[page].title;

            // Update main content
            mainContent.querySelector('.dashboard-content').innerHTML = sectionData[page].content;
        });
    });

    // Add event listeners for action buttons
    document.addEventListener('click', function (e) {
        if (e.target.closest('.add-btn')) {
            // Handle add button click
            alert('Add new item functionality will be implemented here');
        } else if (e.target.closest('.action-btn.edit')) {
            // Handle edit button click
            alert('Edit functionality will be implemented here');
        } else if (e.target.closest('.action-btn.delete')) {
            // Handle delete button click
            if (confirm('Are you sure you want to delete this item?')) {
                alert('Delete functionality will be implemented here');
            }
        }
    });

    // Add search functionality
    document.addEventListener('input', function (e) {
        if (e.target.matches('.search-bar input')) {
            // Implement search functionality
            console.log('Searching for:', e.target.value);
        }
    });
}); 