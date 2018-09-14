class Modal {
  constructor(el, options) {
    this.el = el || '[data-rhenium-modal]';
    this.options = Modal.optionsMerger(options);

    ['clickHandler', 'resizeHandler'].forEach(method => {
      this[method] = this[method].bind(this);
    });

    this.init();
  }

  static optionsMerger(opts) {
    const instanceOptions = {
      speed: 300,
      type: 'default',
      alert: false,
      on: {
        init: () => {}
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
    console.log(attr);
  }

  // eslint-disable-next-line
  resizeHandler() {
    console.log('resize handled');
  }

  destroy() {
    console.log('Destroying instance!');
    this.detachEvents();
  }

  init() {
    console.log('Initializing Rhenium.Modal!');
    this.attachEvents();
  }
}

export default Modal;
