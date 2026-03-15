document.addEventListener('DOMContentLoaded', () => {
    /* --- Tema Değiştirme (Koyu/Açık Tema) --- */
    const themeSlider = document.getElementById('theme-slider');
    const body = document.body;

    // Kullanıcının daha önceden seçmiş olduğu temayı kontrol et
    const savedTheme = localStorage.getItem('theme');

    // Eğer kaydedilmiş tema varsa onu uygula, yoksa varsayılan olarak light devam edecek
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeSlider.checked = true;
        }
    }

    // Seçim değiştiğinde temayı güncelle
    themeSlider.addEventListener('change', () => {
        if (themeSlider.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    /* --- Mobil Menü (Hamburger) --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // Menü iconuna tıklandığında menüyü aç/kapat
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Hamburger ikonu değişimi (bars <-> times)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Menüdeki linklere tıklandığında (ilgili bölüme smooth scroll inerek) menüyü kapat
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');

            // İkonu geri düzelt
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* --- Navbar Scroll Gölge Efekti --- */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--nav-shadow)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    /* --- Typing Effect --- */
    const typeText = 'System.out.println("Hoş geldiniz! 👋");';
    // JavaScript'in emojileri iki karakter (surrogate pair) olarak bölmesini engellemek için Array'e çeviriyoruz:
    const typeChars = Array.from(typeText);
    const typingElement = document.getElementById('typing-text');
    let typeIndex = 0;
    
    function typeWriter() {
        if (typeIndex < typeChars.length) {
            let char = typeChars[typeIndex];
            // Eğer yazılan öğe el sallama emojisi ise doğrudan CSS animasyon class'ı ile sararak ekliyoruz:
            if (char === '👋') {
                typingElement.innerHTML += '<span class="wave">👋</span>';
            } else {
                typingElement.innerHTML += char;
            }
            typeIndex++;
            setTimeout(typeWriter, 100); // 100ms yazma hızı
        }
    }
    
    // Yüklenme sonrası gecikmeden biraz sonra başlat
    setTimeout(typeWriter, 600);
});
