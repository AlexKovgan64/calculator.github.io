// Показать определенный раздел
        function showSection(sectionId) {
            // Скрыть все разделы
            document.getElementById('home-section').style.display = 'none';
            document.getElementById('calculators-section').style.display = 'none';
            document.getElementById('financial-calculator').style.display = 'none';
            document.getElementById('engineering-calculator').style.display = 'none';
            document.getElementById('statistical-calculator').style.display = 'none';
            document.getElementById('feedback-section').style.display = 'none';
            
            // Показать выбранный раздел
            if (sectionId === 'home') {
                document.getElementById('home-section').style.display = 'block';
            } else if (sectionId === 'calculators') {
                document.getElementById('calculators-section').style.display = 'block';
            } else if (sectionId === 'feedback') {
                document.getElementById('feedback-section').style.display = 'block';
            }
        }
        
        // Показать финансовый калькулятор
        function showFinancialCalculator() {
            showSection('');
            document.getElementById('financial-calculator').style.display = 'block';
            document.getElementById('financial-result').style.display = 'none';
        }
        
        // Показать инженерный калькулятор
        function showEngineeringCalculator() {
            showSection('');
            document.getElementById('engineering-calculator').style.display = 'block';
            document.getElementById('engineering-result').style.display = 'none';
        }
        
        // Показать статистический калькулятор
        function showStatisticalCalculator() {
            showSection('');
            document.getElementById('statistical-calculator').style.display = 'block';
            document.getElementById('statistical-result').style.display = 'none';
            
            // Показываем второе поле ввода данных только для корреляции
            document.getElementById('stat-calc-type').addEventListener('change', function() {
                if (this.value === 'correlation') {
                    document.getElementById('second-data-group').style.display = 'block';
                } else {
                    document.getElementById('second-data-group').style.display = 'none';
                }
            });
        }
        
        // Финансовые расчеты
        function calculateFinancial() {
            const calcType = document.getElementById('calc-type').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const period = parseInt(document.getElementById('period').value);
            const rate = parseFloat(document.getElementById('rate').value);
            
            if (isNaN(amount) || isNaN(period) || isNaN(rate)) {
                alert('Пожалуйста, заполните все поля корректно');
                return;
            }
            
            let resultText = '';
            
            if (calcType === 'credit') {
                // Расчет кредита (аннуитетный платеж)
                const monthlyRate = rate / 100 / 12;
                const annuityPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, period) / (Math.pow(1 + monthlyRate, period) - 1);
                const totalPayment = annuityPayment * period;
                const overpayment = totalPayment - amount;
                
                resultText = `
                    <p><strong>Ежемесячный платеж:</strong> ${annuityPayment.toFixed(2)} руб.</p>
                    <p><strong>Общая сумма выплат:</strong> ${totalPayment.toFixed(2)} руб.</p>
                    <p><strong>Переплата:</strong> ${overpayment.toFixed(2)} руб.</p>
                `;
            } else if (calcType === 'deposit') {
                // Расчет вклада (с капитализацией)
                const monthlyRate = rate / 100 / 12;
                const totalAmount = amount * Math.pow(1 + monthlyRate, period);
                const income = totalAmount - amount;
                
                resultText = `
                    <p><strong>Итоговая сумма:</strong> ${totalAmount.toFixed(2)} руб.</p>
                    <p><strong>Доход:</strong> ${income.toFixed(2)} руб.</p>
                `;
            } else if (calcType === 'investment') {
                // Расчет инвестиций
                const yearlyRate = rate / 100;
                const totalAmount = amount * Math.pow(1 + yearlyRate, period / 12);
                const income = totalAmount - amount;
                
                resultText = `
                    <p><strong>Итоговая сумма через ${period} мес.:</strong> ${totalAmount.toFixed(2)} руб.</p>
                    <p><strong>Доход:</strong> ${income.toFixed(2)} руб.</p>
                `;
            }
            
            document.getElementById('financial-result-content').innerHTML = resultText;
            document.getElementById('financial-result').style.display = 'block';
        }
        
        // Инженерные расчеты
        function calculateEngineering() {
            const calcType = document.getElementById('eng-calc-type').value;
            const param1 = parseFloat(document.getElementById('param1').value);
            const param2 = parseFloat(document.getElementById('param2').value) || 0;
            const param3 = parseFloat(document.getElementById('param3').value) || 0;
            
            if (isNaN(param1)) {
                alert('Пожалуйста, заполните обязательные поля корректно');
                return;
            }
            
            let resultText = '';
            
            if (calcType === 'area') {
                // Расчет площади (прямоугольник)
                const area = param1 * (param2 || param1);
                resultText = `<p><strong>Площадь:</strong> ${area.toFixed(2)} кв.ед.</p>`;
            } else if (calcType === 'volume') {
                // Расчет объема (параллелепипед)
                const volume = param1 * (param2 || param1) * (param3 || param1);
                resultText = `<p><strong>Объем:</strong> ${volume.toFixed(2)} куб.ед.</p>`;
            } else if (calcType === 'conversion') {
                // Конвертация единиц (метры в футы)
                const feet = param1 * 3.28084;
                resultText = `<p><strong>${param1} метров = ${feet.toFixed(2)} футов</p>`;
            }
            
            document.getElementById('engineering-result-content').innerHTML = resultText;
            document.getElementById('engineering-result').style.display = 'block';
        }
        
        // Статистические расчеты
        function calculateStatistical() {
            const calcType = document.getElementById('stat-calc-type').value;
            const dataInput = document.getElementById('data-input').value;
            const dataInput2 = document.getElementById('data-input2').value;
            
            if (!dataInput) {
                alert('Пожалуйста, введите данные для анализа');
                return;
            }
            
            // Преобразуем строку данных в массив чисел
            const data = dataInput.split(',').map(item => parseFloat(item.trim())).filter(item => !isNaN(item));
            
            let data2 = [];
            if (calcType === 'correlation' && dataInput2) {
                data2 = dataInput2.split(',').map(item => parseFloat(item.trim())).filter(item => !isNaN(item));
            }
            
            if (data.length === 0) {
                alert('Не удалось распознать данные. Пожалуйста, введите числа, разделенные запятыми.');
                return;
            }
            
            let resultText = '';
            
            if (calcType === 'average') {
                // Средние значения
                const sum = data.reduce((acc, val) => acc + val, 0);
                const mean = sum / data.length;
                
                const sorted = [...data].sort((a, b) => a - b);
                const median = sorted.length % 2 === 0 
                    ? (sorted[sorted.length/2 - 1] + sorted[sorted.length/2]) / 2 
                    : sorted[Math.floor(sorted.length/2)];
                
                resultText = `
                    <p><strong>Среднее арифметическое:</strong> ${mean.toFixed(2)}</p>
                    <p><strong>Медиана:</strong> ${median.toFixed(2)}</p>
                    <p><strong>Минимальное значение:</strong> ${Math.min(...data).toFixed(2)}</p>
                    <p><strong>Максимальное значение:</strong> ${Math.max(...data).toFixed(2)}</p>
                `;
            } else if (calcType === 'correlation') {
                // Корреляция
                if (data2.length === 0 || data.length !== data2.length) {
                    alert('Для расчета корреляции необходимы две выборки одинакового размера');
                    return;
                }
                
                const mean1 = data.reduce((acc, val) => acc + val, 0) / data.length;
                const mean2 = data2.reduce((acc, val) => acc + val, 0) / data2.length;
                
                let covariance = 0;
                let variance1 = 0;
                let variance2 = 0;
                
                for (let i = 0; i < data.length; i++) {
                    covariance += (data[i] - mean1) * (data2[i] - mean2);
                    variance1 += Math.pow(data[i] - mean1, 2);
                    variance2 += Math.pow(data2[i] - mean2, 2);
                }
                
                covariance /= data.length;
                variance1 = Math.sqrt(variance1 / data.length);
                variance2 = Math.sqrt(variance2 / data2.length);
                
                const correlation = covariance / (variance1 * variance2);
                
                resultText = `
                    <p><strong>Коэффициент корреляции Пирсона:</strong> ${correlation.toFixed(4)}</p>
                    <p>Значение от -1 до 1, где 1 - полная прямая корреляция, -1 - полная обратная корреляция, 0 - отсутствие корреляции</p>
                `;
            } else if (calcType === 'regression') {
                // Простая линейная регрессия (y = a + bx)
                const x = data.map((_, i) => i + 1); // Используем порядковые номера как X
                const y = data;
                
                const n = x.length;
                const sumX = x.reduce((acc, val) => acc + val, 0);
                const sumY = y.reduce((acc, val) => acc + val, 0);
                const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
                const sumX2 = x.reduce((acc, val) => acc + val * val, 0);
                
                const b = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
                const a = (sumY - b * sumX) / n;
                
                resultText = `
                    <p><strong>Уравнение регрессии:</strong> y = ${a.toFixed(2)} + ${b.toFixed(2)}x</p>
                    <p>Где x - порядковый номер наблюдения, y - прогнозируемое значение</p>
                `;
            }
            
            document.getElementById('statistical-result-content').innerHTML = resultText;
            document.getElementById('statistical-result').style.display = 'block';
        }
        
        // Отправка обратной связи
        function sendFeedback() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все поля формы');
                return;
            }
            
            // Здесь должна быть логика отправки данных на сервер
            // Для демонстрации просто покажем сообщение об успехе
            
            document.getElementById('feedback-result').style.display = 'block';
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
            
            // Прокрутка к результату
            document.getElementById('feedback-result').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Инициализация при загрузке
        window.onload = function() {
            showSection('home');
            
            // Обработчик изменения типа статистического анализа
            document.getElementById('stat-calc-type').addEventListener('change', function() {
                if (this.value === 'correlation') {
                    document.getElementById('second-data-group').style.display = 'block';
                } else {
                    document.getElementById('second-data-group').style.display = 'none';
                }
            });
        };