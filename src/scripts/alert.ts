// Alert bar fixed to the bottom of the screen. Replaces the old jQuery Alert helper.

type AlertType = 'success' | 'info' | 'warning' | 'danger';

function elements() {
  const container = document.getElementById('footer-alert');
  const text = document.getElementById('footer-alert-text');
  return container && text ? { container, text } : null;
}

export function showAlert(type: AlertType, message: string) {
  const parts = elements();
  if (!parts) return;
  parts.container.className = `alert alert-${type} alert-dismissible`;
  parts.text.textContent = message;
  parts.container.hidden = false;
}

export function hideAlert() {
  const parts = elements();
  if (parts) parts.container.hidden = true;
}
