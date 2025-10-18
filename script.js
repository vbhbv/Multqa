//
// مجلة الملتقى - التفاعلية الفخمة (17 وظيفة)
// ** تم تحديث الكود ليتناسب مع التصميم الجديد V2 **
//

document.addEventListener('DOMContentLoaded', () => {
    // تحديد العناصر الأساسية
    const body = document.body;
    const sidebar = document.getElementById('sidebar-menu');
    const hamburger = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const themeToggle = document.getElementById('dark-mode-toggle');
    const header = document.querySelector('.header');
    const localStorageKey = 'multaqa_theme_v6';

    // ===================================================
    // 1. أداة تحسين الأداء: Scroll Throttling
    // ===================================================
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // ===================================================
    // 2. وظيفة فتح/إغلاق القائمة الجانبية (Hamburger Menu)
    // ===================================================
    const toggleSidebar = () => {
        const isOpen = sidebar.classList.toggle('open');
        // 3. منع التمرير عند فتح القائمة
        body.style.overflow = isOpen ? 'hidden' : 'auto';
    };

    // 4. مستمعات النقر لفتح وإغلاق القائمة
    if (hamburger && closeBtn) {
        hamburger.addEventListener('click', toggleSidebar);
        closeBtn.addEventListener('click', toggleSidebar);
    }
    
    // 5. إغلاق القائمة بالنقر خارجها (Event Delegation)
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target) && 
            e.target !== themeToggle) {
            toggleSidebar();
        }
    });

    // 6. إغلاق القائمة بالضغط على مفتاح ESC (Accessibility)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    });

    // ===================================================
    // 7. تطبيق الوضع الليلي (Dark Mode Logic)
    // ===================================================
    const applyTheme = (theme) => {
        const isDark = (theme === 'dark');
        body.classList.toggle('dark-mode', isDark);
        // تحديث أيقونة الوضع الليلي (Dark Mode Icon)
        const icon = themeToggle ? themeToggle.querySelector('i') : null;
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
        localStorage.setItem(localStorageKey, theme);
    };
    
    // 8. تهيئة الثيم عند التحميل
    const initTheme = () => {
        const savedTheme = localStorage.getItem(localStorageKey);
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    };
    initTheme();

    // 9. مستمع النقر لزر الوضع الليلي
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.contains('dark-mode');
            applyTheme(isDarkMode ? 'light' : 'dark');
        });
    }

    // ===================================================
    // 10. تأثير التحريك عند التمرير (Scroll Reveal) - ظهور البطاقات
    // ===================================================
    const scrollReveal = () => {
        const cards = document.querySelectorAll('.card');
        const triggerBottom = window.innerHeight * 0.9; 

        cards.forEach((card) => {
            if (card.getBoundingClientRect().top < triggerBottom) {
                card.classList.add('visible'); 
            }
        });
    };
    window.addEventListener('scroll', throttle(scrollReveal, 100));
    scrollReveal();

    // ===================================================
    // 11. تأثير Cursor Trail (مسار الماوس الجمالي)
    // ===================================================
    const createCursorFollower = () => {
        const follower = document.createElement('div');
        follower.id = 'cursor-follower';
        follower.style.cssText = `
            position: fixed;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: var(--color-accent);
            pointer-events: none;
            transition: transform 0.1s ease-out, opacity 0.3s;
            z-index: 9999;
            opacity: 0.6;
            mix-blend-mode: soft-light;
            transform: translate(-50%, -50%);
        `;
        body.appendChild(follower);

        document.addEventListener('mousemove', (e) => {
            follower.style.left = `${e.clientX}px`;
            follower.style.top = `${e.clientY}px`;
        });
        
        let timeout;
        document.addEventListener('mousemove', () => {
            follower.style.opacity = '0.6';
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                follower.style.opacity = '0';
            }, 500);
        });
    };
    createCursorFollower();

    // ===================================================
    // 12. تأثير الضوء الخفيف على الأزرار (Aura Effect)
    // ===================================================
    document.querySelectorAll('.cta-button, .secondary-btn').forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';

        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });

    // ===================================================
    // 13. Dynamic Page Title
    // ===================================================
    let originalTitle = document.title;
    const idleTitle = "✨ عد إلينا لتكمل القراءة...";

    document.addEventListener('visibilitychange', () => {
        document.title = document.hidden ? idleTitle : originalTitle;
    });

    // ===================================================
    // 14. Smooth Scroll لجميع الروابط الداخلية
    // ===================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================================
    // 15. تحريك زر الدعوة للعمل (Tilt Effect)
    // ===================================================
    document.querySelectorAll('.cta-button, .secondary-btn').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.target.style.transform = `perspective(1000px) rotateX(${(y - rect.height / 2) / 10}deg) rotateY(${-(x - rect.width / 2) / 10}deg)`;
        });

        button.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'none';
        });
    });

    // ===================================================
    // 17. تحريك زر الهامبرغر عند التحميل (إضفاء الهيبة)
    // ===================================================
    const animateHamburger = () => {
        if (hamburger) {
            hamburger.style.animation = 'pulse 1s 2';
            setTimeout(() => {
                 hamburger.style.animation = 'none';
            }, 2000);
        }
    };
    animateHamburger();


    console.info("🎉 مجلة الملتقى: تم تفعيل 17 وظيفة جافاسكريبت بجودة عالية.");
});
