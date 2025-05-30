document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    setTimeout(function() {
        document.querySelector('.loading-screen').classList.add('fade-out');
    }, 1500);

    // Mobile navigation toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if(this.classList.contains('nav-cta')) {
                // Special handling for CTA button
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Accordion functionality
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if(this.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });

    // Copy IP functionality
    const copyIpBtn = document.querySelector('.copy-ip');
    
    if(copyIpBtn) {
        copyIpBtn.addEventListener('click', function() {
            const ip = this.getAttribute('data-ip');
            navigator.clipboard.writeText(ip).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('slide-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .community-card, .feature-card, .addon-card').forEach(el => {
        observer.observe(el);
    });

    // Addon search functionality
    const addonSearch = document.getElementById('addon-search');
    const addonCategory = document.getElementById('addon-category');
    const addonsGrid = document.getElementById('addons-grid');
    
    if(addonSearch && addonCategory && addonsGrid) {
        // Sample addons data (in a real app, this would come from an API)
        const addons = [
            { name: 'TreeCapitator', desc: 'Chop down entire trees at once', category: 'gameplay' },
            { name: 'Graves', desc: 'Protect your items when you die', category: 'gameplay' },
            { name: 'Dynamic Economy', desc: 'Player-driven market system', category: 'economy' },
            { name: 'Medieval Decor', desc: '500+ new decorative blocks', category: 'visual' },
            { name: 'Chivalry Combat', desc: 'Enhanced medieval combat system', category: 'gameplay' },
            { name: 'Heraldry', desc: 'Custom banners and coats of arms', category: 'visual' },
            { name: 'Prestige Skills', desc: 'Advanced skill progression', category: 'gameplay' },
            { name: 'Royal Titles', desc: 'Nobility ranking system', category: 'utility' }
        ];
        
        // Render addons
        function renderAddons(filter = '', category = 'all') {
            addonsGrid.innerHTML = '';
            
            const filtered = addons.filter(addon => {
                const matchesSearch = addon.name.toLowerCase().includes(filter.toLowerCase()) || 
                                     addon.desc.toLowerCase().includes(filter.toLowerCase());
                const matchesCategory = category === 'all' || addon.category === category;
                return matchesSearch && matchesCategory;
            });
            
            if(filtered.length === 0) {
                addonsGrid.innerHTML = '<p class="no-results">No addons found matching your criteria</p>';
                return;
            }
            
            filtered.forEach(addon => {
                const card = document.createElement('div');
                card.className = 'addon-card card-hover';
                card.innerHTML = `
                    <h3>${addon.name}</h3>
                    <p>${addon.desc}</p>
                    <span class="addon-category">${addon.category}</span>
                `;
                addonsGrid.appendChild(card);
            });
        }
        
        // Initial render
        renderAddons();
        
        // Search event
        addonSearch.addEventListener('input', function() {
            renderAddons(this.value, addonCategory.value);
        });
        
        // Category event
        addonCategory.addEventListener('change', function() {
            renderAddons(addonSearch.value, this.value);
        });
    }

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if(testimonialSlider) {
        // Sample testimonials data
        const testimonials = [
            {
                name: 'KingAether',
                role: 'Season II Champion',
                text: 'The most immersive SMP experience I\'ve ever had. The medieval theme and roleplay elements add so much depth.'
            },
            {
                name: 'LadyBrick',
                role: 'Master Builder',
                text: 'The custom building blocks and terrain generation make this server a builder\'s paradise.'
            },
            {
                name: 'SirRedstone',
                role: 'Technical Player',
                text: 'Perfect balance between vanilla mechanics and quality-of-life improvements. 10/10 would play again.'
            }
        ];
        
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            const testimonial = testimonials[index];
            testimonialSlider.innerHTML = `
                <div class="testimonial">
                    <div class="testimonial-content">
                        <p>"${testimonial.text}"</p>
                        <div class="testimonial-author">
                            <strong>${testimonial.name}</strong>
                            <span>${testimonial.role}</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Initial testimonial
        showTestimonial(currentTestimonial);
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Sticky navigation on scroll
    window.addEventListener('scroll', function() {
        const nav = document.getElementById('main-nav');
        if(window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.7)';
        } else {
            nav.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            nav.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.5)';
        }
    });

    // Parallax effect for header
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('header');
        header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
});