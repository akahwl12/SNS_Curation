<template>
    <div class="user" id="login">
        <div class="wrapC">
            <h1>입력하신 이메일로 임시 비밀번호를 발송했습니다.</h1>
            <h1>메일함을 확인해 주세요</h1>
            <h2 style="text-align:center">입력하신 이메일 주소는 </h2>
            <h2 style="text-align:center; margin-top:10px">{{this.$route.params.email}} 입니다</h2>
            <br/>
            <br>
            <div class="btn_wrap">
                <router-link v-bind:to="{name:'Login'}">
                    <button class="btn btn--cancel">
                        로그인하러가기
                    </button>
                </router-link>
                <button
                    class="btn btn--back"
                    style="background-color:black; color:white;"
                    v-on:click="resendgo">
                    메일이 도착하지 않았나요?
                </button>
                
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
            // checkForm() {
            //     let isSubmit = true;

            //     if(this.key.length!=0) {
            //         isSubmit = true;
            //     } else {
            //         isSubmit = false;
            //     }

            //     this.isSubmit = isSubmit;
            // },
            // submit() {
            //     this.email = this.email = this.$route.params.email;

            //     let data = {email:this.email, key:this.key}
            //     UserApi.requestConfirmFindPassword(data, res => {
            //         this.$router.push({name:"ModifyPassword", params:{email:this.email}})
            //     }, error => {
            //         var router = this.$router;
            //         router.push({
            //             name: "ErrorPage",
            //             params:{route:this.$route.name}
            //         });
            //     })
            // },
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