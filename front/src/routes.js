import Login from './views/user/Login.vue'
import Join from './views/user/Join.vue'
import ConfirmFindPassword from './views/user/ConfirmFindPassword'
import FindPassword from './views/user/FindPassword.vue'
import FindPasswordSendEmail from './views/user/FindPasswordSendEmail.vue'
import FindPasswordReSendEmail from './views/user/FindPasswordReSendEmail.vue'
import SendEmail from './views/user/SendEmail.vue'
import ReSendEmail from './views/user/ReSendEmail.vue'
import ModifyProfile from './views/user/ModifyProfile.vue'
import PageNotFound from './views/error/PageNotFound.vue'
import ErrorPage from './views/error/ErrorPage.vue'
import Components from './views/Components.vue'
import MainPage from './views/curation/MainPage.vue'
import ModifyPasswordSendEmail from './views/user/ModifyPasswordSendEmail.vue'
import ModifyPasswordReSendEmail from './views/user/ModifyPasswordReSendEmail.vue'
import FollowPage from './views/user/FollowPage.vue'
import FollowingPage from './views/user/FollowingPage.vue'
import EmailConfirm from './views/user/EmailConfirm.vue'
import Address from './views/curation/Address.vue'
import ModifyPassword from './views/user/ModifyPassword.vue'
import curationFeed from './views/user/curationFeed.vue'
import scrapFeed from './views/user/scrapFeed.vue'
import likeFeed from './views/user/likeFeed.vue'
import Statistics from './views/user/Statistics.vue'


import Vue from 'vue';
import VueRouter from'vue-router';

Vue.use(VueRouter);

const rejectAuthUser = (to, from, next) =>{
 
    if(sessionStorage.getItem("access_token")!=null ){
        //이미 로그인 된 유저이니까 막아야..
        alert("이미 로그인을 하였습니다.")
        next('/curation/MainPage') //홈으로 이동
    } else {
        next()
    }
}

const onlyAuthUser = (to, from, next) =>{
    
    if(sessionStorage.getItem("access_token")==null){
      // 아직 로그인 안 된 유저니까 막아야..
      alert("로그인이 필요한 기능입니다.")
      next('/') //홈으로 이동
    }else{
      next()
    }
  }


  const routes = [
    {
        path : '/',
        name : 'Login',
        component : Login,
        beforeEnter : rejectAuthUser,
    },
    {
        path : '/user/join',
        name : 'Join',
        component : Join,
        props: true
    },
    {
        path : '/user/FindPassword',
        name : 'FindPassword',
        component : FindPassword,
        props: true
    },
    {
        path : '/user/FindPasswordSendEmail',
        name : 'FindPasswordSendEmail',
        component : FindPasswordSendEmail,
        props: true
    },
    {
        path : '/user/FindPasswordReSendEmail',
        name : 'FindPasswordReSendEmail',
        component : FindPasswordReSendEmail,
        props: true
    },
    {
        path : '/user/SendEmail',
        name : 'SendEmail',
        component : SendEmail,
        props: true
    },
    {
        path : '/user/ReSendEmail',
        name : 'ReSendEmail',
        component : ReSendEmail,
        props: true
    },
    {
        path : '/components',
        name : 'Components',
        component : Components
    },
    {
        path:'*',
        redirect:'/404'
    
    },
    {
        path:'/404',
        component : PageNotFound
    },
    {
        path : '/error/ErrorPage',
        name : 'ErrorPage',
        component : ErrorPage,
        props:true
        
    },
    {
        path : '/curation/MainPage',
        name : 'MainPage',
        component : MainPage,
        beforeEnter : onlyAuthUser
    },
    {
        path : '/curation/ModifyPasswordSendEmail',
        name : 'ModifyPasswordSendEmail',
        component : ModifyPasswordSendEmail,
        beforeEnter : onlyAuthUser,
        props:true
    },
    {
        path : '/user/ModifyPasswordReSendEmail',
        name : 'ModifyPasswordReSendEmail',
        component : ModifyPasswordReSendEmail,
        beforeEnter : onlyAuthUser,
        props: true
    },
    {
        path : '/user/FollowPage',
        name : 'FollowPage',
        component : FollowPage,
        beforeEnter : onlyAuthUser,
    },
    {
        path : '/user/FollowingPage',
        name : 'FollowingPage',
        component : FollowingPage,
        beforeEnter : onlyAuthUser,
    },
    {
        path : '/user/ModifyProfile',
        name : 'ModifyProfile',
        component : ModifyProfile,
        beforeEnter : onlyAuthUser,
        props: true
    },
    {
        path : '/user/EmailConfirm',
        name : 'EmailConfirm',
        component : EmailConfirm,
    },
    {
        path : '/user/ModifyPassword',
        name : 'ModifyPassword',
        component : ModifyPassword,
        props: true
    },
    {
        path : '/curation/Address',
        name : 'Address',
        component : Address,
        beforeEnter : onlyAuthUser,
        props: true
    },
    {
        path : '/user/ConfirmFindPassword',
        name : 'ConfirmFindPassword',
        component : ConfirmFindPassword,
        props: true
    },
    {
        path : '/user/curationFeed',
        name : 'curationFedd',
        component : curationFeed,
        beforeEnter : onlyAuthUser,
        props: true
    },
    {
        path : '/user/likeFeed',
        name : 'likeFeed',
        component : likeFeed,
        beforeEnter : onlyAuthUser,
        props: true
    },
    {
        path : '/user/scrapFeed',
        name : 'scrapFeed',
        component : scrapFeed,
        beforeEnter : onlyAuthUser,
        props: true,
    },
    {
        path : '/user/Statistics',
        name : 'Statistics',
        component : Statistics,
        beforeEnter : onlyAuthUser,
    },

];

export default new VueRouter({
    routes
});
