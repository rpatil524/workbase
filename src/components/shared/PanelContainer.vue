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
    <div class="container-wrapper" :class="{'disabled':!isActive}">
        <h1 @click="hideSlider=!hideSlider" class="title" :class="{'disabled':!isActive}">
            <div class="caret" :class="{'open':showSlider}"></div>
            <span class="noselect">{{title}}</span>
        </h1>
        <div class="slider" :class="{'open':showSlider}">
            <slot>Here panel content.</slot>
        </div>
    </div>
</template>

<style>

.disabled{
    opacity: 0.7;
    cursor: default;
}

/*h1{*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*align-items: center;*/
    /*cursor: pointer;*/
    /*justify-content: flex-start;*/
    /*padding: 5px 0px;*/
    /*background-color: #2E2D2D;*/
/*}*/

.container-wrapper{
    background-color: #282828;
    border-radius: 1px;
}

.slider {
  overflow-y: scroll;
  transition-property: all;
  transition-duration: .5s;
  max-height: 0;
}

.caret{
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 0 5px 5px;
    border-color: transparent transparent transparent #fafafa;

    transition-property: all;
    transition-duration: .3s;
    margin-right: 10px;
    margin-left: 5px;
}

.caret.open{
    transform: rotate(90deg);
}

</style>
<script>
export default {
  props: ['title', 'disablePanel', 'isOpen'],
  data() {
    return {
      contentNotEmpty: true,
      hideSlider: (this.isOpen === 'false') || false,
    };
  },
  computed: {
    // Slider is enabled when there is a selected database and when
    // when there is actual content to be shown inside of the current slider.
    showSlider() {
      return (this.isActive && !this.hideSlider);
    },
    isActive() {
      const localStoreActive = this.$store.getters.isActive;
      return localStoreActive && !this.disablePanel;
    },
  },
  methods: {
  },
};
</script>

