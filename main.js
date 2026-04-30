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

    // Finalizar Pedido Logic
    const btnFinalizar = document.getElementById('btn-finalizar');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', async () => {
            // Mostrar carregamento
            btnFinalizar.classList.add('loading');
            
            try {
                // Simulação da resposta do Supabase (2 segundos)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                alert('Pedido finalizado com sucesso! (Simulação Supabase)');
                
                // Aqui você integraria o código real do Supabase:
                // const { data, error } = await supabase.from('pedidos').insert([...]);
                
            } catch (error) {
                console.error('Erro ao finalizar pedido:', error);
                alert('Ocorreu um erro ao processar seu pedido.');
            } finally {
                // Remover carregamento
                btnFinalizar.classList.remove('loading');
            }
        });
    }
});
