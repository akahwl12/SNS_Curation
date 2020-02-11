<template>
<v-app>
    <div class="user" id="follow">
        <div class="header" style="width:100%; height:auto">
            <div style="width:35px; float:left;">
            <button v-on:click="goNewsFeeds">
                <img src="../../assets/images/backIcon.png" style="width:100%;">
            </button>
            </div>
            <p style="vertical-align: middle;padding: 3px 5px;float:left; font-size:25px">팔로워 리스트</p>
        </div>
        <v-card
    max-width="500"
    class="mx-auto"
  >
    

    <v-list subheader style="margin-top:50px">
      <v-subheader>팔로워 리스트</v-subheader>

      <v-list-item
        v-for="(item, index) in items"
        :key="item.title"
      >

        <v-list-item-content>
          {{item.nickname}}
          <v-list-item-subtitle v-text="item.email"></v-list-item-subtitle>
        </v-list-item-content>

        <div class="profile-card-ctr" v-if="isfollow[index]==0">
            <button class="profile-card__button button--orange" @click="followgo(index)">Follow</button>
        </div>
        <div class="profile-card-ctr" v-if="isfollow[index]==1">
            <button class="profile-card__button button--gray" @click="unfollowgo(index)">UnFollow</button>
        </div>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list subheader>
      <v-subheader>아직 수락하지 않은 사람들</v-subheader>

      <v-list-item
        v-for="item in items2"
        :key="item.title"
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          닉네임:<v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          이메일:<v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
    </div>
</v-app>

</template>




<script>

    import '../../assets/css/style.scss'
    import '../../assets/css/user.scss'
    import UserApi from '../../apis/UserApi'
    import http from '../../../http-common'
    import {fireDB} from '../../main'
import { firestore } from 'firebase'


    export default {
        components: {},
        created() {
          this.nickname = this.$store.state.userinfo.nickName;
          this.getUserByNickname(this.nickname);
        },
        watch: {},
        methods: {
            setAlarm(alarm) {
                this.alarmCount.push(alarm);
            },
            updateAlarmToFirebase(email) {
                fireDB.collection('Alarm').doc(email)
                .update({
                    count : firestore.FieldValue.increment(1)
                })
            },
            watchAlarmFromFirebase(email) {
                let whoami = this;
                let count=0;
                fireDB.collection('Alarm').doc(email).onSnapshot( {
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
            goNewsFeeds() {
                var router = this.$router;
                router.push({
                    name: "MainPage"
                });
            },
            getFollower(num){
              http.get("follow/getFollower/{num}?num="+ num)
              .then(Response => {
                // console.log(Response)
                this.items = Response.data.object;
                this.isfollow = Response.data.object2;
                console.log(this.isfollow)

              })
            },
            getUserByNickname(nick) {
                let form = new FormData()
                form.append('nickname', nick)
                http.get("/user/userinfo/{nickname}?nickname=" + nick)
                .then(Response => {
                  this.num = Response.data.num;
                    this.email = Response.data.email;
                    this.getFollower(this.num);
                    this.watchAlarmFromFirebase(this.email);
                })
                .catch(Error => {
                    console.log(Error)
                })
            },
            followgo(index){
                if(this.items[index].auth==0) {
                    let form = new FormData();
                    let myn  = this.$store.state.userinfo.nickName;
                    form.append('mynickname', myn)
                    form.append('nickname',this.items[index].nickname)
                    http.post("/follow/follow", form)
                    .then(Response => {
                        this.$set(this.isfollow,index,1)
                        this.updateAlarmToFirebase(this.items[index].email);
                        // console.log(Response.data)
                    })
                    .catch(Error => {
                        console.log(Error)
                    })
                }
                else if(this.items[index].auth==1) {
                    let form = new FormData();
                    let myn  = this.$store.state.userinfo.nickName;
                    form.append('mynickname', myn)
                    form.append('nickname',this.items[index].nickname)
                    
                    http.post("/follow/nonfollow", form)
                    .then(Response => {
                        console.log(Response)
                        this.updateAlarmToFirebase(this.items[index].email, index);
                        if(Response.data==='success') {
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
            unfollowgo(index){
                let form = new FormData()
                let myn  = this.$store.state.userinfo.nickName;
                form.append('mynickname', myn)
                form.append('nickname',this.items[index].nickname)
                http.post("/follow/unFollow", form)
                .then(Response => {
                  this.$set(this.isfollow,index,0)
                    console.log(this.isfollow)
                    // console.log(Response.data)
                })
                .catch(Error => {
                    console.log(Error)
                })
            },
            
        },
    data: () => ({
      email:'',
      intro:'',
      auth:0,
      num:0,
      nickname:'',
      items: [],
      items2: [],
      isfollow:[],
      alarmCount:[],
      userAlarmCount : 0,
    }),
    }
</script>