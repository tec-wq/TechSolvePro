// Live Chat Integration with Real Support System
class ProfessionalLiveChat {
    constructor() {
        this.isConnected = false;
        this.socket = null;
        this.supportAgent = null;
        this.init();
    }

    init() {
        this.setupChatInterface();
        this.connectToSupportSystem();
        this.setupFileSharing();
        this.setupScreenSharing();
    }

    async connectToSupportSystem() {
        try {
            // Integration with popular support systems
            await this.connectZendesk();
            // await this.connectIntercom();
            // await this.connectFreshdesk();
            
        } catch (error) {
            console.error('Failed to connect to support system:', error);
            this.setupFallbackChat();
        }
    }

    async connectZendesk() {
        // Zendesk Web Widget integration
        if (typeof window !== 'undefined') {
            window.zESettings = {
                webWidget: {
                    chat: {
                        departments: {
                            enabled: ['IT Support', 'Sales', 'Technical']
                        },
                        suppress: false
                    }
                }
            };

            // Load Zendesk script
            await this.loadScript('https://static.zdassets.com/ekr/snippet.js?key=YOUR_ZENDESK_KEY');
            
            this.isConnected = true;
            this.setupZendeskEvents();
        }
    }

    setupZendeskEvents() {
        // Handle Zendesk events
        window.zE('webWidget:on', 'chat:connected', (data) => {
            this.supportAgent = data.agent;
            this.showAgentInfo(data.agent);
        });

        window.zE('webWidget:on', 'chat:ended', () => {
            this.supportAgent = null;
            this.showChatEnded();
        });
    }

    setupFallbackChat() {
        // Custom chat implementation as fallback
        this.setupCustomChatServer();
    }

    async setupCustomChatServer() {
        try {
            // Connect to your custom chat server
            this.socket = new WebSocket('wss://your-chat-server.com/ws');
            
            this.socket.onopen = () => {
                this.isConnected = true;
                this.showConnectionStatus('Connected to support team');
            };
            
            this.socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                this.handleSupportMessage(message);
            };
            
            this.socket.onclose = () => {
                this.isConnected = false;
                this.showConnectionStatus('Disconnected - reconnecting...');
                setTimeout(() => this.setupCustomChatServer(), 5000);
            };
            
        } catch (error) {
            console.error('Custom chat connection failed:', error);
        }
    }

    handleSupportMessage(message) {
        switch (message.type) {
            case 'agent_joined':
                this.supportAgent = message.agent;
                this.showAgentInfo(message.agent);
                break;
            case 'message':
                this.addMessage(message.text, 'agent');
                break;
            case 'file':
                this.showFileMessage(message.file);
                break;
            case 'typing':
                this.showTypingIndicator(message.agent);
                break;
        }
    }

    setupFileSharing() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.style.display = 'none';
        fileInput.accept = '.jpg,.png,.pdf,.doc,.docx,.txt';
        
        fileInput.addEventListener('change', (event) => {
            Array.from(event.target.files).forEach(file => {
                this.uploadFile(file);
            });
        });

        // Add file upload button to chat
        const chatInput = document.querySelector('.chat-input');
        if (chatInput) {
            const fileButton = document.createElement('button');
            fileButton.textContent = '📎';
            fileButton.type = 'button';
            fileButton.addEventListener('click', () => fileInput.click());
            chatInput.appendChild(fileButton);
        }
    }

    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload-chat-file', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const fileUrl = await response.json();
                this.sendFileMessage(file.name, fileUrl);
            }
        } catch (error) {
            console.error('File upload failed:', error);
        }
    }

    setupScreenSharing() {
        // Screen sharing for technical support
        const screenShareBtn = document.createElement('button');
        screenShareBtn.textContent = '🖥️';
        screenShareBtn.title = 'Share Screen';
        screenShareBtn.addEventListener('click', this.startScreenShare.bind(this));

        const chatInput = document.querySelector('.chat-input');
        if (chatInput) {
            chatInput.appendChild(screenShareBtn);
        }
    }

    async startScreenShare() {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });

            this.showScreenShareNotification();
            this.sendScreenShareRequest(stream);
            
        } catch (error) {
            console.error('Screen sharing failed:', error);
        }
    }

    // Utility methods
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    showAgentInfo(agent) {
        const chatHeader = document.querySelector('.chat-header');
        if (chatHeader) {
            const agentInfo = document.createElement('div');
            agentInfo.className = 'agent-info';
            agentInfo.innerHTML = `
                <img src="${agent.avatar}" alt="${agent.name}" class="agent-avatar">
                <span>Connected to ${agent.name}</span>
            `;
            chatHeader.appendChild(agentInfo);
        }
    }
}

// Initialize professional chat
const professionalChat = new ProfessionalLiveChat();