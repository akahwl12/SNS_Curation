<template>
    <div class="user" id="login">
        <div class="header" style="width:100%; height:auto">
            <div style="width:35px; float:left;">
            <button v-on:click="goNewsFeeds">
                <img src="../../assets/images/backIcon.png" style="width:100%;">
            </button>
            </div>
            <p style="vertical-align: middle;padding: 8px 5px;float:left;">비밀번호 변경</p>
        </div>
        <div class="wrapC">
            <h1>회원님의 이메일로 임시 비밀번호를 발송했습니다.</h1>
            <h1>메일함을 확인해 주세요</h1>
            <h2 style="text-align:center">회원님의 이메일 주소는 </h2>
            <h2 style="text-align:center; margin-top:10px">(세션 이메일) 입니다</h2>
            <br/>
            <button @click="resendgo" class="btn btn--back btn--ok" style="background-color: white; color: black;">
                메일이 도착하지 않았나요?
            </button>
        </div>
    </div>
</template>

<script>

    import '../../assets/css/style.scss'
    import '../../assets/css/user.scss'

    export default {
        components: {},
        created() {},
        watch: {},
        methods: {
            resendgo() {
                this.email = this.$route.params.email
                this.password = this.$route.params.password
                this.nickName = this.$route.params.nickName
                var router = this.$router;
                router.push({
                    name: "ModifyPasswordReSendEmail",
                    params: {
                        "nickName": this.nickName,
                        "email": this.email,
                        "password": this.password
                    }
                });
            },
            goNewsFeeds() {
                var router = this.$router;

                router.push({
                    name: "MainPage"
                });
            }
        },
        data: () => {
            return {email: "", password: "", nickName: ""}
        }
    }
</script>