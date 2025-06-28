document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('holder-name');
  const numberInput = document.getElementById('card-number-input');
  const monthInput = document.getElementById('month1');
  const yearInput = document.getElementById('year1');
  const cvvInput = document.getElementById('cvv1');

  const cardName = document.getElementById('card-name');
  const cardNumber = document.getElementById('card-number');
  const cardExp = document.getElementById('card-exp');
  const cardCVV = document.getElementById('card-cvv');

 
  const errorName = document.getElementById('error-name');
  const errorNumber = document.getElementById('error-number');
  const errorDate = document.getElementById('error-date');
  const errorCVV = document.getElementById('error-cvv');


  nameInput.addEventListener('input', () => {
    const val = nameInput.value;
    if(val.length<=16) {
        cardName.textContent = nameInput.value || 'Your name';
    }
    else {
        nameInput.value = val.slice(0,16);
        cardName.textContent = nameInput.value.slice(0,16) || 'Your name';
    }
  });

  numberInput.addEventListener('input', () => {
    let val = numberInput.value.replace(/\D/g, '').slice(0, 16);
    val = val.replace(/(.{4})/g, '$1 ').trim();
    numberInput.value = val;
    cardNumber.textContent = val || '0000 0000 0000 0000';
  });

  const updateExpDate = () => {
    const month = monthInput.value.padStart(2, '0');
    const year = yearInput.value.padStart(2, '0');
    cardExp.textContent = (month && year) ? `${month}/${year}` : '00/00';
  };
  monthInput.addEventListener('input', updateExpDate);
  yearInput.addEventListener('input', updateExpDate);

  cvvInput.addEventListener('input', () => {
    cardCVV.textContent = cvvInput.value || '000';
  });

 
  document.getElementById('card-form').addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;


    errorName.textContent = '';
    errorNumber.textContent = '';
    errorDate.textContent = '';
    errorCVV.textContent = '';

   
    const name = nameInput.value.trim();
    if (name.length==0) {
      errorName.textContent = 'Name is required.';
      valid = false;
    }
    else if(name.length>16) {
        errorName.textContent = 'Name must be 16 characters or less.';
        valid = false;
    }

    
    const cardNumDigits = numberInput.value.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumDigits)) {
      errorNumber.textContent = 'Card number must be exactly 16 digits, no letters allowed.';
      valid = false;
    }


    const monthVal = monthInput.value.trim();
    const yearVal = yearInput.value.trim();

    if (!/^\d{1,2}$/.test(monthVal) || Number(monthVal) < 1 || Number(monthVal) > 12) {
      errorDate.textContent = 'Enter a valid month (01 - 12).';
      valid = false;
    } else if (!/^\d{2}$/.test(yearVal)) {
      errorDate.textContent = 'Enter a valid 2-digit year.';
      valid = false;
    }


    if (!/^\d{3}$/.test(cvvInput.value.trim())) {
      errorCVV.textContent = 'CVV must be exactly 3 digits.';
      valid = false;
    }

    if (valid) {
      document.getElementById("card-form").reset();
      alert('Card details submitted successfully!');
    }
  });
});
