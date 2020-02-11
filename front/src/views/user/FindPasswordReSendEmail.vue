<template>
    <div class="user" id="login">
        <div class="wrapC">
            <h1>음.. 아마</h1>
            <h1>스팸함에 들어가 있을지도 몰라요</h1>
            <h1>혹시 확인해 보셨나요?</h1>

            <button @click="resendgo" class="btn btn--back btn--ok" style="background-color: black; color: white; margin-top:0px">
                정말로 이메일이 도착하지 않았어요
            </button>
            <button class="btn btn--cancel" style="background-color: green;" @click="goLogin">
                로그인하러가기
            </button>
        </div>
    </div>
</template>

<script>

    import '../../assets/css/style.scss'
    import '../../assets/css/user.scss'
import UserApi from '../../apis/UserApi'
 
    export default {
        components: {
        
        },
        created(){
        },
        watch: {
          
        },
        methods: {
            goLogin() {
                var router = this.$router;

                router.push({
                    name: "Login"
                });
            },
            resendgo(){
                this.email = this.$route.params.email
                var router = this.$router;

                let data = {email : this.email};

                UserApi.requestSendTempPassword(data, res => {
                    alert("임시 비밀번호를 메일을 전송하였습니다.")
                }, error => {
                    var router = this.$router;
                    router.push({
                        name: "ErrorPage",
                        params:{route:this.$route.name}
                    });
                })

                router.push({name:"FindPasswordSendEmail",params:{email:this.email}});
            }
        },
        data: () => {
            return {
                
                email: "",
                password:"",
                nickName:""

            }
        }

    }

</script>
