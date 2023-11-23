function showTooltip(element, day) {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            const dayData = data.find(item => item.day === day);

            if (dayData) {
                const tooltip = document.querySelector('.tooltip');
                tooltip.innerHTML = `$${dayData.amount.toFixed(2)}`;

                const barraHeight = element.querySelector('.barra').offsetHeight;
                const barraTop = element.querySelector('.barra').offsetTop;
                tooltip.style.left = `${element.offsetLeft + (element.offsetWidth - tooltip.offsetWidth) / 100}px`;
                tooltip.style.top = `${barraTop - 40}px`;
                tooltip.style.display = 'block';
            }
        })
        .catch(error => console.error('Erro ao carregar dados do JSON:', error));
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    tooltip.style.display = 'none';
}

fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        let maxAmount = -Infinity;
        let maxAmountElement = null;

        const daysElements = document.querySelectorAll('.mon, .tue, .wed, .thu, .fri, .sat, .sun');

        function transformBar(element, day) {
            const dayData = data.find(item => item.day === day);

            if (dayData) {
                const newHeight = dayData.amount * 2.5;
                const barra = element.querySelector('.barra');

                barra.style.height = `${newHeight}px`;

                if (dayData.amount > maxAmount) {
                    maxAmount = dayData.amount;
                    maxAmountElement = element;
                }
            }
        }

        daysElements.forEach(element => {
            const day = element.classList.contains('mon') ? 'mon' :
                element.classList.contains('tue') ? 'tue' :
                element.classList.contains('wed') ? 'wed' :
                element.classList.contains('thu') ? 'thu' :
                element.classList.contains('fri') ? 'fri' :
                element.classList.contains('sat') ? 'sat' :
                element.classList.contains('sun') ? 'sun' : null;

            if (day) {
                transformBar(element, day);
            }
        });

        if (maxAmountElement) {
            maxAmountElement.querySelector('.barra').style.backgroundColor = 'var(--blue-cyan)';
        }
    })
    .catch(error => console.error('Erro ao carregar dados do JSON:', error));




