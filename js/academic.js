/**
 * Academic Personal Website JavaScript
 * Author: Josias Moukpe
 */

(function() {
    'use strict';

    // ==========================================================================
    // DOM Elements
    // ==========================================================================
    const themeToggle = document.getElementById('themeToggle');
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    const scrollNav = document.querySelector('.scroll-nav');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const scrollBottomBtn = document.querySelector('.scroll-bottom');
    const timelinePrev = document.querySelector('.timeline-prev');
    const timelineNext = document.querySelector('.timeline-next');
    const timelineTrack = document.querySelector('.timeline-track');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const yearSpan = document.getElementById('year');

    // ==========================================================================
    // Theme Toggle (Light/Dark Mode)
    // ==========================================================================
    function initTheme() {
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (systemPrefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    // ==========================================================================
    // Scroll Progress & Navigation
    // ==========================================================================
    let ticking = false;

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        // Update progress bar
        if (scrollProgressBar) {
            scrollProgressBar.style.height = scrollPercent + '%';
        }
        
        // Show/hide scroll elements based on scroll position
        const showThreshold = 100;
        
        if (scrollProgress) {
            scrollProgress.classList.toggle('visible', scrollTop > showThreshold);
        }
        
        if (scrollNav) {
            scrollNav.classList.toggle('visible', scrollTop > showThreshold);
        }
        
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Scroll to top/bottom buttons
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (scrollBottomBtn) {
        scrollBottomBtn.addEventListener('click', () => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });
    }

    // ==========================================================================
    // Timeline Horizontal Scroll
    // ==========================================================================
    let timelinePosition = 0;
    const timelineItemWidth = 180; // Width of each timeline item
    const timelineVisibleItems = 4; // Number of visible items

    function updateTimelinePosition() {
        if (timelineTrack) {
            timelineTrack.style.transform = `translateX(${-timelinePosition}px)`;
        }
    }

    function getTimelineMaxScroll() {
        if (!timelineTrack) return 0;
        const items = timelineTrack.querySelectorAll('.timeline-item');
        const totalWidth = items.length * timelineItemWidth;
        const visibleWidth = timelineVisibleItems * timelineItemWidth;
        return Math.max(0, totalWidth - visibleWidth);
    }

    if (timelinePrev) {
        timelinePrev.addEventListener('click', () => {
            timelinePosition = Math.max(0, timelinePosition - timelineItemWidth * 2);
            updateTimelinePosition();
        });
    }

    if (timelineNext) {
        timelineNext.addEventListener('click', () => {
            const maxScroll = getTimelineMaxScroll();
            timelinePosition = Math.min(maxScroll, timelinePosition + timelineItemWidth * 2);
            updateTimelinePosition();
        });
    }

    // Touch/swipe support for timeline
    let touchStartX = 0;
    let touchEndX = 0;

    if (timelineTrack) {
        timelineTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        timelineTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleTimelineSwipe();
        }, { passive: true });
    }

    function handleTimelineSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - go next
                const maxScroll = getTimelineMaxScroll();
                timelinePosition = Math.min(maxScroll, timelinePosition + timelineItemWidth);
            } else {
                // Swipe right - go prev
                timelinePosition = Math.max(0, timelinePosition - timelineItemWidth);
            }
            updateTimelinePosition();
        }
    }

    // ==========================================================================
    // Mobile Menu
    // ==========================================================================
    function openMobileMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenuOverlay?.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ==========================================================================
    // Dynamic Year
    // ==========================================================================
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================================================
    // Smooth Scroll for Anchor Links
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });

    // ==========================================================================
    // Intersection Observer for Animations
    // ==========================================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.paper-item, .misc-section, .timeline-item').forEach(el => {
        el.classList.add('animate-target');
        animateOnScroll.observe(el);
    });

    // Add animation styles dynamically
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-target {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .animate-target.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyles);

    // ==========================================================================
    // Keyboard Navigation
    // ==========================================================================
    document.addEventListener('keydown', (e) => {
        // Theme toggle with T key
        if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const activeElement = document.activeElement;
            const isInput = activeElement.tagName === 'INPUT' || 
                           activeElement.tagName === 'TEXTAREA' || 
                           activeElement.isContentEditable;
            if (!isInput) {
                toggleTheme();
            }
        }
    });

    // ==========================================================================
    // Initialize
    // ==========================================================================
    initTheme();
    updateScrollProgress();

    // Log initialization
    console.log('Academic website initialized successfully.');
})();

