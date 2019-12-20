/**
 * @author 冉娃娃
 * @since 2019/12/7
 * @desc
 * @remark
 */

export default {
  objectName: {
    propName: {
      type: String,
      defaults: '',
      required: [true, '请输入关键字'],
      // todo 需要继续完善默认的验证类型
      isCellPhone: [true, '请输入手机号码'],
      validate: [
        propValue => propValue,
        '失败时的提示信息',
      ],
    },
  },
};