class Toast {

  _type = {
    success: 'c-toast__message--success',
    error: 'c-toast__message--error',
    warning: 'c-toast__message--warning',
  };
  _duration;
  _toastTimeout;
  _options = {
    showTimer: true
  };

  constructor(duration, options) {
    this._duration = duration ?? 5000;
    this._options = {
      ...this._options,
      ...options
    };
  }

  _createToast(duration) {

    if (this._toastTimeout) {
      clearTimeout(this._toastTimeout);
    }
    else {
      $('body').append(`<div id="toast" class="c-toast">`);
    }

    this._toastTimeout = setTimeout(() => {
      $('#toast').remove();
      this._toastTimeout = null;
    }, (duration ?? this._duration) + 1000);
  }

  _createMessage(type, msg, duration, action) {

    const $toastTimer = $(`<div class="c-toast__duration"><div style="animation: normal ${(duration ?? this._duration) / 1000}s loading"></div></div>`);
    const $message = $(`
      <div class="c-toast__message ${this._type[type]}">
        <div class="c-toast__icon">
          <i class="${this._mapTypeForIcon(type)}"></i>
        </div>
        <p class="c-toast__label">${msg}</p>
      </div>
    `);

    if (this._options.showTimer)
      $message.append($toastTimer);

    $message.on('click', this._handleCloseMessage.bind(this, action));
    $('#toast').prepend($message);

    this._showMessage($message);
    setTimeout(() => this._closeMessage($message), this._duration);
  }

  _mapTypeForIcon(type) {

    switch (this._type[type]) {
      case this._type.success:
        return 'fa-solid fa-check';
      case this._type.warning:
        return 'fa-solid fa-exclamation';
      case this._type.error:
        return 'fa-solid fa-times';
    }

    return 'fa-solid fa-exclamation';
  }

  _showMessage($message) {
    setTimeout(() => {
      $message.addClass('c-toast__message--visible');
      new Audio('assets/audios/notify_2.mp3').play();
    }, 100);
  }

  _closeMessage($message) {
    $message.removeClass('c-toast__message--visible');
    setTimeout(() => $message.remove(), 500);
  }

  _handleCloseMessage(action, e) {

    if (action)
      action();

    const $message = $(e.currentTarget).closest('.c-toast__message');
    this._closeMessage($message);
  }

  alert(msg, duration, action) {
    this._createToast(duration);
    this._createMessage('warning', msg, duration, action);
  }

  error(msg, duration, action) {
    this._createToast(duration);
    this._createMessage('error', msg, duration, action);
  }

  success(msg, duration, action) {
    this._createToast(duration);
    this._createMessage('success', msg, duration, action);
  }

  info(msg, duration, action) {
    this._createToast(duration);
    this._createMessage('info', msg, duration, action);
  }
}

