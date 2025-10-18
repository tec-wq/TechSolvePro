// AI Service Recommendation Engine
class ServiceRecommender {
    constructor() {
        this.services = {
            cybersecurity: {
                name: "Cyber Security",
                tags: ['security', 'protection', 'hacking', 'data-breach', 'compliance', 'privacy'],
                weight: 1
            },
            cloud: {
                name: "Cloud Solutions", 
                tags: ['scalability', 'remote-work', 'cost-saving', 'storage', 'collaboration'],
                weight: 1
            },
            consulting: {
                name: "IT Consulting",
                tags: ['strategy', 'planning', 'digital-transformation', 'expert-advice', 'roadmap'],
                weight: 1
            },
            network: {
                name: "Network Management",
                tags: ['performance', 'reliability', 'connectivity', 'infrastructure', 'monitoring'],
                weight: 1
            },
            software: {
                name: "Software Development", 
                tags: ['custom-software', 'automation', 'efficiency', 'innovation', 'digital-products'],
                weight: 1
            },
            support: {
                name: "IT Support",
                tags: ['help-desk', 'maintenance', 'troubleshooting', 'quick-fix', 'technical-help'],
                weight: 1
            }
        };
        
        this.questions = [
            {
                id: 1,
                question: "What is your primary business challenge?",
                options: [
                    { text: "Security concerns and data protection", tags: ['security', 'protection'] },
                    { text: "Scaling infrastructure for growth", tags: ['scalability', 'growth'] },
                    { text: "Outdated technology systems", tags: ['modernization', 'efficiency'] },
                    { text: "Poor system performance", tags: ['performance', 'reliability'] }
                ]
            },
            {
                id: 2,
                question: "What is your team size?",
                options: [
                    { text: "1-10 employees", tags: ['startup', 'small-team'] },
                    { text: "11-50 employees", tags: ['growing', 'medium-team'] },
                    { text: "51-200 employees", tags: ['established', 'large-team'] },
                    { text: "200+ employees", tags: ['enterprise', 'corporate'] }
                ]
            },
            {
                id: 3, 
                question: "What is your biggest IT pain point?",
                options: [
                    { text: "Frequent system downtime", tags: ['reliability', 'performance'] },
                    { text: "Security vulnerabilities", tags: ['security', 'risk'] },
                    { text: "Slow technology adoption", tags: ['innovation', 'modernization'] },
                    { text: "High IT costs", tags: ['cost-saving', 'efficiency'] }
                ]
            },
            {
                id: 4,
                question: "What are your growth goals?",
                options: [
                    { text: "Expand to new markets", tags: ['scalability', 'expansion'] },
                    { text: "Improve operational efficiency", tags: ['efficiency', 'automation'] },
                    { text: "Enhance customer experience", tags: ['innovation', 'customer-focus'] },
                    { text: "Maintain current position", tags: ['stability', 'maintenance'] }
                ]
            }
        ];
        
        this.userProfile = {
            tags: [],
            budget: '',
            timeline: '',
            preferences: []
        };
    }

    startAssessment() {
        this.currentQuestion = 0;
        this.userProfile.tags = [];
        this.showQuestion(0);
    }

    showQuestion(index) {
        const question = this.questions[index];
        let html = `
            <div class="ai-question active" data-id="${question.id}">
                <h3>${question.question}</h3>
                <div class="ai-options">
        `;
        
        question.options.forEach((option, i) => {
            html += `
                <button class="ai-option" onclick="recommender.selectOption(${index}, ${i})">
                    ${option.text}
                </button>
            `;
        });
        
        html += `</div></div>`;
        document.getElementById('ai-assessment').innerHTML = html;
    }

    selectOption(questionIndex, optionIndex) {
        const selectedOption = this.questions[questionIndex].options[optionIndex];
        this.userProfile.tags.push(...selectedOption.tags);
        
        // Move to next question or show results
        if (questionIndex < this.questions.length - 1) {
            this.showQuestion(questionIndex + 1);
        } else {
            this.calculateRecommendations();
        }
    }

    calculateRecommendations() {
        const scores = {};
        
        // Calculate scores based on tag matches
        Object.keys(this.services).forEach(serviceKey => {
            const service = this.services[serviceKey];
            let score = 0;
            
            service.tags.forEach(tag => {
                if (this.userProfile.tags.includes(tag)) {
                    score += 2; // Base match score
                }
            });
            
            // Bonus for multiple matches
            const matchCount = service.tags.filter(tag => 
                this.userProfile.tags.includes(tag)
            ).length;
            
            if (matchCount >= 2) score += 3;
            if (matchCount >= 3) score += 5;
            
            scores[serviceKey] = score * service.weight;
        });

        // Get top 3 recommendations
        const recommendations = Object.entries(scores)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([serviceKey, score]) => ({
                service: this.services[serviceKey].name,
                score: score,
                key: serviceKey,
                matchPercentage: Math.min(100, Math.round((score / 20) * 100))
            }));

        this.displayResults(recommendations);
    }

    displayResults(recommendations) {
        let html = `
            <div class="ai-results">
                <h3>🤖 Your Personalized IT Solution Plan</h3>
                <div class="recommendations-grid">
        `;
        
        recommendations.forEach(rec => {
            html += `
                <div class="recommendation-card">
                    <div class="match-score">
                        <div class="score-circle">
                            <span>${rec.matchPercentage}%</span>
                            <div class="score-label">Match</div>
                        </div>
                    </div>
                    <h4>${rec.service}</h4>
                    <p>${this.getServiceDescription(rec.key)}</p>
                    <div class="recommendation-actions">
                        <a href="services.html#${rec.key}" class="cta-button primary small">Learn More</a>
                        <a href="contact.html?service=${rec.key}" class="cta-button secondary small">Get Quote</a>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="ai-actions">
                    <button onclick="recommender.startAssessment()" class="cta-button secondary">Retake Assessment</button>
                    <a href="contact.html" class="cta-button primary">Talk to Expert</a>
                </div>
            </div>
        `;
        
        document.getElementById('ai-assessment').innerHTML = html;
    }

    getServiceDescription(key) {
        const descriptions = {
            cybersecurity: "Comprehensive protection against cyber threats and data breaches",
            cloud: "Scalable cloud infrastructure for business growth and flexibility", 
            consulting: "Strategic IT planning aligned with your business objectives",
            network: "Optimized network performance and reliability management",
            software: "Custom software solutions tailored to your unique needs",
            support: "24/7 technical support and proactive system maintenance"
        };
        return descriptions[key] || "Professional IT service solution";
    }
}

// Initialize AI Recommender
const recommender = new ServiceRecommender();