import { debounce, merge } from 'lodash';
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

function updateLocal (data) {
  const inquiry = getLocal();
  merge(inquiry, data);
  localStorage.setItem('inquiry', JSON.stringify(inquiry));
}

function clearLocal () {
  localStorage.removeItem('inquiry');
}

const debouncedUpdate = debounce(async function () {
  const data = getLocal();
  await Inquiries.update(getLocal()._id, data);
}, 5000);

export default {
  install: function (Vue, options) {
    Vue.prototype.$inquiry = {
      start: async function (type) {
        if (this.exists()) {
          console.error('Can\'t start new inquiry before current is cleared.');
          return;
        }

        debouncedUpdate.cancel();
        const inquiry = await Inquiries.startInquiry(type);
        inquiry.status = 'Skriver';
        setLocal(inquiry);
      },

      update: async function (data) {
        data.status = 'Skriver';
        updateLocal(data);
        debouncedUpdate(data);
      },

      complete: function () {
        if (this.exists()) {
          updateLocal({ status: 'Venter' });
          debouncedUpdate.flush();
          clearLocal();
        }
      },

      clear: async function () {
        if (this.exists()) {
          debouncedUpdate.cancel();
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
