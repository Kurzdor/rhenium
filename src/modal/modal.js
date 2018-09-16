class Modal {
  constructor(el, options) {
    this.el = el || '[data-rhenium-modal]';
    this.options = Modal.optionsMerger(options);

    this.activeEl = '';

    ['clickHandler', 'closeModalHandler', 'resizeHandler'].forEach(method => {
      this[method] = this[method].bind(this);
    });

    this.init();
  }

  static optionsMerger(opts) {
    const instanceOptions = {
      speed: 300,
      type: 'default',
      alert: false,
      prefix: 'rhenium',
      bem: {
        init: false,
        modificator: false
      },
      close: {
        elem: 'modal-close',
        contentElem: 'modal-content',
        onClickOutside: true,
        onClickOutsideElem: 'modal',
        onKeyPress: true,
        onKeyPressCode: 13
      },
      debug: false,
      on: {
        init: () => {},
        open: () => {},
        close: () => {}
      }
    };

    const userOptions = opts;

    if (userOptions === 'null') {
      return Object.keys(userOptions).forEach(key => {
        instanceOptions[key] = userOptions[key];
      });
    }

    return instanceOptions;
  }

  attachEvents() {
    // console.log(
    //   typeof this.options.prefix === 'string'
    //     ? `.${this.options.prefix}-${this.options.close.onClickOutsideElem}`
    //     : this.options.close.onClickOutsideElem
    // );

    document
      .querySelector(
        typeof this.options.prefix === 'string'
          ? `.${this.options.prefix}-${this.options.close.onClickOutsideElem}`
          : `.${this.options.close.onClickOutsideElem}`
      )
      .addEventListener('click', this.closeModalHandler);

    if (this.options.close.onKeyPress) {
      // console.log('We have to handle keypress on clicking on keyboard button');
      document.addEventListener('keydown', this.closeModalHandler);
    }

    window.addEventListener('resize', this.resizeHandler);

    const modalElems = document.querySelectorAll(this.el);
    for (let i = 0; i < modalElems.length; i += 1) {
      const modalElem = modalElems[i];

      modalElem.addEventListener('click', this.clickHandler);
    }
  }

  detachEvents() {
    window.removeEventListener('resize', this.resizeHandler);

    const modalElems = document.querySelectorAll(this.el);
    for (let i = 0; i < modalElems.length; i += 1) {
      const modalElem = modalElems[i];

      modalElem.removeEventListener('click', this.clickHandler);
    }
  }

  // eslint-disable-next-line
  clickHandler(e) {
    e.preventDefault();
    const attr = e.target.closest(this.el).dataset.rheniumTarget;

    if (['.', '#'].indexOf(attr[0]) > -1) {
      // console.log(attr);
      // console.log(document.querySelectorAll(attr).length);
      if (document.querySelectorAll(attr).length > 1) {
        throw new Error(
          `[RHENIUM.MODAL ERROR] There is more than one target elements in DOM! 😭`
        );
      }

      this.activeEl = attr;

      document.querySelector(attr).classList.add('rhenium-active');
      return false;
    }

    const contentProvider = attr.split(':')[0];
    const contentId = attr.split(':')[1];
    const contentUrl = this.generateLink(contentProvider, contentId);
    // console.log(contentUrl);
    return true;
  }

  // eslint-disable-next-line
  resizeHandler() {
    console.log('resize handled');
  }

  closeModalHandler(e) {
    const closeElem =
      typeof this.options.prefix === 'string'
        ? `${this.options.prefix}-${this.options.close.elem}`
        : this.options.close.elem;

    const closeOutsideElem =
      typeof this.options.prefix === 'string'
        ? `${this.options.prefix}-${this.options.close.onClickOutsideElem}`
        : this.options.close.onClickOutsideElem;

    const contentElem =
      typeof this.options.prefix === 'string'
        ? `${this.options.prefix}-${this.options.close.contentElem}`
        : this.options.close.contentElem;

    // console.log(closeElem);
    // console.log(closeOutsideElem);
    // console.log(contentElem);

    if (e.keyCode && e.keyCode === 27) {
      document.querySelector(this.activeEl).classList.remove('rhenium-active');
    }

    if (
      (e.target && e.target.classList.contains(closeOutsideElem)) ||
      (e.target && e.target.classList.contains(closeElem))
    ) {
      e.stopPropagation();
      document.querySelector(this.activeEl).classList.remove('rhenium-active');
    }

    if (
      e.target &&
      e.target ===
        (typeof this.options.prefix === 'string'
          ? `.${this.options.prefix}-${this.options.close.contentElem}`
          : `.${this.options.close.contentElem}`)
    ) {
      e.stopPropagation();
    }
  }

  // eslint-disable-next-line
  generateLink(cProvider, cId) {
    switch (cProvider) {
      case 'youtube':
        return `https://www.youtube.com/embed/${cId}`;
      case 'vimeo':
        return `https://player.vimeo.com/video/${cId}?title=0&byline=0&portrait=0`;
      case 'gmaps':
        return `https://www.google.com/maps/embed?pb=${cId}`;
      case 'url':
        return cId;
      default:
        throw new Error(`[RHENIUM.MODAL ERROR] Unknown Content Provider! 😭`);
    }
  }

  destroy() {
    console.log('Destroying instance!');
    this.detachEvents();
  }

  init() {
    console.log(
      '%c    Initializing Rhenium.Modal!    ',
      'line-height: 2; background:#2B2E31; color: #FFD950; font-family: monospace;'
    );
    this.attachEvents();
  }
}

export default Modal;
