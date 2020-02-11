import Vue from "vue";
import Vuex from "vuex";
import router from "../routes.js";
import http from "../../http-common"
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userinfo:null, //db로부터 얻어온 정보가 여기에 저장(회원정보)
        isLogin:false,
        isLoginError:false
    },
    mutations: { //stats 상태값을 변환해주는 로직
      // 로그인이 성공했을 때,
      loginsuccess(state, payload){
     
        state.isLogin = true
        state.isLoginError = false
    
        state.userinfo = payload
      },
      // 로그인이 실패했을 때,
      loginError(state){
        state.isLogin = false
        state.isLoginError = true
      },
      logout(state){
        state.isLogin = false
        state.isLoginError = false
        state.userinfo = null
        sessionStorage.removeItem('access_token')
      },
    }, 
    actions: { //비지니스로직
      //로그인을 시도
      login({dispatch}, loginObj){ //커밋으로 mutations 실행
         // 전체 유저에서 해당 이메일로 유저를 찾는다.
         let form = new FormData()
         form.append('email', loginObj.email)
         form.append('password',loginObj.password)
         // 로그인 -> 토큰반환
         let str = "email"
         http
          .post("/account/login", form)
          .then(res=>{
            //성공시 token:블라블라(유저 id를 받아옴)
            //토큰을 헤더에 포함시켜서 유저정보를 요청
            //let token = res.data.token;
 
            if(res.data.data=="noemailcheck") {
                sessionStorage.removeItem('access_token')
                alert("이메일 미인증 사용자입니다.");
                router.push({name : "EmailConfirm", params:{email:loginObj.email}})
              } else if(res.data.data!="failed"){ //로그인 성공
              let token = res.data.data
              //토큰을 로컬스토리지에 저장
              sessionStorage.setItem("access_token", token)
              dispatch("getMemberInfo") //액션은 디스패치로 불러온다.
            }else {
                sessionStorage.removeItem('access_token')
              alert("아이디 혹은 비밀번호를 확인해주세요.")
            }
          })
          
          .catch(error=>{

            alert("이메일과 비밀번호를 확인하세요!")
            console.log(error)
          })
      },
      logout({commit}){
  
        commit("logout")
        if(router.history.current.name!=='Login'){
            router.push({name:"Login"})
        }
       
      },
      getMemberInfo({commit}){
          let token = sessionStorage.getItem("access_token")
          
          //로컬 스토리지에 저장되어 있는 토큰을 불러온다.
          let form = new FormData()
          form.append('access_token', token)
          if(token!=null){
            // 반환된 토큰을 가지고 유저 정보를 가져와 저장(멤버 정보 반환)
            // 새로고침 -> status날라감 -> 토큰만 가지고 멤버정보를 요청
                http
                  .post("/account/loginToken", form)
                  .then(response=>{
                      let userinfo = {
                          name : response.data.object.name,
                          email : response.data.object.email,
                          nickName : response.data.object.nickname,
                          intro : response.data.object.intro,
                        }
                    
                    commit('loginsuccess',userinfo);
                    
                    if(router.history.current.name=='Login'){
                        router.push({name:"MainPage"}).catch((any) =>{});
                    }
                  })
                  .catch(error=>{
                    sessionStorage.removeItem('access_token')
                    alert("이메일과 비밀번호를 확인하세요!")
                    console.log(error)
                  })
            
          }
        }
       
    }, 
    modules: {}
});