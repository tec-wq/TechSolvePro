// Real-time System Status Dashboard
class StatusDashboard {
    constructor() {
        this.systems = {
            api: { name: 'API Services', status: 'operational', lastIncident: null },
            cloud: { name: 'Cloud Infrastructure', status: 'operational', lastIncident: null },
            network: { name: 'Network Operations', status: 'operational', lastIncident: null },
            security: { name: 'Security Systems', status: 'operational', lastIncident: null },
            monitoring: { name: 'Monitoring Tools', status: 'operational', lastIncident: null }
        };
        
        this.incidents = [];
        this.init();
    }

    init() {
        this.loadStatus();
        this.startRealTimeUpdates();
        this.setupEventListeners();
    }

    loadStatus() {
        // Simulate API call to get current status
        setTimeout(() => {
            this.updateDashboard();
        }, 500);
    }

    startRealTimeUpdates() {
        // Simulate real-time status updates
        setInterval(() => {
            this.simulateStatusChange();
        }, 30000); // Update every 30 seconds

        // Update uptime counters every second
        setInterval(() => {
            this.updateUptimeCounters();
        }, 1000);
    }

    simulateStatusChange() {
        const systems = Object.keys(this.systems);
        const randomSystem = systems[Math.floor(Math.random() * systems.length)];
        
        // 5% chance of status change for demo purposes
        if (Math.random() < 0.05) {
            const statuses = ['degraded', 'outage', 'maintenance'];
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            this.systems[randomSystem].status = newStatus;
            this.systems[randomSystem].lastIncident = new Date();
            
            this.addIncident({
                system: randomSystem,
                status: newStatus,
                timestamp: new Date(),
                description: this.getIncidentDescription(randomSystem, newStatus)
            });
            
            this.updateDashboard();
            this.showStatusAlert(randomSystem, newStatus);
        }
    }

    getIncidentDescription(system, status) {
        const descriptions = {
            degraded: `Performance issues detected in ${system}`,
            outage: `Service outage reported for ${system}`,
            maintenance: `Scheduled maintenance in progress for ${system}`
        };
        return descriptions[status] || `Status change for ${system}`;
    }

    addIncident(incident) {
        this.incidents.unshift(incident);
        if (this.incidents.length > 10) {
            this.incidents.pop();
        }
    }

    updateDashboard() {
        this.renderSystemStatus();
        this.renderIncidents();
        this.updateOverallStatus();
    }

    renderSystemStatus() {
        const container = document.getElementById('system-status-grid');
        if (!container) return;

        let html = '';
        Object.entries(this.systems).forEach(([key, system]) => {
            html += `
                <div class="status-item ${system.status}">
                    <div class="status-indicator"></div>
                    <div class="status-info">
                        <h4>${system.name}</h4>
                        <span class="status-text">${this.getStatusText(system.status)}</span>
                    </div>
                    <div class="status-time">
                        ${system.lastIncident ? this.formatTime(system.lastIncident) : 'No incidents'}
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    renderIncidents() {
        const container = document.getElementById('recent-incidents');
        if (!container) return;

        if (this.incidents.length === 0) {
            container.innerHTML = `
                <div class="no-incidents">
                    <span>✅ No recent incidents</span>
                    <p>All systems operating normally</p>
                </div>
            `;
            return;
        }

        let html = '';
        this.incidents.forEach(incident => {
            html += `
                <div class="incident-item ${incident.status}">
                    <div class="incident-icon">${this.getIncidentIcon(incident.status)}</div>
                    <div class="incident-details">
                        <h5>${this.systems[incident.system].name}</h5>
                        <p>${incident.description}</p>
                        <span class="incident-time">${this.formatTime(incident.timestamp)}</span>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    getIncidentIcon(status) {
        const icons = {
            operational: '✅',
            degraded: '⚠️',
            outage: '🚨',
            maintenance: '🔧'
        };
        return icons[status] || 'ℹ️';
    }

    getStatusText(status) {
        const texts = {
            operational: 'Operational',
            degraded: 'Degraded Performance',
            outage: 'Service Outage',
            maintenance: 'Under Maintenance'
        };
        return texts[status] || status;
    }

    formatTime(date) {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    updateOverallStatus() {
        const allOperational = Object.values(this.systems).every(sys => sys.status === 'operational');
        const overallStatus = allOperational ? 'operational' : 'issues';
        
        document.getElementById('overall-status').className = `status-badge ${overallStatus}`;
        document.getElementById('overall-status').textContent = 
            allOperational ? 'All Systems Operational' : 'Some Issues Reported';
    }

    updateUptimeCounters() {
        const uptimeElements = document.querySelectorAll('.uptime-counter');
        uptimeElements.forEach(element => {
            const startTime = parseInt(element.getAttribute('data-start'));
            const uptime = Date.now() - startTime;
            element.textContent = this.formatUptime(uptime);
        });
    }

    formatUptime(ms) {
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${days}d ${hours}h ${minutes}m`;
    }

    showStatusAlert(system, status) {
        if (status !== 'operational') {
            const alert = document.createElement('div');
            alert.className = `status-alert ${status}`;
            alert.innerHTML = `
                <div class="alert-content">
                    <span class="alert-icon">${this.getIncidentIcon(status)}</span>
                    <div>
                        <strong>${this.systems[system].name}</strong>
                        <p>Status changed to: ${this.getStatusText(status)}</p>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()">×</button>
                </div>
            `;
            
            document.body.appendChild(alert);
            
            // Auto-remove after 10 seconds
            setTimeout(() => {
                if (alert.parentElement) {
                    alert.remove();
                }
            }, 10000);
        }
    }

    setupEventListeners() {
        // Refresh button
        const refreshBtn = document.getElementById('refresh-status');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                refreshBtn.classList.add('refreshing');
                setTimeout(() => {
                    this.loadStatus();
                    refreshBtn.classList.remove('refreshing');
                }, 1000);
            });
        }
    }
}

// Initialize dashboard
const statusDashboard = new StatusDashboard();

// Enhanced Status Dashboard with Real Data
class RealStatusDashboard extends StatusDashboard {
    async loadStatus() {
        try {
            // Replace with your actual status API endpoint
            const response = await fetch('https://api.yourcompany.com/status');
            const data = await response.json();
            
            this.systems = data.systems;
            this.incidents = data.recentIncidents;
            this.updateDashboard();
            
        } catch (error) {
            console.error('Failed to load status data:', error);
            this.loadFallbackData();
        }
    }

    async startRealTimeUpdates() {
        // WebSocket connection for real-time updates
        this.setupWebSocketConnection();
        
        // Fallback to polling if WebSocket fails
        this.pollingInterval = setInterval(() => {
            this.loadStatus();
        }, 30000);
    }

    setupWebSocketConnection() {
        try {
            // Replace with your WebSocket endpoint
            this.socket = new WebSocket('wss://api.yourcompany.com/status/ws');
            
            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.handleRealTimeUpdate(data);
            };
            
            this.socket.onclose = () => {
                // Fallback to polling if WebSocket closes
                console.log('WebSocket closed, falling back to polling');
            };
            
        } catch (error) {
            console.error('WebSocket connection failed:', error);
        }
    }

    handleRealTimeUpdate(data) {
        if (data.type === 'status_change') {
            this.systems[data.system].status = data.status;
            this.systems[data.system].lastIncident = new Date();
            
            this.addIncident({
                system: data.system,
                status: data.status,
                timestamp: new Date(),
                description: data.message || `Status changed to ${data.status}`
            });
            
            this.updateDashboard();
            this.showStatusAlert(data.system, data.status);
        }
    }

    // Add monitoring for specific services
    async checkServiceHealth() {
        const services = [
            { name: 'Web Server', url: window.location.origin },
            { name: 'API', url: 'https://api.yourcompany.com/health' },
            { name: 'Database', url: 'https://api.yourcompany.com/db/health' }
        ];

        for (const service of services) {
            try {
                const startTime = Date.now();
                const response = await fetch(service.url, { 
                    method: 'HEAD',
                    cache: 'no-cache'
                });
                const responseTime = Date.now() - startTime;
                
                this.updateServiceHealth(service.name, response.ok, responseTime);
            } catch (error) {
                this.updateServiceHealth(service.name, false, 0);
            }
        }
    }

    updateServiceHealth(serviceName, isHealthy, responseTime) {
        // Update health metrics in dashboard
        const healthElement = document.getElementById(`health-${serviceName.toLowerCase().replace(' ', '-')}`);
        if (healthElement) {
            healthElement.textContent = isHealthy ? 'Healthy' : 'Unhealthy';
            healthElement.className = `health-status ${isHealthy ? 'healthy' : 'unhealthy'}`;
        }
    }
}
