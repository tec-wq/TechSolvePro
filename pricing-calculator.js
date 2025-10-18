// Pricing Calculator Functionality
class PricingCalculator {
    constructor() {
        this.prices = {
            cybersecurity: { startup: 500, small: 1200, medium: 3000, large: 8000 },
            cloud: { startup: 300, small: 800, medium: 2000, large: 5000 },
            consulting: { startup: 200, small: 500, medium: 1200, large: 3000 },
            network: { startup: 400, small: 900, medium: 2200, large: 6000 },
            software: { startup: 1000, small: 2500, medium: 6000, large: 15000 },
            support: { startup: 150, small: 400, medium: 1000, large: 2500 }
        };

        this.serviceLevelMultipliers = {
            basic: 1,
            professional: 1.5,
            enterprise: 2
        };

        this.featurePrices = {
            '24/7-support': 200,
            'training': 150,
            'reporting': 100,
            'integration': 300
        };

        this.init();
    }

    init() {
        this.updateCalculation();
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('service-type').addEventListener('change', () => this.updateCalculation());
        document.getElementById('company-size').addEventListener('change', () => this.updateCalculation());
        document.getElementById('service-level').addEventListener('change', () => this.updateCalculation());
        document.getElementById('duration').addEventListener('input', (e) => {
            document.getElementById('duration-value').textContent = `${e.target.value} months`;
            this.updateCalculation();
        });
        
        document.querySelectorAll('input[name="features"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateCalculation());
        });
    }

    updateCalculation() {
        const service = document.getElementById('service-type').value;
        const size = document.getElementById('company-size').value;
        const level = document.getElementById('service-level').value;
        const duration = parseInt(document.getElementById('duration').value);

        // Calculate base price
        let basePrice = this.prices[service][size] * this.serviceLevelMultipliers[level];
        
        // Calculate features price
        let featuresPrice = 0;
        document.querySelectorAll('input[name="features"]:checked').forEach(checkbox => {
            featuresPrice += this.featurePrices[checkbox.value];
        });

        // Calculate totals
        const monthlyTotal = basePrice + featuresPrice;
        const annualTotal = monthlyTotal * 12;

        // Update display
        document.getElementById('base-price').textContent = `$${basePrice.toLocaleString()}`;
        document.getElementById('features-price').textContent = `$${featuresPrice.toLocaleString()}`;
        document.getElementById('monthly-total').textContent = `$${monthlyTotal.toLocaleString()}`;
        document.getElementById('annual-total').textContent = `$${annualTotal.toLocaleString()}`;
    }
}

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('service-type')) {
        new PricingCalculator();
    }
});

function saveEstimate() {
    const estimate = {
        service: document.getElementById('service-type').value,
        size: document.getElementById('company-size').value,
        level: document.getElementById('service-level').value,
        duration: document.getElementById('duration').value,
        monthlyTotal: document.getElementById('monthly-total').textContent,
        annualTotal: document.getElementById('annual-total').textContent
    };
    
    localStorage.setItem('savedEstimate', JSON.stringify(estimate));
    alert('Estimate saved! You can retrieve it later.');
}

function contactSales() {
    const estimate = {
        monthlyTotal: document.getElementById('monthly-total').textContent,
        service: document.getElementById('service-type').value
    };
    
    const message = `I'm interested in ${estimate.service} service with estimated monthly cost of ${estimate.monthlyTotal}. Please contact me for a detailed quote.`;
    window.location.href = `contact.html?message=${encodeURIComponent(message)}`;
}