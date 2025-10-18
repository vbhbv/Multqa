//
// مجلة الملتقى - التفاعلية الفائقة والجمالية المتقدمة (16 وظيفة)
//

document.addEventListener('DOMContentLoaded', () => {
    // تحديد العناصر الأساسية
    const body = document.body;
    const sidebar = document.getElementById('sidebar-menu');
    const hamburger = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const themeToggle = document.getElementById('dark-mode-toggle');
    const heroSection = document.querySelector('.hero-section');
    const localStorageKey = 'multaqa_theme_v5';

    // ===================================================
    // 1-6. وظائف أساسية (إعادة استخدام من التصميم السابق)
    // ===================================================
    
    // 1. وظيفة فتح/إغلاق القائمة الجانبية
    const toggleSidebar = () => {
        sidebar.classList.toggle('open');
        // 2. منع التمرير عند فتح القائمة (UX Function)
        body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : 'auto';
    };
    if (hamburger && closeBtn) {
        hamburger.addEventListener('click', toggleSidebar);
        closeBtn.addEventListener('click', toggleSidebar);
    }

    // 3. إغلاق القائمة بالضغط على ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    });

    // 4. تطبيق الوضع الليلي (Dark Mode Logic)
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem(localStorageKey, 'dark');
        } else {
            body.classList.remove('dark-mode');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem(localStorageKey, 'light');
        }
    };
    // 5. تهيئة الثيم عند التحميل
    const initTheme = () => {
        const savedTheme = localStorage.getItem(localStorageKey);
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    };
    initTheme();

    // 6. مستمع النقر لزر الوضع الليلي
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.contains('dark-mode');
            applyTheme(isDarkMode ? 'light' : 'dark');
        });
    }


    // ===================================================
    // 7. تحسين الأداء: Scroll Throttling
    // ===================================================
    // يضمن عدم تشغيل وظائف التمرير (مثل scrollReveal) بشكل مفرط
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
    // 8. تأثير التحريك عند التمرير (Scroll Reveal)
    // ===================================================
    const scrollReveal = () => {
        const cards = document.querySelectorAll('.card');
        const triggerBottom = window.innerHeight * 0.85;

        cards.forEach((card, index) => {
            if (card.getBoundingClientRect().top < triggerBottom) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100); // تأخير أبسط وأسرع
            }
        });
    };
    window.addEventListener('scroll', throttle(scrollReveal, 100)); // استخدام Throttling هنا
    scrollReveal();


    // ===================================================
    // 9. تأثير Cursor Trail (مسار الماوس الجمالي)
    // ===================================================
    const createCursorFollower = () => {
        const follower = document.createElement('div');
        follower.style.cssText = `
            position: fixed;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: ${getComputedStyle(document.documentElement).getPropertyValue('--color-accent')}; /* لون ذهبي */
            pointer-events: none;
            transition: transform 0.1s ease-out;
            z-index: 9999;
            opacity: 0.6;
            mix-blend-mode: soft-light; /* تأثير جمالي في المزج */
            transform: translate(-50%, -50%);
        `;
        body.appendChild(follower);

        document.addEventListener('mousemove', (e) => {
            // تحديث الموقع بسلاسة
            follower.style.left = `${e.clientX}px`;
            follower.style.top = `${e.clientY}px`;
        });
    };
    createCursorFollower();

    // ===================================================
    // 10. تأثير Parallax الخفيف على قسم البطل
    // ===================================================
    const heroParallax = () => {
        if (!heroSection) return;
        const scrolled = window.scrollY;
        // تحريك الخلفية بـ 30% من التمرير
        heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
        // تخفيف شفافية النص داخل الهيرو قليلاً
        heroSection.style.opacity = 1 - (scrolled / 500); 
    };
    window.addEventListener('scroll', throttle(heroParallax, 50));
    heroParallax(); // لتطبيقه عند التحميل

    // ===================================================
    // 11. تأثير الضوء الخفيف على الأزرار (Aura Effect)
    // ===================================================
    document.querySelectorAll('.btn-read, .btn-action').forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';

        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // إزالة أي تأثير سابق
            button.style.removeProperty('--x');
            button.style.removeProperty('--y');

            // تطبيق متغيرات CSS لتحريك الضوء
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });

        // إضافة CSS اللازم لتأثير الضوء (Light Shine)
        const style = document.createElement('style');
        style.innerHTML = `
            .btn-read:after {
                content: '';
                position: absolute;
                top: var(--y, 50%);
                left: var(--x, 50%);
                width: 50px;
                height: 50px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                transition: transform 0.1s;
            }
            .btn-read:hover:after {
                transform: translate(-50%, -50%) scale(5);
                opacity: 0;
                transition: transform 0.5s ease-out, opacity 0.5s;
            }
        `;
        document.head.appendChild(style);
    });

    // ===================================================
    // 12. Dynamic Page Title (لزيادة الهيبة عند عدم التركيز)
    // ===================================================
    let originalTitle = document.title;
    const idleTitle = "📜 لا تفتك مقالات الملتقى!";

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = idleTitle;
        } else {
            document.title = originalTitle;
        }
    });

    // ===================================================
    // 13. Smooth Scroll لجميع الروابط الداخلية
    // ===================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ===================================================
    // 14. إظهار/إخفاء رسالة حقوق النشر في الفوتر عند التمرير (UX)
    // ===================================================
    const footerTextFade = () => {
        const footer = document.querySelector('.footer');
        // إظهار الفوتر بالكامل عندما يصبح مرئياً في أسفل الشاشة
        if (window.scrollY > document.body.scrollHeight - window.innerHeight - 100) {
            footer.style.opacity = '1';
        } else {
            footer.style.opacity = '0.7';
        }
    };
    window.addEventListener('scroll', throttle(footerTextFade, 100));

    // 15. تحريك زر 'اقرأ الآن' عند التمرير بالماوس (Tilt Effect)
    document.querySelectorAll('.btn-read, .btn-action').forEach(button => {
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

    // 16. تحريك عنصر (Bounce Effect) لزر الهامبرغر
    const animateHamburger = () => {
        if (hamburger) {
            // التأكد من تطبيق CSS @keyframes pulse (يجب أن يكون في style.css أو HTML)
            hamburger.style.animation = 'pulse 1s 3';
            setTimeout(() => {
                 hamburger.style.animation = 'none'; // إزالة الحركة بعد 3 مرات
            }, 3000);
        }
    };
    animateHamburger();
    
    console.info("🎉 مجلة الملتقى: تم تفعيل 16 وظيفة جافاسكريبت لزيادة جمالية وهيبة الموقع.");
});
