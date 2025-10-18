// أكواد جافاسكريبت احترافية لتحقيق زر الوضع الليلي (Dark Mode Toggle)

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const localStorageKey = 'theme'; // مفتاح التخزين المحلي

    // 1. الوظيفة الأساسية لتطبيق أو إزالة الوضع الليلي
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            // تحديث حالة الزر (إذا كان يستخدم أيقونة أو نصاً)
            if (toggleButton) {
                toggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // أيقونة الشمس
                toggleButton.setAttribute('aria-label', 'الوضع النهاري');
            }
        } else {
            body.classList.remove('dark-mode');
            if (toggleButton) {
                toggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // أيقونة القمر
                toggleButton.setAttribute('aria-label', 'الوضع الليلي');
            }
        }
    };

    // 2. التحقق من تفضيلات المستخدم المخزنة مسبقاً
    const savedTheme = localStorage.getItem(localStorageKey);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        // تطبيق وضع النظام المفضل إذا لم يتم التخزين مسبقاً
        applyTheme('dark');
        localStorage.setItem(localStorageKey, 'dark');
    } else {
        applyTheme('light');
    }

    // 3. وظيفة التبديل عند النقر على الزر
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // تطبيق الثيم الجديد وحفظه في الذاكرة المحلية
            applyTheme(newTheme);
            localStorage.setItem(localStorageKey, newTheme);

            console.log(`تم تبديل الثيم إلى: ${newTheme}`);
        });
    }
});

// ملاحظة: هذا الكود يفترض وجود زر بالـ ID: 'dark-mode-toggle' و استخدام Font Awesome للأيقونات
