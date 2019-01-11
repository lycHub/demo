// 1、对象中key, val名称一样
const a = 'aa';
const b = 'bb';

const obj = {
    a: a,
    b: b
}

// 简写：
const obj = { a, b }


// 2、创建一个新数组arr2，并将数组arr的元素作为初始值
const arr = ['aa', 'bb', 'cc', 'dd'];
// 简写：
const arr2 = [...arr];




// 3、合并多个对象
const obj1 = { a: 1, b: 2};
const obj2 = { c: 3, d: 4};

// 简写：
const obj = Object.assign({}, obj1, obj2);
// 或
const obj = { ...obj1, ...obj2 };





// 4、交换两个变量
let a = 'aa';   let b = 'bb';
// 简写：
[a, b] = [b, a];





// 5、将一个对象里的属性批量赋值给其它变量
const obj = {
    a: 'aa',
    b: 'bb',
    c: 'cc'
}

// 简写：
const {a, c} = obj ;
console.log(a, c); // 'aa', 'bb'





// 6、if else的简化
let arr = [];
if (res.response) {
    arr = res.response;
}else{
    arr = [];
}

// 简写：
arr = res.response || [];


let label = '';
if (data) {
	label = data.label;
}

简写：
label = data && data.label;




// 变量num可以在1~100之间随意增加或减少
let num = 5;
if(num <= 1) {
    Num = 1;
}else if (num >=100) {
    Num = 100
}

// 简写：
Math.min(100, Math.max(num, 1));