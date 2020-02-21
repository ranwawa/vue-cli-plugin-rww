/**
 * @author 冉娃娃
 * @since 2019/12/7
 * @desc
 * @remark
 */

const requestModel = {
  // 模型名
  objectName: {
    mobile: [
      {
        type: 'string',
        required: true,
        message: '请填写手机号码',
      }, {
        len: 11,
        message: '手机号码格式有误',
      },
    ],
  },
};
const responseModel = {
  // 模型名
  objectName: {
    mobile: [
      {
        type: 'string',
        required: true,
        message: '请填写手机号码',
      }, {
        len: 11,
        message: '手机号码格式有误',
      },
    ],
  },
};
export {
  requestModel,
  responseModel,
};
