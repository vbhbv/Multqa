//
// جافاسكريبت مجلة الملتقى - التفاعلية الفائقة والوضع الليلي (10 وظائف)
//

document.addEventListener('DOMContentLoaded', () => {
    // ===================================================
    // 1. الوضع الليلي الاحترافي (Dark Mode Toggle)
    // ===================================================
    const applyTheme = (theme) => {
        const body = document.body;
        const toggleButton = document.getElementById('dark-mode-toggle');
        const localStorageKey = 'multaqa_theme_v4';

        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (toggleButton) {
                toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
                toggleButton.setAttribute('aria-label', 'تبديل إلى الوضع النهاري');
            }
            localStorage.setItem(localStorageKey, 'dark');
        } else {
            body.classList.remove('dark-mode');
            if (toggleButton) {
                toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
                toggleButton.setAttribute('aria-label', 'تبديل إلى الوضع الليلي');
            }
            localStorage.setItem(localStorageKey, 'light');
        }
    };

    const initTheme = () => {
        const savedTheme = localStorage.getItem('multaqa_theme_v4');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (prefersDark) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    };
    initTheme();

    // ===================================================
    // 2. مستمع النقر لتبديل الثيم
    // ===================================================
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            applyTheme(isDarkMode ? 'light' : 'dark');
        });
    }

    // ===================================================
    // 3. التحريك عند التمرير (Scroll Reveal)
    // ===================================================
    const scrollReveal = () => {
        const cards = document.querySelectorAll('.card');
        const triggerBottom = window.innerHeight * 0.8; // 80% من نافذة العرض

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                card.classList.add('visible');
            }
        });
    };
    
    // ===================================================
    // 4. تشغيل التحريك عند تحميل الصفحة والتمرير
    // ===================================================
    window.addEventListener('scroll', scrollReveal);
    scrollReveal(); // لتشغيله عند التحميل الأولي للصفحة

    // ===================================================
    // 5. تأثير التكبير الخفيف على الـ Logo عند التحميل
    // ===================================================
    const animateLogo = () => {
        const logo = document.querySelector('.logo a');
        if (logo) {
            logo.style.transition = 'transform 1s ease-out';
            logo.style.transform = 'scale(1.05)';
            setTimeout(() => {
                logo.style.transform = 'scale(1)';
            }, 1000);
        }
    };
    animateLogo();

    // ===================================================
    // 6. تظليل الهيدر عند التمرير
    // ===================================================
    const stickyHeaderShadow = () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 1px 15px rgba(0, 0, 0, 0.05)';
        }
    };
    window.addEventListener('scroll', stickyHeaderShadow);

    // ===================================================
    // 7. تحريك زر 'اقرأ الآن' عند التمرير بالماوس
    // ===================================================
    document.querySelectorAll('.btn-read, .btn-action').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // تأثير تحريك خفيف داخل الزر (Tilt Effect)
            e.target.style.transform = `perspective(1000px) rotateX(${(y - rect.height / 2) / 15}deg) rotateY(${-(x - rect.width / 2) / 15}deg)`;
        });

        // إزالة التأثير عند مغادرة الماوس
        button.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'none';
        });
    });

    // ===================================================
    // 8. مؤشر التقدم الأفقي للقراءة (لصفحات المقالات)
    // * يُفترض وجوده في ملفات المقالات وليس الصفحة الرئيسية *
    // ===================================================
    // (سنترك هذه الوظيفة كمثال لوضعها في ملفات المقالات: article_X.html)
    const readingProgressIndicator = () => {
        const body = document.body, html = document.documentElement;
        const totalHeight = Math.max(body.scrollHeight, body.offsetHeight, 
                                     html.clientHeight, html.scrollHeight, html.offsetHeight);
        const scrollFromTop = document.documentElement.scrollTop;
        const viewportHeight = document.documentElement.clientHeight;
        
        const progress = (scrollFromTop / (totalHeight - viewportHeight)) * 100;
        
        // يمكن تحديث عنصر HTML هنا (مثال: div بعرض 100%)
        // console.log(`Reading Progress: ${progress.toFixed(2)}%`);
    };
    window.addEventListener('scroll', readingProgressIndicator);


    // ===================================================
    // 9. رسالة ترحيبية قصيرة في الكونسول (للمطورين/المتصفحين المتقدمين)
    // ===================================================
    console.info("🎉 مرحباً بك في مجلة الملتقى الثقافي للكتاب! نحن نستخدم جافاسكريبت لتقديم تجربة قراءة فريدة.");
    console.log("%cتم تصميم هذا الموقع بعناية فائقة.", "color: #E5B800; font-size: 14px; font-weight: bold;");

    // ===================================================
    // 10. إظهار/إخفاء رسالة حقوق النشر في الفوتر عند التمرير
    // ===================================================
    const footerTextFade = () => {
        const footer = document.querySelector('.footer');
        if (window.scrollY > document.body.scrollHeight - window.innerHeight - 200) {
            footer.style.opacity = '1';
        } else {
            footer.style.opacity = '0.8';
        }
    };
    window.addEventListener('scroll', footerTextFade);
});
