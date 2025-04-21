// Функционал переключения темной темы
document.addEventListener('DOMContentLoaded', function() {
    // Получаем кнопку переключения темы
    const themeToggle = document.getElementById('themeToggle');
    
    // Проверяем, есть ли сохраненная тема в localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Если тема сохранена, применяем ее
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
    
    // Обработчик клика по кнопке темы
    themeToggle.addEventListener('click', function() {
        // Переключаем класс темной темы
        document.body.classList.toggle('dark-theme');
        
        // Сохраняем тему в localStorage
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark-theme');
        } else {
            localStorage.setItem('theme', '');
            document.body.classList.remove('dark-theme');
        }
    });
    
    // Функция для обновления года в футере
    function updateYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    // Вызываем функцию обновления года
    updateYear();
    
    // Валидация формы обратной связи
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Базовая валидация
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Проверка имени
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Пожалуйста, введите ваше имя');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            // Проверка email
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Пожалуйста, введите ваш email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Пожалуйста, введите корректный email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            // Проверка сообщения
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Пожалуйста, введите сообщение');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // Если форма валидна, показываем сообщение об успешной отправке
            if (isValid) {
                // Имитация отправки формы
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Отправка...';
                
                // Имитация задержки отправки
                setTimeout(function() {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Отправить';
                    
                    // Показываем сообщение об успешной отправке
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Сообщение успешно отправлено! Спасибо за обращение.';
                    
                    contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                    
                    // Убираем сообщение через 5 секунд
                    setTimeout(function() {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // Функция для проверки корректности email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Функция для отображения ошибки
    function showError(input, message) {
        // Удаляем предыдущую ошибку, если есть
        removeError(input);
        
        // Создаем сообщение об ошибке
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        // Добавляем класс ошибки к полю ввода
        input.classList.add('input-error');
        
        // Вставляем сообщение после поля ввода
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }
    
    // Функция для удаления ошибки
    function removeError(input) {
        input.classList.remove('input-error');
        const errorMessage = input.nextElementSibling;
        if (errorMessage && errorMessage.className === 'error-message') {
            errorMessage.remove();
        }
    }
});