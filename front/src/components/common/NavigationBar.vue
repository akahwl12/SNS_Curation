<template>

  <v-navigation-drawer v-model="propDrawer" temporary>

      <v-list-item>
        <v-list-item-avatar style="margin-top:20%; margin-left:41%">
          <v-img src="https://randomuser.me/api/portraits/men/73.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <div style="padding-top:10px; text-align:center">
        <p>{{userinfo.nickName}}</p>
        <p>{{userinfo.email}}</p>
      </div>

      <div style="text-align:center; padding-top:20px">
        <div style="float:left; width:50%" @click="goFollow">팔로워</div>
        <div @click="goFollowing">팔로잉</div>
      </div>

      <div style="text-align:center; padding-top:10px; padding-bottom:20px">
        <div style="float:left; width:50%" @click="goFollow">{{this.follower}}</div>
        <div @click="goFollowing">{{this.following}}</div>
      </div>
       <v-divider style="margin-left:10%; width:80%"></v-divider>

      <v-list dense>
        <div style="padding-top:3%; padding-bottom:3%; padding-left:10%" @click="likeFeed">
          내가 좋아한 피드
        </div>
        <div style="padding-top:3%; padding-bottom:3%; padding-left:10%" @click="scrapFeed">
          내가 스크랩 한 피드
        </div>
        <div style="padding-top:3%; padding-bottom:3%; padding-left:10%" @click="curationFeed">
          나의 큐레이션 피드
        </div>
      </v-list>

      <v-divider style="margin-left:10%; width:80%"></v-divider>

      <v-list dense>
        <div style="padding-top:3%; padding-bottom:3%; padding-left:10%" @click="modifyProfile">
          회원정보 수정
        </div>
        <div style="padding-top:3%; padding-bottom:3%; padding-left:10%" @click="modifyPassword">
          비밀번호 설정
        </div>
        <div style="padding-top:3%; padding-bottom:3%; padding-left:10%" @click="Address">
          뉴스피드 설정
        </div>
      </v-list>

      <v-divider style="margin-left:10%; width:80%"></v-divider>
     

      <v-divider style="margin-left:10%; width:80%"></v-divider>

      <v-list dense>
        <div style="padding-top:5%; padding-bottom:5%; padding-left:10%">
          통계
        </div>
      </v-list>

      <v-divider style="margin-left:10%; width:80%"></v-divider>
      <v-list dense>
        <div style="padding-top:5%; padding-bottom:5%; padding-left:10%" @click="$store.dispatch('logout')">
          로그아웃
        </div>
      </v-list>

    </v-navigation-drawer>
</template>

<script>
import {mapState} from 'vuex';
import Axios from 'axios';
import http from '../../../http-common'

  export default {
    props : ['drawer'],
    created() {
      this.email = this.$store.state.userinfo.email;
      this.getFollowing();
      this.getFollower();
    },
    data () {
      return {
        propDrawer : this.drawer,
        nickName : '',
        email : '',
        follower : 0,
        following : 0,
      }
    },

    watch : {
      propDrawer : function(v) {
        this.updateParentNavi();
      }
    },
    methods : {
      likeFeed() {
        this.$router.push({name:"likeFeed"})
      },
      scrapFeed() {
        this.$router.push({name:"scrapFeed"})
      },
      curationFeed() {
        this.$router.push({name:"curationFeed"})
      },
      
      Address() {
        this.$router.push({name:"Address"})
      },
      updateParentNavi() {
        this.$emit('child', this.propDrawer)
      },  
      modifyPassword() {
        var router = this.$router;
          router.push({
              name: "ModifyPassword"
          });
      },
      modifyProfile() {
        this.$router.push({
          name:"ModifyProfile"
        })
      },
      getFollower() {
        let form = new FormData()
        form.append('email', this.email)
        http.get("/follow/follower?email="+this.email)
        .then(Response => {
          // console.log(Response)
          this.follower = Response.data;
        })
        .catch(Error => {
            console.log(Error)
        })
      },
      getFollowing() {
        let form = new FormData()
        http.get("/follow/following?email="+this.email)
        .then(Response => {
          // console.log(Response)
          this.following = Response.data;
        })
        .catch(Error => {
            console.log(Error)
        })
      },
      goFollow(){
        this.$router.push(
          {name:"FollowPage"}
        )
        

      },
      goFollowing(){
        this.$router.push(
          {name:"FollowingPage"}
        )
      }
    },
    computed : {
      ...mapState(['userinfo']),
    }
  }
</script>