
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-quote-form]');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const fields = {
      "Company name": data.get('companyName') || '',
      "Contact person": data.get('contactPerson') || '',
      "Email": data.get('email') || '',
      "Phone": data.get('phone') || '',
      "Service needed": data.get('serviceNeeded') || '',
      "Origin": data.get('origin') || '',
      "Destination": data.get('destination') || '',
      "Shipment / cargo type": data.get('cargoType') || '',
      "Operational notes": data.get('message') || '',
    };
    const subject = encodeURIComponent('B2B Logistics Inquiry - Yuxinou Website');
    const body = encodeURIComponent(
      Object.entries(fields).map(([k,v]) => `${k}: ${v}`).join('\n')
    );
    const mailto = `mailto:info@yuxinou.de?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    const status = document.querySelector('.status');
    if (status) status.textContent = 'Your email client should open with the inquiry prefilled.';
  });
});
