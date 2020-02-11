<template>
    <div class="wrapC" style="margin-top:65px; margin-bottom:65px">
        <div v-for="i in feeds" v-bind:key="i">
            <v-card
                max-width="100%"
                class="mx-auto"
                style="margin-bottom:65px"
            >
                <v-list-item>
                <v-list-item-avatar><img src="../../assets/images/profile_default.png"></v-list-item-avatar>
                <v-list-item-content style="padding-left:5%">
                    <v-list-item-title class="headline">제목</v-list-item-title>
                    <v-list-item-subtitle>닉네임</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>
                <hr>
                <v-card-text style="left:90%">
                날짜 : 2019년 12월 22일 <br> 
                시간 : 오후 6시 30분
                </v-card-text>

                <v-card-text>
                한밭대학교 돈가스 맛집
                </v-card-text>
                <hr>
                <v-card-text>
                주소 : 대전광역시 유성구 덕명대로 600-3
                </v-card-text>
                <hr>
                <v-spacer></v-spacer>
                <div style="width:100%;" v-if="like">
                    <button class="animated rubberBand" @click="toggle"><img style="width:30px; margin-left:10px; margin-bottom:5px" src="../../assets/images/likefill.png"></button>
                    <button @click="togglecomment"><img style="width:26px; margin-left:10px; margin-bottom:5px" src="../../assets/images/comment.png"></button>
                </div>
                <div style="width:100%" v-else>
                    <button @click="toggle"><img class="animated rubberBand" style="width:30px; margin-left:10px; margin-bottom:5px" src="../../assets/images/like.png"></button>
                    <button @click="togglecomment"><img style="width:26px; margin-left:10px; margin-bottom:5px" src="../../assets/images/comment.png"></button>
  
                </div>
                <div style="margin-left:10px; margin-bottom:10px">
                    {{ likecount }} 명이 좋아합니다
                </div>

                <div v-if="commenttoggle">
                    <ul>
                        <li v-for="item in comment" :key="item" style="height:20px">
                            <h5 style="float:left; margin-left:15px; margin-right:20px"> 닉네임</h5> &nbsp; <h5 style="margin-left:25px">{{ item.content }}</h5>
                            <br>
                        </li>
                    </ul>
                    <div style="width:30%; float:right; margin-right:20px; margin-top:17px">
                        <button style="height:30px;" class="check-button" @click="addcomment">댓글달기</button>
                    </div>
                    <div style="margin-left:5px; width:60%;">
                        <v-text-field style="color:blue; width:100%" label="댓글입력" v-model="newcomment" id="newcomment" hide-details="auto">
                        </v-text-field>
                        
                    </div>
                </div>
                <div v-else>

                </div>
                <div>
                </div>

            </v-card>  
            </div> 
        </div>
</template>

<script>
    import NavigationBar from '../../components/common/NavigationBar'
    import '../../assets/css/style.scss'
    import '../../assets/css/user.scss'
    import UserApi from '../../apis/UserApi'

    export default {
        components: {
        },
        watch: {

        },
        methods: {
            toggle () {
                this.like = !this.like
            },
            togglecomment() {
                this.commenttoggle = !this.commenttoggle
            },
            addcomment: function () {
                this.comment.push({
                id: Date.now(),
                content: this.newcomment,
                })
            this.newcomment = ''
            },

        },
        data: () => {
            return {
                sheet: false,
                email : "",
                feeds : 5,
                like : false,
                likecount:0,
                comment: [],
                commenttoggle: false,
                newcomment: "",
            }
        }
    }
</script>