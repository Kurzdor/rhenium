import Modal from './modal/modal';
import closestPolyfill from './utils/utils';

closestPolyfill();

const Rhenium = {
  Modal
};

window.Rhenium = Rhenium;

export default Rhenium;
