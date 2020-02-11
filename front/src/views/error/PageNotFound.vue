
<template>
    <div class="user" id="login">
        <div class="wrapC" style="text-align:center">
                <h1>404</h1>
                <h1>Not Found</h1>
                <h2>해당 페이지를 찾을 수 없습니다.</h2>
                <router-link v-bind:to="{name:'Login'}">
                <button class="btn btn--cancel" style="background-color: green; margin-top: 50px">
                    메인 화면으로 이동
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {

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
            }
            

        }

    }
</script>