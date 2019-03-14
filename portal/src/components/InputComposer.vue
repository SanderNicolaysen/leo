<template>
  <div class="column input-composer" :class="element.sizeClass" @mouseover="hover = true" @mouseleave="hover = false" ref="baseElement">
    <div class="columns">
      <flexi-input :element="innerElement"/>

      <div class="is-overlay level overlay" :class="{ 'is-opaque': !hover }">
        <div class="level-item" ref="buttons">
          <b-tooltip label="Fjern" :active="minimize">
            <button class="button is-small is-rounded" @click="$emit('destroy')">
              <span class="icon">
                <img src="/icons/baseline-delete.svg" alt="X" />
              </span>
              <span v-if="!minimize">Fjern</span>
            </button>
          </b-tooltip>
          <b-tooltip label="Rediger" :active="minimize">
            <button class="button is-small is-rounded" @click="$emit('edit')">
              <span class="icon">
                <img src="/icons/baseline-edit.svg" alt="Rediger" />
              </span>
              <span v-if="!minimize">Rediger</span>
            </button>
          </b-tooltip>
          <b-tooltip label="Mindre" :active="minimize" v-show="element.sizeClass !== 'is-2'">
            <button class="button is-small is-rounded" @click="$emit('shrink')">
              <span class="icon"><img src="/icons/outline-crop.svg" alt="" /></span>
              <span v-if="!minimize">Mindre</span>
            </button>
          </b-tooltip>
          <b-tooltip label="Større" :active="minimize" v-show="element.sizeClass !== 'is-12'">
            <button class="button is-small is-rounded" @click="$emit('grow')">
              <span class="icon"><img src="/icons/outline-crop_free.svg" alt="" /></span>
              <span v-if="!minimize">Større</span>
            </button>
          </b-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import FlexiInput from '@/components/FlexiInput.vue';

export default {
  props: ['element'],
  data: function () {
    return {
      innerElement: {},
      hover: false,
      minimize: false
    };
  },
  mounted: function () {
    this.innerElement = _.clone(this.element);
    this.innerElement.sizeClass = 'is-full';
    if (this.$refs.baseElement.clientWidth < this.$refs.buttons.clientWidth) {
      this.minimize = true;
    }
  },
  components: {
    FlexiInput
  }
};
</script>

<style>
.input-composer {
  position: relative;
}

.overlay {
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05));
  border-radius: 0;
}

.is-opaque {
  opacity: 0;
}
</style>
