<template>
  <a-modal
    v-model="dialogObj.visible"
    centered
    class="ant-modal-confirm ant-modal-confirm-confirm"
    :title="null"
    :footer="null"
    :mask-closable="false"
  >
    <div class="ant-modal-confirm-body-wrapper">
      <div class="ant-modal-confirm-body">
        <a-icon class="anticon" :type="dialogObj.iconType" />
        <span class="ant-modal-confirm-title">{{ dialogObj.title }}</span>
        <div class="ant-modal-confirm-content">
          <slot></slot>
        </div>
      </div>
      <div class="ant-modal-confirm-btns">
        <a-button @click="dialogObj.visible = false">
          取消
        </a-button>
        <a-button
          v-if="isBtnok" type="primary" :loading="okLoading"
          @click="handleOk"
        >
          确认
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    dialogObj: {
      type: Object,
      default: () => {
        return {
          visible: false,
          title: '确认弹窗',
          iconType: 'exclamation-circle'
        }
      }
    },
    isBtnok: {
      type: Boolean,
      default: true
    },
    okLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleOk () {
      this.$emit('handleOk')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
