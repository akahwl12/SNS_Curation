<template>
<div class="wrapC">
    <div class="container">
    <div action="" class="search">
        <div class="field" style="float:left; width:80%">
            <input v-model="NewName" type="text" class="input-search" @keyup.enter="AddName">
            <label for="input-search">닉네임 검색</label>
        </div>
            <div style="width:20%; float:left">
                <button class="check-button" @click="AddName" :disabled="!canClick">검색</button>
            </div>
    </div>
    <br>
    <h1 style="margin-top:60px" v-if="isSearch=='history'">최근 검색</h1>
    <h1 style="margin-top:60px" v-if="isSearch=='search'">검색 결과</h1>
        <div v-if="history.length && isSearch=='history'" style="padding-top:20px">
            <ul>
                <li class="nick-list" v-for="item in history" :key="item">
                    <div class="profile-card-search">
                        <img src="data:image/jpeg;base64,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PqrOr1Z3WJUMsatMOX4eThmL43G4gGVlJLE0kAvY2Ise5o6gOsD5laSsuxfB21JjkbJJDPCbwVMZtJGeo8C09QdDqurhbj6QTx0le+CTmScqCuhI5Uk405MzP5uU6eRvos7PimtpnxK/gyxasR5ho6IigWBERAREQEREBERAREQEREArFeNfh/UUXOdSMklo6mqElRSQMPaGsLe8xpB1jLg3QC+vkSdqRexMxw8mNsei/licNbBg87W7Zp5YYA0W0u25cVIUvAmLz61FfS0wv8tPE6V9vAvlsAfMBaiiltnyT5RxhpHhDcKcOxYVT8iJ8j7vfI+R+Uvkkebuc7KAPAbbAKZRFClEREBERAREQUXFPhrFLPUTwV9bTvqJDJIxhidDzCBmdy3N3NrnVRM/BuNU36ito6kDdssb4HkeRYS2/qFqCLuuS1eJcWpW3MMUxLHamla6PEKWpoy8FrakBssLXHQFsrAW366hQfC+DS4ni0bQ5sscEkclZVU5ijbI0AyU7pG3I5nMaQS0ag9N1/QksbXtLXNDmuFnNIBBHgQVy4XhFNRtc2mpoIWuOZzY42RhzvEhoC6vmteNS5pirWdw7URFElEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf//Z" alt="profile card">
                        <p @click="goProfileByNickname(item)" style="float:left; width:100px; height:20px; margin-top:15px; margin-right:90px">{{ item }}</p>
                        <button style="margin-top:18px" @click="RemoveName(item)">
                        X</button>
                    </div>
                    <br>
                </li>
            </ul>
        </div>

        <div v-if="searchResult && isSearch=='search'" style="padding-top:10px">
            <ul>
                <li class="nick-list" v-for="item in searchResult" :key="item.nickName">
                    <div class="profile-card-search">
                        <a @click="goProfileByNickname(item.nickname)"><img src="data:image/jpeg;base64,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PqrOr1Z3WJUMsatMOX4eThmL43G4gGVlJLE0kAvY2Ise5o6gOsD5laSsuxfB21JjkbJJDPCbwVMZtJGeo8C09QdDqurhbj6QTx0le+CTmScqCuhI5Uk405MzP5uU6eRvos7PimtpnxK/gyxasR5ho6IigWBERAREQEREBERAREQEREArFeNfh/UUXOdSMklo6mqElRSQMPaGsLe8xpB1jLg3QC+vkSdqRexMxw8mNsei/licNbBg87W7Zp5YYA0W0u25cVIUvAmLz61FfS0wv8tPE6V9vAvlsAfMBaiiltnyT5RxhpHhDcKcOxYVT8iJ8j7vfI+R+Uvkkebuc7KAPAbbAKZRFClEREBERAREQUXFPhrFLPUTwV9bTvqJDJIxhidDzCBmdy3N3NrnVRM/BuNU36ito6kDdssb4HkeRYS2/qFqCLuuS1eJcWpW3MMUxLHamla6PEKWpoy8FrakBssLXHQFsrAW366hQfC+DS4ni0bQ5sscEkclZVU5ijbI0AyU7pG3I5nMaQS0ag9N1/QksbXtLXNDmuFnNIBBHgQVy4XhFNRtc2mpoIWuOZzY42RhzvEhoC6vmteNS5pirWdw7URFElEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf//Z" alt="profile card">
                        <p style="float:left; width:100px; height:20px; margin-top:15px; margin-right:90px">{{ item.nickname }}</p></a>
                        <button style="margin-top:18px" @click="RemoveName(item)">
                        X</button>
                    </div>
                    <br>
                </li>
            </ul>
        </div>
    </div>
</div>

</template>

<script>
    import '../../assets/css/style.scss'
    import '../../assets/css/user.scss'
    import '../../assets/css/search.scss'
    import UserApi from '../../apis/UserApi'
    import {mapState} from 'vuex';
    import Axios from "axios";
    import http from '../../../http-common'

    export default {
        components : {
        },
        created() {
            if(this.$store.state.userinfo!=null) {
                this.email = this.$store.state.userinfo.email;
                this.myNick = this.$store.state.userinfo.nickName;
            }
            this.GetAllSearch();
        },
        updated() {
            this.email = this.$store.state.userinfo.email;
            this.myNick = this.$store.state.userinfo.nickName;
        },
        computed : {
            ...mapState(['userinfo']),
        },
        watch: {
            NewName: function(v) {
                this.checkNewName();
            }
        },
        methods: {
            checkNewName() {
                if(this.NewName.length!=0) {
                    this.canClick = true;
                } else {
                    this.canClick = false;
                }
            },
            getUserInfo(otherEmail) {
                let form = new FormData()
                form.append('myEmail', this.email)
                form.append('otherEmail', otherEmail)
                http.get("/user/userinfo?myEmail=" + this.email + '&otherEmail=' + otherEmail)
                .then(Response => {

                })
                .catch(Error => {
                    console.log(Error)
                })
            },
            getUserInfoByNickname(nick) {
                let form = new FormData()
                form.append('nickname', nick)
                http.get("/user/userinfo/{nickname}?nickname=" + nick)
                .then(Response => {
                    this.otherEmail = Response.data.email;
                    this.getUserInfo(this.otherEmail);
                })
                .catch(Error => {
                    console.log(Error)
                })
            },
            GetAllSearch: function() {
                let data = {email : this.email};

                UserApi.requestGetAllSearch(data, res => {
                    if (res != null) {
                        this.history = res;
                    } else {
                        alert("데이터 없음");
                    }
                    this.isSubmit = true;
                }, error => {
                    var router = this.$router;
                    router.push({
                        name: "ErrorPage",
                        params: {
                            "email": this.email,
                            "route": this.$route.name
                        }
                    });
                })
            },
            AddName: function () {
                this.isSearch = 'search';

                let data = {nickName : this.NewName};
                

                UserApi.requestSearchNickname(data, res => {
                    this.searchResult = res;
                    this.isSubmit = true;
                }, error => {
                    var router = this.$router;
                    router.push({
                        name: "ErrorPage",
                        params: {
                            "email": this.email,
                            "route": this.$route.name
                        }
                    });
                })

                this.NewName = ''
            },
            RemoveName(nickName) {
                let data = {myNick : this.myNick, otherNick : nickName};

                UserApi.requestDeleteSearch(data, res => {
                    if (res == 'success') {
                        this.GetAllSearch();
                    }
                }, error => {
                    var router = this.$router;
                    router.push({
                        name: "ErrorPage",
                        params: {
                            "email": this.email,
                            "route": this.$route.name
                        }
                    });
                })

                
            },
            goBack() {
                var router = this.$router;
                router.go(-1)
            },
            goProfileByNickname(nick) {
                this.getUserInfoByNickname(nick);
                this.$emit('child', nick)
            }
        },

        data: () => {
            return {
                email : '',
                otherEmail:'',
                myNick: '',
                NewName: '',
                isSearch : 'history',
                history: [],
                searchResult : [],
                canClick:false,
                searchedUser : {
                    nickname:null,
                    email:null,
                    intro:null,
                    auth:null,
                    post:[],
                }
            }
        },
        
}
</script>