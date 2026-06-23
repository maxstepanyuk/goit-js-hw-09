const form = document.querySelector('.feedback-form');
const formData = { email: '', message: '' };
const LS_FORM_KEY = 'feedback-form-state';

populateFormOnLoad();

form.addEventListener('input', event => {
  const target = event.target;

  const targetNodes = ['INPUT', 'TEXTAREA'];
  if (!targetNodes.includes(target.nodeName)) {
    return;
  }

  const currentKey = target.name;
  const currentValue = target.value;

  formData[currentKey] = currentValue;
  localStorage.setItem(LS_FORM_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const target = event.target;

  const formData = Object.fromEntries(new FormData(form));

  for (const key in formData) {
    if (form.elements[key].value === '') {
      alert('Fill please all fields');
      return;
    }
  }

  console.log(formData);
  reset();
});

function populateFormOnLoad() {
  const lsFormData = JSON.parse(localStorage.getItem(LS_FORM_KEY));
  for (const key in lsFormData) {
    form.elements[key].value = lsFormData[key];
  }
}

function reset() {
  localStorage.removeItem(LS_FORM_KEY);
  form.reset();
  for (const key in formData) {
    form.elements[key].value = '';
  }
}
