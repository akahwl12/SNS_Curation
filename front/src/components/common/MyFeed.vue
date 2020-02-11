<template>
    <div class="wrapC">
        <div class="wrapper">
            <div class="profile-card js-profile-card">
                <div class="profile-card__cnt js-profile-cnt">
                    <img src="../../assets/images/profile_default.png" style="margin-bottom:10px;">
                        <div class="profile-card__name">{{nickname}}</div>
                        <div class="profile-card__txt">{{intro}}</div>

                        <div class="profile-card-inf">
                            <div class="profile-card-inf__item">
                                <div class="profile-card-inf__title">{{follower}}</div>
                                <div class="profile-card-inf__txt">Followers</div>
                            </div>

                        <div class="profile-card-inf__item">
                            <div class="profile-card-inf__title">{{following}}</div>
                            <div class="profile-card-inf__txt">Following</div>
                        </div>
                    </div> 
                </div>
            </div>

            <hr>
            <div v-if="auth==1 && isfollow==0" style="margin-top:20px; text-align:center">
                비공개 계정입니다.
            </div>
            <div v-if="auth==0 || (auth==1 && isfollow==1)">
                <div v-if="!post" style="margin-top:20px; text-align:center"> 게시물이 없습니다.</div>
                  <div v-for="(item,index) in post" v-bind:key="item.num">
                    <v-card
                            max-width="100%"
                            class="mx-auto"
                            style="margin-bottom:100px"
                    >
                    <v-list-item>
                        <v-list-item-avatar><img src="../../assets/images/profile_default.png"></v-list-item-avatar>
                        <v-list-item-content style="padding-left:5%">
                        <v-list-item-title class="headline">{{item.title}}</v-list-item-title>
                        <v-list-item-subtitle style="width:50px">{{nickname}} <div style="float:right"> {{getTime(item.date)}}</div> </v-list-item-subtitle>
                        <!-- <v-list-item-subtitle>{{getTime(item.date)}}</v-list-item-subtitle> -->
                        </v-list-item-content>
                        </v-list-item>
                            <v-col cols="12" sm="3">
                                <div v-for="star in item.count_star" :key="star.num">
                                    <v-icon style="color:red; float : left">mdi-star</v-icon>
                                </div>
                                <div v-for="star in (5-item.count_star)" :key="star.num">
                                    <v-icon style="float : left">mdi-star</v-icon>
                                </div>
                            </v-col>
                            <br>
                            <v-card-text>
                                {{item.content}}
                            <br><br><hr><br>
                            주소 : {{item.address}} 
                            </v-card-text>
                            <hr>
                        <v-spacer></v-spacer>

                    <div style="width:100%">
                        <button class="animated rubberBand" v-if="like[index]===true" @click="toggledelete(item.num, index)"><img style="width:30px; margin-left:10px; margin-bottom:5px" src="../../assets/images/likefill.png"></button>
                        <button v-if="like[index]===false" @click="toggleadd(item.num, index)"><img class="animated rubberBand" style="width:30px; margin-left:10px; margin-bottom:5px" src="../../assets/images/like.png"></button>
                        <button @click="commentview(item.num, index)"><img style="width:26px; margin-left:100px; margin-bottom:5px" src="../../assets/images/comment.png"></button>
                        <button><img style="width:26px; margin-left:100px; margin-bottom:5px" src="../../assets/images/share.png"></button>
                        
                        <div v-if="like[index]===true">
                            <p v-if="likelist[index] === 1">
                                {{nick}}님<span>이 좋아합니다.</span>
                            </p>
                            <p v-else>
                                {{nick}}님 외  {{ likelist[index] - 1 }} 명이 좋아합니다
                            </p>
                        </div>

                        <div v-if="like[index]===false">
                            <p>
                                {{ likelist[index] }} 명이 좋아합니다
                            </p>
                        </div>

                        <p>
                            {{ item.count_comment }} 개의 댓글이 있습니다.
                        </p>

                        <div v-if="coment[index]===true">
                            <div v-for="cmt in todolist" v-bind:key="cmt.date" >
                                <div v-if="cmt[0].num==item.num">
                                    <div style="margin-bottom:5px" v-for="cmts in cmt" v-bind:key="cmts.date" >
                                        <h5 style="float:left; margin-left:5px; margin-right:20px; font-weight:bold;"> {{ cmts.nickname }}</h5> &nbsp; 
                                        <h5 style="float:left; ">{{ cmts.comment }} 
                                        </h5>
                                        <span style="float:right; margin-right:20px; font-weight:lighter; color:red" v-if="cmts.author==num || item.author == num" @click="removeComent(item.num,cmts,index)">X</span>
                                        <br>
                                    </div>                
                                </div>
                            </div>
                  
                            <div style="width:30%; float:right; margin-right:5px; margin-top:17px">
                                <button style="height:30px;" class="comment-ok" @click="addcomment(item.num,index)"
                                :disabled="!isSubmit"
                                :class="{disabled : !isSubmit}"
                                >댓글달기</button>
                            </div>
                            <div style="margin-left:5px; width:60%;">
                                <v-text-field style="color:blue; width:90%" label="댓글입력" v-model="newcomment" id="newcomment" hide-details="auto">
                                </v-text-field>
                            </div>
                        </div>
                    </div>
                    
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import Vue from 'vue'
    import moment from 'moment'
    import VueMomentJS from 'vue-momentjs'
    import '../../assets/css/style.scss'
    import '../../assets/css/user.scss'
    import '../../assets/css/profile.scss'
    import {mapState} from 'vuex';
    import UserApi from '../../apis/UserApi'
    import Axios from 'axios'
    import http from '../../../http-common'
    import NavigationBar from '../../components/common/NavigationBar'
    import {fireDB} from '../../main'
    

    export default {
        name: 'App',
        created () {
            if(this.$store.state.userinfo!=null) {
                this.email = this.$store.state.userinfo.email
                this.nick = this.$store.state.userinfo.nickName
            }

            //포스트 불러오기
            this.getUserByNickname(this.nick);

            //검색한 사용자와 팔로잉 체크
            this.followcheck(this.nick);
        },
        watch : {
            newcomment: function(v) {
                this.checkForm();
            }
        },
        computed : {
            ...mapState(['userinfo']),
        },
        methods: {
            checkForm() {
                if (this.newcomment.length < 1)
                    this.error.newcomment = '1자이상'
                else
                    this.error.newcomment = false
                
                let isSubmit = true
                Object
                .values(this.error)
                .map(v => {
                    if (v) 
                        isSubmit = false;
                    }
                )
                this.isSubmit = isSubmit;
            },
            getTime(time) {
                return moment(time).fromNow();
            },
             getUserByNickname(nick) {
                let form = new FormData()
                form.append('nickname', nick)
                http.get("/user/userinfo/{nickname}?nickname="+nick)
                .then(Response => {
               
                    this.num = Response.data.num;
                    this.intro = Response.data.intro;
                    this.auth = Response.data.auth;
                

                    //팔로잉 내역 불러오기
                    this.getFollowing(this.email);
                    //팔로워 내역 불러오기
                    this.getFollower(this.email);
                    //검색한 사용자의 피드 다불러오기
                    this.getPostByNum(this.num);
                    //this.getAlarmFromFirebase();
                })
                .catch(Error => {
                    console.log(Error)
                })
            },
             getFollower() { //팔로우 정보가져오기
                let form = new FormData()
                http.get("/follow/follower?email="+this.email)
                .then(Response => {
                    this.follower = Response.data;
                })
                .catch(Error => {
                    console.log(Error)
                })
            },
            getFollowing() { //팔로잉정보가져오기
                let form = new FormData()
                http.get("/follow/following?email="+this.email)
                .then(Response => {
                    this.following = Response.data;
                })
                .catch(Error => {
                    console.log(Error)
                })
            },
            getPostByNum(num) { //포스트가져오기
                let form = new FormData()
                form.append('num', num)

                http.get("/post/post/{num}?num="+num + '&email=' + this.$store.state.userinfo.email)
                .then(Response => {
                   
                    this.post = Response.data.object; 
                    
                    //좋아요와 댓글 토글용 배열 생성
                    for (let index = 0; index < this.post.length; index++) {
                        if(this.post[index].islike==1){
                            this.like.push(true)
                        }else{
                            this.like.push(false)
                        }
                        this.likelist.push(this.post[index].count_like);
                        this.coment.push(false)
                        
                    }
                   
            
                })
                .catch(Error => {
                    console.log(Error)
                })
            },
            followcheck(nick) { //보는 유저와 팔로우 되어 있는지 확인하기
                let myn  = this.$store.state.userinfo.nickName;
 
                http.get("/follow/follow?mynickname=" + myn + "&nickname=" + nick)
                .then(Response => {
                    if(Response.data==0){
                       
                        this.isfollow = 0;
                    }else if(Response.data==1){
                       
                        this.isfollow = 1;
                        
                    }else{
                        this.isfollow = -1;
                          //내가 나의 정보를 검색할때
                        if(this.nick==this.nickname){
                            this.isfollow=1;
                         }
                    }
                })
                .catch(Error => {
                    console.log(Error)
                })
            },
            unfollowgo(){ //팔로우해제하기
                let form = new FormData()
                let myn  = this.$store.state.userinfo.nickName;
                form.append('mynickname', myn)
                form.append('nickname',this.nickname)
                http.post("/follow/unFollow", form)
                .then(Response => {
                    this.isfollow = 0;
                    this.getFollower();
                    this.getFollowing();
                })
                .catch(Error => {
                    console.log(Error)
                })
            },
            followgo(){ //팔로우신청하기
                if(this.auth==0) {
                    let form = new FormData();
                    let myn  = this.$store.state.userinfo.nickName;
                    form.append('mynickname', myn)
                    form.append('nickname',this.nickname)
                    http.post("/follow/follow", form)
                    .then(Response => {
                        this.isfollow = 1;
                        this.getFollower();
                        this.getFollowing();
                        this.updateAlarmToFirebase();
                    })
                    .catch(Error => {
                        console.log(Error)
                    })
                }
                else if(this.auth==1) {
                    let form = new FormData();
                    let myn  = this.$store.state.userinfo.nickName;
                    form.append('mynickname', myn)
                    form.append('nickname',this.nickname)
                    
                    http.post("/follow/nonfollow", form)
                    .then(Response => {
                        console.log(Response)
                        if(Response.data==='success') {
                            this.updateAlarmToFirebase();
                            alert("팔로우가 요청되었습니다.")
                        }
                        else if(Response.data==='failed') {
                            alert("이미 팔로우 신청을 하였습니다.")
                        }
                    })
                    .catch(Error => {
                        console.log(Error)
                    })

                }
            },
            toggleadd(num, index) { //좋아요를 클릭할때
               this.likelist[index]++;
               this.$set(this.like,index,!this.like[index])
                
                //좋아요 서버로 전송하기
                let form = new FormData()
                form.append('postnum', num)
                form.append('email', this.$store.state.userinfo.email)

                http.post('/postlike/like',form)
                .then(response => {
                     this.post = response.data.object; 
                     
                })
                .catch(Error => {
                     console.log(Error)
                })
            },
            toggledelete(num, index) { //좋아요를 해제할때
                this.likelist[index]--;
                this.$set(this.like,index,!this.like[index])

                http.delete("/postlike/unlike?postnum="+num + '&email=' + this.$store.state.userinfo.email)
                .then(response => {
                     this.post = response.data.object
                     
                })
                .catch(Error => {
                     console.log(Error)
                })
            },
            commentview(num,index){ //댓글 버튼 누를 때
            this.todolist = [];
            //댓글 불러오기
            if(this.coment[index]==false){
                    http.get('/comment/comment?num='+num)
                .then(response => {
                    if(response.data.object!=null){
                        this.todolist.push(response.data.object)
                    } 
                })
                .catch(Error => {
                    console.log(Error)
                })

            //댓글 숨기기
            }else if(this.coment[index]==true){
                    for (let index = 0; index < this.todolist.length; index++) {
                        if(this.todolist[index][0].num==num){
                            this.$delete(this.todolist,index);
                        }   
                    }
                }

                this.$set(this.coment,index,!this.coment[index])
            }
            ,
            addcomment(num,index) {
                
                let form = new FormData()
                form.append('comment', this.newcomment)
                form.append('email', this.$store.state.userinfo.email)
                form.append('num', num)
                http.post("/comment/comment", form)
                .then(response => {
                   
                    //댓글 재등록
                    this.commentview(num, index);
                    this.commentview(num, index);
                   
                    //댓글 초기화
                    this.newcomment=''

                    //댓글 수 갱신하기
                    this.refresh();

                })

            },
            refresh(){ //댓글 수 갱신하기

                http.get("/post/post/{num}?num="+this.num + '&email=' + this.$store.state.userinfo.email)
                .then(Response => {
                   
                    this.post = Response.data.object; 
    
            
                })
                .catch(Error => {
                    console.log(Error)
                })
            },
            removeComent(num, cmt, index){
                
                http.delete("/comment/comment?num=" + cmt.num + "&nickname=" + cmt.nickname + "&date=" + cmt.date)
                .then(response => {

                    //삭제 완료시 댓글창, 댓글수 바로 갱신
     
                    this.commentview(num, index);
                    this.commentview(num, index);
                

                    this.refresh();
                    
                })
                .catch(Error =>{
                })
            },

            //밑은 알람 메소드
            setAlarm(alarm) {
                this.userAlarmCount = alarm;
            },
            updateAlarmToFirebase() {
                console.log(this.email + ":" + this.userAlarmCount)
                fireDB.collection('Alarm').doc(this.email)
                .set({
                    count : this.userAlarmCount + 1
                })
            },
            getAlarmFromFirebase() {
                let whoami = this;
                let count = 0;
                fireDB.collection('Alarm').doc(this.email).get().then(function(doc) {
                if(doc.data()==undefined) {
                    count = 0;
                } else {
                    count = doc.data().count;
                }
                whoami.setAlarm(count);
                }).catch(function(error) {
                    console.log(error)
                })
            },
            watchAlarmFromFirebase() {
                let whoami = this;
                let count=0;
                fireDB.collection('Alarm').doc(this.email).onSnapshot( {
                    includeMetadataChanges: true    
                },function(doc) {
                    if(doc.data()==undefined) {
                        count = 0;
                    } else {
                        count = doc.data().count;
                    }
                    whoami.setAlarm(count);
                })
            },
            togglecomment(num) {
                this.commenttoggle = !this.commenttoggle
                http.get("/comment/comment?num=" + num)
                .then(response => {
                    this.comment = response.data.object
                    // for(this.i=0; this.i< this.comment.length; this.i++){
                    //     if (this.comment[this.i].num==num){
                    //         alert('asd')
                    //         this.comments.push(this.comment[this.i].comment)
                    //     }
                    // }
                    
                })
                .catch(Error => {
                    console.log(Error)
                })
                alert("댓글이 등록되었습니다.")
               
            }
           
        },
        data: () => {
            return {
                isSubmit: false,
                error:{
                    comment:false
                },
                nick:'',
                nickname : '',
                num:0,
                intro:'',
                auth:1,
                email:'', 
                follower:0,
                following:0,
                isfollow:0,
                like:[],
                coment:[],
                todolist:[],
                newcomment: "",
                myEmail:'',
                feeds: 0,
                post : [],
                commentNum:'',
                userAlarmCount: 0,
                likelist:[],
            }
        }
    }
</script>
<style>
p {

    margin-left:5px;
    color: gray;
    font-size:12px;
}
</style>