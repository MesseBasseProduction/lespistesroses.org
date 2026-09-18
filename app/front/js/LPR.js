import '../scss/lpr.scss';


class LesPistesRoses {


  constructor() {
    console.log('Build')
    this._events();
  }


  _events() {
    document.getElementById('info-modal').addEventListener('click', this._modalInfo.bind(this));    
  }


  _modalInfo() {
    this.fetchPage('/modal/info').then(dom => {
      const modal = document.createElement('DIV');
      modal.classList.add('modal');
      modal.classList.add('credit');
      modal.appendChild(dom);
      document.getElementById('overlay').appendChild(modal);
      this._openModal(modal);
    });
  }


 _openModal(modal, closingCallback) {
    // Modal opening/closing animation
    const closeModal = e => {
      if (['overlay', 'close-modal'].indexOf(e.target.id) === -1) {
        return;
      }

      if (closingCallback) {
        closingCallback();
      }
      document.getElementById('overlay').removeEventListener('click', closeModal);
      document.getElementById('close-modal').removeEventListener('click', closeModal);

      document.getElementById('overlay').style.opacity = 0;
      setTimeout(() => {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('overlay').innerHTML = '';
      }, 300);
    };

    document.getElementById('overlay').style.display = 'flex';
    setTimeout(() => document.getElementById('overlay').style.opacity = 1, 100);
    setTimeout(() => {
      modal.style.opacity = 1;
      document.getElementById('overlay').addEventListener('click', closeModal);
      document.getElementById('close-modal').addEventListener('click', closeModal);
    }, 200);    
  }


  fetchPage(url, lang) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: new Headers({ 'Accept-Language': lang || 'fr' })
      }).then(data => {
        data.text().then(htmlString => {
          resolve(document.createRange().createContextualFragment(htmlString));
        }).catch(reject);
      }).catch(reject);
    });
  }


}


export default LesPistesRoses;
window.LesPistesRoses = new LesPistesRoses();
