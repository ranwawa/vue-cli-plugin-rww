/** @format */

import {
  TYPE,
  VALIDATOR_MOBILE,
  VALIDATOR_REQUIRED,
} from '../assets/js/constants';

export const objectName = {
  name: VALIDATOR_REQUIRED('请传入姓名', TYPE.STRING),
  mobile: VALIDATOR_MOBILE,
};
export const objectName2 = {
  id: VALIDATOR_REQUIRED('请传入id'),
};
