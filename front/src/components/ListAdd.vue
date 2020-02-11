<template>

    <div>
        투두리스트!
        <button @click="viewcomment()">댓글보기</button>
    </div>
</template>

<script>

import http from '../../http-common'

export default {
 
    name: 'App',
    props:['propsNum'],

    data: () => ({
    num : ''
     
    }),
    created() {

    },
    methods:{
         
        viewcomment(){
                let n = this.propsNum
                http.get('/comment/comment?num='+n)
                .then(response => {
                    console.log("gd");
                    console.log(response.data.object);
                    this.$emit("comment",response.data.object);
            
                    
                })
                .catch(Error => {
                    console.log(Error)
                })
            }
    }
}
</script>