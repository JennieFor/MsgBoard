<script setup>
const props = defineProps({
  size:{
    type: String,
    default: 'base'
  },
  isMain:{
    type:String,
    default:'primary'
  }
})
</script>

<template>
  <div>
    <button :class="[size,isMain]" class="msgButton">
      <slot></slot>
    </button>
  </div>
</template>

<style scoped lang="less">
@import '../style/common.less';
.msgButton{
  text-align: center;
  border: none;
  cursor: pointer;
}
.max{
  min-width: 100px;
  height: 48px;
  border-radius: 24px;
  padding: 0 24px;

}
.base{
  min-width: 80px;
  height: 36px;
  border-radius: 24px;
  padding: 0 20px;
}
.small{
  min-width: 72px;
  height: 32px;
  border-radius: 24px;
  padding: 0 20px;
}
.primary{
  background: @gray-1;
  color:@gray-10;
}
.secondary{
  background: none;
  color:@gray-1;
  border:1px solid @gray-1;
}
.cprimary{
  background: @primary-color;
  color:@gray-10;
  font-weight: 600;
}
.csecondary{
  background: @gray-10;
  color:@gray-1;
}
.notallowed{
  opacity: 0.6;
  cursor: not-allowed;
}
</style>