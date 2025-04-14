"use strict";

// Функция для инициализации слайдера
function initializeSlider(sliderSelector) {
    const slides = document.querySelectorAll(sliderSelector);
    if (slides.length === 0) return; // Если слайдов нет, выходим из функции

    let currentIndex = 0;
    slides[currentIndex].classList.add('active');

    function showSlide(index) {
        if (!slides[currentIndex] || !slides[index]) return; // Проверка на undefined

        slides[currentIndex].classList.remove('active');
        slides[index].classList.add('active');
        currentIndex = index;
    }

    function startSlider() {
        setInterval(() => {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        }, 5000);
    }

    startSlider();
}

// Запускаем слайдеры после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    initializeSlider('.slider_1_image');
    initializeSlider('.slider_2_1_image');
    initializeSlider('.slider_2_2_image');
    initializeSlider('.slider_2_3_image');
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    const closeModal = document.getElementById('closeModal');

    // Открытие модального окна с текстом
    document.getElementById('moreInfoBtn').addEventListener('click', () => {
        modalText.textContent = 'Чуть больше информации';
        modal.style.display = 'flex';
    });

    // Открытие модального окна с рандомным пользователем
    document.getElementById('privacyPolicyBtn').addEventListener('click', async () => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await res.json();
            const randomUser = users[Math.floor(Math.random() * users.length)];

            modalText.innerHTML = `
                Узнавать у 
                <strong>${randomUser.name}</strong><br>
                Email: ${randomUser.email}<br>
                Phone: ${randomUser.phone}<br>
                Website: ${randomUser.website}
            `;
            modal.style.display = 'flex';
        } catch (err) {
            modalText.textContent = 'Ошибка загрузки данных.';
            modal.style.display = 'flex';
        }
    });

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Закрытие по клику вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
