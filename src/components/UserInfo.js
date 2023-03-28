export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
    this._userName = document.querySelector(profileNameSelector);
    this._userJob = document.querySelector(profileJobSelector);
    this._userAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    this._userInfo = {
      'name-input': this._userName.textContent,
      'job-input': this._userJob.textContent
    };

    return this._userInfo;
  }

  setUserInfo = (name, job) => {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }

  setUserAvatar(link) {
    this._userAvatar.src = link;
  }
}
