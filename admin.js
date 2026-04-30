document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('stockChart').getContext('2d');
    
    // Cores da paleta Luxury Truffle
    const primaryColor = '#D4AF37'; // Gold Leaf
    const accentColor = '#2D1B14';  // Dark Truffle
    const secondaryColor = '#E8D1D1'; // Rose Quartz
    
    const stockChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cone Trufado', 'Macarons', 'Pudim de Leite', 'Eclairs', 'Torta de Limão', 'Piche de Pistache'],
            datasets: [{
                label: 'Nível de Estoque (Unidades)',
                data: [45, 120, 15, 30, 22, 55],
                backgroundColor: [
                    primaryColor,
                    accentColor,
                    secondaryColor,
                    primaryColor,
                    accentColor,
                    secondaryColor
                ],
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 10, // Bordas arredondadas modernas
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Esconder legenda para um look mais clean
                },
                tooltip: {
                    backgroundColor: '#2D1B14',
                    titleFont: { family: 'Montserrat', size: 14 },
                    bodyFont: { family: 'Montserrat', size: 13 },
                    padding: 15,
                    cornerRadius: 10,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: { family: 'Montserrat', size: 12 }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { family: 'Montserrat', size: 12, weight: '600' }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });

    // Redimensionar o container para o gráfico ficar bonito
    const chartContainer = document.querySelector('.chart-container');
    chartContainer.style.height = '400px';

    // Image Preview Logic
    const imageUrlInput = document.getElementById('product-image-url');
    const imagePreview = document.getElementById('image-preview');
    const previewContainer = document.getElementById('preview-container');

    if (imageUrlInput) {
        imageUrlInput.addEventListener('input', (e) => {
            const url = e.target.value;
            if (url && url.length > 5) {
                imagePreview.src = url;
                previewContainer.style.display = 'block';
            } else {
                previewContainer.style.display = 'none';
                imagePreview.src = '';
            }
        });

        // Caso ocorra erro no carregamento da imagem (URL inválida)
        imagePreview.addEventListener('error', () => {
            previewContainer.style.display = 'none';
        });
    }
});
