# Opus Card

Cartão digital estático para a Opus Interiores. Mobile-first, um arquivo `.vcf` para
"Salvar contato", e um botão "Compartilhar" que usa `navigator.share()` no celular com
fallback para QR code no desktop.

## Rodar localmente

```sh
cd opus-card
python3 -m http.server 8000
# abrir http://localhost:8000
```

`navigator.share()` exige HTTPS, então em `localhost` o botão de compartilhar vai abrir
o modal de QR (fallback). Para testar o share nativo, use deploy em HTTPS ou um túnel
tipo `ngrok`.

## Deploy no GitHub Pages

Recomendação: **criar um repositório novo** só para o cartão, em vez de servir a partir
de um subdiretório de outro repo.

1. Criar repo público `opus-card` no GitHub.
2. Copiar o conteúdo deste diretório para a raiz do repo novo.
3. Push para `main`.
4. `Settings > Pages > Source: main, /(root)`.
5. URL ficará em `https://SEUUSUARIO.github.io/opus-card/`.

### Antes de publicar, trocar placeholders:

**Em `index.html`:**
- `canonical`, `og:url`, `og:image`, `twitter:image` — URLs absolutas com o domínio final.
- Telefone do WhatsApp (`wa.me/5521999999999` e `+55 21 99999-9999`).
- E-mail.
- Handle do Instagram.
- URL do site.
- Endereço / link de Maps.

**Em `contact.vcf`:**
- `TEL`, `EMAIL`, `URL`, `ADR`.

**Em `manifest.json`:**
- `name`, `short_name`, `description` se quiser customizar.

## Arquivos

- `index.html` — landing page.
- `styles.css` — visual.
- `main.js` — share + QR modal (com fallback se a CDN do QR falhar).
- `contact.vcf` — vCard 3.0.
- `avatar.jpg` — placeholder 800x800.
- `favicon.svg` — placeholder "O".
- `manifest.json` — PWA mínimo (habilita "Adicionar à tela inicial", sem service worker).
- `robots.txt` — allow all.

## Limitações conhecidas

- **Teste real em iOS/Android**: o fluxo de "Adicionar aos contatos" depende do
  navegador/SO. Testar em device físico antes de publicar. GitHub Pages serve `.vcf`
  como `text/vcard`, que é o correto; iOS deve acionar a folha de contatos, Android
  Chrome baixa o arquivo e o usuário precisa tocar para importar.
- **Sem service worker**: sem offline. Se quiser app-like completo, adicionar um SW
  mínimo cacheando os assets estáticos.
- **QR code via CDN jsdelivr**: se a CDN cair, o modal mostra o link em texto como
  fallback. Para tirar dependência externa, bundlar `qrcode@1.5.4` localmente.
- **OG image 800x800**: preview de link em WhatsApp/Facebook vai ser cortado. Para
  preview ideal, gerar versão 1200x630.

## UI/UX

Visual atual é o starter do Codex. Pass de design será feito separadamente quando a
funcionalidade estiver validada em device real.
