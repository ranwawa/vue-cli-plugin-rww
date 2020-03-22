/** @format */

import {
  TYPE,
  VALIDATOR_MOBILE,
  VALIDATOR_REQUIRED,
} from '../assets/js/constants';

export const objectName3 = {
  name: {
    type: TYPE.STRING,
  },
  mobile: VALIDATOR_MOBILE,
};
export const objectName4 = {
  id: VALIDATOR_REQUIRED('请传入id'),
};
