<template>
    <div>
        <header class="headMenu" style="text-align:center">
            <div style="height:40px; margin-top:px; text-align:center">
            <img src="../../assets/images/fooddeuk_logoo.png" style="height:60px; margin-left:37px">
            <button style="float:right;" @click="searchName" :disabled="menu.isNavi">
                <img src="../../assets/images/search.png" style="height:30px; margin-right:15px; margin-top:15px">
            </button>
            </div>
        </header>

        <NavigationBar class="navi" :drawer="menu.isNavi" @child="updateNaviValue" v-if="menu.isNavi"></NavigationBar>
        <NewsFeed v-if="menu.isHome"></NewsFeed>
        <AlarmPage v-if="menu.isAlarm"></Alarmpage>      
        <MyFeed v-if="menu.isProfile" :propsNickname="nickname"></MyFeed>
        <AddFeed v-if="menu.isAdd" @child="updateAddFeedvalue"></AddFeed>
        <Searchname v-if="menu.isSearch" @child="getPropsNick"></Searchname>
        <UserFeed v-if="menu.isUserProfile" :propsNickname="propsNickname"></UserFeed>


        <div class="footer">
            <button class="footer_btn" @click="clickNavi">
                <img v-if="!menu.isNavi" src="../../assets/images/menu.png" style="height:100%;">
                <img v-if="menu.isNavi" src="../../assets/images/menuFill.png" style="height:100%;">
            </button>
            <button class="footer_btn" @click="clickHome" :disabled="menu.isNavi">
                <img v-if="!menu.isHome" src="../../assets/images/home.png" style="height:100%;">
                <img v-if="menu.isHome" src="../../assets/images/homeFill.png" style="height:100%;">
            </button>
            <button class="footer_btn" @click="clickNewFeed" :disabled="menu.isNavi">
                <img v-if="!menu.isAdd" src="../../assets/images/Add.png" style="height:100%;">
                <img v-if="menu.isAdd" src="../../assets/images/AddFill.png" style="height:100%;">
            </button>
            <button class="footer_btn" @click="clickProfile" :disabled="menu.isNavi">
                <img v-if="!menu.isProfile" src="../../assets/images/profile.png" style="height:100%;">
                <img v-if="menu.isProfile" src="../../assets/images/profileFill.png" style="height:100%;">
            </button>
            <button class="footer_btn" @click="clickAlarm" :disabled="menu.isNavi">
                <v-chip class="alarmChip" x-small style="background-color:red;color:white;" v-if="alarm!=0">{{this.alarm}}</v-chip>
                <img class="alarm_btn" v-if="!menu.isAlarm" src="../../assets/images/alarm.png">
                <img class="alarm_btn" v-if="menu.isAlarm" src="../../assets/images/alarmFill.png">
            </button>
        </div>
    </div>
</template>

<script>

    import '../../assets/css/style.scss'
    import '../../assets/css/user.scss'
    import PV from 'password-validator'
    import * as EmailValidator from 'email-validator';
    import UserApi from '../../apis/UserApi'
    import NavigationBar from '../../components/common/NavigationBar'
    import NewsFeed from '../../components/common/NewsFeed'
    import AlarmPage from '../../components/common/AlarmPage'
    import MyFeed from '../../components/common/MyFeed'
    import UserFeed from '../../components/common/UserFeed'
    import AddFeed from '../../components/common/AddFeed'
    import Searchname from '../../components/common/Searchname'
    import Vue from 'vue'

    import {mapState} from 'vuex';
    import {fireDB} from '../../main'

    export default {
        components: {
            NewsFeed,
            NavigationBar,
            AlarmPage,
            MyFeed,
            AddFeed,
            Searchname,
            UserFeed
        },
        created() {
            this.component = this;
            if(this.$store.state.userinfo!=null){
                this.email = this.$store.state.userinfo.email;
                this.nickname = this.$store.state.userinfo.nickName;
            }
            this.watchAlarmFromFirebase();
        },
        watch: {
        },
        methods: {
            setAlarm(alarm) {
                this.alarm = alarm;
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
                    // alert(count)
                })
            },
            getPropsNick(propsNick) {
                if(this.$store.state.userinfo!=null){
                this.nickname = this.$store.state.userinfo.nickName;
            }
                this.propsNickname = propsNick
                this.menu.isNavi = false;
                this.menu.isHome = false;
                this.menu.isAdd = false;
                this.menu.isProfile = false;
                this.menu.isAlarm = false;
                this.menu.isSearch = false;
                this.menu.isUserProfile = true;
            },
            clickNavi() {
                if(this.$store.state.userinfo!=null){
                this.nickname = this.$store.state.userinfo.nickName;
            }
                this.menu.isNavi = !this.menu.isNavi;
            },
            clickHome() {
                if(this.$store.state.userinfo!=null){
                this.nickname = this.$store.state.userinfo.nickName;
            }
                this.menu.isNavi = false;
                this.menu.isHome = true;
                this.menu.isAdd = false;
                this.menu.isProfile = false;
                this.menu.isAlarm = false;
                this.menu.isSearch = false;
                this.menu.isUserProfile = false;
            },
            clickNewFeed() {
                if(this.$store.state.userinfo!=null){
                this.nickname = this.$store.state.userinfo.nickName;
            }
                this.menu.isNavi = false;
                this.menu.isHome = false;
                this.menu.isAdd = true
                this.menu.isProfile = false;
                this.menu.isAlarm = false;
                this.menu.isSearch = false;
                this.menu.isUserProfile = false;
            },
            clickProfile() {
                if(this.$store.state.userinfo!=null){
                this.nickname = this.$store.state.userinfo.nickName;
            }
                this.menu.isNavi = false;
                this.menu.isHome = false;
                this.menu.isAdd = false;
                this.menu.isProfile = true;
                this.menu.isAlarm = false;
                this.menu.isSearch = false;
                this.menu.isUserProfile = false;
            },
            clickAlarm() {
                if(this.$store.state.userinfo!=null){
                this.nickname = this.$store.state.userinfo.nickName;
            }
                this.menu.isNavi = false;
                this.menu.isHome = false;
                this.menu.isAdd = false;
                this.menu.isProfile = false;
                this.menu.isAlarm = true;
                this.menu.isSearch = false;
                this.menu.isUserProfile = false;
            },
            updateNaviValue(drawer) {
                if(this.$store.state.userinfo!=null){
                this.nickname = this.$store.state.userinfo.nickName;
            }
                this.menu.isNavi = drawer;
            },
            updateAddFeedvalue(val) {
                if(this.$store.state.userinfo!=null){
                this.nickname = this.$store.state.userinfo.nickName;
            }
                this.menu.isAdd = false;
                this.menu.isHome = true;
            },
            searchName() {
                if(this.$store.state.userinfo!=null){
                this.nickname = this.$store.state.userinfo.nickName;
            }
                this.menu.isNavi = false;
                this.menu.isHome = false;
                this.menu.isAdd = false;
                this.menu.isProfile = false;
                this.menu.isAlarm = false;
                this.menu.isSearch = true;
                this.menu.isUserProfile = false;
            }
        },
        data: () => {
            return {
                nickname:'',
                menu : {
                    isNavi: false,
                    isHome: true,
                    isProfile: false,
                    isAlarm: false,
                    isAdd: false,
                    isSearch:false,
                    isUserProfile : false,
                },
                component: this,
                feeds: 5,
                alarm: 0,
                propsNickname:''
            }
        },
        computed : {
            ...mapState(['userinfo']),
        }

    }
</script>