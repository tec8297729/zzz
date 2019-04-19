// const Mocha = require('mocha'); // 这是mochaRunner.js文件内容
// tslint:disable-next-line: no-implicit-dependencies
import Mocha from 'mocha';
const mocha = new Mocha({
  // 生成测试报告路径
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: './docs/mochawesome-reporter'
  }
});
// 执行测试文件-测试API
mocha.addFile('./dist/test/dataApi.spec.js');


mocha.run(function (errorLenth) {
  // 检测出错的长度有多少个
  if(errorLenth>0){
    console.log('单元测试失败');
    process.exit(1); // exit 1 表示这个测试挂了没通过
  }else{
    console.log('单元测试成功');
    process.exit(); // 退出进程，这是系统正常退出
  }
})

