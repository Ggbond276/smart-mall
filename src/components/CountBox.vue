<template>
  <div class="count-box">
    <button @click="handleSub()" class="minus">-</button>
    <input :value="value" @change="handleChange" class="inp" type="text" />
    <button @click="handleAdd()" class="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleAdd () {
      console.log('buttonAdd has been clicked')
      this.$emit('input', this.value + 1)
    },
    handleSub () {
      if (this.value <= 1) {
        return
      }
      console.log('buttonSub has been clicked')
      this.$emit('input', this.value - 1)
    },
    // @change在input中的使用是重点
    handleChange (e) {
      console.log(e.target.value)
      //   首先要判定input中输入到内容是否是合法的数字
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

 <style lang="less" scoped>
 .count-box {
  width: 110px;
  display: flex;
  .add, .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
