import { debounce } from 'lodash';
import Inquiries from '@/services/Inquiries';

function getLocal () {
  try {
    return JSON.parse(localStorage.getItem('inquiry'));
  } catch (error) {
    return null;
  }
};

function setLocal (inquiry) {
  localStorage.setItem('inquiry', JSON.stringify(inquiry));
}

function clearLocal () {
  localStorage.removeItem('inquiry');
}

export default {
  install: function (Vue, options) {
    Vue.prototype.$inquiry = {
      start: async function (type) {
        if (this.exists()) {
          console.error('Can\'t start new inquiry before current is cleared.');
          return;
        }

        this.update.cancel();
        const inquiry = await Inquiries.startInquiry(type);
        setLocal(inquiry);
      },

      update: debounce(async function (data) {
        data.key = getLocal().key;
        await Inquiries.update(getLocal()._id, data);
      }, 5000),

      complete: function () {
        if (this.exists()) {
          this.update.flush();
          clearLocal();
        }
      },

      clear: async function () {
        if (this.exists()) {
          this.update.cancel();
          await Inquiries.delete(getLocal()._id, getLocal().key);
          clearLocal();
        }
      },

      exists: function () {
        return !!getLocal();
      }
    };
  }
};
