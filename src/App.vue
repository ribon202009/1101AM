<template>
   <div id="app">
   
   <v-app>

     <v-card>

      <header>
      
      <v-app-bar color="deep-purple" dark>
      
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        
        <v-toolbar-title>Dr.AssetPlanner</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- 前回閲覧した物件をみる -->
        <v-btn icon>
          <v-icon>mdi-eye</v-icon>
        </v-btn>

        <!-- お気に入りの物件をみる -->
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      
      </v-app-bar>

      <!-- ここから -->
      <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
        width="200"
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group>
           


              <v-list-item
                v-for="(menuItem, index) in menuItems"
                :key="index"
                >
                <v-list-item-title v-on:click="menuItem.href"><a v-bind:href="menuItem.href">{{ menuItem.name }}</a></v-list-item-title>
            </v-list-item>
           
            
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      
    
    </header>  

   </v-card> 
    



      
      <!---->
      <v-main>
        <v-content>
          <v-container>
            <v-card  class="mx-auto" max-width="500" >
             
             
               <carousel v-bind:autoplay="true" v-bind:loop="true" 
              v-bind:per-page=1 v-bind:speed=2000 v-bind:pagination-enabled="false">

                 <slide >
                  <img src = "./assets/slider1.png">
                 </slide>
              
                 <slide >
                   <img src = "./assets/slider1.png">
                 </slide>
    
                <slide>
                    <img src = "./assets/slider1.png">
                </slide>

              </carousel>

             
              
              <!-- <v-app-bar id="logo" flat class="transparent"> -->
                
                <!-- class="font-weight-bold text-center white--text pl-0 -->
                
                <!-- <v-toolbar-title class="logo-title">
                  Dr. Asset Planner
                </v-toolbar-title>

              </v-app-bar> -->
              
              <!-- </v-img> -->




              <v-card   flat width="200" class="ma-2" >
              
              <v-card-title></v-card-title>
 
              </v-card>


              
              <!-- ナビゲーション-->
              <v-card-subtitle dense>
              <!-- ↓ナビゲーション↓ -->


                <!--パンくず-->
               <div>
                  <v-breadcrumbs :items="items">
                    <template v-slot:divider>
                      <v-icon>mdi-forward</v-icon>
                    </template>
                  </v-breadcrumbs>
              
                  <!-- <v-breadcrumbs :items="items">
                    <template v-slot:divider>
                      <v-icon>mdi-chevron-right</v-icon>
                    </template>
                  </v-breadcrumbs> -->
                </div>
            
               </v-card-subtitle>

        <!--入力フォーム見出し-->
              <v-card-title id="title" class="layout justify-center">
              
              <div class="inputTitle">

              <h4>
                <p>
                  <!-- style=font-size:15px; -->
                  <span>AI<v-icon>mdi-head-sync-outline</v-icon> </span> が調べるので個人情報一切不要!!
                </p>
                <span id="secondLine">今と同じ家賃で買える家がわかる!?</span>
              </h4>
                
              </div>  
              </v-card-title>

            
              <v-card-text >

        <!-- -->
        <v-form ref="test_form">    
             
              <!--マンション名-->   
              <v-row>     
                    <v-col cols="1" id="headingApart"> 
                        <div class="headingIconApart"><v-icon>mdi-home-assistant</v-icon></div>
                    </v-col>

                    <v-col cols="2" id="headingApart"> 
                         <div class="heading"><h2>物件名</h2></div> 
                    </v-col>

                    <!--prepend-icon="mdi-home-assistant"  label="物件名" placeholder=-->
                    <v-col cols="9" >
                      <v-autocomplete  dence  label="例：エステートマンション"  v-model="pname"
                        :error-messages="pnameErrors" required @input="$v.pname.$touch()" @blur="$v.pname.$touch()">
                        ここに物件名のリスト？
                      </v-autocomplete>
                    </v-col>
              </v-row>      


              <!--家賃-->
              <v-row>
                    <v-col cols="1" id="headingRent"> 
                        <div class="headingIconRent"><v-icon>mdi-bitcoin</v-icon></div>
                    </v-col>

                    <v-col cols="2" id="headingRent"> 
                         <div class="heading"><h1>  家 賃</h1></div> 
                    </v-col>

                    <v-col cols="6">
                     <!-- prepend-icon="mdi-cash-usd" prepend-icon="mdi-bitcoin"  type="tel"でスマホユーザー counter="10" これ→ outlined hide-details color="orange"あるとrequired適用されない-->
                      <v-text-field  
                        label="例：90,000" 
                        suffix="円"
                        input :value="inputRent"  @input="inputRent=$event"
                        maxlength="8" 
                        :rules="[required, limit_length]" 
                        type="tel"
                       >

                        <!--↑:error-messages="rentErrors" required required @input="$v.rent.$touch()" @blur="$v.rent.$touch()" placeholder="" required -->
                       </v-text-field>
                    </v-col>

                    <v-col cols="3" id="rent">  
                      <div class="progress-bar" :style="{ background: barColorRent, width: barWidthRent + 'px'}">{{messageRent}}</div>
                    </v-col>  

            </v-row>


            <!-- 家賃のエラーメッセージ -->
            <!-- <v-row>
              <v-col cols="1" ></v-col> 
              <v-col cols="2" > </v-col>
              <v-col cols="4">
                <div class="frame" :style="{color:black}">入力内容：
                  <p id="output" :style="{color:black}"></p>
                </div> 
              </v-col> 
            </v-row> -->



            <!-- 広さ -->
            <v-row>
                    <v-col cols="1" id="headingSize"> 
                        <div class="headingIconSize"><v-icon>mdi-arrow-expand</v-icon></div>
                     </v-col>
                    <v-col cols="2" id="headingSize"> 
                         <div class="heading"><h1>  広 さ</h1></div> 
                    </v-col>  

                   <!--広さ placeholder="例：30" prepend-icon="mdi-arrow-expand" outlined hide-details -->
                    <v-col cols="6" > 
                      <v-text-field   
                      label="例：30"     color="orange"  suffix="㎡"
                      
                       input :value="input" @input="input=$event"

                       maxlength="4" 

                      >

                       <!--   @onchange="inputCheck()"   -->
                       
                        <!--  :error-messages="sizeErrors" required @input="$input_dd.$touch()" @blur="$v.size.$touch()" -->
                      
                     

                      </v-text-field> 
                    </v-col>   

                    <v-col cols="3" id="size">  
                      <div class="progress-bar" :style="{ background: barColor, width: barWidth + 'px'}">{{message}}</div>
                    </v-col>   
             </v-row> 


            <!-- 広さのエラーメッセージ -->
            <v-row>
              <v-col cols="1" ></v-col> 
              <v-col cols="2" ></v-col>
              <v-col cols="4" > </v-col>
                
            </v-row>  
                      
        
                    <!-- 利用規約 -->
                    <v-col cols="12">
                      <v-checkbox hide-details 
                       v-model="checkbox" 
                    

                      label="利用規約に同意"
                      :error-messages="checkboxErrors" 
                      required @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()" > 

                     
                      </v-checkbox>
                    </v-col>
      
              </v-form>

            

                  <!-- 調べるボタン -->
                    <v-col cols="12" id="container">
                      <v-btn block class="btn-open"
                     
                       @click="submit" >
                       
                        <span class="mgr-10">調べる   
                         <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                        </span>  
                        </v-btn>
                    </v-col> 
           
                    
                 
               
              </v-card-text>
              
            </v-card>


          </v-container><!-- main end -->
          <!---->

          <!-- -->
        </v-content>

        <!-- ふっだーリスト名: links -->
        
        <v-card height="150" color="grey lighten-4">
          <v-footer padless absolute>
            <v-row justify="center" no-gutters>
              <v-btn v-for="link in links" :key="link" text rounded class="my-2">
                {{ link }}
              </v-btn>
              <v-col class="grey lighten-4 py-4 text-center font-weight-light" cols="12">
                &copy; {{ new Date().getFullYear() }} — Estate Technologies Inc.
              </v-col>
            </v-row>
          </v-footer>
        </v-card>

      </v-main>
    </v-app>
  </div>
</template>



<script>
import { Carousel, Slide } from 'vue-carousel'; //追加

export default {
  name: 'App',

  //スライダー
    Carousel,
    Slide,



 
data : function(){
  return{

    // menu
      drawer:false,
      
      
      menuItems : [
      {
      name : 'Dr.asset',
      href: 'https://python5.com/q/pkgyxcsl' ,
      },
      {
      name : '2',
       href: 'https://python5.com/q/pkgyxcsl' ,
      },
      {
      name : 'D3',
      href: 'https://python5.com/q/pkgyxcsl' ,
      },
      {
      name : 'Dr.asset4',
      href: 'https://python5.com/q/pkgyxcsl' ,
      },
    ],
      

    // 家賃
      inputRent : " ", // watch :{ inputRent→同じ名前
      newinputRent : '',
      messageRent : '',
      barWidthRent : '0',
      barColorRent: '#ff1919', 
        

  //広さ
      input : " ", // watch :{ input→同じ名前
      newinput :'',
      message : '',
      barWidth : '0',
      barColor : '#ff1919',



         
   // 入力規則●家賃
      required : value => !!value || "必ず入力してください", // 入力必須の制約
      limit_length : value => value.length <= 7 || "7桁以下" ,// 文字数の制約
        
  // 利用規約 
      checkbox : false,
       
   



    

// ぱんくず
    items: [
        {
          text: '検索(TOP)',
          disabled: true,
          href: '',
        },
        {
          text: '結果',
          disabled: false,
          href: '',
        },
      ],


    links: [
      
          "LOGO",
          "当サイトについて",
          "お問い合わせ",
          "プライバシーポリシー",
          "クッキーポリシー",
        
    ],

  }
},

 methods: {


    // 送信を試みるメソッド（「送信する」がクリックされたときに呼ばれる）
      submit() {
       // ↓***** 新規追加 & 修正

          if (this.$refs.test_form.validate() && (this.checkbox === true) ){
          
            this.success = true;
            alert('送信成功！！');

          }else if(this.checkbox === false) {
            alert('利用規約に同意してください');
          }else{
            alert('入力されていない箇所があります');
            this.success = false;
          }
      }
    },



watch:{

    // 家賃 

       inputRent:{    
           handler: function (newinputRent) {

            this.newinputRent = newinputRent

         
              // lengthじゃないと動かない
        
        var vm = this;
        var length;
        length = vm.inputRent.length;
        this.barWidthRent = 1 + length * 12
        
           if (length <= 2 ) {
            vm.messageRent = '';
            vm.barColorRent = '#ff8c00';
          }else if (length <= 3 ) {
            vm.messageRent = '';
            vm.barColorRent = '#ffa500'; 
          }else if (length <= 4 ) {
            vm.messageRent = '';
            vm.barColorRent = '#ffff00';
          }else if (length <= 5 ) {
            vm.messageRent = 'OK';  
            vm.barColorRent = '#00ced1';   
          }else if (length <= 6 ) {
            vm.messageRent = 'OK';   
            vm.barColorRent = '#32cd32';
          }else if (length <= 7 ) {
            vm.messageRent = 'OK';   
            vm.barColorRent = '#7fff00';       
          }else if (length >= 8 ){
            vm.messageRent =  'OK';
            vm.barColorRent = '#00ff7f';
          }
        },
      deep: true,
},

 
// 広さ
        input: function (newinput) {

        this.newinput = newinput            
        
        var vm = this;

        var length;

        
        length = vm.input.length;
        this.barWidth = 31 + length * 15
        
          if (length < 1) {
            vm.message = '';
            vm.barColor = '#32cd32';
          }else if (length <= 2) {
            vm.message = '';
            vm.barColor = '#00ff7f';

          }else if (length <= 3) {
            vm.message = '';
            vm.barColor = '#7fff00';
          }else{
            vm.message =  'それ以上は入力できない';
            vm.barColor = '#40ffd9';
          }
          
        }
          
        
      },
 }


  



    
  

 
    
  </script>

  <style>
  @import url("https://fonts.googleapis.com/css?family=Questrial");


@font-face {
	font-family: 'MyFont' !important;
	/* src: url(./assets/myfont.ttf) !important; */
  src: url(http://dekasu.net/fonts/?p=1,3,9)
}


#logo .logo-title {
  font-size: 20px ;
  font-family: "MyFont" !important; 
  font-family: "UI Gothic" !important;
  color:white;
  /* font-family: "UI Gothic" !important;
  font-family: "Questrial" !important;
  font-family:  "sans-serif" !important; */

}


 /* ハンバーガーメニューの幅 ● オーバーライドしないと適用されないよ*/
 .v-navigation-drawer--close.v-navigation-drawer--temporary {
    transform: translateX(-13vw) !important;
}


/* 追加 */
.VueCarousel-slide {
 
  height:300px;
  color:#FFF;
  background:#59ecff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right:1px solid #FFF;
  box-sizing:border-box;
  font-size:12px;
}


  /* 枠 */
  #title .inputTitle{
    text-align:center;

     position: relative;
     margin: 1rem -10px;

    /* cardとの間隔 1rem→0.5remに変更*/
     padding: 0.5rem 2rem;

    /* 幅 */
    width:450px;

     background: #fff100;
  }

 /* 枠 */
 #title .inputTitle:before,
 #title .inputTitle:after {
  position: absolute;
  content: '';
}

 /* 枠 */
 #title .inputTitle:before {
  bottom: -10px;
  left: 0;
  width: 0;
  height: 0;
  border-top: 10px solid #ccc100;
  border-left: 10px solid transparent;
}

 /* 枠 */
 #title .inputTitle:after {
  right: 0;
  bottom: -10px;
  width: 0;
  height: 0;
  border-top: 10px solid #ccc100;
  border-right: 10px solid transparent;
}

/* 1行目 */
 #title .inputTitle p {
   /* padding-top:10px;  */
   
   border-bottom: 1px solid black; 
   
 }

/* 2行目 */
 #title .inputTitle #secondLine {
     padding-bottom:10px; 
    border-bottom: 1px solid black;
   
 }


/* AIのアイコン */
 /* #title .inputTitle p .icon{
   /* padding-top:10px;  */
   /* font-size:190px; */
   
 
 

 
 
  .title span {
    /* font-size: 10px ; */
    /* display: block !important; */
  }


/* ◼️物件名◼️ */
#headingApart .headingIconApart{
  margin-top:17px;
}

 #headingApart .heading{
  margin-top:18px;
  margin-right:-30px;
 
}

#headingApart .heading h2{
  font-size:19px;
}


/* ◼️家賃◼️ */
#headingRent .headingIconRent{
  margin-top:16px;
}

 #headingRent .heading{
  margin-top:18px;
 
}

#headingRent .heading h1{
  font-size:23px;
}


/* ◼️広さ◼️ */
#headingSize .headingIconSize{
  margin-top:16px;
}

 #headingSize .heading{
  margin-top:17px;
}

#headingSize .heading h1{
  font-size:23px;
}



/* text-field設定 */
.theme--light.v-text-field>.v-input__control>.v-input__slot:before {
    border-color: #ff9800;
    margin-top:-30px;
    /* height:20px; */
    
}

.theme--light.v-label {
    color: #ff9800;
}

.theme--light.v-input:not(.v-input--is-disabled) input, .theme--light.v-input:not(.v-input--is-disabled) textarea {
    color: #ff9800;
}





/*家賃と広さのbar*/
#rent .progress-bar {
  transition : width 0.4s linear;
  background-color : 0.4s linear;

  height:50px;
  border-radius: 3px;
}

/*  */
#size .progress-bar {
  transition : width 0.4s linear;
  background-color : 0.4s linear;

  height:50px;
  border-radius: 3px;
}




 

 /* 調べるボタン */
 
#container {
  font-family: "Yu Gothic", YuGothic, Verdana, 'Hiragino Kaku Gothic ProN','Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', 'メイリオ', Meiryo, sans-serif;
  
  text-align: center;
  padding-top: 40px;
}
#container .btn-open {
  display: inline-block;
  width: 180px;
  height:50px;
  text-align: center;

  background-color: #48c74f;
  font-size: 25px;
  line-height: 52px;
  color: #FFF;
  text-decoration: none;
  font-weight: bold;
  border: 0.6px solid #3f3001;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
#container .btn-open:after{
  width: 100%;
  height: 0;
  content:"";
  position: absolute;

  top: 50%; 
  
  left: 50%;
  
  background : #FFF;
  opacity: 0;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  transition: .2s;
  z-index: -1;
}
#container .btn-open:hover{
  color: #48c74f;
}
#container .btn-open:hover:after{
  height: 240%;
  opacity: 1;
}
#container .btn-open:active:after{
  height: 340%;
  opacity: 1;
}

#container .mgr-10 {
    margin-right : 220px;
    margin-left : 220px;
}

  .f1 {
  font-family: "Questrial";
  font-weight:bold;
  }
  


  


  </style>
  
       
      

