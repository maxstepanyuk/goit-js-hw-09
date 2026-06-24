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
  const currentValue = target.value.trim();

  formData[currentKey] = currentValue;
  localStorage.setItem(LS_FORM_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const target = event.target;
  const submittedData = Object.fromEntries(new FormData(target));

  for (const key in submittedData) {
    if (submittedData[key].trim() === '') {
      alert('Fill please all fields');
      return;
    }
  }

  for (const key in submittedData) {
    formData[key] = submittedData[key].trim();
  }

  console.log(formData);
  reset();
});

function populateFormOnLoad() {
  const lsFormData = JSON.parse(localStorage.getItem(LS_FORM_KEY));
  if (lsFormData === null) {
    return;
  }

  for (const key in lsFormData) {
    formData[key] = lsFormData[key] || '';
    form.elements[key].value = lsFormData[key] || '';
  }
}

function reset() {
  localStorage.removeItem(LS_FORM_KEY);
  form.reset();
  for (const key in formData) {
    formData[key] = '';
  }
}
