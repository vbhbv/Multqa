//
// جافاسكريبت عالمي لمجلة الملتقى: وظيفة الوضع الليلي (Dark Mode Toggle)
// تم كتابة الكود بأفضل الممارسات لضمان السرعة والفعالية.
//
document.addEventListener('DOMContentLoaded', () => {
    // تحديد العناصر الأساسية
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const localStorageKey = 'multaqa_theme_v3'; // مفتاح فريد للإصدار الجديد

    // 1. الوظيفة الأساسية لتطبيق الثيم وحفظه
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (toggleButton) {
                // أيقونة الشمس تشير إلى أنه يمكن التبديل للوضع النهاري
                toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
                toggleButton.setAttribute('aria-label', 'تبديل إلى الوضع النهاري');
            }
            localStorage.setItem(localStorageKey, 'dark');
        } else {
            body.classList.remove('dark-mode');
            if (toggleButton) {
                // أيقونة القمر تشير إلى أنه يمكن التبديل للوضع الليلي
                toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
                toggleButton.setAttribute('aria-label', 'تبديل إلى الوضع الليلي');
            }
            localStorage.setItem(localStorageKey, 'light');
        }
    };

    // 2. التهيئة: التحقق من التفضيل السابق أو تفضيل النظام
    const savedTheme = localStorage.getItem(localStorageKey);
    // التحقق من تفضيل نظام التشغيل باستخدام Media Query
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        // تطبيق تفضيل النظام عند الزيارة الأولى
        applyTheme('dark');
    } else {
        // الافتراضي
        applyTheme('light');
    }

    // 3. مستمع الحدث للنقر على الزر
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            // التحقق من الثيم الحالي لتبديله
            const isDarkMode = body.classList.contains('dark-mode');
            const newTheme = isDarkMode ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    console.log("تم تحميل جافاسكريبت مجلة الملتقى بنجاح.");
});
