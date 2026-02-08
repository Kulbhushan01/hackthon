// ========================
// Mobile Menu Toggle
// ========================
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// ========================
// Chart.js Configurations
// ========================

// Wait for Chart.js to load
if (typeof Chart !== 'undefined') {
    // Common chart options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    padding: 15,
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif"
                    }
                }
            }
        }
    };

    // Chart 1: Region Loss Comparison (Bar Chart)
    const regionLossCtx = document.getElementById('regionLossChart');
    if (regionLossCtx) {
        new Chart(regionLossCtx, {
            type: 'bar',
            data: {
                labels: ['India (National)', 'Maharashtra', 'Marathwada', 'Vidarbha', 'Western Maharashtra'],
                datasets: [{
                    label: 'Crop Loss (%)',
                    data: [25, 30, 45, 35, 28],
                    backgroundColor: [
                        'rgba(229, 57, 53, 0.7)',
                        'rgba(255, 111, 0, 0.7)',
                        'rgba(255, 160, 0, 0.7)',
                        'rgba(216, 67, 21, 0.7)',
                        'rgba(251, 140, 0, 0.7)'
                    ],
                    borderColor: [
                        'rgba(229, 57, 53, 1)',
                        'rgba(255, 111, 0, 1)',
                        'rgba(255, 160, 0, 1)',
                        'rgba(216, 67, 21, 1)',
                        'rgba(251, 140, 0, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    title: {
                        display: false
                    }
                }
            }
        });
    }

    // Chart 2: Causes of Loss (Pie Chart)
    const causesCtx = document.getElementById('causesChart');
    if (causesCtx) {
        new Chart(causesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Drought & Water Scarcity', 'Pest & Disease', 'Temperature Extremes', 'Poor Soil Health', 'Others'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        'rgba(229, 57, 53, 0.8)',
                        'rgba(255, 152, 0, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(139, 69, 19, 0.8)',
                        'rgba(158, 158, 158, 0.8)'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        ...commonOptions.plugins.legend,
                        position: 'right'
                    }
                }
            }
        });
    }

    // Chart 3: Marathwada Trend (Line Chart)
    const marathwadaTrendCtx = document.getElementById('marathwadaTrendChart');
    if (marathwadaTrendCtx) {
        new Chart(marathwadaTrendCtx, {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    {
                        label: 'Crop Loss (₹ Crores)',
                        data: [2800, 3200, 4500, 3800, 4200, 4800, 5200],
                        borderColor: 'rgba(229, 57, 53, 1)',
                        backgroundColor: 'rgba(229, 57, 53, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        borderWidth: 3
                    },
                    {
                        label: 'With AI Solution (Projected)',
                        data: [null, null, null, null, null, 4800, 3360, 2352],
                        borderColor: 'rgba(67, 160, 71, 1)',
                        backgroundColor: 'rgba(67, 160, 71, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        borderWidth: 3,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                ...commonOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value;
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '₹' + context.parsed.y + ' Crores';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
}

// ========================
// Additional Interactions
// ========================

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Console welcome message
console.log('%cAgriSense 🌿', 'color: #2d5016; font-size: 24px; font-weight: bold;');
console.log('%cAI-Powered Smart Farming Assistant', 'color: #4a7c2c; font-size: 14px;');
console.log('%cTeam GreenTech | AgriHack 2026', 'color: #7cb342; font-size: 12px;');