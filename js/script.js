document.addEventListener('DOMContentLoaded', function () {
  const steps = document.querySelectorAll(
    '.hero-step-one, .hero-step-two, .hero-step-three, .hero-step-four, .hero-step-five'
  );
  let currentStep = 0;

  steps.forEach((step, index) => {
    const button = step.querySelector('.continueButton');
    if (button) {
      button.addEventListener('click', function () {
        if (currentStep === 3) {
          steps[currentStep].style.display = 'none';
          currentStep = 4;
          steps[currentStep].style.display = 'block';
        } else if (currentStep === 4) {
          openSMSApp();
        } else {
          if (currentStep < steps.length - 1) {
            steps[currentStep].style.display = 'none';
            currentStep++;
            steps[currentStep].style.display = 'block';
          }
        }

        if (currentStep === 2) {
          let percentage = 0;
          changeClipPathAndText(0);
          const timer = setInterval(() => {
            percentage += 25;
            if (percentage <= 100) {
              changeClipPathAndText(percentage);
            } else {
              clearInterval(timer);
              steps[currentStep].style.display = 'none';
              currentStep++;
              steps[currentStep].style.display = 'block';
            }
          }, 3000);
        }
      });
    }
  });

  function changeClipPathAndText(percentage) {
    const filledBox = document.querySelector('.hero-step-three__loader__box--filled');
    const textElement = document.querySelector('.hero-step-three__loader__text span');
    if (percentage === 0) {
      filledBox.style.border = 'none';
    } else if (percentage === 25) {
      filledBox.style.clipPath = 'polygon(50% 50%, 100% 0%, 100% 101%, 50% 50%, 0% 25%)';
      filledBox.style.border = '5px solid var(--accent-color)';
    } else if (percentage === 50) {
      filledBox.style.clipPath = 'polygon(50% 50%, 100% 0%, 100% 100%, 0% 100%)';
    } else if (percentage === 75) {
      filledBox.style.clipPath = 'polygon(50% 50%, 100% 0%, 100% 100%, 0% 100%, 0% -4%)';
    } else {
      filledBox.style.clipPath = 'none';
    }

    if (percentage === 0) {
      textElement.textContent = '0 %';
    } else {
      textElement.textContent = percentage + ' %';
    }
  }

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
