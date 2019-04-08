<template>
  <div>
    <div class="page-editor">
      <button class="delete-page button is-danger is-rounded" @click="$emit('destroy')">
        <span class="icon">
          <img src="/icons/baseline-delete.svg" alt="X" />
        </span>
        <span>Slett side</span>
      </button>

      <h1 class="title">
        <ContentEditableDiv v-model="page.title" />
      </h1>
      <h2 class="subtitle">
        <ContentEditableDiv v-model="page.subtitle" />
      </h2>

      <article class="message is-primary">
        <div class="message-header">
          <p>Informasjon</p>
        </div>
        <div class="message-body">
          <ContentEditableDiv v-model="page.info" />
        </div>
      </article>

      <div class="columns is-multiline">
        <FlexiInputEditOverlay v-for="(element, index) in page.elements" :key="JSON.stringify(element)" :element="element"
          v-on:destroy="remove(index)"
          v-on:edit="editByIndex = index"
          v-on:grow="growElement(index)"
          v-on:shrink="shrinkElement(index)" />
        <div class="column" :class="sizeRemainder">
          <div class="level input-creator">
            <div class="level-item">
              <div class="field has-addons">
                <div class="control">
                  <b-dropdown v-model="type" class="">
                    <button class="button" slot="trigger">
                      <span class="truncate" v-if="type==='text'">Tekst</span>
                      <span class="truncate" v-else-if="type==='textarea'">Tekstområde</span>
                      <span class="truncate" v-else-if="type==='radio'">Radioknapper</span>
                      <span class="truncate" v-else-if="type==='select'">Nedtrekksmeny</span>
                      <span class="truncate" v-else-if="type==='postal'">Postnr/sted</span>
                      <span class="truncate" v-else-if="type==='tel'">Telefonnummer</span>
                      <span class="truncate" v-else-if="type==='country'">Land</span>
                      <span class="truncate" v-else-if="type==='email'">E-post</span>
                      <span class="truncate" v-else-if="type==='birth-num'">Fødselsnummer</span>
                      <span class="truncate" v-else-if="type==='imei'">IMEI</span>
                      <span class="truncate" v-else-if="type==='model-year'">Årsmodell</span>
                      <span class="truncate" v-else-if="type==='license-plate'">Kjennemerke (Skiltnummer)</span>
                      <span class="truncate" v-else-if="type==='vin'">Rammenummer</span>
                      <span class="truncate" v-else-if="type==='org-num'">Organisasjonsnummer</span>
                      <span class="truncate" v-else>Velg type</span>
                      <span class="icon"><img src="@/assets/icons/menu-down.svg" /></span>
                    </button>

                    <b-dropdown-item :value="'text'"><h3>Tekst</h3><small>Et vanlig tekstfelt</small></b-dropdown-item>
                    <b-dropdown-item :value="'textarea'"><h3>Tekstområde</h3><small>Tekstfelt som kan inneholde flere linjer med tekst</small></b-dropdown-item>
                    <b-dropdown-item :value="'radio'"><h3>Radioknapper</h3><small>Brukeren får flere valg å velge fra</small></b-dropdown-item>
                    <b-dropdown-item :value="'select'"><h3>Nedtrekksmeny</h3><small>Brukeren får flere valg å velge fra i nedtrekksmeny</small></b-dropdown-item>
                    <b-dropdown-item :value="'postal'"><h3>Postnr/sted</h3><small>Et felt for postnr, som automatisk fyller ut poststed</small></b-dropdown-item>
                    <b-dropdown-item :value="'tel'">Telefonnummer<h3></h3><small>Et felt for telefonnummer</small></b-dropdown-item>
                    <b-dropdown-item :value="'country'">Land<h3></h3><small>Brukeren får alle land i verden å velge fra i nedtrekksmeny, på språket han/hun har valgt</small></b-dropdown-item>
                    <b-dropdown-item :value="'email'">E-post<h3></h3><small>Et felt for e-post</small></b-dropdown-item>
                    <b-dropdown-item :value="'birth-num'">Fødselsnummer<h3></h3><small>Et felt for fødselsnummer</small></b-dropdown-item>
                    <b-dropdown-item :value="'imei'">IMEI<h3></h3><small>Et felt for IMEI</small></b-dropdown-item>
                    <b-dropdown-item :value="'model-year'">Årsmodell<h3></h3><small>Et felt for årsmodell</small></b-dropdown-item>
                    <b-dropdown-item :value="'license-plate'">Kjennemerke (Skiltnummer)<h3></h3><small>Et felt for kjennemerke (skiltnummer)</small></b-dropdown-item>
                    <b-dropdown-item :value="'vin'">Rammenummer<h3></h3><small>Et felt for rammenummer</small></b-dropdown-item>
                    <b-dropdown-item :value="'org-num'">Organisasjonsnummer<h3></h3><small>Et felt for organisasjonsnummer</small></b-dropdown-item>
                  </b-dropdown>
                </div>
                <div class="control">
                  <button class="button" @click="addElement()">
                    <span class="icon">
                      <img src="/icons/baseline-add.svg" alt="+" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" :class="{ 'is-active': editByIndex !== null }">
      <div class="modal-background"></div>
      <div class="modal-content" style="width: 350px" >
        <FlexiInputEditor v-if="editByIndex !== null" v-on:save="save($event)" v-on:close="editByIndex = null" :element="page.elements[editByIndex]" />
      </div>
      <button class="modal-close is-large" aria-label="close" @click="editByIndex = null"></button>
    </div>
  </div>
</template>

<script>
import PageEditorMixin from '@/components/mixins/PageEditor';
import FlexiInputEditOverlay from '@/components/FlexiInputEditOverlay.vue';
import FlexiInputEditor from '@/components/FlexiInputEditor.vue';
import ContentEditableDiv from '@/components/ContentEditableDiv.vue';

export default {
  components: {
    FlexiInputEditOverlay,
    FlexiInputEditor,
    ContentEditableDiv
  },
  mixins: [PageEditorMixin]
};
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.page-editor {
  position: relative;
  border: 1px solid $dark-blue;
  padding: 1em;
  margin-top: 1em;
}

.input-creator {
  height: 100%;
  padding: 15px 0;
  border: 1px solid $grey;
}

.page-editor .delete-page {
  position: absolute;
  z-index: 1000;
  right: 15px;
  top: 10px;
  display: none;
}

.page-editor:hover .delete-page {
  display: inline-flex;
}

.page-editor .delete-page:hover {
  background-color: $danger;
  color: $white;
}
</style>
