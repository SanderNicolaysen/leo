<template>
  <div>
    <div class="page-editor">
      <h1 class="title">
        <ContentEditableDiv v-model="page.title" />
      </h1>
      <h2 class="subtitle">
        <ContentEditableDiv v-model="page.subtitle" />
      </h2>

      <div class="columns">
        <div class="column">
          <article class="message is-dark">
            <div class="message-body">
              <div class="field columns is-multiline">
                <InputComposer v-for="(element, index) in page.elements" :key="JSON.stringify(element)" :element="element"
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
                              <span class="truncate" v-else>Velg type</span>
                              <span class="icon"><img src="@/assets/icons/menu-down.svg" /></span>
                            </button>

                            <b-dropdown-item :value="'text'"><h3>Tekst</h3><small>Et vanlig tekstfelt</small></b-dropdown-item>
                            <b-dropdown-item :value="'textarea'"><h3>Tekstområde</h3><small>Tekstfelt som kan inneholde flere linjer med tekst</small></b-dropdown-item>
                            <b-dropdown-item :value="'radio'"><h3>Radioknapper</h3><small>Brukeren får flere valg å velge fra</small></b-dropdown-item>
                            <b-dropdown-item :value="'select'"><h3>Nedtrekksmeny</h3><small>Brukeren får flere valg å velge fra i nedtrekksmeny</small></b-dropdown-item>
                          </b-dropdown>
                        </div>
                        <div class="control">
                          <button class="button" @click="addElement()">
                            <span class="icon">
                              <img src="/icons/baseline-add.svg"  alt="+" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div class="column">
          <article class="message is-primary">
            <div class="message-header">
              <p>Informasjon</p>
            </div>
            <div class="message-body">
              <ContentEditableDiv v-model="page.info" />
            </div>
          </article>
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
import InputComposer from '@/components/InputComposer.vue';
import FlexiInputEditor from '@/components/FlexiInputEditor.vue';
import ContentEditableDiv from '@/components/ContentEditableDiv.vue';

export default {
  components: {
    InputComposer,
    FlexiInputEditor,
    ContentEditableDiv
  },
  mixins: [PageEditorMixin],
  data: function () {
    return {
      sizes: [4, 6, 8, 12]
    };
  }
};
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

.page-editor {
  border: 1px solid $dark-blue;
  padding: 1em;
  margin-top: 1em;
}

.input-creator {
  height: 100%;
  padding: 15px 0;
  border: 1px solid $grey;
}
</style>
