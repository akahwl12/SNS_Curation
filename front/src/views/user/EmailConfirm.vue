<template>
    <div class="user" id="login">
        <div class="header" style="width:100%; height:40px">
            <div style="float:left;">
            <button v-on:click="goBack">
                <img src="../../assets/images/backIcon.png" style="width:40px;">
            </button>
            </div>
            <p style="vertical-align: middle;padding: 8px 5px;float:left;">이메일 인증</p>
        </div>
        <div class="wrapC">
            <h1>인증이 완료되지 않은 이메일입니다.</h1>
            <h1 style="margin-top:10%">가입하신 이메일을 입력해주세요</h1>
            <h1>이메일로 인증 이메일을 발송해드립니다</h1>
            <br/>
            <div>
                <div>
                    <v-text-field label="인증 Key 입력" hide-details=""
                    v-model="key"
                    @keyup.enter="submit"
                    style="color:blue"
                    id="email"></v-text-field>
                </div>
            </div>
            <div class="btn_wrap">
                <button
                    class="btn btn--back btn--ok"
                    v-on:click="submit"
                    :disabled="!isSubmit"
                    :class="{disabled : !isSubmit}">
                    인증하기
                </button>
                <button
                    class="btn btn--back"
                    style="background-color:black; color:white;"
                    v-on:click="sendEmail">
                    메일이 도착하지 않았나요?
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
                email:'',
                key: '',
                isSubmit: false
            }
        },
        created() {

            if (this.$route.params.email != null) {
                this.email = this.$route.params.email;
            }

        },
        watch: {
            key: function (v) {
                this.checkForm();
            }
        },
        methods: {
            checkForm() {
                let isSubmit = true;

                if(this.key.length!=0) {
                    isSubmit = true;
                } else {
                    isSubmit = false;
                }

                this.isSubmit = isSubmit;
            },
            submit() {
                if (this.isSubmit) {
                    this.isSubmit = false;

                    let data = {
                        email: this.email,
                        key:this.key
                    }
                    
                    UserApi.requestEmailConfirm(data, res => {
                        if (res === 'success') {
                            var router = this.$router;
                            router.push({
                                name: "Login"
                            });
                            alert("이메일 인증이 완료되었습니다.")
                        } else {
                            alert("키 값이 일치하지 않습니다.");
                        }
                        this.isSubmit = true;
                    }, error => {
                        var router = this.$router;

                        router.push({
                            name: "ErrorPage",
                            params:{route:this.$route.name}
                        });
                    })
                }
            },
            goBack() {
                var router = this.$router;
                router.go(-1)
            },
            sendEmail() {
                var router = this.$router;

                let data = {email : this.email};

                UserApi.requestSendEmail(data, res => {
                }, error => {
                    var router = this.$router;
                    router.push({
                        name: "ErrorPage",
                        params:{route:this.$route.name}
                    });
                })

                router.push({
                    name: "SendEmail",
                    params:{email:this.email}
                });
            }
        }

    }
</script>