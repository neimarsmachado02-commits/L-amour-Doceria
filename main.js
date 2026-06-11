document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animElements = document.querySelectorAll('.animate-up, .animate-fade');
    animElements.forEach(el => revealObserver.observe(el));

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Initial load animation for hero section
    setTimeout(() => {
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        if (heroText) heroText.classList.add('reveal');
        if (heroImage) heroImage.classList.add('reveal');
    }, 300);

    // Smooth scroll for nav links (handled by CSS, but insurance)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Payment Selection Logic
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const pixDetails = document.getElementById('pix-details');
    const cardDetails = document.getElementById('card-details');

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'pix') {
                pixDetails.style.display = 'block';
                cardDetails.style.display = 'none';
            } else {
                pixDetails.style.display = 'none';
                cardDetails.style.display = 'block';
            }
        });
    });

    // Finalizar Pedido Logic com Validação Embutida
    const btnFinalizar = document.getElementById('btn-finalizar');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', async () => {
            // Capturar Campos de Entrega
            const endereco = document.getElementById('endereco').value.trim();
            const bairro = document.getElementById('bairro').value.trim();
            const cidade = document.getElementById('cidade').value.trim();
            
            // Validar Entrega
            if (!endereco || !bairro || !cidade) {
                alert('⚠️ Por favor, preencha todos os dados de entrega (Endereço, Bairro e Cidade).');
                return;
            }

            // Validar Pagamento
            const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
            
            if (paymentMethod === 'card') {
                const cardNumber = document.getElementById('card-number').value.trim();
                const cardExpiry = document.getElementById('card-expiry').value.trim();
                const cardCvv = document.getElementById('card-cvv').value.trim();

                if (!cardNumber || !cardExpiry || !cardCvv) {
                    alert('⚠️ Por favor, preencha todos os dados do cartão de crédito.');
                    return;
                }
                
                if (cardNumber.length < 16) {
                    alert('⚠️ O número do cartão deve ter pelo menos 16 dígitos.');
                    return;
                }
            }

            // Se chegou aqui, os dados estão válidos. Iniciar processamento.
            btnFinalizar.classList.add('loading');
            
            try {
                // Simulação de delay para processamento (2 segundos)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                alert('✨ Sucesso! Seu pedido na L’amour Doceria foi recebido e está sendo preparado com muito carinho.');
                
                // Limpar formulário após sucesso (opcional)
                document.getElementById('endereco').value = '';
                document.getElementById('bairro').value = '';
                document.getElementById('cidade').value = '';
                if (paymentMethod === 'card') {
                    document.getElementById('card-number').value = '';
                    document.getElementById('card-expiry').value = '';
                    document.getElementById('card-cvv').value = '';
                }

            } catch (error) {
                console.error('Erro ao finalizar pedido:', error);
                alert('❌ Ocorreu um erro ao processar seu pedido. Tente novamente.');
            } finally {
                btnFinalizar.classList.remove('loading');
            }
        });
    }
});
