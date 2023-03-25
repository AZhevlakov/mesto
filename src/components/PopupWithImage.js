import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imgViewerSelector, imgCaptionSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector(imgViewerSelector);
    this._caption = this._popup.querySelector(imgCaptionSelector);
  }

  open({ name, link }) {
    this._img.src = link;
    this._img.alt = name;
    this._caption.textContent = name;

    super.open();
  }
}
