export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._userName = document.querySelector(profileNameSelector);
    this._userJob = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };
    return this._userInfo;
  }

  setUserInfo = (name, job) => {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}
