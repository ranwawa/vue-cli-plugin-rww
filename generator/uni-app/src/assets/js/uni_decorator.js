/**
 * @author 冉娃娃
 * @since 2019/12/10
 * @desc 扩展uni原生方法
 * @remark
 */
let isAlerting = false;
let isLoading = false;
let isToasting = false;
const {
  showModal,
  hideLoading,
  showLoading,
  openSetting,
} = uni;
async function showM(options) {
  if (!isAlerting) {
    isAlerting = true;
    const res = await showModal(options);
    isAlerting = false;
    return res;
  }
  return ['同时只能打一个弹框', null];
}
async function showL(options) {
  if (!isLoading) {
    isLoading = true;
    return await showLoading(options);
  }
  return ['同时只能打开一个加载框', null];
}
function hideL() {
  hideLoading();
  isLoading = false;
};
async function openS(scope) {
  const param = {
    userLocation: '需要访问地址位置信息,是否允许?',
  };
  if (!scope) {
    return Promise.reject(new Error('请传入参数'));
  }
  let [err, data] = await uni
    .showModal({
      title: '提示',
      content: param[scope],
      showCancel: true,
      cancelText: '取消',
      confirmText: '去授权',
    });
  if (err) {
    return [err, data];
  }
  if (data.cancel) {
    return ['拒绝授权', ''];
  }
  [err, data] = await openSetting();
  const { authSetting } = data;
  if (err) {
    return [err, data];
  }
  if (authSetting[`scope.${scope}`]) {
    return [null, data];
  }
  return ['设置失败', data];
}
function showToastText (title) {
  return uni.showToast({
    title,
    icon: 'none',
  });
}
function navigateToUrl (url) {
  return uni.navigateTo({ url });
}
function redirectToUrl (url) {
  return uni.redirectTo({ url });
}
function switchTabUrl (url) {
  return uni.switchTab({ url });
}
export default () => {
  uni.showModal =showM;
  uni.showLoading = showL;
  uni.hideLoading = hideL;
  uni.openSetting = openS;
  uni.showToastText = showToastText;
  uni.navigateToUrl = navigateToUrl;
  uni.redirectToUrl = redirectToUrl;
  uni.switchTabUrl = switchTabUrl;
};
