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
    const navbar = document.querySelector('.navbar');
    const pageName = document.querySelector('.page-name');
    const logoText = document.querySelector('.logo-text');

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
            // Always visible now
            // scrollProgress.classList.toggle('visible', scrollTop > showThreshold);
        }
        
        if (scrollNav) {
            // Always visible now
            // scrollNav.classList.toggle('visible', scrollTop > showThreshold);
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
    const timelineItemWidth = 200; // Match CSS width

    function updateTimelinePosition() {
        if (timelineTrack) {
            timelineTrack.style.transform = `translateX(${-timelinePosition}px)`;
        }
        updateTimelineNavButtons();
    }

    function getTimelineMaxScroll() {
        if (!timelineTrack) return 0;
        const items = timelineTrack.querySelectorAll('.timeline-item');
        const totalWidth = items.length * timelineItemWidth;
        const wrapper = timelineTrack.parentElement;
        const visibleWidth = wrapper ? wrapper.offsetWidth : 800;
        return Math.max(0, totalWidth - visibleWidth);
    }

    function updateTimelineNavButtons() {
        const maxScroll = getTimelineMaxScroll();
        
        if (timelinePrev) {
            timelinePrev.disabled = timelinePosition <= 0;
        }
        
        if (timelineNext) {
            timelineNext.disabled = timelinePosition >= maxScroll;
        }
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

    // Reset styles that might have been set by the previous version
    if (timelineTrack) {
        timelineTrack.style.width = '';
        timelineTrack.style.position = '';
        const items = timelineTrack.querySelectorAll('.timeline-item');
        items.forEach(item => {
            item.style.position = '';
            item.style.left = '';
        });
    }

    // Initial update
    updateTimelineNavButtons();
    window.addEventListener('resize', updateTimelineNavButtons);

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
    // Navbar Logo Toggle - Typewriter animation between "JM" and "JOSIAS MOUKPE"
    // ==========================================================================
    const fullName = 'JOSIAS MOUKPE';
    const shortName = 'JM';
    let isAnimating = false;
    let currentText = fullName;
    let animationTimeout = null;

    function typewriterAnimate(fromText, toText, element, callback) {
        if (isAnimating) {
            clearTimeout(animationTimeout);
        }
        isAnimating = true;
        
        const charDelay = 10; // milliseconds per character
        let currentIndex = fromText.length;
        
        // First, delete characters
        function deleteChar() {
            if (currentIndex > 0) {
                currentIndex--;
                element.textContent = fromText.substring(0, currentIndex);
                animationTimeout = setTimeout(deleteChar, charDelay);
            } else {
                // Then type new characters
                currentIndex = 0;
                typeChar();
            }
        }
        
        function typeChar() {
            if (currentIndex < toText.length) {
                currentIndex++;
                element.textContent = toText.substring(0, currentIndex);
                animationTimeout = setTimeout(typeChar, charDelay);
            } else {
                isAnimating = false;
                currentText = toText;
                if (callback) callback();
            }
        }
        
        deleteChar();
    }

    if (pageName && navbar && logoText) {
        const nameObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Name is visible on page, animate to "JM"
                    navbar.classList.add('name-visible');
                    if (currentText !== shortName) {
                        typewriterAnimate(currentText, shortName, logoText);
                    }
                } else {
                    // Name is not visible, animate to full "JOSIAS MOUKPE"
                    navbar.classList.remove('name-visible');
                    if (currentText !== fullName) {
                        typewriterAnimate(currentText, fullName, logoText);
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '-60px 0px 0px 0px', // Account for fixed navbar height
            threshold: 0
        });

        nameObserver.observe(pageName);
    }

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
    // Vertical Scroll Section Markers
    // ==========================================================================
    const scrollSections = document.querySelectorAll('.scroll-section-marker');
    const sections = ['bio', 'research', 'timeline', 'papers', 'misc'];
    
    // Get navbar height for offset calculations
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 60;
    
    // Calculate scroll position for a section
    function getScrollPositionForSection(section) {
        return Math.max(0, section.offsetTop - navbarHeight);
    }
    
    // Position markers based on actual section positions
    // Offset to move ticks up to align with the progress line (in percentage points)
    const TICK_OFFSET = -2;
    
    function positionScrollMarkers() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Guard against zero height (e.g. before load)
        if (totalHeight <= 0) return;

        scrollSections.forEach((marker, index) => {
            const sectionId = marker.dataset.section;
            const section = document.getElementById(sectionId);
            
            if (section) {
                // Calculate the scroll position that brings this section into view
                const scrollToSection = getScrollPositionForSection(section);
                let position = (scrollToSection / totalHeight) * 100;
                
                // Apply offset to move tick up
                position = position + TICK_OFFSET;
                
                // Clamp between 0 and 100
                position = Math.max(0, Math.min(100, position));
                
                marker.style.top = `${position}%`;
            }
        });
        
        // Force an update of the active state after positioning
        updateActiveMarker();
    }
    
    // Update active marker based on scroll position
    function updateActiveMarker() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        // Guard against zero height
        if (totalHeight <= 0) return;

        const scrollPercentage = (window.scrollY / totalHeight) * 100;
        
        // Sync progress bar height
        if (scrollProgressBar) {
            scrollProgressBar.style.height = `${scrollPercentage}%`;
        }
        
        scrollSections.forEach(marker => {
            const markerTop = parseFloat(marker.style.top) || 0;
            
            // Mark as active when the line reaches the marker position
            if (scrollPercentage >= markerTop) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });
    }
    
    // Handle marker clicks - scroll and update progress bar immediately
    scrollSections.forEach(marker => {
        marker.addEventListener('click', (e) => {
            e.preventDefault();
            
            const sectionId = marker.dataset.section;
            const section = document.getElementById(sectionId);
            
            if (section) {
                const scrollTarget = getScrollPositionForSection(section);
                
                // Scroll to section
                window.scrollTo({
                    top: scrollTarget,
                    behavior: 'smooth'
                });
                
                // Immediately update the progress bar to target position
                const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
                const targetPercentage = (scrollTarget / totalHeight) * 100;
                
                if (scrollProgressBar) {
                    scrollProgressBar.style.height = `${targetPercentage}%`;
                }
                
                // Update active states
                scrollSections.forEach(m => {
                    const mTop = parseFloat(m.style.top) || 0;
                    if (targetPercentage >= mTop) {
                        m.classList.add('active');
                    } else {
                        m.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Initial positioning
    positionScrollMarkers();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveMarker, { passive: true });
    
    // Update positions on resize and load (to account for dynamic content/images)
    window.addEventListener('resize', positionScrollMarkers);
    window.addEventListener('load', positionScrollMarkers);

    // ==========================================================================
    // Research Interests Toggle
    // ==========================================================================
    const interestItems = document.querySelectorAll('.interest-item');
    
    interestItems.forEach(item => {
        const header = item.querySelector('.interest-header');
        const toggle = item.querySelector('.interest-toggle');
        
        // Make both header and toggle clickable
        const toggleDescription = () => {
            item.classList.toggle('expanded');
        };
        
        if (header) {
            header.addEventListener('click', toggleDescription);
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

