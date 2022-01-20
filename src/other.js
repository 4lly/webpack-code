import _ from "lodash"
export function add (num1, num2) {
  return num1 + num2;
}
console.time();
console.timeEnd();
let obj = {name:'lly',age:'18'};
let arr = [1,2,3,4,5,6,7,8,9,null,0];
let objArr = [{name:'lly',age:'18'},{name:'jack',age:'20'},{name:'rose',age:'19'}]
// 对象常用方法

// 参数合并。 （区别于assign：assign 函数不会处理原型链上的属性，也不会合并相同的属性，而是用后面的属性值覆盖前面的属性值 merge 遇到相同属性名的时候，如果属性值是纯对象或集合的时候，会合并属性值）
console.log(_.merge(obj,{sex:'女'}))
//  _.clone(value) 创建一个value的浅拷贝
console.log(_.clone(obj))
//   _.cloneDeep(value) 创建一个value的深拷贝
console.log(_.cloneDeep(obj))
// 创建一个从 object 中选中的属性的对象。
console.log(_.pick(obj,['name']))
// keys ，取出对象中所有的key值组成新的数组。
_.keys(obj);
// 数组常用方法

// 将数组进行切分。
console.log(_.chunk(arr,2))
// 去除假值。（将所有的空值，0，NaN过滤掉）
console.log(_.compact(arr,2))
// sumby,sortby,orderBy，数组对象求和、排序（区别：sortby升序排序，orderBy指定为"desc" 降序，或者指定为 "asc" 升序，默认升序)
_.sumBy(objArr, k => k.age)  //20
_.sumBy(objArr,'age')  //20
_.sortBy(objArr,'age')
_.orderBy(objArr, ['user', 'age'], ['desc', 'desc']);
// cancat数组连接，uniq数组去重，union合并两个数组去重
var other = _.concat([], 2, [3], [[4]]);
console.log(other);
_.uniq([1,1,3])
_.union([2], [1, 2]); // => [2, 1]


// _.drop(array,n) //去除array前面的n个元素，n默认是1
// _.range(10) //生成元素为0到9的数组

// _.times(10, (i)=>console.log(i)) //循环10次

// _.uniqueId() //生成不同的id，用于元素中的id值再好不过

// _.truncat() //截取指定长度后加… 用于处理标题过长再好不过



// _.defaults //安全合并，即忽略undefined/null的重写

// _.findKey //根据value的属性值找key

// .mapKeys //遍历重写key, 相当于.forIn

// .mapValues //遍历重写value , 相当于.forIn


// _. clamp//确认所给值只在min,max之间

// _.max//最大

// _.min//最小

// _.sum//求和

// _.random//生成随机数

// _.round//四舍五入，允许指定精确位数

// _.isNumber
// _.isInterger
// _.isFunction
// _.isPlainObject
// _.isArray
// _.isDate
// _.isElement

// _.isNil//null or undefined

// _.isEmpty//{} or 空数组

// _.isEqual//支持对象和数组

// _.isMatch//匹配对象属性值

// _.cloneDeep//深度复制

// _.clone//浅复制


// _.debounce//忽略频繁执行

// _.union//合并两数组，去重

// _.uniq//去重



// _.sameple(array)//随机取1

// _.samepleSize(array, int)//  随机取n

// _.shuffle(array)//乱序, jQuery.shuffle


// _.groupBy(array, string)//分组，与多合一相反

// _.keyBy(array, string)//分组，类似groupBy, 但只有唯一值

// _.countBy(array, string)//分组统计

// _.difference(array1,array2)//找不同于array2，元素是Object用differenceBy

// _.xor(array1,array2)//得到非交集，元素是Object用xorBy

// _.intersection(array1,array2)//得到交集，元素是Object用intersectionBy