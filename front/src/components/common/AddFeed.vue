<template>
<div>
    <v-text-field style="margin-top: 40px; margin-left:20px; margin-right:20px"
      v-model="subject"
      label="제목"
      value=""
      id="subject"
      single-line
      full-width
      hide-details
    ></v-text-field>
    <v-col cols="12" sm="3">
            <v-btn v-if="star1==1" text icon style="color:red" @click="star1go()">
              <v-icon>mdi-star</v-icon>
            </v-btn>

            <v-btn v-else text icon @click="star1go()">
              <v-icon>mdi-star</v-icon>
            </v-btn>

            <v-btn v-if="star2==1" text icon style="color:red" @click="star2go()">
              <v-icon>mdi-star</v-icon>
            </v-btn>

            <v-btn v-else text icon @click="star2go()">
              <v-icon>mdi-star</v-icon>
            </v-btn>

            <v-btn v-if="star3==1" text icon style="color:red" @click="star3go()">
              <v-icon>mdi-star</v-icon>
            </v-btn>

            <v-btn v-else text icon @click="star3go()">
              <v-icon>mdi-star</v-icon>
            </v-btn>

            <v-btn v-if="star4==1" text icon style="color:red" @click="star4go()">
              <v-icon>mdi-star</v-icon>
            </v-btn>

            <v-btn v-else text icon @click="star4go()">
              <v-icon>mdi-star</v-icon>
            </v-btn>

            <v-btn v-if="star5==1" text icon style="color:red" @click="star5go()">
              <v-icon>mdi-star</v-icon>
            </v-btn>

            <v-btn v-else text icon @click="star5go()">
              <v-icon>mdi-star</v-icon>
            </v-btn>
            
          </v-col>
        
    <v-textarea style="margin-top: 10px; margin-left:20px; margin-right:20px"
      v-model="content"
      label="내용"
      id="content"
      counter
      maxlength="120"
      full-width
      single-line
    ></v-textarea>

<div style="margin-bottom: 90px">
    <v-text-field style="font-size:13px; margin-top: 10px; margin-left:20px; margin-right:5px; width:70%; float:left" disabled="disabled"
      v-model="address"
      label="주소"
      value=""
      single-line
      full-width
      hide-details
    ></v-text-field>
    <div style="width:20%; float:left; margin-top:40px">
        <button style="height:30px" class="check-button" @click="addressgo()">주소검색</button>
    </div>
    <div v-if="open">
    <DaumPostcode style="height:400px"
      :on-complete=handleAddress
    />
   </div>
</div>
    <v-file-input style="width:80%; margin-left:15px"
      input-type="file"
      @change="processFile($event)"
      label="File input"
      filled
      prepend-icon="mdi-camera"
      height="px"
      ref="file"
    ></v-file-input>
     <div style="margin-left:30%; margin-top:0px">
        <button class="btn btn--ok" v-on:click="submit" :disabled="!issubmit" :class="{disabled : !issubmit}">
            작성하기
        </button>
    </div>
</div>
</template>

<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script>
import DaumPostcode from 'vuejs-daum-postcode'
import Axios from "axios";
import http from "../../../http-common"

  export default {  
    name: 'App',
    components: {
      DaumPostcode
    },
    watch: {
      subject: function (v) {
          this.checkForm();
      },
      content: function (v) {
          this.checkForm();
      },
    },
    methods: {
        checkForm() {
          if(this.subject.length < 1){
            this.check.subject = '제목 1자이상'
          }
          else{
            this.check.subject = false
          }
          if(this.content.length < 1){
            this.check.content = '1자이상'
          }
          else{
            this.check.content = false;
          }
        
          let issubmit = true;

          Object
          .values(this.check)
            .map(v => {
              if (v) 
                  issubmit = false;
              }
            )
            this.issubmit = issubmit;

        },
        submit(){
          if(this.issubmit){
            let form = new FormData()
            let formdata = new FormData()
            form.append('email', this.$store.state.userinfo.email)
            form.append('title', this.subject)
            form.append('content', this.content)
            form.append('address', this.address)
            let star = this.star1+this.star2+this.star3+this.star4+this.star5
            form.append('count_star', star)
            formdata.append('image',this.image)

            console.log(this.image)

            if(this.image!=null) {
              Axios.post('https://api.imgur.com/3/image',formdata, {headers:{Authorization: 'Client-ID d15c5b033075c6e'}})
              .then(Response => {
                  form.append('image', Response.data.data.link)
                  //  console.log(this)               
                  console.log(form)
                })
              .catch(Error => {

              })
            }

            http.post("/post/post", form)
            .then(Response => {
              console.log(Response)
              if(Response.data=="success"){
                this.$emit('child', this.propDrawer)
              }
            })
            .catch(Error => {
              console.log(Error)
            })
          }
        },
        addressgo(){
          if(this.open==false){
            this.open = true;
          }else{
            this.open = false
          }
        },
        handleAddress(data){
           let fullAddress = data.address
            let extraAddress = ''
        if (data.addressType === 'R') {
         if (data.bname !== '') {
           extraAddress += data.bname
         }
         if (data.buildingName !== '') {
         extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName)
         }
         fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '')
        }
         
          this.address = fullAddress
          this.open = false;
          // console.log(fullAddress) // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        },
        star1go(){
          if(this.star1==0){
            this.star1=1
          }else{
             this.star2=0
            this.star3=0
            this.star4=0
             this.star5=0
          }
        },
        star2go(){
          if(this.star2==0){
            this.star1=1
            this.star2=1
          }else{
            this.star3=0
            this.star4=0
             this.star5=0
          }
        },
        star3go(){
          if(this.star3==0){
           this.star1=1
            this.star2=1
            this.star3=1
          }else{
            this.star4=0
             this.star5=0
          }
        },
        star4go(){
          if(this.star4==0){
            this.star1=1
            this.star2=1
            this.star3=1
            this.star4=1
          }else{
             this.star5=0
          }
        },
        star5go(){
          if(this.star5==0){
            this.star1=1
            this.star2=1
            this.star3=1
            this.star4=1
            this.star5=1
          }
        },
        processFile(event){
          console.log(event)
          // alert(this.$refs.photoimage.files)
          this.image = event
    
        }
    },
    data () {
      return {
       date: '',
       subject: '',
       content: '',
       open:false,
       address:'',
       image:null,
       star1:0,
       star2:0,
       star3:0,
       star4:0,
       star5:0,
       issubmit: false,
       check: {
         subject: false,
         content: false,
         stars:false
       }
      }
    },
  }
  
</script>