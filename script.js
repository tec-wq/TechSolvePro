// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar && window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else if (navbar) {
        navbar.style.backgroundColor = 'white';
        navbar.style.backdropFilter = 'none';
    }
});

// EmailJS Contact Form - Complete Working Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 EmailJS initialized with public key: 89giRdd2GzU0cKJ19');
    setupContactForm();
});

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.log('ℹ️ No contact form found on this page');
        return;
    }
    
    console.log('✅ Contact form found, setting up event listener');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('📝 Form submission started');
        
        // Validate form first
        if (!validateForm()) {
            console.log('❌ Form validation failed');
            return;
        }
        
        // Get form data
        const formData = {
            from_name: document.getElementById('name').value.trim(),
            from_email: document.getElementById('email').value.trim(),
            from_phone: document.getElementById('phone').value.trim() || 'Not provided',
            service: document.getElementById('service').value,
            urgency: document.getElementById('urgency').value || 'Not specified',
            message: document.getElementById('message').value.trim(),
            submitted_at: new Date().toLocaleString(),
            page_url: window.location.href
        };
        
        console.log('📨 Form data prepared:', formData);
        
        // Send email
        await sendContactEmail(formData);
    });
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const service = document.getElementById('service').value;
    
    // Clear previous errors
    clearErrors();
    
    let isValid = true;
    
    if (!name) {
        showError('name', 'Please enter your name');
        isValid = false;
    }
    
    if (!email) {
        showError('email', 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!service) {
        showError('service', 'Please select a service');
        isValid = false;
    }
    
    if (!message) {
        showError('message', 'Please enter your message');
        isValid = false;
    }
    
    if (isValid) {
        console.log('✅ Form validation passed');
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function sendContactEmail(formData) {
    const submitBtn = document.querySelector('#contact-form .submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    console.log('🔄 Starting email send process...');
    
    try {
        // Replace these with your actual Service ID and Template ID
        const SERVICE_ID = 'service_q4jadq8';      // You need to get this from EmailJS dashboard
        const TEMPLATE_ID = 'template_uDc2miw';    // You need to get this from EmailJS dashboard
        
        console.log('📧 Sending email with:', { SERVICE_ID, TEMPLATE_ID, formData });
        
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData);
        
        console.log('✅ Email sent successfully!', response);
        showFormMessage('🎉 Thank you! Your message has been sent successfully. We will contact you within 24 hours.', 'success');
        document.getElementById('contact-form').reset();
        
    } catch (error) {
        console.error('❌ Email failed to send:', error);
        
        let errorMessage = 'Sorry, there was an error sending your message. ';
        
        if (error.text && error.text.includes('Service not found')) {
            errorMessage += 'Please check your Service ID.';
        } else if (error.text && error.text.includes('Template not found')) {
            errorMessage += 'Please check your Template ID.';
        } else {
            errorMessage += 'Please try again or email us directly at info@techsolvepro.com';
        }
        
        showFormMessage(errorMessage, 'error');
        
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        console.log('🔄 Submit button reset');
    }
}

// Helper functions
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.style.borderColor = '#ef4444';
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = '#ef4444';
        error.style.fontSize = '0.875rem';
        error.style.marginTop = '0.25rem';
        error.textContent = message;
        field.parentNode.appendChild(error);
    }
}

function clearErrors() {
    // Remove error borders
    const formFields = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select');
    formFields.forEach(field => {
        field.style.borderColor = '#e2e8f0';
    });
    
    // Remove error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        console.log(`📢 Form message: ${type} - ${message}`);
        
        // Auto-hide success messages after 8 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
                console.log('✅ Success message hidden');
            }, 8000);
        }
    }
}

// Test function to verify EmailJS is working
function testEmailJS() {
    console.log('🧪 Testing EmailJS initialization...');
    console.log('Public Key: 89giRdd2GzU0cKJ19');
    console.log('EmailJS object:', typeof emailjs !== 'undefined' ? '✅ Loaded' : '❌ Not loaded');
    
    if (typeof emailjs !== 'undefined') {
        console.log('✅ EmailJS is ready to use!');
    } else {
        console.log('❌ EmailJS not loaded - check script tags');
    }
}

// Run test when page loads
document.addEventListener('DOMContentLoaded', testEmailJS);

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .stat, .team-member');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Live Chat Functionality
const chatToggle = document.getElementById('chat-toggle');
const chatWidget = document.getElementById('chat-widget');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendMessage = document.getElementById('send-message');
const chatMessages = document.getElementById('chat-messages');

if (chatToggle && chatWidget) {
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
    });

    closeChat.addEventListener('click', () => {
        chatWidget.classList.remove('active');
    });

    sendMessage.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
}

function sendChatMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(message) {
    const responses = {
        'hello': 'Hello! How can I assist you with your IT needs today?',
        'hi': 'Hi there! What can I help you with?',
        'price': 'Our pricing depends on your specific needs. Would you like a custom quote?',
        'service': 'We offer Cybersecurity, Cloud Solutions, IT Consulting, and more. Which service interests you?',
        'contact': 'You can reach us at info@techsolvepro.com or call (555) 123-TECH',
        'support': 'Our support team is available 24/7. What issue are you experiencing?',
        'default': 'Thank you for your message! Our team will get back to you shortly. In the meantime, would you like to schedule a consultation?'
    };

    const lowerMessage = message.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    return responses.default;
}

// Add this to your script.js for better email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Update your form submission to include validation
if (!isValidEmail(formData.from_email)) {
    showFormMessage('Please enter a valid email address.', 'error');
    return;
}