/** @format */

import {
  TYPE,
  VALIDATOR_MOBILE,
  VALIDATOR_REQUIRED,
} from '../assets/js/constants';

import {
  TYPE,
  VALIDATOR_MOBILE,
  VALIDATOR_REQUIRED,
} from '../assets/js/constants';

export const objectName = {
  name: VALIDATOR_REQUIRED('请传入姓名', TYPE.STRING),
  mobile: VALIDATOR_MOBILE,
};
export const supplementComplain = {
  body: {
    type: TYPE.OBJECT,
    fields: {
      complainId: VALIDATOR_REQUIRED('请传入投诉id', TYPE.NUMBER),
      contentRemark: VALIDATOR_REQUIRED('请传入投诉内容'),
    },
  },
};
