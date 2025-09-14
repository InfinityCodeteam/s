// DOM Elements
const loader = document.getElementById('loader');
const productsGrid = document.getElementById('productsGrid');
const testimonialsContainer = document.querySelector('.testimonials-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.querySelector('.cart-items');
const totalPrice = document.querySelector('.total-price');
const cartSidebar = document.querySelector('.cart-sidebar');
const overlay = document.querySelector('.overlay');
const closeCart = document.querySelector('.close-cart');
const cartIcon = document.querySelector('.cart-icon');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const petalsContainer = document.querySelector('.petals');
const whatsappFloat = document.querySelector('.whatsapp-float');

// Global variables
let productsData = [];
let testimonialsData = [];
let settingsData = {};
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load data from JSON files
        await loadData();
        
        // Apply settings
        applySettings();
        
        // Hide loader after 2 seconds
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 2000);

        // Load products
        displayProducts(productsData);

        // Load testimonials
        displayTestimonials(testimonialsData);

        // Create falling petals
        createPetals();

        // Initialize animations on scroll
        initAnimations();

        // Set up event listeners
        setupEventListeners();
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

// Load data from JSON files
async function loadData() {
    try {
        // Load products
        const productsResponse = await fetch('data/products.json');
        productsData = await productsResponse.json();
        
        // Load testimonials
        const testimonialsResponse = await fetch('data/testimonials.json');
        testimonialsData = await testimonialsResponse.json();
        
        // Load settings
        const settingsResponse = await fetch('data/settings.json');
        settingsData = await settingsResponse.json();
    } catch (error) {
        console.error('Error loading JSON data:', error);
        // Fallback data if files can't be loaded
        productsData = [
            {
                id: 1,
                name: "بوكيه ورد طبيعي فاخر",
                price: 250,
                category: "bouquet",
                image: "https://placehold.co/300x300/f8d7e6/2d4a3a?text=بوكيه+ورد+فاخر",
                description: "بوكيه مصمم بعناية من أجود أنواع الورد الطبيعي، مناسب للهدايا والمناسبات الخاصة."
            },
            {
                id: 2,
                name: "إكسيورات يدوية من الزهور المجففة",
                price: 180,
                category: "accessory",
                image: "https://placehold.co/300x300/f8d7e6/2d4a3a?text=إكسسوار+زهور+مجففة",
                description: "إكسسوارات فريدة مصنوعة يدويًا من الزهور المجففة المحفوظة بعناية."
            }
        ];
        
        testimonialsData = [
            {
                name: "سارة أحمد",
                image: "https://placehold.co/150x150/f8d7e6/2d4a3a?text=سارة",
                text: "البوكيه كان أجمل من ما توقعت! الجودة فائقة والتغليف راقي جدًا. شكرًا لكم على هذه التفاصيل الجميلة."
            }
        ];
        
        settingsData = {
            companyName: "فلورا",
            heroTitle: "فن الورد والهاند ميد، حيث تتحول اللحظة إلى ذكرى خالدة",
            heroSubtitle: "بوكيهات ورد طبيعي فاخرة وأعمال يدوية متميزة تخلد أجمل اللحظات في حياتك",
            heroCta: "اكتشف المجموعة",
            aboutTitle: "من passion إلى profession",
            aboutText1: "بدأت رحلتنا بشغف كبير بفنون الورد والأعمال اليدوية، حيث كنا نؤمن بأن التفاصيل الصغيرة هي التي تصنع الفارق الكبير في حياة الناس. من خلال عملنا، نحاول أن نخلق لحظات من السعادة والجمال تدوم طويلاً.",
            aboutText2: "كل قطعة نصنعها تحمل جزءًا من روحنا وإبداعنا، ونحرص على أن تكون فريدة ومميزة، تمامًا مثل الشخص الذي سيمتلكها. نستخدم فقط أفضل المواد والخامات لضمان الجودة والديمومة.",
            aboutCta: "اعرف المزيد عنا",
            footerAbout: "متخصصون في صناعة بوكيهات الورد الفاخرة والأعمال اليدوية المميزة التي تخلد أجمل اللحظات في حياتك.",
            address: "الرياض، المملكة العربية السعودية",
            phone: "+966 12 345 6789",
            email: "info@flora.com",
            newsletterDesc: "اشترك في نشرتنا البريدية لتصلك آخر عروضنا ومنتجاتنا الجديدة",
            whatsappNumber: "966123456789",
            socialMedia: {
                instagram: "#",
                tiktok: "#",
                snapchat: "#",
                twitter: "#"
            }
        };
    }
}

// Apply settings from JSON
function applySettings() {
    // Company name
    document.getElementById('company-name').textContent = settingsData.companyName;
    document.getElementById('footer-company-name').textContent = settingsData.companyName;
    document.getElementById('footer-copyright-name').textContent = settingsData.companyName;
    
    // Hero section
    document.getElementById('hero-title').textContent = settingsData.heroTitle;
    document.getElementById('hero-subtitle').textContent = settingsData.heroSubtitle;
    document.getElementById('hero-cta').textContent = settingsData.heroCta;
    
    // About section
    document.getElementById('about-title').textContent = settingsData.aboutTitle;
    document.getElementById('about-text-1').textContent = settingsData.aboutText1;
    document.getElementById('about-text-2').textContent = settingsData.aboutText2;
    document.getElementById('about-cta').textContent = settingsData.aboutCta;
    
    // Footer section
    document.getElementById('footer-about').textContent = settingsData.footerAbout;
    document.getElementById('footer-address').textContent = settingsData.address;
    document.getElementById('footer-phone').textContent = settingsData.phone;
    document.getElementById('footer-email').textContent = settingsData.email;
    document.getElementById('footer-newsletter-desc').textContent = settingsData.newsletterDesc;
    
    // Current year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Social media links
    document.getElementById('social-instagram').href = settingsData.socialMedia.instagram;
    document.getElementById('social-tiktok').href = settingsData.socialMedia.tiktok;
    document.getElementById('social-snapchat').href = settingsData.socialMedia.snapchat;
    document.getElementById('social-twitter').href = settingsData.socialMedia.twitter;
    
    // WhatsApp link
    whatsappFloat.href = `https://wa.me/${settingsData.whatsappNumber}`;
}

// Display products
function displayProducts(products) {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card', 'fade-in');
        productCard.dataset.category = product.category;
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price} ر.س</p>
                <p class="product-desc">${product.description}</p>
                <button class="add-to-cart" data-id="${product.id}">أضف للسلة</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Trigger animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
}

// Display testimonials
function displayTestimonials(testimonials) {
    testimonialsContainer.innerHTML = '';
    
    testimonials.forEach(testimonial => {
        const testimonialElement = document.createElement('div');
        testimonialElement.classList.add('testimonial-circle');
        
        testimonialElement.innerHTML = `
            <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-img">
            <div class="testimonial-card">
                <p class="testimonial-text">"${testimonial.text}"</p>
                <p class="testimonial-name">- ${testimonial.name}</p>
            </div>
        `;
        
        testimonialsContainer.appendChild(testimonialElement);
    });
}

// Create falling petals
function createPetals() {
    const petalCount = 15;
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Random position, size, and animation duration
        const left = Math.random() * 100;
        const size = 10 + Math.random() * 20;
        const duration = 5 + Math.random() * 10;
        const delay = Math.random() * 5;
        
        petal.style.left = `${left}vw`;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
        
        petalsContainer.appendChild(petal);
    }
}

// Initialize animations on scroll
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Filter products
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            if (filter === 'all') {
                displayProducts(productsData);
            } else {
                const filteredProducts = productsData.filter(product => product.category === filter);
                displayProducts(filteredProducts);
            }
        });
    });
    
    // Search products
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm === '') {
            displayProducts(productsData);
            return;
        }
        
        const filteredProducts = productsData.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
        
        displayProducts(filteredProducts);
    });
    
    // Add to cart
    productsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = productsData.find(p => p.id === productId);
            
            addToCart(product);
            
            // Fly to cart animation
            const flyItem = document.createElement('div');
            flyItem.style.position = 'fixed';
            flyItem.style.width = '50px';
            flyItem.style.height = '50px';
            flyItem.style.borderRadius = '50%';
            flyItem.style.background = `url(${product.image}) center/cover`;
            flyItem.style.zIndex = '1000';
            flyItem.style.transition = 'all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)';
            
            const rect = e.target.getBoundingClientRect();
            flyItem.style.left = `${rect.left}px`;
            flyItem.style.top = `${rect.top}px`;
            
            document.body.appendChild(flyItem);
            
            setTimeout(() => {
                const cartRect = cartIcon.getBoundingClientRect();
                flyItem.style.left = `${cartRect.left}px`;
                flyItem.style.top = `${cartRect.top}px`;
                flyItem.style.width = '20px';
                flyItem.style.height = '20px';
                flyItem.style.opacity = '0.5';
            }, 50);
            
            setTimeout(() => {
                document.body.removeChild(flyItem);
            }, 800);
        }
    });
    
    // Toggle cart sidebar
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    overlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Testimonial hover
    testimonialsContainer.addEventListener('mouseover', (e) => {
        const testimonial = e.target.closest('.testimonial-circle');
        if (testimonial) {
            document.querySelectorAll('.testimonial-circle').forEach(t => t.classList.remove('active'));
            testimonial.classList.add('active');
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            document.querySelector('nav').classList.add('scrolled');
        } else {
            document.querySelector('nav').classList.remove('scrolled');
        }
    });
}

// Add to cart function
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
}

// Update cart function
function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">${item.price} ر.س × ${item.quantity}</p>
            </div>
            <div class="cart-item-remove" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    totalPrice.textContent = `${total} ر.س`;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.dataset.id);
            cart = cart.filter(item => item.id !== id);
            updateCart();
        });
    });
}