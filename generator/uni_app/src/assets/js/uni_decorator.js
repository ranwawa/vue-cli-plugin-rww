import store from '../../store';

/**
 * @author 冉娃娃
 * @since 2019/12/10
 * @desc 扩展uni原生方法
 * @remark
 */


const {
  showModal,
  hideLoading,
  showLoading,
  openSetting,
  navigateTo,
} = uni;
uni.showModal = function showM(options) {
  if (uni.$isAlerting === undefined || uni.$isAlerting === false) {
    uni.$isAlerting = true;
    return showModal(options)
      .then((res) => {
        uni.$isAlerting = false;
        return (res);
      });
  }
  return Promise.reject('同时只能打开一个弹框');
};
uni.showLoading = function showL(options) {
  if (uni.$isLoading === undefined || uni.$isLoading === false) {
    uni.$isLoading = true;
    showLoading(options);
  }
};
uni.hideLoading = function hideL() {
  hideLoading();
  uni.$isLoading = false;
};
uni.openSetting = function openS(scope) {
  const param = {
    userLocation: '需要访问地址位置信息,是否允许?',
  };
  if (!scope) {
    return Promise.reject(new Error('请传入参数'));
  }
  return uni
    .showModal({
      title: '提示',
      content: param[scope],
      showCancel: true,
      cancelText: '取消',
      confirmText: '去授权',
    })
    .then(([err, data]) => {
      if (err) {
        return Promise.reject(err);
      }
      if (data.confirm) {
        return openSetting();
      }
      return Promise.reject(new Error('拒绝授权'));
    })
    .then(([err, { authSetting }]) => {
      console.log(err, authSetting);
      if (err) {
        return Promise.reject(err);
      }
      if (authSetting[`scope.${scope}`]) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('设置失败'));
    })
    .catch(err => Promise.reject(err));
};
uni.showToastText = function (title) {
  return uni.showToast({
    title,
    icon: 'none',
  });
};
uni.navigateToPage = function (url) {
  return uni.navigateTo({
    url,
  });
};
uni.redirectToPage = function (url) {
  return uni.redirectTo({
    url,
  });
};
uni.switchTabPage = function (url) {
  return uni.switchTab({
    url,
  });
};
// todo 路由功能要单独抽离成一个组件
// 路由跳转注入
// 白名单
const whitePages = [
  '/pages/index/index',
  '/pages/city/index',
  '/pages/user/login',
];
function navigatePage(obj) {
  const { url } = obj;
  let result = {};
  const isLoginPage = url.includes('/pages/user/login');
  const isLoadedLoginPage = store.state.loginStatus;
  if (!isLoginPage) {
    result = navigateTo(obj);
  } else if (!isLoadedLoginPage) {
    store.commit('setLoginStatus', true);
    result = navigateTo(obj);
  } else {
    result = Promise.reject(new Error('登陆页面已经打开'));
  }
  return result;
}
uni.navigateTo = function navigateT(obj) {
  const { url } = obj;
  const isInWhitePages = whitePages.find(ele => url.includes(ele));
  if (isInWhitePages) {
    return navigatePage(obj);
  }
  const { token } = store.state.userInfo;
  if (!token) {
    obj.url = '/pages/user/login';
  }
  return navigatePage(obj);
};
export default {};
