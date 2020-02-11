<template>
<v-app>
  <div class="header" style="width:100%; height:40px">
            <div style="float:left;">
            <button v-on:click="goBack">
                <img src="../../assets/images/backIcon.png" style="width:35px;">
            </button>
            </div>
            <p style="vertical-align: middle;padding: 8px 5px;float:left;">뉴스피드 설정</p>
        </div>
  <v-container fluid>
    <v-row align="center">
      <v-col style="margin-top:130px; width:100%; text-align:center" cols="6">
        <v-subheader style="margin-left:45px; font-size:20px">지역</v-subheader>
      </v-col>
      <v-col style="margin-top:130px" cols="6">
        <v-subheader style="margin-left:45px; font-size:20px">동네</v-subheader>
      </v-col>
      <v-col cols="6">
        <v-select 
          v-model="select"
          :items="items"
          item-text="state"
          persistent-hint
          return-object
          single-line
        ></v-select>

      </v-col>
      <v-col cols="6">
        <v-select v-if="select.state ==='서울'" v-model="selectt" :items="location[0]" label="전체"></v-select>
        <v-select v-if="select.state ==='부산'" v-model="selectt" :items="location[1]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='대구'" v-model="selectt" :items="location[2]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='인천'" v-model="selectt" :items="location[3]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='광주'" v-model="selectt" :items="location[4]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='대전'" v-model="selectt" :items="location[5]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='울산'" v-model="selectt" :items="location[6]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='강원'" v-model="selectt" :items="location[7]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='경기'" v-model="selectt" :items="location[8]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='경남'" v-model="selectt" :items="location[9]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='경북'" v-model="selectt" :items="location[10]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='전남'" v-model="selectt" :items="location[11]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='전북'" v-model="selectt" :items="location[12]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='제주특별자치도'" v-model="selectt" :items="location[13]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='충남'" v-model="selectt" :items="location[14]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='충북'" v-model="selectt" :items="location[15]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='세종특별자치시'" v-model="selectt" :items="location[16]" item-text="state" label="전체"></v-select>
        <v-select v-if="select.state ==='전체'" v-model="selectt" :items="location[17]" item-text="state" label="전체"></v-select>
      </v-col>
      
      <v-col style="text-align:center; margin-top:70px" cols="6">
        <h2 style="margin-bottom:30px"> 내지역</h2>
       {{ firstresult }}
      </v-col>
      <v-col style="text-align:center; margin-top:70px" cols="6">
        <h2 style="margin-bottom:30px"> 내동네</h2>
       {{secondresult}}
      </v-col>
      <v-col cols="6">
        <div style="margin-top:50px">
            <button class="button--orange" @click="submit">수정</button>
        </div>
      </v-col>
      <v-col cols="6">
        <div style="margin-top:50px">
            <button class="button--blue" @click="goBack">취소</button>
        </div>
      </v-col>
    </v-row>
  </v-container>
</v-app>
</template>

<script>
import Axios from "axios";
import http from '../../../http-common'
import '../../assets/css/address.scss'
  export default {
    created(){
      let form = new FormData()
      // form.append('email', this.$store.state.userinfo.email)
      http.get("/profile/myplace?email=" +this.$store.state.userinfo.email)
                 .then(Response => {
                    this.firstresult = Response.data.object[0];
                    this.secondresult = Response.data.object[1];
                  
                 })
                 .catch(Error => {

                 })
    },
    watch:{
        selectt:function(v){
          // this.result = v;
        }
    },
    data () {
      return {
        firstresult:'',
        secondresult:'',
        result:'전체',
        selectt: '',
        location:[
        ['전체','강남구','강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구'],
        ['전체','강서구','금정구','남구','동구','동래구','부산진구','북구','사상구','사하구','서구','수영구','연제구','영도구','중구','해운대구','기장군'],
        ['전체','남구','달서구','동구','북구','서구','수성구','중구','달성군'],
        ['전체','계양구','남구','남동구','동구','부평구','서구','연수구','중구','강화군','옹진군'],
        ['전체','광산구','남구','동구','북구','서구'],
        ['전체','대덕구','동구','서구','유성구','중구'],
        ['전체','남구','동구','북구','중구','울주군'],
        ['전체','강릉시','동해시','삼척시','속초시','원주시','춘천시','태백시','고성군','양구군','양양군','영월군','인제군','정선군','철원군','평창군','홍천군','화천군','횡성군'],
        ['전체','고양시 덕양구','고양시 일산구','과천시','광명시','광주시','구리시','군포시','김포시','남양주시','동두천시','부천시 소사구','부천시 오정구','부천시 원미구','성남시 분당구','성남시 수정구','성남시 중원구','수원시 권선구','수원시 장안구','수원시 팔달구','시흥시','안산시 단원구','안산시 상록구','안성시','안양시 동안구','안양시 만안구','오산시','용인시','의왕시','의정부시','이천시','파주시','평택시','하남시','화성시','가평군','양주군','양평군','여주군','연천군','포천군'],
        ['전체','거제시','김해시','마산시','밀양시','사천시','양산시','진주시','진해시','창원시','통영시','거창군','고성군','남해군','산청군','의령군','창녕군','하동군','함안군','함양군','합천군'],
        ['전체','경산시','경주시','구미시','김천시','문경시','상주시','안동시','영주시','영천시','포항시 남구','포항시 북구','고령군','군위군','봉화군','성주군','영덕군','영양군','예천군','울릉군','울진군','의성군','청도군','청송군','칠곡군'],
        ['전체','광양시','나주시','목포시','순천시','여수시','강진군','고흥군','곡성군','구례군','담양군','무안군','보성군','신안군','영광군','영암군','완도군','장성군','장흥군','진도군','함평군','해남군','화순군'],
        ['전체','군산시','김제시','남원시','익산시','전주시 덕진구','전주시 완산구','정읍시','고창군','무주군','부안군','순창군','완주군','임실군','장수군','진안군'],
        ['전체','서귀포시','제주시','남제주군','북제주군'],
        ['전체','공주시','논산시','보령시','서산시','아산시','천안시','금산군','당진군','부여군','서천군','연기군','예산군','청양군','태안군','홍성군'],
        ['전체','제천시','청주시 상당구','청주시 흥덕구','충주시','괴산군','단양군','보은군','영동군','옥천군','음성군','진천군','청원군'],
        ['전체','반곡동','소담동','보람동','대평동','가람동','한솔동','나성동','새롬동','다정동','어진동','종촌동','고운동','아름동','도담동','조치원읍','연기면','연동면','부강면','금남면','장군면','연서면','전의면','전동명','소정면'],
        ['전체']
        ],

        select: { state:'전체'},
        items: [
          { state: '전체'},
          { state: '서울'},
          { state: '부산'},
          { state: '대구'},
          { state: '인천'},
          { state: '광주'},
          { state: '대전'},
          { state: '울산'},
          { state: '강원'},
          { state: '경기'},
          { state: '경남'},
          { state: '경북'},
          { state: '전남'},
          { state: '전북'},
          { state: '제주특별자치도'},
          { state: '충남'},
          { state: '충북'},
          { state: '세종특별자치시'},
          { state: '전체'},
        ],
        
      }
    },
    methods :  {
      goBack() {
        var router = this.$router;
        router.go(-1)
      },
      submit() {
        let form = new FormData()
        
        form.append('email', this.$store.state.userinfo.email)
        form.append('place1', this.select.state)
        form.append('place2', this.selectt)

        http.patch("/profile/place?email=" +this.$store.state.userinfo.email + "&place1=" + this.select.state + "&place2=" + this.selectt)
          .then(Response => {
            alert('지역정보가 수정되었습니다.')
            var router = this.$router;
            router.push({name:"MainPage"})
          })
          .catch(Error => {

                 })
      }
    }
  }
</script>

<style>
.button--orange {
  margin-top: 5px;
  background: linear-gradient(45deg, #000000, #000000);
}
.button--blue {
  margin-top: 5px;
  background: linear-gradient(45deg, #8d8a8a, #919191);
}
</style>