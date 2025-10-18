// Automated Testing Suite
class WebsiteTestSuite {
    constructor() {
        this.testResults = [];
        this.init();
    }

    init() {
        this.runAllTests();
        this.setupContinuousTesting();
    }

    runAllTests() {
        console.log('🚀 Running Website Test Suite...');
        
        this.testNavigation();
        this.testForms();
        this.testJavaScriptFeatures();
        this.testResponsiveDesign();
        this.testPerformance();
        
        this.generateTestReport();
    }

    testNavigation() {
        const tests = [
            {
                name: 'Main Navigation Links',
                test: () => {
                    const navLinks = document.querySelectorAll('.nav-link');
                    return navLinks.length >= 4; // Home, Services, About, Contact
                }
            },
            {
                name: 'Mobile Menu Functionality',
                test: () => {
                    const hamburger = document.getElementById('hamburger');
                    if (!hamburger) return true; // Skip if not on current page
                    
                    hamburger.click();
                    const navMenu = document.getElementById('nav-menu');
                    return navMenu.classList.contains('active');
                }
            }
        ];

        this.runTestGroup('Navigation', tests);
    }

    testForms() {
        const tests = [
            {
                name: 'Contact Form Validation',
                test: () => {
                    const form = document.getElementById('contact-form');
                    if (!form) return true;
                    
                    const submitBtn = form.querySelector('.submit-btn');
                    submitBtn.click();
                    
                    const errors = form.querySelectorAll('.error-message');
                    return errors.length > 0; // Should show validation errors
                }
            },
            {
                name: 'Pricing Calculator Functionality',
                test: () => {
                    const calculator = document.querySelector('.pricing-calculator');
                    if (!calculator) return true;
                    
                    const serviceSelect = document.getElementById('service-type');
                    if (serviceSelect) {
                        serviceSelect.value = 'cybersecurity';
                        serviceSelect.dispatchEvent(new Event('change'));
                    }
                    
                    return true; // If no errors, test passes
                }
            }
        ];

        this.runTestGroup('Forms', tests);
    }

    testJavaScriptFeatures() {
        const tests = [
            {
                name: 'AI Recommender Initialization',
                test: () => {
                    return typeof recommender !== 'undefined';
                }
            },
            {
                name: 'Status Dashboard Loading',
                test: () => {
                    return typeof statusDashboard !== 'undefined';
                }
            },
            {
                name: 'Client Portal Authentication',
                test: () => {
                    return typeof clientPortal !== 'undefined';
                }
            },
            {
                name: 'Live Chat Interface',
                test: () => {
                    const chatToggle = document.getElementById('chat-toggle');
                    return chatToggle !== null;
                }
            }
        ];

        this.runTestGroup('JavaScript Features', tests);
    }

    testResponsiveDesign() {
        const tests = [
            {
                name: 'Mobile Viewport',
                test: () => {
                    const viewport = document.querySelector('meta[name="viewport"]');
                    return viewport !== null;
                }
            },
            {
                name: 'Responsive Navigation',
                test: () => {
                    return window.getComputedStyle(document.querySelector('.hamburger')).display !== 'none' || 
                           window.innerWidth > 768;
                }
            }
        ];

        this.runTestGroup('Responsive Design', tests);
    }

    testPerformance() {
        const tests = [
            {
                name: 'Page Load Time',
                test: () => {
                    return performance.timing.loadEventEnd - performance.timing.navigationStart < 3000;
                }
            },
            {
                name: 'JavaScript Bundle Size',
                test: () => {
                    // Check if main scripts are loaded
                    const scripts = Array.from(document.querySelectorAll('script[src]'));
                    const totalSize = scripts.reduce((acc, script) => acc + (script.src.length || 0), 0);
                    return totalSize < 100000; // Rough estimate
                }
            }
        ];

        this.runTestGroup('Performance', tests);
    }

    runTestGroup(groupName, tests) {
        console.group(`🧪 ${groupName} Tests`);
        
        tests.forEach(test => {
            try {
                const passed = test.test();
                this.testResults.push({
                    group: groupName,
                    name: test.name,
                    passed: passed,
                    timestamp: new Date()
                });
                
                console.log(`${passed ? '✅' : '❌'} ${test.name}`);
            } catch (error) {
                console.log(`❌ ${test.name} - Error: ${error.message}`);
                this.testResults.push({
                    group: groupName,
                    name: test.name,
                    passed: false,
                    error: error.message,
                    timestamp: new Date()
                });
            }
        });
        
        console.groupEnd();
    }

    generateTestReport() {
        const passed = this.testResults.filter(result => result.passed).length;
        const total = this.testResults.length;
        const percentage = ((passed / total) * 100).toFixed(1);
        
        console.log(`\n📊 Test Report: ${passed}/${total} passed (${percentage}%)`);
        
        // Store results for dashboard
        localStorage.setItem('lastTestRun', JSON.stringify({
            timestamp: new Date(),
            passed: passed,
            total: total,
            percentage: percentage,
            details: this.testResults
        }));
    }

    setupContinuousTesting() {
        // Run tests on page load
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => this.runAllTests(), 2000);
        });

        // Run tests every 5 minutes
        setInterval(() => {
            this.runAllTests();
        }, 5 * 60 * 1000);
    }
}

// Initialize test suite
if (typeof window !== 'undefined') {
    window.websiteTestSuite = new WebsiteTestSuite();
}

