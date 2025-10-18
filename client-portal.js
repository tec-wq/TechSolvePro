// Enhanced Client Portal with Real Project Data
class ClientPortal {
    constructor() {
        this.currentUser = null;
        this.projects = [];
        this.supportTickets = [];
        this.invoices = [];
        this.demoData = this.generateDemoData();
        this.init();
    }

    init() {
        this.checkAuthentication();
        this.loadUserProjects();
        this.setupEventListeners();
    }

    generateDemoData() {
        return {
            projects: [
                {
                    id: 1,
                    name: 'Network Infrastructure Upgrade',
                    status: 'in-progress',
                    progress: 75,
                    deadline: '2024-02-15',
                    budget: '$45,000',
                    manager: 'Sarah Johnson',
                    tasks: [
                        { id: 1, name: 'Hardware Installation', status: 'completed', dueDate: '2024-01-20' },
                        { id: 2, name: 'Configuration & Testing', status: 'in-progress', dueDate: '2024-02-10' },
                        { id: 3, name: 'Team Training', status: 'pending', dueDate: '2024-02-14' }
                    ],
                    documents: [
                        { name: 'Network Diagram.pdf', size: '2.4 MB', uploaded: '2024-01-15' },
                        { name: 'Implementation Plan.docx', size: '1.1 MB', uploaded: '2024-01-18' }
                    ],
                    milestones: [
                        { name: 'Planning Phase', completed: true, date: '2024-01-10' },
                        { name: 'Hardware Setup', completed: true, date: '2024-01-25' },
                        { name: 'Configuration', completed: false, date: '2024-02-10' },
                        { name: 'Final Testing', completed: false, date: '2024-02-14' }
                    ]
                },
                {
                    id: 2,
                    name: 'Cloud Migration - Phase 2',
                    status: 'planning',
                    progress: 25,
                    deadline: '2024-03-01',
                    budget: '$75,000',
                    manager: 'Michael Chen',
                    tasks: [
                        { id: 1, name: 'Requirements Analysis', status: 'completed', dueDate: '2024-01-30' },
                        { id: 2, name: 'Architecture Design', status: 'in-progress', dueDate: '2024-02-15' },
                        { id: 3, name: 'Security Assessment', status: 'pending', dueDate: '2024-02-20' }
                    ],
                    documents: [
                        { name: 'Migration Strategy.pdf', size: '3.2 MB', uploaded: '2024-01-22' },
                        { name: 'Cost Analysis.xlsx', size: '0.8 MB', uploaded: '2024-01-25' }
                    ],
                    milestones: [
                        { name: 'Discovery', completed: true, date: '2024-01-30' },
                        { name: 'Design Approval', completed: false, date: '2024-02-15' },
                        { name: 'Migration Start', completed: false, date: '2024-02-25' }
                    ]
                },
                {
                    id: 3,
                    name: 'Security Audit & Compliance',
                    status: 'completed',
                    progress: 100,
                    deadline: '2024-01-10',
                    budget: '$25,000',
                    manager: 'David Wilson',
                    tasks: [
                        { id: 1, name: 'Vulnerability Assessment', status: 'completed', dueDate: '2024-01-05' },
                        { id: 2, name: 'Compliance Report', status: 'completed', dueDate: '2024-01-08' }
                    ],
                    documents: [
                        { name: 'Security Audit Report.pdf', size: '4.1 MB', uploaded: '2024-01-09' },
                        { name: 'Compliance Certificate.pdf', size: '1.2 MB', uploaded: '2024-01-10' }
                    ],
                    milestones: [
                        { name: 'Initial Assessment', completed: true, date: '2024-01-03' },
                        { name: 'Vulnerability Scan', completed: true, date: '2024-01-05' },
                        { name: 'Report Delivery', completed: true, date: '2024-01-09' },
                        { name: 'Project Completion', completed: true, date: '2024-01-10' }
                    ]
                }
            ],
            supportTickets: [
                {
                    id: 'TKT-2024-001',
                    subject: 'Email Server Connectivity Issues',
                    status: 'open',
                    priority: 'high',
                    created: '2024-01-28',
                    lastUpdate: '2024-01-29',
                    assignedTo: 'Support Team',
                    description: 'Intermittent connectivity issues with Exchange server'
                },
                {
                    id: 'TKT-2024-002', 
                    subject: 'Software License Renewal',
                    status: 'resolved',
                    priority: 'medium',
                    created: '2024-01-25',
                    resolved: '2024-01-26',
                    assignedTo: 'David Wilson',
                    description: 'Annual license renewal for security software'
                },
                {
                    id: 'TKT-2024-003',
                    subject: 'Network Performance Optimization',
                    status: 'in-progress',
                    priority: 'medium',
                    created: '2024-01-30',
                    lastUpdate: '2024-01-31',
                    assignedTo: 'Network Team',
                    description: 'Optimize network performance for remote teams'
                }
            ],
            invoices: [
                {
                    id: 'INV-2024-001',
                    amount: '$12,500',
                    dueDate: '2024-02-15',
                    status: 'paid',
                    project: 'Network Infrastructure Upgrade',
                    datePaid: '2024-01-20'
                },
                {
                    id: 'INV-2024-002',
                    amount: '$8,750', 
                    dueDate: '2024-03-01',
                    status: 'pending',
                    project: 'Cloud Migration - Phase 2'
                },
                {
                    id: 'INV-2024-003',
                    amount: '$25,000',
                    dueDate: '2024-01-31',
                    status: 'paid',
                    project: 'Security Audit & Compliance',
                    datePaid: '2024-01-15'
                }
            ]
        };
    }

    checkAuthentication() {
        // Simulate user session check
        const userData = localStorage.getItem('clientPortalUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.showAuthenticatedUI();
        } else {
            this.showLoginUI();
        }
    }

    showLoginUI() {
        const portalContainer = document.getElementById('client-portal');
        if (!portalContainer) return;

        portalContainer.innerHTML = `
            <div class="portal-login">
                <div class="login-header">
                    <h3>Client Portal</h3>
                    <p>Access your projects and support tickets</p>
                </div>
                <form id="login-form" class="login-form">
                    <div class="form-group">
                        <input type="email" id="login-email" placeholder="Email Address" required>
                    </div>
                    <div class="form-group">
                        <input type="password" id="login-password" placeholder="Password" required>
                    </div>
                    <button type="submit" class="submit-btn">Sign In</button>
                </form>
                <div class="demo-credentials">
                    <p><strong>Demo Access:</strong> Use any email and password</p>
                </div>
                <div class="login-footer">
                    <p>Don't have an account? <a href="contact.html">Contact us</a></p>
                </div>
            </div>
        `;

        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }

    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Simulate API authentication
        setTimeout(() => {
            if (email && password) {
                this.currentUser = {
                    id: 1,
                    name: 'Demo Client',
                    email: email,
                    company: 'Demo Company Inc.',
                    lastLogin: new Date().toLocaleDateString()
                };
                
                localStorage.setItem('clientPortalUser', JSON.stringify(this.currentUser));
                this.showAuthenticatedUI();
                this.loadUserProjects();
            }
        }, 1000);
    }

    showAuthenticatedUI() {
        const portalContainer = document.getElementById('client-portal');
        if (!portalContainer) return;

        portalContainer.innerHTML = `
            <div class="portal-dashboard">
                <div class="portal-header">
                    <div class="user-info">
                        <h3>Welcome back, ${this.currentUser.name}</h3>
                        <p>${this.currentUser.company} • Last login: ${this.currentUser.lastLogin || 'First time'}</p>
                    </div>
                    <button onclick="clientPortal.logout()" class="logout-btn">Sign Out</button>
                </div>
                
                <div class="portal-stats">
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-info">
                            <span class="stat-number">${this.projects.length}</span>
                            <span class="stat-label">Active Projects</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-info">
                            <span class="stat-number">${this.getCompletedProjects()}</span>
                            <span class="stat-label">Completed</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🎫</div>
                        <div class="stat-info">
                            <span class="stat-number">${this.supportTickets.length}</span>
                            <span class="stat-label">Support Tickets</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">💰</div>
                        <div class="stat-info">
                            <span class="stat-number">${this.getPendingInvoices()}</span>
                            <span class="stat-label">Pending Invoices</span>
                        </div>
                    </div>
                </div>
                
                <div class="portal-tabs">
                    <button class="tab-button active" onclick="clientPortal.switchTab('projects')">Projects</button>
                    <button class="tab-button" onclick="clientPortal.switchTab('tickets')">Support Tickets</button>
                    <button class="tab-button" onclick="clientPortal.switchTab('invoices')">Invoices</button>
                    <button class="tab-button" onclick="clientPortal.switchTab('documents')">Documents</button>
                </div>
                
                <div id="portal-content" class="portal-content">
                    <!-- Content will be loaded based on active tab -->
                </div>
            </div>
        `;

        this.switchTab('projects');
    }

    switchTab(tabName) {
        // Update active tab
        const buttons = document.querySelectorAll('.tab-button');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Find the clicked button and activate it
        event.target.classList.add('active');
        
        // Load tab content
        const contentContainer = document.getElementById('portal-content');
        
        switch(tabName) {
            case 'projects':
                contentContainer.innerHTML = this.renderProjectsTab();
                break;
            case 'tickets':
                contentContainer.innerHTML = this.renderTicketsTab();
                break;
            case 'invoices':
                contentContainer.innerHTML = this.renderInvoicesTab();
                break;
            case 'documents':
                contentContainer.innerHTML = this.renderDocumentsTab();
                break;
        }
    }

    loadUserProjects() {
        // Use demo data for presentation
        this.projects = this.demoData.projects;
        this.supportTickets = this.demoData.supportTickets;
        this.invoices = this.demoData.invoices;
    }

    renderProjectsTab() {
        return `
            <div class="projects-section">
                <div class="section-header">
                    <h4>Your Projects</h4>
                    <div class="section-actions">
                        <button onclick="clientPortal.createNewProject()" class="btn-primary">+ New Project</button>
                        <button onclick="clientPortal.exportProjects()" class="btn-secondary">Export Report</button>
                    </div>
                </div>
                <div id="projects-list" class="projects-list">
                    ${this.projects.map(project => this.renderProjectCard(project)).join('')}
                </div>
            </div>
        `;
    }

    renderProjectCard(project) {
        const completedTasks = project.tasks.filter(task => task.status === 'completed').length;
        const totalTasks = project.tasks.length;
        
        return `
            <div class="project-card ${project.status}">
                <div class="project-header">
                    <div>
                        <h5>${project.name}</h5>
                        <div class="project-meta">
                            <span>👤 ${project.manager}</span>
                            <span>💰 ${project.budget}</span>
                            <span>📅 ${new Date(project.deadline).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <span class="project-status ${project.status}">${this.formatStatus(project.status)}</span>
                </div>
                
                <div class="project-progress">
                    <div class="progress-info">
                        <span>Progress: ${project.progress}%</span>
                        <span>Tasks: ${completedTasks}/${totalTasks}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                </div>
                
                <div class="project-milestones">
                    <strong>Recent Milestones:</strong>
                    <div class="milestones-list">
                        ${project.milestones.slice(0, 3).map(milestone => `
                            <div class="milestone ${milestone.completed ? 'completed' : 'upcoming'}">
                                <span class="milestone-dot"></span>
                                <span class="milestone-text">${milestone.name}</span>
                                <span class="milestone-date">${milestone.date}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="project-actions">
                    <button onclick="clientPortal.viewProjectDetails(${project.id})" class="btn-secondary">
                        <span>📋</span> Details
                    </button>
                    <button onclick="clientPortal.contactPM(${project.id})" class="btn-primary">
                        <span>💬</span> Contact ${project.manager.split(' ')[0]}
                    </button>
                </div>
            </div>
        `;
    }

    renderTicketsTab() {
        return `
            <div class="tickets-section">
                <div class="section-header">
                    <h4>Support Tickets</h4>
                    <button onclick="clientPortal.createSupportTicket()" class="btn-primary">+ New Ticket</button>
                </div>
                <div class="tickets-list">
                    ${this.supportTickets.map(ticket => `
                        <div class="ticket-card ${ticket.status}">
                            <div class="ticket-header">
                                <div class="ticket-title">
                                    <h5>${ticket.subject}</h5>
                                    <span class="ticket-id">${ticket.id}</span>
                                </div>
                                <div class="ticket-status">
                                    <span class="ticket-priority ${ticket.priority}">${ticket.priority}</span>
                                    <span class="ticket-state">${ticket.status}</span>
                                </div>
                            </div>
                            <div class="ticket-details">
                                <p>${ticket.description}</p>
                                <div class="ticket-meta">
                                    <span>🕒 Created: ${ticket.created}</span>
                                    <span>👤 Assigned: ${ticket.assignedTo}</span>
                                    ${ticket.resolved ? `<span>✅ Resolved: ${ticket.resolved}</span>` : ''}
                                </div>
                            </div>
                            <div class="ticket-actions">
                                <button onclick="clientPortal.viewTicket('${ticket.id}')" class="btn-secondary">View Details</button>
                                <button onclick="clientPortal.updateTicket('${ticket.id}')" class="btn-primary">Update</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderInvoicesTab() {
        const totalRevenue = this.invoices.filter(inv => inv.status === 'paid')
                                         .reduce((sum, inv) => sum + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0);
        
        return `
            <div class="invoices-section">
                <div class="section-header">
                    <h4>Invoices & Billing</h4>
                    <div class="revenue-display">
                        <span>Total Paid: <strong>$${totalRevenue.toLocaleString()}</strong></span>
                    </div>
                </div>
                <div class="invoices-list">
                    ${this.invoices.map(invoice => `
                        <div class="invoice-card ${invoice.status}">
                            <div class="invoice-header">
                                <div>
                                    <h5>${invoice.id}</h5>
                                    <span class="invoice-project">${invoice.project}</span>
                                </div>
                                <div class="invoice-amount">
                                    <strong>${invoice.amount}</strong>
                                    <span class="invoice-status ${invoice.status}">${invoice.status}</span>
                                </div>
                            </div>
                            <div class="invoice-details">
                                <span>Due: ${invoice.dueDate}</span>
                                ${invoice.datePaid ? `<span>Paid: ${invoice.datePaid}</span>` : ''}
                            </div>
                            <div class="invoice-actions">
                                <button onclick="clientPortal.downloadInvoice('${invoice.id}')" class="btn-secondary">Download</button>
                                ${invoice.status === 'pending' ? 
                                    `<button onclick="clientPortal.payInvoice('${invoice.id}')" class="btn-primary">Pay Now</button>` : 
                                    `<button class="btn-disabled">Paid</button>`
                                }
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderDocumentsTab() {
        const allDocuments = this.projects.flatMap(project => 
            project.documents.map(doc => ({
                ...doc,
                project: project.name
            }))
        );

        return `
            <div class="documents-section">
                <div class="section-header">
                    <h4>Project Documents</h4>
                    <button onclick="clientPortal.uploadDocument()" class="btn-primary">+ Upload Document</button>
                </div>
                <div class="documents-list">
                    ${allDocuments.map(doc => `
                        <div class="document-card">
                            <div class="document-icon">📄</div>
                            <div class="document-info">
                                <h5>${doc.name}</h5>
                                <div class="document-meta">
                                    <span>Project: ${doc.project}</span>                                   
                                    <span>Size: ${doc.size}</span>
                                    <span>Uploaded: ${doc.uploaded}</span>
                                </div>
                            </div>
                            <div class="document-actions">
                                <button onclick="clientPortal.downloadDocument('${doc.name}')" class="btn-primary">Download</button>
                                <button onclick="clientPortal.previewDocument('${doc.name}')" class="btn-secondary">Preview</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Utility Methods
    formatStatus(status) {
        const statusMap = {
            'in-progress': 'In Progress',
            'planning': 'Planning',
            'completed': 'Completed'
        };
        return statusMap[status] || status;
    }

    getCompletedProjects() {
        return this.projects.filter(p => p.status === 'completed').length;
    }

    getPendingInvoices() {
        return this.invoices.filter(invoice => invoice.status === 'pending').length;
    }

    getPendingTasks() {
        return this.projects.reduce((total, project) => total + project.tasks.length, 0);
    }

    // Action Methods
    logout() {
        localStorage.removeItem('clientPortalUser');
        this.currentUser = null;
        this.showLoginUI();
    }

    createSupportTicket() {
        alert('Opening support ticket creation form...');
        // In real implementation, open a modal form
    }

    createNewProject() {
        alert('Starting new project setup...');
    }

    viewProjectDetails(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
            alert(`Project Details:\n\nName: ${project.name}\nStatus: ${project.status}\nProgress: ${project.progress}%\nManager: ${project.manager}\nBudget: ${project.budget}`);
        }
    }

    contactPM(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
            alert(`Contacting ${project.manager} about "${project.name}"...\n\nEmail: ${project.manager.toLowerCase().replace(' ', '.')}@techsolvepro.com\nPhone: (555) 123-4567`);
        }
    }

    viewTicket(ticketId) {
        const ticket = this.supportTickets.find(t => t.id === ticketId);
        if (ticket) {
            alert(`Ticket Details:\n\nID: ${ticket.id}\nSubject: ${ticket.subject}\nStatus: ${ticket.status}\nPriority: ${ticket.priority}\nDescription: ${ticket.description}`);
        }
    }

    downloadInvoice(invoiceId) {
        alert(`Downloading invoice: ${invoiceId}`);
    }

    downloadDocument(documentName) {
        alert(`Downloading document: ${documentName}`);
    }

    exportProjects() {
        alert('Exporting project report...');
    }

    uploadDocument() {
        alert('Opening document upload...');
    }

    setupEventListeners() {
        // Additional event listeners can be added here
        console.log('Client Portal initialized successfully');
    }
}

// Initialize client portal - ONLY ONCE!
const clientPortal = new ClientPortal();