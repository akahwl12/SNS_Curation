<template>
    <div class="user join">
        <div class="header" style="width:100%; height:40px">
            <div style="float:left;">
            <button v-on:click="goBack">
                <img src="../../assets/images/backIcon.png" style="width:35px;">
            </button>
            </div>
            <p style="vertical-align: middle;padding: 8px 5px;float:left;">비밀번호 수정</p>
        </div>
        <div class="wrapC">
            <h1>비밀번호 변경</h1>
                 <div class="password-input">
                <v-text-field style="color:blue" v-model="password" label="비밀번호" type=password
                hide-details="auto"></v-text-field>
                <div class="error-text" v-if="error.password">
                    {{error.password}}
                </div>
            </div>
            <br>
            <div class="password-input">
                <v-text-field style="color:blue"  v-model="passwordConfirm" label="비밀번호 확인" type=password
                hide-details="auto"></v-text-field>
                <div class="error-text" v-if="error.passwordConfirm">
                    {{error.passwordConfirm}}
                </div>
            </div>
                 
            <br>
            <br>
                <button class="btn btn--back btn--ok" v-on:click="submit"
                :disabled="!isSubmit"
                :class="{disabled : !isSubmit}">
                    비밀번호 변경
                </button>
            </div>

        </div>       
</template>

<script>

    import '../../assets/css/style.scss'
    import '../../assets/css/user.scss'
    import PV from 'password-validator'
    import * as EmailValidator from 'email-validator';
    import UserApi from '../../apis/UserApi'
    import Axios from 'axios'
    import http from '../../../http-common'

    import {mapState} from 'vuex';

    export default {
        computed : {
            ...mapState(['userinfo']),
        },
        created() {
            this
                .passwordSchema
                .is().min(8)
                .is().max(100)
                .has()
                .digits()
                .has()
                .letters();

            
            if(this.$route.params.email!=null) {
                this.email = this.$route.params.email
            }
            else if(this.$store.state.userinfo!=null) {
                this.email = this.$store.state.userinfo.email;
            }
        },
        watch: {
            password: function (v) {
                this.checkForm();
            },
            passwordConfirm: function (v) {
                this.checkForm();
            },
        },methods: { 
            goBack() {
                var router = this.$router;
                router.go(-1)
            },
            checkForm() {
                if (this.password.length >= 0 && !this.passwordSchema.validate(this.password)) 
                    this.error.password = '영문,숫자 포함 8 자리이상이어야 합니다.'
                else 
                    this.error.password = false;

                if(this.password.length >= 8) {
                    if (this.passwordConfirm == this.password) {
                        this.error.passwordConfirm = '비밀번호가 일치합니다.';
                        this.error.passwordConfirm = false;
                    }
                    else 
                        this.error.passwordConfirm = '비밀번호가 일치하지 않습니다.'
                }
                
                let isSubmit = true;

                Object
                    .values(this.error)
                    .map(v => {
                        if (v) 
                            isSubmit = false;
                        }
                    )
                this.isSubmit = isSubmit;
            },
            submit() {
                let form = new FormData()
                 form.append('email', this.email)
                 form.append('password', this.password)
                 http.patch("/user/password?email=" + this.email + "&password=" + this.password)
                 .then(Response => {
                     alert("비밀번호가 변경되었습니다.")
                     if(this.$route.params.email!=null) {
                         this.$router.push({name:"Login"})
                     }
                     else{
                        this.$router.push({name:"MainPage"})
                     }
                 })
                 .catch(Error => {
          
                   
                 })
            }
        },
        data: () => {
            return {
                email: '',
                password: '',
                passwordConfirm: '',
                passwordSchema: new PV(),
                error: {
                    password: false,
                    passwordConfirm: false,
                },
                isSubmit: false,
            }
        },
    }
</script>