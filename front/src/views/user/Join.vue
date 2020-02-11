<template>
    <div class="user join">
        <div class="header" style="width:100%; height:40px">
            <div style="float:left;">
            <button v-on:click="goBack">
                <img src="../../assets/images/backIcon.png" style="width:40px;">
            </button>
            </div>
            <p style="vertical-align: middle;padding: 8px 5px;float:left;">비밀번호 찾기</p>
        </div>
        <div class="wrapC">
            <div style="text-align:center">
             <img src="../../assets/images/fooddeuk_logoo.png" style="height:70px;">
            </div>
                 <div style="width:80%; float:left">
                 <v-text-field style="color:blue;" label="이메일" v-model="email" id="email" hide-details="auto">
                 </v-text-field>
                 </div>
        
                 <div style="width:20%; float:left">
                    <button class="check-button" @click="checkEmail">중복체크</button>
                 </div>
                 
                 <div style="clear:both"></div>
      
                <div class="error-text" v-if="error.email">
                    {{error.email}}
                </div>
                 <div class="error-text" v-if="exist_email_confirm === 'a'">
                    {{ exist_email }}
                </div>
                <div class="error-textt" v-else-if="exist_email_confirm ==='b'"> 
                    {{ exist_email }}
                </div>
                <br>
           
                 <div style="width:80%; float:left">
                    <v-text-field style="color:blue" v-model="nickName" id="nickName" label="닉네임" hide-details="auto"></v-text-field>
                 </div>
 
                <div style="width:20%; float:left">
                    <button class="check-button" v-on:click="checkNick">중복체크</button>
                </div>
                    
                <div style="clear:both"></div>

                <div class="error-text" v-if="error.nickName">
                    {{error.nickName}}
                </div>
                <div class="error-text" v-if="exist_nickName_confirm === 'a'">
                    {{ exist_nickName }}
                </div>
                <div class="error-textt" v-else-if="exist_nickName_confirm ==='b'"> 
                    {{ exist_nickName }}
                </div>
                <div class="error-textt" v-else-if="error.nickName ==='이메일 형식이 아닙니다.'"> 
                    {{ exist_nickName }}
                </div>
                <br>
           
            <div>
                <v-text-field style="color:blue" v-model="name" id="name" label="이름" hide-details="auto"></v-text-field>
                <div class="error-text" v-if="error.name">
                    {{error.name}}
                </div>
            </div>
            <br>
            <div class="password-input">
                <v-text-field style="color:blue" v-model="password" label="비밀번호" type=password
                hide-details="auto"></v-text-field>
                <div class="error-text" v-if="error.password">
                    {{error.password}}
                </div>
            </div>
            <br>
            <div class="password-input">
                <v-text-field style="color:blue"  v-model="passwordConfirm" label="비밀번호 확인" type=password
                hide-details="auto"></v-text-field>
                <div class="error-text" v-if="error.passwordConfirm">
                    {{error.passwordConfirm}}
                </div>
            </div>
            <br>
            <v-text-field style="color:blue" v-model="intro" id="intro" label="한줄소개" hide-details="auto"></v-text-field>
            <div class="error-text" v-if="error.intro">
                    {{error.intro}}
                </div>
            <br>
            <br>
            <label>
                <input v-model="isTerm" type="checkbox" id="term"/>
                <span>이용약관동의</span>
            </label>
            <span class="right" @click="termPopup=true">약관보기</span><br/>
            <div class="btn_wrap">
                <button class="btn btn--back btn--ok" v-on:click="submit"
                :disabled="!isSubmit"
                :class="{disabled : !isSubmit}">
                    회원가입하기
                </button>
            </div>

        </div>     
                          
    </div>
    
</template>

<script>

    import '../../assets/css/style.scss'
    import '../../assets/css/user.scss'
    import PV from 'password-validator'
    import * as EmailValidator from 'email-validator';
    import UserApi from '../../apis/UserApi'

    export default {
        
        created() {
            this.component = this;
            this
                .passwordSchema
                .is().min(8)
                .is().max(100)
                .has()
                .digits()
                .has()
                .letters();
                
            if(this.$route.params.nickName != null) {
                this.nickName = this.$route.params.nickName;
            }
            if(this.$route.params.email != null) {
                this.email = this.$route.params.email;
            }
            if(this.$route.params.name != null) {
                this.name = this.$route.params.name;
            }
            if(this.$route.params.intro != null) {
                this.intro = this.$route.params.intro;
            }
        },
        watch: {
            nickName: function (v) {
                this.checkForm();
                this.exist_nickName = ''
            },
            email: function (v) {
                this.checkForm();
            },
            password: function (v) {
                this.checkForm();
            },
            passwordConfirm: function (v) {
                this.checkForm();
            },
            isTerm: function (v) {
                this.checkForm();
            },
            name: function (v) {
                this.checkForm();
            },
            intro: function (v) {
                this.checkForm();
            },
            exist_nickName: function (v) {
                this.checkForm();
            },
            exist_email: function (v) {
                this.checkForm();
                this.checkEmail();
            }
        },methods: {
            goBack() {
                var router = this.$router;
                router.go(-1)
            },
            checkNick() {
                var router = this.$router;
                let {nickName} = this;
                let data = {
                    nickName
                }
                this.isCheck = true;
                UserApi.requestCheckNick(data, res =>{
                    if(res) {
                        this.exist_nickName = '존재하는 닉네임입니다. 다시 설정해주세요.';
                        this.exist_nickName_confirm = 'a'
                    }
                    else {
                        this.exist_nickName = '사용가능한 닉네임입니다.';
                        this.exist_nickName_confirm = 'b'
                    }
                },error=>{  
                    var router = this.$router;
                    router.push({name:"ErrorPage",params:{
                        "nickName" : this.nickName,
                        "email" : this.email,
                        "route" : this.$route.name
                    }});
                    this.isSubmit = true;
                })
                
            },
            checkEmail() {
                var router = this.$router;
                let {email} = this;
                let data = {
                    email
                }
                this.isCheck = true;
                UserApi.requestCheckEmail(data, res =>{
                    if(res) {
                        this.exist_email = '존재하는 이메일입니다. 다시 설정해주세요.';
                        this.exist_email_confirm = 'a';
                    }
                    else {
                        if (this.error.email=='이메일 형식이 아닙니다.'){
                            this.exist_email = ''
                        }
                        else{
                            this.exist_email = '사용가능한 이메일입니다.';
                            this.exist_email_confirm = 'b';
                        }
                    }
                },error=>{  
                    var router = this.$router;
                    router.push({name:"ErrorPage",params:{
                        "nickName" : this.nickName,
                        "email" : this.email,
                        "route" : this.$route.name
                    }});
                    this.isSubmit = true;
                })
                
            },

            checkForm() {
                if(this.nickName.length > 15)
                    this.error.nickName = "닉네임은 2 ~ 15자 이내로 작성해주세요";
                else if(this.nickName.length < 2)
                    this.error.nickName = "닉네임은 2 ~ 15자 이내로 작성해주세요";
                else
                    this.error.nickName = false;

                if (this.email.length >= 0 && !EmailValidator.validate(this.email)) 
                    this.error.email = "이메일 형식이 아닙니다."
                else 
                    this.error.email = "";
                
                if (this.password.length >= 0 && !this.passwordSchema.validate(this.password)) 
                    this.error.password = '영문,숫자 포함 8 자리이상이어야 합니다.'
                else 
                    this.error.password = false;

                if (this.name.length > 5)   
                    this.error.name = "이름은 2 ~ 5자 이내로 작성해주세요";
                else if(this.name.length < 2)
                    this.error.name = "이름은 2 ~ 5자 이내로 작성해주세요"
                else   
                    this.error.name = false

                if (this.intro.length < 2)
                    this.error.intro = "자기소개는 2 ~ 20자 이내로 작성해주세요";
                else if(this.intro.length > 20)
                    this.error.intro = "자기소개는 2 ~ 20자 이내로 작성해주세요"
                else   
                    this.error.intro = false

                if(this.password.length >= 8) {
                    if (this.passwordConfirm == this.password) {
                        this.error.passwordConfirm = '비밀번호가 일치합니다.';
                        this.error.passwordConfirm = false;
                    }
                    else 
                        this.error.passwordConfirm = '비밀번호가 일치하지 않습니다.'
                }
                if(this.exist_email !== '사용가능한 이메일입니다.')
                    this.error.exist_email = true
                else
                    this.error.exist_email = false
                if(this.exist_nickName !== '사용가능한 닉네임입니다.')
                    this.error.exist_nickName = true
                else
                    this.error.exist_nickName = false


                if(this.isTerm)
                    this.error.isTerm = false;
                else
                    this.error.isTerm = true;
                
                let isSubmit = true;

                Object
                    .values(this.error)
                    .map(v => {
                        if (v) 
                            isSubmit = false;
                        }
                    )
                this.isSubmit = isSubmit;
            },
            submit() {
                if (this.isSubmit) {
                    let {nickName, email, password, name, intro} = this;
                    let data = {
                        nickName,
                        email,
                        password,
                        name,
                        intro,
                    }
                    this.isSubmit = false;
                    UserApi.requestJoin(data, res => {
                        if(res == 'success') {
                            alert("이메일 인증 페이지로 이동합니다.");
                            var router = this.$router;
                            router.push({
                                name: "EmailConfirm",
                                params: {
                                    "email": this.email,
                                }
                            });
                        } else if(res == 'hasNick') {
                            alert("이미 존재하는 닉네임입니다.");
                        } else if(res == 'hasEmail') {
                            alert("이미 존재하는 이메일입니다.");
                        } else {
                            alert("회원가입에 실패했습니다.");
                        }
                        this.isSubmit = true;
                    }, error => {
                        var router = this.$router;
                        router.push({name:"ErrorPage", params:{
                            "nickName": this.nickName,
                            "email" : this.email,
                            "password" : this.password,
                            "name" : this.name,
                            "intro": this.intro,
                            "route" : this.$route.name
                        }});
                    })
                }
            }
        },
        data: () => {
            return {
                intro: '',
                name: '',
                email: '',
                password: '',
                passwordConfirm: '',
                passwordSchema: new PV(),
                nickName: '',
                isTerm: false,
                isLoading: false,
                error: {
                    exist_nickName:false,   
                    exist_email:false,
                    name: false,
                    nickName: false,
                    email: false,
                    password: false,
                    passwordConfirm: false,
                    term: false,
                    intro: false,
                },
                isCheck: false,
                isSubmit: false,
                termPopup: false,
                exist_email: false,
                exist_email_confirm: false,
                exist_nickName: false,
                exist_nickName_confirm: false,
            }
        }

    }
</script>