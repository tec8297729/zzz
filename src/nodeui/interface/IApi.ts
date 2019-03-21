// 定义抽象接口
export interface IApi{
  /* 定义了一个getInfo函数
  arg可选属性，是 obj对象类型
  callback可选属性，是一个fn函数类型
  此函数返回的是一个 Promise异步函数，并且里面的数据是一个obj对象
  */
 getData(url:string, arg?:Object ,callback?:Function):Promise<Object>;
 postData(url:string, arg?:Object ,callback?:Function):Promise<Object>;
}
