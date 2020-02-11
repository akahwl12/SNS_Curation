<template>
  <v-card
    class="mx-auto"
  >
    <div v-if="items.length==0">
      알림이 없습니다.
    </div>
    <v-list v-if="items.length!=0" three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>
        

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content @click="confirmAlarm(item.num)">
            <v-list-item-title v-if="item.reason==2">"{{item.sender}}"님이 회원님을 팔로우했습니다.</v-list-item-title>
            <v-list-item-title v-if="item.reason==3">"{{item.sender}}"님이 팔로우신청을 거절했습니다.</v-list-item-title>
            <v-list-item-title v-if="item.reason==4">"{{item.sender}}"님이 회원님의 피드에 좋아요를 눌렀습니다.</v-list-item-title>
            <v-list-item-subtitle>{{getTime(item.date)}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
  import {mapState} from 'vuex';
  import http from '../../../http-common'
  import Vue from 'vue'
  import moment from 'moment'
  import VueMomentJS from 'vue-momentjs'
  import {fireDB} from '../../main'
  import EventBus from '../../EventBus'

  Vue.use(VueMomentJS, moment)

  // this.getAlarmFromFirebase();


  export default {
    created() {
      moment.locale('ko');
      if(this.$store.state.userinfo!=null) {
        this.email = this.$store.state.userinfo.email;
        this.nickname = this.$store.state.userinfo.nickName;
      }
      // this.getAlarms();
      this.watchAlarmFromFirebase();
    },
    mounted : function() {
      this.emitAlarm();
    },
    watch: {
    },
    methods : {
      
      emitAlarm() {
        let whoami = this;
        EventBus.$on('emitAlarm', function() {
          // alert("emitAlarm 감지")
          whoami.getAlarms();
        })
      },
      setAlarm(alarm) {
        this.alarmCount = alarm;
      },
      updateAlarmToFirebase() {
        fireDB.collection('Alarm').doc(this.email)
        .set({
          count : this.alarmCount - 1
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
            whoami.getAlarms();
        })
      },
      confirmAlarm(num) {
        http.patch("/follow/alarmconfirm?num=" + num)
        .then(Response => {
          this.items = Response.data
          // console.log(Response.data)
          this.getAlarms()
          this.updateAlarmToFirebase();
        })
        .catch(Error => {
            console.log(Error)
        })
      },
      getTime(time) {
        return moment(time).fromNow();
      },
      getAlarms() {
        http.get("/follow/alarmlist?mynickname=" + this.nickname)
        .then(Response => {
          this.items = Response.data
          // console.log(Response.data)
        })
        .catch(Error => {
            console.log(Error)
        })
      },
    },
    data: () => ({
      email : '',
      nickname: '',
      items: [],
      alarmCount: 0,
    }),
    computed : {
        ...mapState(['userinfo']),
    }
  }
</script>