import Popup from "./Popup.js";
import { imgPopupImg, captionPopupImg } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  open({ name, link }) {
    imgPopupImg.src = link;
    imgPopupImg.alt = name;
    captionPopupImg.textContent = name;

    super.open();
  }
}
