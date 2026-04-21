const shareBtn = document.getElementById('shareBtn');
const qrDialog = document.getElementById('qrDialog');
const closeQrBtn = document.getElementById('closeQrBtn');
const qrContainer = document.getElementById('qrcode');
const sendLinkBtn = document.getElementById('sendLinkBtn');

function openShare() {
  qrDialog.showModal();
  renderQr();
}

function renderQr() {
  if (qrContainer.dataset.rendered === 'true') return;

  const qrFn = window.qrcode;

  if (typeof qrFn !== 'function') {
    qrContainer.innerHTML =
      '<p>QR code indisponível. Copie o link: <br><code>' +
      window.location.href +
      '</code></p>';
    qrContainer.dataset.rendered = 'true';
    return;
  }

  try {
    const qr = qrFn(0, 'M');
    qr.addData(window.location.href);
    qr.make();
    qrContainer.innerHTML = qr.createSvgTag({ cellSize: 6, margin: 4, scalable: true });
    qrContainer.dataset.rendered = 'true';
  } catch (error) {
    qrContainer.innerHTML =
      '<p>Falha ao gerar QR. Link: <br><code>' +
      window.location.href +
      '</code></p>';
    qrContainer.dataset.rendered = 'true';
  }
}

async function sendLink() {
  const url = window.location.href;
  const shareData = {
    title: document.title,
    text: 'Cartão digital da Opus Interiores',
    url,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error?.name === 'AbortError') return;
      // fall through to clipboard
    }
  }

  await copyToClipboard(url);
}

async function copyToClipboard(url) {
  const originalLabel = sendLinkBtn.textContent.trim();
  try {
    await navigator.clipboard.writeText(url);
    sendLinkBtn.textContent = 'Link copiado';
  } catch {
    sendLinkBtn.textContent = 'Falha ao copiar';
  }
  setTimeout(() => {
    sendLinkBtn.textContent = originalLabel;
  }, 2000);
}

shareBtn.addEventListener('click', openShare);
sendLinkBtn.addEventListener('click', sendLink);
closeQrBtn.addEventListener('click', () => qrDialog.close());
qrDialog.addEventListener('click', (event) => {
  if (event.target === qrDialog) qrDialog.close();
});
