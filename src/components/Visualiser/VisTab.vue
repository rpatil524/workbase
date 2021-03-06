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
    <div class="visualiser-wrapper">
            <top-bar :tabId="tabId" v-on:toggle-preferences="showPreferences = !showPreferences"></top-bar>
            <div class="vis-row">
                <div class="vis-column">
                    <context-menu :tabId="tabId"></context-menu>
                    <graph-canvas :tabId="tabId"></graph-canvas>
                    <visualiser-footer :tabId="tabId"></visualiser-footer>
                    <preferences v-show="showPreferences" v-on:close-preferences="showPreferences = false"></preferences>
                    <!-- <bottom-bar></bottom-bar> -->
                </div>
                <right-bar :tabId="tabId"></right-bar>
            </div>
        </div>
</template>

<style>

    .visualiser-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: var(--canvas-color);
    }

    .vis-row {
        display: flex;
        flex-direction: row;
        flex: 1;
        position: relative;
    }

    .vis-column {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 100%;
        position: relative;
    }
</style>


<script>
import { createNamespacedHelpers } from 'vuex';

import getters from './store/getters';
import mutations from './store/mutations';
import actions from './store/actions';

import TopBar from './TopBar.vue';
import LeftBar from './LeftBar.vue';
import RightBar from './RightBar.vue';
import BottomBar from './BottomBar.vue';
import Preferences from '../shared/Preferences.vue';

import GraphCanvas from '../shared/GraphCanvas.vue';
import ContextMenu from './ContextMenu';
import VisualiserFooter from './VisualiserFooter';
import TabState from './store/tabState';

export default {
  name: 'VisTab',
  components: {
    TopBar, RightBar, LeftBar, BottomBar, GraphCanvas, ContextMenu, VisualiserFooter, Preferences,
  },
  props: ['tabId'],
  data() {
    return {
      showPreferences: false,
    };
  },

  watch: {
    globalErrorMsg(msg) {
      if (msg !== '') {
        this.$notifyError(msg);
      }
    },
  },

  beforeCreate() {
    const namespace = `tab-${this.$options.propsData.tabId}`;
    this.$store.registerModule(namespace, { namespaced: true, getters, state: TabState.create(), mutations, actions });
    const { mapGetters } = createNamespacedHelpers(`tab-${this.$options.propsData.tabId}`);

    // computed
    this.$options.computed = {
      ...(this.$options.computed || {}),
      ...mapGetters(['globalErrorMsg']),
    };
  },

  beforeDestroy() {
    if (global.graknTx && global.graknTx[`tab-${this.tabId}`]) global.graknTx[`tab-${this.tabId}`].close();
    /* eslint-disable no-prototype-builtins */
    if (this.$store.state.hasOwnProperty(`tab-${this.tabId}`)) this.$store.unregisterModule(`tab-${this.tabId}`);
  },
};
</script>
