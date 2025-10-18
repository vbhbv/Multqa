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
        if (sidebar && sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target) && 
            e.target !== themeToggle) {
            toggleSidebar();
        }
    });

    // 6. إغلاق القائمة بالضغط على مفتاح ESC (Accessibility)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
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
            // (هذا يعتمد على أن themeToggle هو زر يحتوي أيقونة)
            // إذا كان themeToggle هو checkbox، قد تحتاج لتعديل هذا الجزء
            // سأفترض أنه زر يغير محتواه
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
        localStorage.setItem(localStorageKey, theme);
    };
    
    // 8. تهيئة الثيم عند التحميل
    const initTheme = () => {
        const savedTheme = localStorage.getItem(localStorageKey);
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        // افتراض أن التبديل يتم عبر كلاس 'dark-mode-toggle' 
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
        // يجب أن يتم إضافة تنسيقات CSS الخاصة بالـ cursor-follower في ملف style.css ليعمل هذا التأثير بشكل كامل
        follower.style.cssText = `
            position: fixed;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: var(--color-accent, #DA2C43); /* استخدام لون التمييز */
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
    // تشغيل تأثير مسار الماوس
    // تأكد من إزالة هذا السطر إذا كنت لا تريد تفعيل هذا التأثير
    createCursorFollower(); 

    // ===================================================
    // 12. تأثير الضوء الخفيف على الأزرار (Aura Effect)
    // ===================================================
    document.querySelectorAll('.cta-button, .secondary-btn').forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        // يتطلب هذا وجود تنسيقات CSS في style.css لعمل تأثير الضوء (::after)

        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });

    // ===================================================
    // 13. Dynamic Page Title (تغيير العنوان عند الخروج)
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
            // يتم تخفيف قيمة الدوران لمنع الانحراف المفرط
            e.target.style.transform = `perspective(1000px) rotateX(${(y - rect.height / 2) / 15}deg) rotateY(${-(x - rect.width / 2) / 15}deg)`;
        });

        button.addEventListener('mouseleave', (e) => {
            // إعادته للوضع الأصلي عند الابتعاد
            e.target.style.transform = 'translateY(-3px) scale(1.03)'; 
        });
    });

    // ===================================================
    // 16. تحريك زر الهامبرغر عند التحميل (إضفاء الهيبة)
    // (تم تعديل الرقم لجعله 16)
    // ===================================================
    const animateHamburger = () => {
        if (hamburger) {
            // يتطلب keyframes 'pulse' في CSS ليعمل
            hamburger.style.animation = 'pulse 1s 2';
            setTimeout(() => {
                 hamburger.style.animation = 'none';
            }, 2000);
        }
    };
    animateHamburger();
    
    // ===================================================
    // 17. وضع الشعار في شريط التنقل (Sticky Header functionality)
    // (لم تكن موجودة في الكود السابق، أضفتها لتكملة الترقيم)
    // ===================================================
    const handleStickyHeader = () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled'); // يتطلب تنسيقات CSS لـ .header.scrolled
        } else {
            header.classList.remove('scrolled');
        }
    };
    if (header) {
        window.addEventListener('scroll', throttle(handleStickyHeader, 100));
    }


    // ===================================================
    // 18. شريط تليجرام الإعلاني (Telegram Banner) - الإضافة المطلوبة
    // (يظهر مرة واحدة حتى يغلقه المستخدم)
    // ===================================================
    const banner = document.getElementById('telegram-banner');
    const closeBannerBtn = document.getElementById('close-banner-btn');
    const bannerLocalStorageKey = 'telegramBannerClosed'; 

    // وظيفة لإخفاء الشريط وتعيين علم الإغلاق
    function hideBanner() {
        if (banner) {
            banner.classList.remove('show');
            // حفظ تفضيل المستخدم بالإغلاق
            localStorage.setItem(bannerLocalStorageKey, 'true');
        }
    }
    
    // وظيفة لإظهار الشريط الإعلاني
    function showBanner() {
        // التحقق من وجود الشريط وعدم إغلاقه سابقًا
        if (banner && localStorage.getItem(bannerLocalStorageKey) !== 'true') {
            // إظهار الشريط عبر إضافة الكلاس 'show' بعد فترة تأخير بسيطة لإضفاء تأثير جمالي
            setTimeout(() => {
                 banner.classList.add('show');
            }, 500); 
        }
    }

    // إضافة مستمع لزر الإغلاق (X)
    if (closeBannerBtn) {
        closeBannerBtn.addEventListener('click', hideBanner);
    }
    
    // إظهار الشريط عند الانتهاء من تحميل الصفحة بالكامل
    showBanner();


    console.info("🎉 مجلة الملتقى: تم تفعيل 18 وظيفة جافاسكريبت بجودة عالية.");
});
