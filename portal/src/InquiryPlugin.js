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
}, 500, { maxWait: 5000 });

export default {
  install: function (Vue, options) {
    Vue.prototype.$inquiry = {
      start: async function (type) {
        type = type || 'Annet';

        if (this.exists()) {
          console.error('Can\'t start new inquiry before current is cleared.');
          return;
        }
        debouncedUpdate.cancel();
        const inquiry = await Inquiries.startInquiry(type);
        setLocal(inquiry);

        if (type === 'Annet') {
          return;
        }

        Vue.prototype.$snackbar.open({
          message: 'Du har nå fått plass i køen. Vennligst fyll ut så mye du klarer.',
          duration: 9000
        });
      },

      update: async function (data) {
        updateLocal(data);
        debouncedUpdate();
      },

      complete: async function () {
        if (this.exists()) {
          await this.update({ status: 'Venter' });
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
      },

      get: function () {
        return getLocal();
      },

      setForms: async function (forms) {
        const inquiry = await Inquiries.setForms(getLocal()._id, getLocal().key, forms);
        updateLocal(inquiry);
      }
    };
  }
};
