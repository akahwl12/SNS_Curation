<template>
    <div class="user" id="login">
        <div class="wrapC">
            <h1>입력하신 이메일로 본인인증 번호를 발송했습니다.</h1>
            <h1>메일함을 확인해 주세요</h1>
            <h2 style="text-align:center">입력하신 이메일 주소는 </h2>
            <h2 style="text-align:center; margin-top:10px">{{this.$route.params.email}} 입니다</h2>
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
            <br>
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
                    v-on:click="resendgo">
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
    import UserApi from '../../apis/UserApi'

    export default {
        components: {},
        created() {},
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
                this.email = this.email = this.$route.params.email;

                let data = {email:this.email, key:this.key}
                UserApi.requestConfirmFindPassword(data, res => {
                    UserApi.requestSendTempPassword(data, res => {
                        alert("임시 비밀번호를 메일을 전송하였습니다.")
                    }, error => {
                        var router = this.$router;
                        router.push({
                            name: "ErrorPage",
                            params:{route:this.$route.name}
                        });
                    })
                    this.$router.push({name:"FindPasswordSendEmail", params:{email:this.email}})
                }, error => {
                    var router = this.$router;
                    router.push({
                        name: "ErrorPage",
                        params:{route:this.$route.name}
                    });
                })
            },
            resendgo() {
                this.email = this.$route.params.email
                this.password = this.$route.params.password
                this.nickName = this.$route.params.nickName
                var router = this.$router;
                router.push({
                    name: "FindPasswordReSendEmail",
                    params: {
                        "nickName": this.nickName,
                        "email": this.email,
                        "password": this.password
                    }
                });
            }
        },
        data: () => {
            return {
                email: "",
                password: "",
                nickName: "",
                key: "",
                isSubmit:false,
            }
        }
    }
</script>