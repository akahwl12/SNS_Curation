<template>
    <div class="user" id="login">
        <div class="header" style="width:100%; height:40px">
            <div style="float:left;">
            <button v-on:click="goBack">
                <img src="../../assets/images/backIcon.png" style="width:35px;">
            </button>
            </div>
            <p style="vertical-align: middle;padding: 8px 5px;float:left;">비밀번호 찾기</p>
        </div>
        <div class="wrapC">
            <h1 style="margin-top:10%">가입하신 이메일을 입력해주세요</h1>
            <h1>이메일로 인증 이메일을 발송해드립니다</h1>
            <br/>
            <div>
                <div>
                    <v-text-field label="이메일 주소 입력" hide-details="dd"
                    v-model="email"
                    v-bind:class="{error : error.email, complete:!error.email&&email.length!==0}"
                    @keyup.enter="login"
                    style="color:blue"
                    id="email"></v-text-field>
                </div>
                <div class="error-text" v-if="error.email">
                    {{error.email}}
                </div>
            </div>
            <br/><br/><br/>
            <div class="btn_wrap">
                <button
                    class="btn btn--back btn--ok"
                    v-on:click="submit"
                    :disabled="!isSubmit"
                    :class="{disabled : !isSubmit}">
                    임시 비밀번호 발송
                </button>
                <router-link v-bind:to="{name:'Login'}">
                    <button class="btn btn--cancel">
                        취소
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

    import '../../assets/css/style.scss'
    import '../../assets/css/user.scss'
    import * as EmailValidator from 'email-validator';
    import UserApi from '../../apis/UserApi'
    import axios from "axios"

    export default {
        data: () => {
            return {
                email: '',
                error: {
                    email: false
                },
                isSubmit: false
            }
        },
        created() {

            if (this.$route.params.email != null) {
                this.email = this.$route.params.email;
            }

        },
        watch: {
            email: function (v) {
                this.checkForm();
            }
        },
        methods: {
            checkForm() {
                if (this.email.length >= 1 && !EmailValidator.validate(this.email)) 
                    this.error.email = "이메일 형식이 아닙니다."
                else if (this.email === '') 
                    this.error.email = "이메일을 입력해주세요!"
                else 
                    this.error.email = false;
                
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
                if (this.isSubmit) {
                    this.isSubmit = false;
                    UserApi.requestFindPassword(this.email, res => {
                        // alert("성공")
                        // console.log(res)
                        if (res == 'success') {
                            var router = this.$router;
                            router.push({
                                name: "ConfirmFindPassword",
                                params: {
                                    "nickName": this.nickName,
                                    "email": this.email,
                                    "password": this.password
                                }
                            });
                        } else {
                            alert("존재하지 않는 이메일입니다");
                        }
                        this.isSubmit = true;
                    }, error => {
                        var router = this.$router;
                        router.push({
                            name: "ErrorPage",
                            params: {
                                "email": this.email,
                                "route": this.$route.name
                            }
                        });
                    })
                }
            },
            goBack() {
                var router = this.$router;
                router.go(-1)
            }
        }

    }
</script>