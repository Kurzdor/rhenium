function Modal(el, options) {
  function handleClick(e) {
    e.preventDefault();
    console.log('click!');
    console.log(e.target.classList);
    e.target.classList.add('clicked');
  }

  function optionsMerger(options) {
    const instanceOptions = {
      speed: 300,
      type: 'default'
    }

    const userOptions = options;
    for (const attrname in userOptions) {
      instanceOptions[attrname] = userOptions[attrname];
    }

    return instanceOptions;
  }

  el = el || '[data-rhenium-modal]';
  options = optionsMerger(options);

  console.log(el);
  console.log(options);

  console.log('it works');
  const modalElems = document.querySelectorAll(el);

  for (var i = 0; i < modalElems.length; i++) {
    var modalElem = modalElems[i];

    modalElem.addEventListener('click', handleClick);
  }
}

export default Modal;
