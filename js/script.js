document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll(
    '.hero-step-one, .hero-step-two, .hero-step-three, .hero-step-four, .hero-step-five'
  );
  let currentStep = 0;

  steps.forEach((step, index) => {
    const button = step.querySelector('.continueButton');
    if (button) {
      button.addEventListener('click', function () {
        steps[currentStep].style.display = 'none';

        currentStep++;
        if (currentStep < steps.length) {
          steps[currentStep].style.display = 'block';
        }

        if (currentStep === steps.length) {
          openSMSApp();
        }
      });
    }
  });

    function openSMSApp() {
        const phoneNumber = '1234';
        const message = 'TEST';

        if (navigator.canShare && navigator.canShare({ url: '', text: '' })) {
            alert('Будь ласка, відкрийте додаток на своєму телефоні для надсилання SMS.');
        } else {
            window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
        }
    }
});
