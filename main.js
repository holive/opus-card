const shareBtn = document.getElementById('shareBtn');
const qrDialog = document.getElementById('qrDialog');
const closeQrBtn = document.getElementById('closeQrBtn');
const qrContainer = document.getElementById('qrcode');

async function openShare() {
  const shareData = {
    title: document.title,
    text: 'Cartão digital da Opus Interiores',
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error?.name === 'AbortError') return;
    }
  }

  qrDialog.showModal();
  renderQr();
}

function renderQr() {
  if (qrContainer.dataset.rendered === 'true') return;

  if (typeof QRCode === 'undefined') {
    qrContainer.innerHTML =
      '<p>QR code indisponível. Copie o link: <br><code>' +
      window.location.href +
      '</code></p>';
    qrContainer.dataset.rendered = 'true';
    return;
  }

  try {
    QRCode.toCanvas(qrContainer, window.location.href, {
      width: 220,
      margin: 1,
    });
    qrContainer.dataset.rendered = 'true';
  } catch (error) {
    qrContainer.innerHTML =
      '<p>Falha ao gerar QR. Link: <br><code>' +
      window.location.href +
      '</code></p>';
    qrContainer.dataset.rendered = 'true';
  }
}

shareBtn.addEventListener('click', openShare);
closeQrBtn.addEventListener('click', () => qrDialog.close());
qrDialog.addEventListener('click', (event) => {
  if (event.target === qrDialog) qrDialog.close();
});
