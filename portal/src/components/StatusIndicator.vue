<template>
  <div class="status-indicator">
    <div class="status-icon" :class="this.symbol"></div>
    {{ this.status }}
  </div>
</template>

<script>
export default {
  name: 'StatusIndicator',
  props: ['status'],
  computed: {
    symbol: function () {
      const map = {
        'Behandles': 'circle',
        'Skriver': 'triangle',
        'Venter': 'hexagon',
        'Ferdig': 'rectangle'
      };

      return map[this.status];
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/sass/_variables.scss';

$r: #c03;
$g: #429032;
$b: #2963BD;
$y: #c90;

$size: 1em;

@mixin rectangle($width, $height, $color) {
  width: $width;
  height: $height;
  background: $color;
}

@mixin circle($size, $color) {
  @include rectangle($size, $size, $color);
  border-radius: $size / 2;
}

@mixin triangle($size, $color) {
  width: 0;
  height: 0;

  border-right: $size/2 solid transparent;
  border-bottom: ($size * 1.732)/2 solid $color;
  border-left: $size/2 solid transparent;
}

@mixin hexagon($width, $background) {
  $height: 60px / 104px * $width;
  background-color: $background;
  width: $width;
  height: $height;
  position:relative;
  box-sizing:border-box;

  &:before {
    content: " ";
    width: 0; height: 0;
    border-bottom: ($height / 2) solid $background;
    border-left: ($width / 2) solid transparent;
    border-right: ($width / 2) solid transparent;
    position: absolute;
    display:block;
    top:-($height / 2);
  }
  &:after {
    content: " ";
    width: 0; height: 0;
    border-top: solid $background;
    border-top-width: ($height / 2);
    border-left: ($width/2) solid transparent;
    border-right: ($width/2) solid transparent;
    position: absolute;
    display:block;
    top:$height;
  }
}

.rectangle {
  @include rectangle($size, $size, $r)
}
.circle {
  @include circle($size, $g);
}
.triangle {
  @include triangle($size, $b);
}
.hexagon {
  @include hexagon($size, $y);
}

.status-indicator .status-icon {
  display: inline-block;
}
</style>
