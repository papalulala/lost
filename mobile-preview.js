(() => {
  if (window.self !== window.top) return;

  function makeToggle(label, pressed) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mobile-preview-toggle';
    button.title = label;
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', String(pressed));
    return button;
  }

  const openButton = makeToggle('切換為手機版比例', false);
  const closeButton = makeToggle('返回電腦版比例', true);
  const dialog = document.createElement('dialog');
  dialog.className = 'mobile-preview-dialog';
  dialog.setAttribute('aria-label', '手機版比例');
  dialog.append(closeButton);
  document.body.append(openButton, dialog);

  let frame;
  openButton.addEventListener('click', () => {
    if (frame) return;
    frame = document.createElement('iframe');
    frame.className = 'mobile-preview-frame';
    frame.title = '手機版網站';
    frame.src = window.location.href;
    dialog.append(frame);
    dialog.showModal();
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    const currentPage = frame.contentDocument?.URL;
    frame.remove();
    frame = undefined;
    if (currentPage && currentPage !== 'about:blank' && currentPage !== window.location.href) {
      window.location.assign(currentPage);
    }
  });
})();
