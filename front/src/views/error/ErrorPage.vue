<template>
    <div class="user" id="login">
        <div class="wrapC" style="text-align: center">
            <h1>오류 페이지입니다.</h1>
            <h2> 페이지로 이동하여 다시 시도해보세요.</h2>
            <div class="btn_wrap" style="margin-top: 50px">
            <button @click="backgo" class="btn btn--cancel" style="background-color: black;">
                뒤로가기
            </button>
            <button @click="homego" class="btn btn--back btn--ok" style="background-color: white; color: black; margin-top:0px">
                메인 화면으로 이동
            </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                name:"",
                intro:"",
                nickName:"",
                email:"",
                password:"",
            }
        },
        created(){
            
        },
        watch: {
          
        },
        methods: {
            homego(){
                var router = this.$router;
                router.push("/");
            },
            backgo(){
                var router = this.$router;
                var email = this.$route.params.email;
                var route = this.$route.params.route;
                console.log(route)
                router.push({email:email, name:route})
            }
        }

    }
</script>
