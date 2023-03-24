import Popup from "./Popup.js";
import { popupWithImageSettings } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  open({ name, link }) {
    this._img = this._popup.querySelector(popupWithImageSettings.imagePopupImg);
    this._caption = this._popup.querySelector(popupWithImageSettings.captionPopupImg);
    this._img.src = link;
    this._img.alt = name;
    this._caption.textContent = name;

    super.open();
  }
}
