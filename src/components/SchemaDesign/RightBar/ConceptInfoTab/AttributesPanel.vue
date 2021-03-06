<!--
 Copyright (C) 2021 Grakn Labs

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<template>
    <div class="panel-container">
        <div @click="toggleContent" class="panel-header">
            <vue-icon :icon="(showAttributesPanel) ?  'chevron-down' : 'chevron-right'" iconSize="14" className="vue-icon"></vue-icon>
            <h1>Attributes</h1>
        </div>
        <div v-show="showAttributesPanel">
            <div class="content noselect" v-if="msg">
                {{msg}}
            </div>
            <div class="content" v-else>

                <div v-for="(value, index) in attributes" :key="index">
                    <div class="content-item">
                        <div class="label">{{value.typeLabel}}: {{value.valueType}}</div>
                        <div class="btn right-bar-btn reset-setting-btn" @click="removeAttributeType(value.typeLabel, index)"><vue-icon icon="trash" className="vue-icon" iconSize="12"></vue-icon></div>
                    </div>
                </div>

                <div class="add-new-attribute">
                  <div class="row noselect">
                    <div @click="showNewAttributesPanel = !showNewAttributesPanel" class="has-header">
                      <vue-icon :icon="(showNewAttributesPanel) ?  'chevron-down' : 'chevron-right'" iconSize="14" className="vue-icon"></vue-icon>
                      Add Attribute Types
                      </div>
                  </div>

                  <div class="row-2 noselect" v-if="showNewAttributesPanel">
                    <div class="has">
                      <ul class="attribute-type-list" v-if="newAttributes.length">
                        <li :class="(toggledAttributeTypes.includes(attributeType)) ? 'attribute-btn toggle-attribute-btn' : 'attribute-btn'" @click="toggleAttributeType(attributeType)" v-for="attributeType in newAttributes" :key=attributeType>
                            {{attributeType}}
                        </li>
                      </ul>
                      <div v-else class="no-types">There are no additional attribute types defined</div>

                      <div class="btn-row">
                        <button class="btn small-btn" @click="clearAttributeTypes">Clear</button>
                        <button class="btn small-btn" @click="addAttributeTypes">Add</button>
                      </div>
                    </div>
                  </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { ADD_OWNS, REFRESH_SELECTED_NODE, DELETE_OWNS } from '@/components/shared/StoresActions';
  import { createNamespacedHelpers } from 'vuex';
  
  export default {
    name: 'AttributesPanel',
    props: [],
    data() {
      return {
        showAttributesPanel: true,
        attributes: null,
        showNewAttributesPanel: false,
        toggledAttributeTypes: [],
      };
    },
    mounted() {
      this.loadAttributes(this.selectedNodes);
    },
    beforeCreate() {
      const { mapGetters, mapActions } = createNamespacedHelpers('schema-design');

      // computed
      this.$options.computed = {
        ...(this.$options.computed || {}),
        ...mapGetters(['selectedNodes', 'currentDatabase', 'metaTypeInstances']),
      };

      // methods
      this.$options.methods = {
        ...(this.$options.methods || {}),
        ...mapActions([ADD_OWNS, REFRESH_SELECTED_NODE, DELETE_OWNS]),
      };
    },
    computed: {
      msg() {
        if (!this.currentDatabase) return 'Please select a database';
        else if (!this.selectedNodes || this.selectedNodes.length > 1) return 'Please select a node';
        else if (!this.attributes) return 'Attributes are being loaded';
        return null;
      },
      newAttributes() {
        return (this.attributes) ? this.metaTypeInstances.attributes.filter(attribute => !this.attributes.map(att => att.typeLabel).includes(attribute)) : [];
      },
    },
    watch: {
      selectedNodes(nodes) {
        this.loadAttributes(nodes);
      },
    },
    methods: {
      loadAttributes(nodes) {
        // If no node selected: close panel and return
        if (!nodes || nodes.length > 1) return;

        const attributes = nodes[0].attributes;

        this.attributes = Object.values(attributes).sort((a, b) => ((a.typeLabel > b.typeLabel) ? 1 : -1));
        this.showAttributesPanel = true;
      },
      toggleContent() {
        this.showAttributesPanel = !this.showAttributesPanel;
      },
      toggleAttributeType(type) {
        const index = this.toggledAttributeTypes.indexOf(type);
        if (index > -1) {
          this.toggledAttributeTypes.splice(index, 1);
        } else {
          this.toggledAttributeTypes.push(type);
        }
      },
      clearAttributeTypes() {
        this.toggledAttributeTypes = [];
      },
      addAttributeTypes() {
        this[ADD_OWNS]({ schemaLabel: this.selectedNodes[0].label, attributeTypes: this.toggledAttributeTypes })
          .then(() => {
            this[REFRESH_SELECTED_NODE]();
            this.showNewAttributesPanel = false;
            this.toggledAttributeTypes = [];
          })
          .catch((e) => {
            this.$notifyError(e.message);
          });
      },
      removeAttributeType(type, index) {
        this[DELETE_OWNS]({ schemaLabel: this.selectedNodes[0].label, attributeLabel: type, index })
          .then(() => {
            this[REFRESH_SELECTED_NODE]();
          })
          .catch((e) => {
            this.$notifyError(e.message);
          });
      },
    },
  };
</script>

<style scoped>

  .add-new-attribute {
    padding: var(--container-padding);
  }

  .no-types {
    background-color: var(--gray-1);
    padding: var(--container-padding);
    border: var(--container-darkest-border);
    border-top: 0px;
  }


  .btn-row {
    padding-top: var(--container-padding);
    display: flex;
    justify-content: space-between;
  }


  .content {
      padding: var(--container-padding);
      border-bottom: var(--container-darkest-border);
      display: flex;
      flex-direction: column;
      max-height: 500px;
      overflow: auto;
  }

  .content::-webkit-scrollbar {
      width: 2px;
  }

  .content::-webkit-scrollbar-thumb {
      background: var(--green-4);
  }

  .content-item {
      padding: var(--container-padding);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 20px;
  }

  .has {
    width: 100%;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
  }

  .row-2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .has-header {
    width: 100%;
    background-color: var(--gray-1);
    border: var(--container-darkest-border);
    height: 22px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }


  .attribute-type-list {
    border: var(--container-darkest-border);
    background-color: var(--gray-1);
    width: 100%;
    max-height: 140px;
    overflow: auto;
  }

  .attribute-type-list::-webkit-scrollbar {
    width: 2px;
  }

  .attribute-type-list::-webkit-scrollbar-thumb {
    background: var(--green-4);
  }

  /*dynamic*/
  .attribute-btn {
    align-items: center;
    padding: 2px;
    cursor: pointer;
    white-space: normal;
    word-wrap: break-word;
  }

  /*dynamic*/
  .attribute-btn:hover {
    background-color: var(--purple-4);
  }

  /*dynamic*/
  .toggle-attribute-btn {
    background-color: var(--purple-3);
  }

</style>
