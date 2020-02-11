<template>
    <div class="user" id="login">
        <div class="wrapC">
            <div style="text-align:center;">
            <img class="animated jackInTheBox" src="../../assets/images/fooddeuk_logoo.png" style="height:140px;">
            </div>
            <br>
            <br>
            <div>
                <div>
                    <v-text-field label="이메일 주소 입력" hide-details="dd"
                    v-model="email"
                    v-bind:class="{error : error.email, complete:!error.email&&email.length!==0}"
                    @keyup.enter="login({
                    email, password})"
                    style="color:blue"
                    id="email"></v-text-field>
                </div>
                <div class="error-text" v-if="error.email">
                    {{error.email}}
                </div>
            </div>
            <br>

            <div>
                <div class="password-input">
                    <v-text-field label="비밀번호 입력" hide-details="auto"
                    v-model="password"
                    type="password"
                    v-bind:class="{error : error.password, complete:!error.password&&password.length!==0}"
                    id="password"
                    @keyup.enter="login({
                    email, password})"
                    style="color:blue"></v-text-field>
                </div>
                <br>
                <div class="error-text" v-if="error.password">
                    {{error.password}}

                </div>
            </div>
            <br>
            <button
                class="btn btn--back btn--ok"
                @click="login({
                    email, password})"
                :disabled="!isSubmit"
                :class="{disabled : !isSubmit}">
                로 그 인
            </button>
            <div class="sns-login" style="text-align: center">
                <div class="text">
                    <br><br>
                    <div style="text-align:left">
                        sns 로그인
                    </div>
                    <br>
                    <div class="p" id="app">
                        <a :href=naverLoginURL>
                        <img height="50px" width="100%" src="https://developers.naver.com/doc/review_201802/CK_bEFnWMeEBjXpQ5o8N_20180202_7aot50.png">
                        </a>
                    </div>
                </div>
            </div>
            <div class="add-option">
                <div class="text">
                    <br>
                    <hr>
                </div>

                <div class="wrap" style="text-align: center;">
                    <div style="width:50%; height:100%; float:left; padding-top:5%">
                    <router-link
                        v-bind:to="{name:'Join'}"
                        class="btn--text"
                        style="text-algin:center; width:100%; height:100%">회 원 가 입</router-link>
                    </div>
                    <div style="width:50%; float:left; padding-top:5%">
                    <router-link
                        v-bind:to="{name:'FindPassword'}"
                        class="btn--text"
                        style="text-algin:center">비 밀 번 호 찾 기</router-link>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
    import '../../assets/css/animate.scss'
    import '../../assets/css/style.scss'
    import '../../assets/css/user.scss'
    import PV from 'password-validator'
    import * as EmailValidator from 'email-validator';
    import {mapState, mapActions} from "vuex"

    export default {
        name: 'App',
        components: {

        },
        created() {
            this.component = this;
            this
                .passwordSchema
                .is().min(8)
                .is().max(100)
                .has()
                .digits()
                .has()
                .letters();

            if(this.$route.params.email != null){
                this.email = this.$route.params.email;
            }

            this.naverLoginURL += '&client_id=' + this.CLIENT_ID
            this.naverLoginURL += '&redirect_uri=' + this.redirectURI
            this.naverLoginURL += '&state=' + this.state
            this.access_token = this.$route.query.token
            if(this.access_token!=null){
                alert("네이버 로그인에 성공하셨습니다.")
                sessionStorage.setItem("access_token", this.access_token)
                this.$store.dispatch('getMemberInfo')
            }
        },
        computed:{
           ...mapState(["isLogin","isLoginError"])
           
        },
        watch: {
            password: function (v) {
                this.checkForm();
            },
            email: function (v) {
                this.checkForm();
            }
        },
        methods: {
            ...mapActions(["login"]),
            checkForm() {
                if (this.email.charAt(0) >= 'A' && this.email.charAt(0) <= 'Z') {
                        this.email = this.email.toLowerCase();
                    }

                if (this.email.length >= 0 && !EmailValidator.validate(this.email)) 
                    this.error.email = "이메일 형식이 아닙니다."
                else 
                    this.error.email = false;
                
                if (this.password.length >= 0 && !this.passwordSchema.validate(this.password)) 
                    this.error.password = '영문,숫자 포함 8 자리이상이어야 합니다.'
                else 
                    this.error.password = false;
                
                let isSubmit = true;
                Object
                    .values(this.error)
                    .map(v => {
                        if (v) 
                            isSubmit = false;
                        }
                    )
                this.isSubmit = isSubmit;

            }
        },
        data: () => {
            return {
                email: '',
                password: '',
                passwordSchema: new PV(),
                error: {
                    email: false,
                    password: false
                },
                isSubmit: false,
                component: this,    
                CLIENT_ID: 'OmIgPMkxDFxNbKvzwMAw',
                redirectURI: 'http://192.168.31.103:8080/account/naverlogin',
                state: 123,
                naverLoginURL: 'https://nid.naver.com/oauth2.0/authorize?response_type=code',
                access_token: ''
            }
        }

    }
</script>