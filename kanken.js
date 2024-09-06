'use strict';

//変数の宣言
let this_element = document.currentScript; //この<script>要素
let state_QA = 'A' //問題(Q) or 答え(A) の表示用フラグ
let question; //問題を格納する変数
let answer; //答えを格納する変数

//GAS関係の変数宣言
const baseHtml = document.querySelector('.spreadsheets--item.js-base');
const spreadsheets = document.querySelector('.spreadsheets');
const apiURL = 'https://script.google.com/macros/s/AKfycbwTv767lzrog9WQn16Iys4EKIAafE3hPHrgUjKNa94U5EZL1HHblm5uwVWjYG3x6sgu/exec';
let response;
let data;

//Googleスプレッドシートからのデータ取得と問題一覧作成
async function loadData() {
  //Googleスプレッドシートからのデータ取得
  response = await fetch(apiURL);
  data = await response.json();

  let tr_text = ''; //trに書き出すhtmlを格納する変数

  for (let i = 0; i < data.length; i++){
    // 問題、回答
    question = data[i].q;
    answer = data[i].a;

    console.log(question, answer)

    // 表に書き出すhtml
    tr_text += '<td class="question">' + question + '</td><td class="answer">' + answer + '</td>';

    // 図2つたまったら、trに出力して、tr_textをクリア
    if ((i%2 == 1) || (i == data.length-1)){
      document.getElementById('list_QA').insertAdjacentHTML('beforeend', tr_text);
        tr_text = '';
    };
  };
};

//問題作成
function make_test(){
    //取得する配列の行インデックス
    let i = Math.floor( Math.random() * data.length);
    
    //QA
    question = data[i].q;
    answer = data[i].a;

    console.log(question, answer)

    //Qの表示
    document.getElementById('q_test').innerHTML = question;
    document.getElementById('a_test').innerHTML = '';
};

//答え表示
function show_answer(){
    document.getElementById('a_test').innerHTML = answer;
};

//クリックされたときの動作
function click_button(){
  //state_QAがAなら、問題を表示して、Qに変更
  if (state_QA == 'A'){
        make_test();
        state_QA = 'Q';
    }
  //state_QAがQなら、答えを表示して、Aに変更
  else if (state_QA == 'Q'){
        show_answer();
        state_QA = 'A';
    };
};

loadData()